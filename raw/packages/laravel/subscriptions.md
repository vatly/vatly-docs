# Subscriptions

> Vatly Laravel Package - Subscriptions

Vatly Laravel provides a full subscription lifecycle: creating, checking, swapping plans, canceling, and syncing with the Vatly API.

## Starting a subscription

```php
$checkout = $user->subscribe()
    ->toPlan('subscription_plan_annual')
    ->create();

return redirect($checkout->links->checkoutUrl->href);
```

### With a free trial

Trials defer the first charge until the trial elapses. Set them on the builder, in whole days or by end date:

```php
// Whole days from checkout creation
$user->subscribe()
    ->toPlan('subscription_plan_annual')
    ->withTrialDays(14)
    ->create();

// Or an end date — the remaining time is rounded *up* to whole days, so the
// trial never ends earlier than requested (Vatly's trial input is day-granular)
$user->subscribe()
    ->toPlan('subscription_plan_annual')
    ->withTrialEndsAt(now()->addMonth())
    ->create();
```

`withTrialDays()` throws for a length below 1 day; `withTrialEndsAt()` throws for a date that isn't in the future. When no trial is set the checkout payload omits `trialDays` entirely, so any plan-level default at Vatly still applies.

## Checking subscription status

```php
// Check if the user is subscribed
$user->subscribed(); // bool
$user->subscribed('premium'); // check a specific subscription type

// Get the subscription as a fluent handle (operations live here)
$subscription = $user->subscription(); // default type, returns ?SubscriptionHandle
$subscription = $user->subscription('premium');

// Get all subscriptions as Eloquent models (state-only)
$subscriptions = $user->subscriptions; // Collection<Subscription>
```

`$user->subscription('default')` returns a `Vatly\Fluent\SubscriptionHandle` — a lightweight wrapper around the underlying Eloquent model that exposes API-driven operations (`swap`, `cancel`, `sync`, `updateBilling`). Reach the Eloquent model via `$subscription->model()` if you need it directly.

## Subscription state

```php
$subscription->active();       // currently active (including grace period)
$subscription->cancelled();    // has been cancelled
$subscription->onGracePeriod(); // cancelled but still active until ends_at
```

## Swapping plans

```php
// Swap to a new plan (takes effect at the end of the current period by default)
$user->subscription()->swap('subscription_plan_annual');

// Swap and invoice immediately (applies now, charges the prorated delta now)
$user->subscription()->swapAndInvoice('subscription_plan_annual');
```

### Proration options

`swap()` takes an optional `$options` array that is passed straight through to the Vatly API. Three flags control how the change is timed and billed:

<table>
<thead>
  <tr>
    <th>
      Option
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Effect
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        applyImmediately
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
      
       applies the change now; <code>
        false
      </code>
      
       applies it when the current period ends
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        prorate
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Credit unused time on the old plan and charge remaining time on the new plan
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        invoiceImmediately
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Only applies when <code>
        applyImmediately
      </code>
      
       and <code>
        prorate
      </code>
      
       are both <code>
        true
      </code>
      
      . <code>
        true
      </code>
      
       raises a separate invoice for the proration delta right away; <code>
        false
      </code>
      
       parks the delta on the current cycle and bills it as a line on the <strong>
        next renewal invoice
      </strong>
    </td>
  </tr>
</tbody>
</table>

```php
// Apply the change now, but defer the prorated charge to the next renewal (the default proration behavior)
$user->subscription()->swap('subscription_plan_annual', ['applyImmediately' => true]);

// Apply now and charge the prorated delta on a separate invoice immediately
$user->subscription()->swap('subscription_plan_annual', [
    'applyImmediately' => true,
    'invoiceImmediately' => true,
]);
```

`swapAndInvoice()` is exactly `swap()` with `applyImmediately` and `invoiceImmediately` both forced to `true`.

**When to charge immediately.** With the default `invoiceImmediately: false`, the customer gets one invoice and one payment covering both the renewal and the parked delta — and if they cancel before that renewal, the parked amount is waived (a customer is never charged at the moment they cancel). That default suits **monthly** billing, where the delta is collected within weeks. **Set invoiceImmediately: true on yearly and other long-interval plans:** an upgrade in month 2 of a yearly plan would otherwise not be billed until month 12 (and is waived entirely if the customer cancels in between), so the longer the interval the more the deferral costs you.

### Immediate vs. scheduled changes

However the swap is applied, Vatly confirms the outcome over webhooks, and the package keeps the local `plan_id` / `name` / `quantity` in step:

- An **immediate** change (`applyImmediately: true`) raises a `subscription.updated` webhook → the `SubscriptionUpdated` event; the local plan/name/quantity are refreshed.
- A change **scheduled for the next cycle** (`applyImmediately: false`) raises a `subscription.update_scheduled` webhook → the `SubscriptionUpdateScheduled` event. Nothing changes locally yet; the target values ride in the event's `scheduledUpdate` (a typed `Vatly\API\Types\ScheduledSubscriptionUpdate` exposing `subscriptionPlanId`, `name`, `description`, `basePrice`, `quantity`, `interval`, `intervalCount` and `effectiveAt` — the timestamp the change takes effect), and the eventual switch arrives as a later `subscription.updated`.

See [Webhooks](/packages/laravel/webhooks) for the full event list.

## Canceling

```php
// Cancel the subscription at Vatly
$user->subscription()->cancel();
```

The actual cancellation is processed via webhooks. Depending on the Vatly configuration, the subscription may:

- End immediately (`SubscriptionCanceledImmediately` event)
- Enter a grace period (`SubscriptionCanceledWithGracePeriod` event)

## Updating billing details

```php
// Create a signed URL where the customer can update their billing details
// (address, VAT number, company name). Going through the hosted flow also
// refreshes the Mollie mandate as a side effect.
$url = $user->subscription()->updateBilling();

return redirect($url);
```

## Syncing with Vatly

Pull the latest subscription data from the Vatly API:

```php
$user->subscription()->sync();
```

This updates the local `plan_id`, `name`, `quantity`, `ends_at`, and `trial_ends_at` fields.

## Subscription types

You can have multiple subscriptions per user by using types:

```php
// A user with both a "default" and "addon" subscription
$user->subscription('default'); // main plan
$user->subscription('addon');   // additional features
```

The default type is `'default'`.
