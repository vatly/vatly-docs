# Migrating from Cashier

> Vatly Laravel Package - Migrating from Cashier

You don't swap a Merchant of Record overnight. The payment mandate for every active customer
lives with your *current* seller of record, and the only way to move a customer is to have them
re-authorize at the new one. So in practice you run two billing stacks side by side for a while:
existing customers keep paying through the old provider until they re-subscribe, new signups go
straight to Vatly, and you retire the old integration once the tail has migrated.

This is the integration playbook for exactly that — adding Vatly beside an existing Cashier-style
integration ([Stripe](https://laravel.com/docs/12.x/billing) /
[Paddle](https://laravel.com/docs/12.x/cashier-paddle) /
[Lemon Squeezy](https://github.com/lmsqueezy/laravel)): the one thing you have to resolve, the
things that *don't* need resolving, and the step-by-step.

> **Still deciding whether to switch?** Start with [How Vatly compares](Comparison) — the
> side-by-side on the Merchant-of-Record model, features, and what's on the roadmap. This page
> assumes you've decided to run Vatly alongside what you already have.

---

## The one thing that actually collides: the `Billable` trait

Every package here is modelled on Cashier, so every one ships a `Billable` trait that defines the
*same* method names:

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th align="center">
      Stripe
    </th>
    
    <th align="center">
      Paddle
    </th>
    
    <th align="center">
      Lemon Squeezy
    </th>
    
    <th align="center">
      Vatly
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        subscribed()
      </code>
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription()
      </code>
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions()
      </code>
      
       (relation)
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout()
      </code>
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscribe()
      </code>
    </td>
    
    <td align="center">
      —
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders()
      </code>
      
       (relation)
    </td>
    
    <td align="center">
      —
    </td>
    
    <td align="center">
      —
    </td>
    
    <td align="center">
      ✓
    </td>
    
    <td align="center">
      ✓
    </td>
  </tr>
</tbody>
</table>

PHP does not let two traits define the same method on one class — you get a fatal
*"trait method collision"* the moment you write `use LemonSqueezyBillable, VatlyBillable;`. So you
have to decide, deliberately, **which provider owns the unprefixed method names**.

> <span>
> 
> !TIP
> 
> </span>
> 
> **The cleanest fix is often to not share a model at all.** None of these `Billable` traits is
> tied to `User` — they work on any Eloquent model (`Team`, `Account`, `Organization`, …), and
> Vatly's records are polymorphic (`owner_type` / `owner_id`). If your app bills a model that
> isn't already carrying a Cashier-style trait — or you can introduce one — put Vatly's `Billable`
> there and the collision disappears entirely. When both providers genuinely must live on the
> *same* model, read on.

> <span>
> 
> !IMPORTANT
> 
> </span>
> 
> **The self-call trap.** Plain trait aliasing (`insteadof` / `as`) is *not* enough here, and it
> fails quietly. Vatly's `subscription()` and `subscribed()` call `$this->subscriptions()`
> internally. If you alias `subscriptions` to the legacy provider with `insteadof`, then
> `vatlySubscription()` will read the *legacy* subscriptions table and silently return the wrong
> thing. Aliasing is safe only for the *builder* methods (`subscribe`, `checkout`) that don't
> self-call a relation; the *state readers* (`subscription`, `subscribed`) need their relation to
> stay wired to Vatly.

Because of that trap, the recommended approach below uses Vatly's purpose-built `VatlyBillable`
trait, which exposes the whole Vatly surface under `vatly*` names and owns its *own*`vatlySubscriptions()` relation — so there's nothing to alias and nothing to cross-wire.

### Which provider owns the unprefixed names?

Pick the one most of your code already calls.

- **During a migration, that's almost always the legacy provider.** Don't churn working call
sites — keep `$user->subscribed()` meaning "subscribed via your existing provider" and give
Vatly a `vatly*` prefix. This is the default below.
- **Once Vatly is your default** for new signups and the legacy tail is winding down, flip it:
make Vatly the plain trait and reach the shrinking legacy cohort through the old provider's
models directly.

---

## What *doesn't* collide — and why that's deliberate

The trait is the only friction. Everything underneath is namespaced so the two stacks never
fight:

**Database tables.** Vatly prefixes every table — `vatly_subscriptions`, `vatly_orders`,
`vatly_order_lines`, `vatly_refunds`, `vatly_chargebacks`, `vatly_webhook_calls` — and adds a
single `vatly_id` column to your billable model's table. Nothing of Vatly's overlaps a Cashier
table. (Worth knowing: Cashier/Stripe and Cashier/Paddle *both* claim the unprefixed
`subscriptions` table, so they can't run side by side without overriding models. Vatly never
contends for a table name with anyone.)

**Webhooks.** Each provider registers its own route, verified with its own secret, pointed at its
own dashboard. Run all of them at once:

<table>
<thead>
  <tr>
    <th>
      Provider
    </th>
    
    <th>
      Route
    </th>
    
    <th>
      Signature secret
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Stripe
    </td>
    
    <td>
      <code>
        POST /stripe/webhook
      </code>
    </td>
    
    <td>
      <code>
        STRIPE_WEBHOOK_SECRET
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Paddle
    </td>
    
    <td>
      <code>
        POST /paddle/webhook
      </code>
    </td>
    
    <td>
      <code>
        PADDLE_WEBHOOK_SECRET
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Lemon Squeezy
    </td>
    
    <td>
      <code>
        POST /lemon-squeezy/webhook
      </code>
    </td>
    
    <td>
      <code>
        LEMON_SQUEEZY_SIGNING_SECRET
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Vatly
      </strong>
    </td>
    
    <td>
      <code>
        POST /webhooks/vatly
      </code>
    </td>
    
    <td>
      <code>
        VATLY_WEBHOOK_SECRET
      </code>
    </td>
  </tr>
</tbody>
</table>

Vatly uses its own `VATLY_*` environment variables and its own route name (`vatly.webhook`), so
it never collides with Cashier's `CASHIER_WEBHOOK` env or anyone else's config.

**Config & service bindings.** Vatly binds its services under its own namespace via
`VatlyServiceProvider`; nothing is rebound out from under your existing provider.

In short: two sets of tables, two webhook endpoints, two dashboards, one model. The only line of
code you have to think about is the trait.

---

## Add Vatly beside your current provider

### 1. Install and migrate

```bash
composer require vatly/vatly-laravel:v0.7.0-alpha.14

php artisan vendor:publish --tag=vatly-config
php artisan vendor:publish --tag=vatly-migrations
php artisan vendor:publish --tag=vatly-billable-migrations
php artisan migrate
```

This adds the `vatly_id` column and the `vatly_*` tables. Your existing tables are untouched. Add
the Vatly credentials alongside your current ones in `.env`:

```env
# existing provider stays exactly as-is — its own keys, untouched

# new, additive:
VATLY_KEY=test_xxxxxxxxxxxx
VATLY_WEBHOOK_SECRET=your-webhook-secret
VATLY_REDIRECT_URL_SUCCESS=https://your-app.test/checkout/success
VATLY_REDIRECT_URL_CANCELED=https://your-app.test/checkout/canceled
```

### 2. Add the `VatlyBillable` trait

`vatly-laravel` ships a second trait, **VatlyBillable**, built for exactly this. It exposes the
full Vatly surface under `vatly*`-prefixed names — `vatlySubscribe()`, `vatlySubscribed()`,
`vatlySubscription()`, `vatlyCheckout()`, `vatlyOrder()`, plus the `vatlySubscriptions` /
`vatlyOrders` / `vatlyRefunds` / `vatlyChargebacks` relations — so it drops in beside any
Cashier-style `Billable` with no collision and no aliasing. Add it next to the trait you already
have:

```php
// app/Models/User.php
use LemonSqueezy\Laravel\Billable;   // your existing provider — unchanged
use Vatly\Laravel\VatlyBillable;     // Vatly, under vatly* names

class User extends Authenticatable
{
    use Billable;          // $user->subscribed(), $user->checkout(), … → existing provider
    use VatlyBillable;     // $user->vatlySubscribed(), $user->vatlyCheckout(), … → Vatly
}
```

That's the whole integration step. Two things make it safe by construction:

- **The state readers query their own relation.** `vatlySubscribed()` / `vatlySubscription()` read
`vatlySubscriptions()`, never an unprefixed `subscriptions()` the other provider owns — so the
self-call trap can't bite.
- **The customer helpers are shared, not duplicated.** Methods whose names already carry "Vatly" —
`createAsVatlyCustomer()`, `claimVatlyCustomerFromReturn()`, `asVatlyCustomer()`,
`findBillable()` — don't collide, so `VatlyBillable` and the standalone `Billable` share one
tested implementation; a fix to the claim / re-attribution logic reaches both.

> **Vatly is your only biller?** Use the plain `Billable` trait instead (`subscribe()`,
> `subscribed()`, …) — see [Getting started](README). `VatlyBillable` exists purely for running
> beside another provider.

<details>
<summary>

Under the hood — the equivalent hand-written concern

</summary>

You never need this; `VatlyBillable` ships with the package. But if you'd rather own the code — to
rename methods, narrow the surface, or add behavior — it's essentially this trait over Vatly's
composition root:

```php
// app/Billing/VatlyBilling.php
namespace App\Billing;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Http\Request;
use Vatly\Fluent\Builders\CheckoutBuilder;
use Vatly\Fluent\Builders\SubscriptionBuilder;
use Vatly\Fluent\CustomerProfile;
use Vatly\Fluent\SubscriptionHandle;
use Vatly\Fluent\Vatly;
use Vatly\Laravel\Models\Order as VatlyOrder;
use Vatly\Laravel\Models\Subscription as VatlySubscription;

trait VatlyBilling
{
    /** @return MorphMany<VatlySubscription> */
    public function vatlySubscriptions(): MorphMany
    {
        return $this->morphMany(VatlySubscription::class, 'owner')->orderByDesc('created_at');
    }

    public function vatlySubscribe(): SubscriptionBuilder
    {
        return app(Vatly::class)->subscriptionBuilder($this->vatlyProfile());
    }

    public function vatlyCheckout(): CheckoutBuilder
    {
        return app(Vatly::class)->checkoutBuilder($this->vatlyProfile());
    }

    public function vatlySubscribed(string $type = VatlySubscription::DEFAULT_TYPE): bool
    {
        // Uses our own relation — never the legacy one.
        $sub = $this->vatlySubscriptions()->where('type', $type)->first();

        return $sub !== null && $sub->isActive();
    }

    public function vatlySubscription(string $type = VatlySubscription::DEFAULT_TYPE): ?SubscriptionHandle
    {
        $sub = $this->vatlySubscriptions()->where('type', $type)->first();

        return $sub !== null ? app(Vatly::class)->subscription($sub) : null;
    }

    /**
     * Claim an anonymous Vatly customer on the checkout-success redirect.
     * Mirrors Vatly\Laravel\VatlyBillable::claimVatlyCustomerFromReturn().
     */
    public function claimVatlyCustomerFromReturn(Request $request, string $key = 'checkout_id'): bool
    {
        $checkoutId = $request->query($key);

        if (! is_string($checkoutId) || $checkoutId === '') {
            return false;
        }

        $customerId = app(Vatly::class)->customerIdFromCheckout($checkoutId);

        if ($customerId === null) {
            return false;
        }

        app(Vatly::class)->customers()->attribute($customerId, (string) $this->getKey());
        $this->forceFill(['vatly_id' => $customerId])->save();

        // Re-attribute rows the webhook persisted during the anonymous flow.
        $owner = ['owner_type' => $this->getMorphClass(), 'owner_id' => $this->getKey()];
        VatlySubscription::query()->whereNull('owner_id')->where('customer_id', $customerId)->update($owner);
        VatlyOrder::query()->whereNull('owner_id')->where('customer_id', $customerId)->update($owner);

        return true;
    }

    private function vatlyProfile(): CustomerProfile
    {
        return new CustomerProfile(
            vatlyId: $this->vatly_id,
            email: $this->email,
            name: $this->name,
        );
    }
}
```

</details>

<details>
<summary>

**Alternative — trait aliasing** (only if you're making Vatly primary)

</summary>

`VatlyBillable` keeps the incumbent on the unprefixed names — what you want during a migration. If
instead you're making **Vatly** primary and pushing the legacy provider under a prefix, use
Vatly's standalone `Billable` and resolve the collision with `insteadof` / `as`:

```php
use LemonSqueezy\Laravel\Billable as LegacyBillable;
use Vatly\Laravel\Billable as VatlyBaseBillable;

class User extends Authenticatable
{
    use VatlyBaseBillable, LegacyBillable {
        // Vatly OWNS the unprefixed names — including subscriptions(), so its
        // internal self-calls stay correct.
        VatlyBaseBillable::subscriptions  insteadof LegacyBillable;
        VatlyBaseBillable::subscription   insteadof LegacyBillable;
        VatlyBaseBillable::subscribed     insteadof LegacyBillable;
        VatlyBaseBillable::subscribe      insteadof LegacyBillable;
        VatlyBaseBillable::checkout       insteadof LegacyBillable;
        VatlyBaseBillable::orders         insteadof LegacyBillable;

        // Legacy provider moves under a prefix; update its call sites accordingly.
        LegacyBillable::subscriptions as legacySubscriptions;
        LegacyBillable::subscription  as legacySubscription;
        LegacyBillable::subscribed    as legacySubscribed;
        LegacyBillable::subscribe     as legacySubscribe;
        LegacyBillable::checkout      as legacyCheckout;
        LegacyBillable::orders        as legacyOrders;
    }
}
```

Don't hand-alias the inverse (legacy keeps `subscriptions`, Vatly pushed under a prefix) — the
prefixed Vatly readers would then read the wrong relation, the self-call trap above. That case is
exactly what `VatlyBillable` is built for, so reach for it instead of aliasing.

</details>

### 3. Decide who bills through whom

Add a column that records which provider owns a given user, and default new signups to Vatly:

```php
// migration
$table->string('billing_provider')->default('vatly'); // existing rows: backfill to 'legacy'
```

```php
// a single gate your UI and middleware can read
public function billsThroughVatly(): bool
{
    return $this->billing_provider === 'vatly';
}
```

Your billing screen then branches on it:

```php
if ($user->billsThroughVatly()) {
    $checkout = $user->vatlySubscribe()->toPlan('subscription_plan_7Hd9Kf2Lm')->create();

    return redirect($checkout->links->checkoutUrl->href);
}

// legacy cohort keeps its current flow until they choose to move
return redirect($user->checkout('variant-id')); // your existing provider
```

### 4. Run both webhook endpoints

Nothing special — register Vatly's webhook URL and secret in the Vatly dashboard, keep your
existing provider's webhook pointed where it already is. Subscriptions and orders from each
provider sync into their own tables. Listen for Vatly events on Laravel's event bus the usual way
(see [Webhooks](Webhooks)):

```php
use Vatly\API\Webhooks\Events\SubscriptionStarted;

Event::listen(SubscriptionStarted::class, function (SubscriptionStarted $event) {
    // a customer is now live on Vatly — safe to wind down their legacy subscription
});
```

### 5. Migrate a customer: the re-authorization flow

A MoR mandate belongs to the legal seller — your old provider's mandate is theirs, Vatly's is
Vatly's. You **cannot** transfer a mandate between Merchants of Record; the customer has to
authorize payment at the new seller. So a migration is a re-subscribe, sequenced to avoid both a
double charge and a gap in access:

1. Show the legacy-active customer a "move to Vatly" prompt (a re-authentication, in plain
language: "confirm your payment details to switch").
2. They complete a fresh Vatly checkout — `vatlySubscribe()->toPlan(...)->create()` — which
creates the new mandate at Vatly.
3. On return, `claimVatlyCustomerFromReturn($request)` links the new Vatly customer to the user
(guest-checkout and multi-tab safe).
4. **When Vatly's SubscriptionStarted webhook lands** — not before — cancel the legacy
subscription at period end (`$user->subscription()->cancel()` on the legacy trait) so the
customer is never double-billed and never loses access mid-period.
5. Flip `billing_provider` to `vatly`.

Order matters: start Vatly only after the customer opts in (no surprise charge), cancel legacy
only after Vatly is active (no service gap).

---

## Translation cheat-sheet (Cashier → Vatly)

Mapping for the engineer or agent porting a flow. Vatly ids are prefixed —
`subscription_plan_…` for plans, `one_off_product_…` for one-offs. The Vatly column uses the
`vatly*` methods from the `VatlyBillable` trait (step 2).

<table>
<thead>
  <tr>
    <th>
      Task
    </th>
    
    <th>
      Cashier (Stripe)
    </th>
    
    <th>
      Cashier (Paddle)
    </th>
    
    <th>
      Lemon Squeezy
    </th>
    
    <th>
      <strong>
        Vatly
      </strong>
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Start a subscription
    </td>
    
    <td>
      <code>
        newSubscription('default','price')->create($pm)
      </code>
    </td>
    
    <td>
      <code>
        subscribe('pri_123','default')
      </code>
    </td>
    
    <td>
      <code>
        subscribe('variant')
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscribe()->toPlan('subscription_plan_…')->create()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Redirect to checkout
    </td>
    
    <td>
      <code>
        ->checkout([...])
      </code>
    </td>
    
    <td>
      <code>
        ->returnTo($url)
      </code>
      
       (Paddle.js)
    </td>
    
    <td>
      redirect / <code>
        <x-lemon-button>
      </code>
    </td>
    
    <td>
      <code>
        redirect($checkout->links->checkoutUrl->href)
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Free trial
    </td>
    
    <td>
      <code>
        ->trialDays(14)
      </code>
    </td>
    
    <td>
      plan-level / <code>
        ->trialDays()
      </code>
    </td>
    
    <td>
      plan-level
    </td>
    
    <td>
      <code>
        ->withTrialDays(14)
      </code>
      
       or <code>
        ->withTrialEndsAt($date)
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Is subscribed?
    </td>
    
    <td>
      <code>
        subscribed('default')
      </code>
    </td>
    
    <td>
      <code>
        subscribed()
      </code>
    </td>
    
    <td>
      <code>
        subscribed()
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscribed()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Get the subscription
    </td>
    
    <td>
      <code>
        subscription('default')
      </code>
    </td>
    
    <td>
      <code>
        subscription()
      </code>
    </td>
    
    <td>
      <code>
        subscription()
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscription()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      In grace period?
    </td>
    
    <td>
      <code>
        subscription()->onGracePeriod()
      </code>
    </td>
    
    <td>
      <code>
        ->onGracePeriod()
      </code>
    </td>
    
    <td>
      <code>
        ->onGracePeriod()
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscription()->onGracePeriod()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Swap plan
    </td>
    
    <td>
      <code>
        subscription()->swap('price')
      </code>
    </td>
    
    <td>
      <code>
        ->swap('pri')
      </code>
    </td>
    
    <td>
      <code>
        ->swap('prod','variant')
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscription()->swap('subscription_plan_…')
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Swap + invoice now
    </td>
    
    <td>
      <code>
        ->swapAndInvoice('price')
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      <code>
        ->swapAndInvoice(...)
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscription()->swapAndInvoice('subscription_plan_…')
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Cancel (grace)
    </td>
    
    <td>
      <code>
        subscription()->cancel()
      </code>
    </td>
    
    <td>
      <code>
        ->cancel()
      </code>
    </td>
    
    <td>
      <code>
        ->cancel()
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscription()->cancel()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Resume
    </td>
    
    <td>
      <code>
        subscription()->resume()
      </code>
    </td>
    
    <td>
      <code>
        ->resume()
      </code>
    </td>
    
    <td>
      <code>
        ->resume()
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscription()->resume()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      One-off purchase
    </td>
    
    <td>
      <code>
        checkout(['price'=>1])
      </code>
    </td>
    
    <td>
      <code>
        checkout('pri_123')
      </code>
    </td>
    
    <td>
      <code>
        checkout('variant')
      </code>
    </td>
    
    <td>
      <code>
        vatlyCheckout()->create(items: [['id'=>'one_off_product_…','quantity'=>1]], redirectUrlSuccess: …, redirectUrlCanceled: …)
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Update payment / billing
    </td>
    
    <td>
      <code>
        redirectToBillingPortal()
      </code>
    </td>
    
    <td>
      hosted update
    </td>
    
    <td>
      <code>
        redirect($portalUrl)
      </code>
    </td>
    
    <td>
      <code>
        vatlySubscription()->updateBilling()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      List orders / receipts
    </td>
    
    <td>
      <code>
        invoices()
      </code>
    </td>
    
    <td>
      <code>
        transactions()
      </code>
    </td>
    
    <td>
      <code>
        orders()
      </code>
    </td>
    
    <td>
      <code>
        $user->vatlyOrders
      </code>
      
       → <code>
        $order->invoiceUrl()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Customer id field
    </td>
    
    <td>
      <code>
        stripe_id
      </code>
    </td>
    
    <td>
      <code>
        paddle_id
      </code>
    </td>
    
    <td>
      (relation)
    </td>
    
    <td>
      <code>
        vatly_id
      </code>
    </td>
  </tr>
</tbody>
</table>

A couple of shape differences worth flagging for whoever's implementing:

- **Vatly checkout is a server-side redirect**, like Stripe Checkout — you build the checkout
server-side and `redirect()` to a hosted URL. Paddle and Lemon Squeezy lean on a client-side JS
overlay (`@paddleJS`, `@lemonJS`). If you're moving off an overlay, you're removing front-end
JS, not adding it.
- **Guest checkout** is first-class in Vatly: put `{CHECKOUT_ID}` in your return URL and call
`claimVatlyCustomerFromReturn()` on the way back to link the purchase — no session plumbing,
multi-tab safe. See [Customers](Customers).
- **Refunds and chargebacks are real models** in Vatly (`$user->vatlyRefunds`,
`$order->chargebacks`, reversal helpers like `$order->isFullyReversed()`), with dedicated
webhook events — not something you reconstruct from raw payloads.

---

## Reference

- **Deciding / comparing** → [How Vatly compares](Comparison) (Merchant-of-Record model,
feature parity, roadmap)
- **Getting started** → [Getting started](README) · [Configuration](configuration)
- **API surface** → [Customers](Customers) · [Checkouts](Checkouts) · [Subscriptions](Subscriptions) · [Orders](Orders) · [Webhooks](Webhooks)

Compared against, at time of writing:
[Laravel Cashier (Stripe)](https://laravel.com/docs/12.x/billing) ·
[Laravel Cashier (Paddle)](https://laravel.com/docs/12.x/cashier-paddle) ·
[Lemon Squeezy for Laravel](https://github.com/lmsqueezy/laravel).
Method names and table layouts follow those packages' current releases — verify against the
version you have pinned before relying on a specific signature.
