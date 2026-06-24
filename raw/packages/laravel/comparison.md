# Vs Cashier (Stripe, Paddle) & Lemon Squeezy

> Vatly Laravel Package - Vs Cashier (Stripe, Paddle) & Lemon Squeezy

Picking the billing layer for a new Laravel app? If you've reached for Laravel Cashier
before, Vatly will feel immediately familiar — a `Billable` trait, `subscribed()`,
`subscription()->swap()`, a wired-up webhook endpoint. The difference is what sits *behind*
the API: Vatly is a **Merchant of Record**, so it is the legal seller and handles VAT,
invoicing, and payment compliance for you — and it's **Europe-first**, operating under EU
jurisdiction.

This page is an honest, side-by-side look at how `vatly-laravel` stacks up against the
Cashier-style packages you might otherwise reach for —
[Laravel Cashier (Stripe)](https://laravel.com/docs/12.x/billing),
[Laravel Cashier (Paddle)](https://laravel.com/docs/12.x/cashier-paddle), and
[Lemon Squeezy for Laravel](https://github.com/lmsqueezy/laravel) — gaps included.

> **Already running one of these in an existing app?** This page helps you choose. Once you
> have, [Migrating from Cashier](/packages/laravel/migrating-to-vatly) shows how to add Vatly
> next to your current biller and migrate customers over gradually.

---

## At a glance

<table>
<thead>
  <tr>
    <th>
      
    </th>
    
    <th>
      Cashier (Stripe Billing)
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
      Composer package
    </td>
    
    <td>
      <code>
        laravel/cashier
      </code>
    </td>
    
    <td>
      <code>
        laravel/cashier-paddle
      </code>
    </td>
    
    <td>
      <code>
        lemonsqueezy/laravel
      </code>
    </td>
    
    <td>
      <code>
        vatly/vatly-laravel
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Billable trait
    </td>
    
    <td>
      <code>
        Laravel\Cashier\Billable
      </code>
    </td>
    
    <td>
      <code>
        Laravel\Paddle\Billable
      </code>
    </td>
    
    <td>
      <code>
        LemonSqueezy\Laravel\Billable
      </code>
    </td>
    
    <td>
      <code>
        Vatly\Laravel\Billable
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Merchant of Record
    </td>
    
    <td>
      <strong>
        No
      </strong>
      
       — you are the seller
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      <strong>
        Yes (full)
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      Entity / jurisdiction
    </td>
    
    <td>
      <em>
        You
      </em>
      
       (wherever you're registered)
    </td>
    
    <td>
      Paddle, <strong>
        UK
      </strong>
    </td>
    
    <td>
      Lemon Squeezy, <strong>
        US
      </strong>
      
       (Stripe-owned)
    </td>
    
    <td>
      <strong>
        EEA / EU jurisdiction
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      Who remits VAT/sales tax
    </td>
    
    <td>
      <strong>
        You
      </strong>
      
       (Stripe Tax only <em>
        calculates
      </em>
      
      )
    </td>
    
    <td>
      Provider
    </td>
    
    <td>
      Provider
    </td>
    
    <td>
      <strong>
        Provider
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      Customer stored as
    </td>
    
    <td>
      columns on the billable model (<code>
        stripe_id
      </code>
      
      , …)
    </td>
    
    <td>
      <code>
        customers
      </code>
      
       table (<code>
        paddle_id
      </code>
      
      )
    </td>
    
    <td>
      <code>
        lemon_squeezy_customers
      </code>
      
       table
    </td>
    
    <td>
      <code>
        vatly_id
      </code>
      
       column on the billable model + <code>
        vatly_*
      </code>
      
       tables
    </td>
  </tr>
  
  <tr>
    <td>
      Checkout
    </td>
    
    <td>
      Stripe Checkout (hosted) / Elements
    </td>
    
    <td>
      Paddle.js <strong>
        overlay / inline
      </strong>
      
       (client-side JS)
    </td>
    
    <td>
      Lemon.js overlay / hosted URL
    </td>
    
    <td>
      <strong>
        Vatly-hosted redirect
      </strong>
      
       (+ guest claim)
    </td>
  </tr>
  
  <tr>
    <td>
      Webhook route
    </td>
    
    <td>
      <code>
        /stripe/webhook
      </code>
    </td>
    
    <td>
      <code>
        /paddle/webhook
      </code>
    </td>
    
    <td>
      <code>
        /lemon-squeezy/webhook
      </code>
    </td>
    
    <td>
      <code>
        /webhooks/vatly
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Coupons / promo codes
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      <strong>
        On the roadmap
      </strong>
      
       (workaround below)
    </td>
  </tr>
  
  <tr>
    <td>
      License keys
    </td>
    
    <td>
      No
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      <strong>
        On the roadmap
      </strong>
      
       (rarely needed for SaaS)
    </td>
  </tr>
  
  <tr>
    <td>
      Refunds & chargebacks
    </td>
    
    <td>
      wire it yourself
    </td>
    
    <td>
      events
    </td>
    
    <td>
      events
    </td>
    
    <td>
      <strong>
        first-class models + events
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      Trials, swap, grace/resume
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      <strong>
        Yes
      </strong>
    </td>
  </tr>
</tbody>
</table>

Two takeaways:

1. **laravel/cashier runs on classic Stripe Billing, where you're the seller of record** and
own VAT registration, filing and remittance. Stripe has a real MoR too
([Managed Payments](https://stripe.com/managed-payments)), and Cashier — actively maintained —
will likely support it before long. Being an MoR is table stakes now, not a Vatly-only edge.
2. **So the real difference between MoRs is jurisdiction.** Paddle is UK, Lemon Squeezy and Stripe
are US, Vatly is EEA — your seller-of-record entity and customer data stay under EU law. That,
not the API, is the reason to choose one over another.

---

## The developer experience

For a greenfield app, Vatly is your only biller — so you use the plain `Billable` trait, and
the code reads like Cashier:

```php
use Vatly\Laravel\Billable;

class User extends Authenticatable
{
    use Billable;
}
```

```php
// Start a subscription — redirect to Vatly's hosted checkout
$checkout = $user->subscribe()
    ->toPlan('subscription_plan_7Hd9Kf2Lm')
    ->withTrialDays(14)
    ->create();

return redirect($checkout->links->checkoutUrl->href);

// Gate features on subscription state
if ($user->subscribed()) {
    // …
}

$user->subscription()->swap('subscription_plan_other');
$user->subscription()->cancel();      // Vatly decides immediate vs. grace
$user->subscription()->resume();      // while on the grace period

// One-off purchase
$user->checkout()->create(
    items: [['id' => 'one_off_product_3Qb8Wz1Yt', 'quantity' => 1]],
    redirectUrlSuccess: route('billing.success'),
    redirectUrlCanceled: route('billing'),
);

// Receipts — hosted invoice URLs, no PDF plumbing
foreach ($user->orders as $order) {
    echo $order->invoiceUrl();
}
```

No VAT logic, no tax tables, no invoice templates, no client-side checkout widget to embed —
the checkout is a server-side redirect, like Stripe Checkout. See [Subscriptions](/packages/laravel/subscriptions)
and [Checkouts](/packages/laravel/checkouts) for the full surface.

---

## Feature parity, and what's still on the roadmap

Vatly covers what a SaaS needs to start selling: subscriptions with trials, plan swaps,
cancellation with grace and resume, one-off purchases, hosted checkout, refunds and chargebacks,
and — because it's a Merchant of Record — VAT, invoicing and tax compliance handled for you. A
few capabilities you may use elsewhere aren't in the box yet. Here's the honest picture, and how
to bridge it.

<table>
<thead>
  <tr>
    <th>
      Capability
    </th>
    
    <th>
      Vatly today
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Subscriptions, trials, swap, grace, resume
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      Full lifecycle, Cashier-shaped API
    </td>
  </tr>
  
  <tr>
    <td>
      One-off / multi-item checkout
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      <code>
        checkout()->create(items: …)
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      VAT, invoicing, tax remittance
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      Handled — it's the point of a MoR. With Cashier (classic Stripe Billing) this is <em>
        your
      </em>
      
       job.
    </td>
  </tr>
  
  <tr>
    <td>
      Refunds & chargebacks
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      First-class models + events (more than most provide)
    </td>
  </tr>
  
  <tr>
    <td>
      Test / live segregation
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      Every record carries <code>
        testmode
      </code>
      
      ; key prefix selects the mode
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Coupons / promo codes
      </strong>
    </td>
    
    <td>
      🔜 Roadmap
    </td>
    
    <td>
      Until native codes land, model a promo as a dedicated <code>
        subscription_plan_…
      </code>
      
       at the discounted price and point that cohort at it. A couple of extra plans in the dashboard — not a blocker for launching offers.
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        License keys
      </strong>
    </td>
    
    <td>
      🔜 Roadmap
    </td>
    
    <td>
      Vatly is built for SaaS, where entitlement follows subscription state — <code>
        subscribed()
      </code>
      
       <em>
        is
      </em>
      
       your license check. Per-seat keys for downloadable/offline software (Lemon Squeezy's signature feature) aren't here yet. If you ship license-activated desktop binaries, that's the one workflow to keep elsewhere for now.
    </td>
  </tr>
</tbody>
</table>

The shape of the trade is deliberate: Vatly does the compliance-heavy core that's genuinely
hard to build — being the seller of record, VAT across the EU, invoicing, disputes — and is
filling in the conveniences (coupons next) in the open. For a subscription SaaS selling into
Europe and the world, there's enough here to launch today.

---

## Why teams choose Vatly

A Merchant of Record handles VAT, invoicing and tax remittance for you — and that part is now
table stakes. Paddle, Lemon Squeezy, Stripe Managed Payments and Vatly all do it; on Stripe it's
a flag on the request. So the real question isn't *whether* compliance is handled — it's whose
entity you sell through:

- **Europe-first, by design.** EEA-based, EU jurisdiction, customer data kept in Europe. The other
MoRs sit in the UK (Paddle) or the US (Lemon Squeezy, Stripe Managed Payments) — jurisdiction is
the one axis that genuinely separates them, and the reason Vatly exists.
- **No exposure to US policy.** Your seller-of-record relationship and your customers' data stay
under EU law — a clean answer when an enterprise buyer, or your own board, asks where they sit.
- **One familiar API.** The Cashier-shaped surface means there's little to learn and little to
rewrite.

> **You Just Ship.**

---

## Next steps

- **Starting fresh** → [Getting started](/packages/laravel/readme) wires up the trait, config, migrations and
webhook in a few minutes.
- **Already running another provider** → [Migrating from Cashier](/packages/laravel/migrating-to-vatly)
shows how to add Vatly beside your current biller and migrate customers over gradually.
- **Reference** → [Configuration](/packages/laravel/configuration) · [Customers](/packages/laravel/customers) · [Checkouts](/packages/laravel/checkouts) · [Subscriptions](/packages/laravel/subscriptions) · [Orders](/packages/laravel/orders) · [Webhooks](/packages/laravel/webhooks)

Compared against, at time of writing:
[Laravel Cashier (Stripe)](https://laravel.com/docs/12.x/billing) ·
[Laravel Cashier (Paddle)](https://laravel.com/docs/12.x/cashier-paddle) ·
[Lemon Squeezy for Laravel](https://github.com/lmsqueezy/laravel).
Their method names and table layouts follow those packages' current releases — verify against
the version you have pinned before relying on a specific signature.
