# Subscriptions

Vatly Laravel provides a full subscription lifecycle: creating, checking, swapping plans, canceling, and syncing with the Vatly API.

## Checking subscription status

```php
// Check if the user is subscribed
$user->subscribed(); // bool
$user->subscribed('premium'); // check a specific subscription type

// Get the subscription
$subscription = $user->subscription(); // default type
$subscription = $user->subscription('premium');

// Get all subscriptions
$subscriptions = $user->subscriptions; // Collection
```

## Subscription state

```php
$subscription->active();       // currently active (including grace period)
$subscription->cancelled();    // has been cancelled
$subscription->onGracePeriod(); // cancelled but still active until ends_at
```

## Swapping plans

```php
// Swap to a new plan
$user->subscription()->swap('default', 'subscription_plan_annual');

// Swap and invoice immediately (prorated)
$user->subscription()->swapAndInvoice('default', 'subscription_plan_annual');
```

## Canceling

```php
// Cancel the subscription at Vatly
$user->subscription()->cancel();
```

The actual cancellation is processed via webhooks. Depending on the Vatly configuration, the subscription may:

- End immediately (`SubscriptionCanceledImmediately` event)
- Enter a grace period (`SubscriptionCanceledWithGracePeriod` event)

## Updating payment method

```php
// Get a URL where the customer can update their payment method
$url = $user->subscription()->updatePaymentMethodUrl();

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
