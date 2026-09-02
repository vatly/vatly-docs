# Webhooks

> Vatly Laravel Package - Webhooks

Vatly sends webhooks to notify your application of events like subscription starts, cancellations, and payment updates. Vatly Laravel handles webhook verification, storage, and event dispatching automatically.

## Endpoint

The package registers a webhook endpoint at:

```text
POST /webhooks/vatly
```

Configure this URL in your Vatly dashboard. Make sure to set your `VATLY_WEBHOOK_SECRET` in `.env`.

## CSRF protection

Exclude the webhook route from CSRF verification. In Laravel 11+, this is typically done in `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: [
        'webhooks/vatly',
    ]);
})
```

## Events

When a webhook is received, the driver's `LaravelEventDispatcher` forwards the typed domain events straight onto Laravel's event bus, so you listen for the DTO classes directly. The webhook event DTOs live in `vatly-api-php` under the `Vatly\API\Webhooks\Events\` namespace (so a payload change is a single api-php release); the exceptions are `SubscriptionWasCreatedFromWebhook` and `OrderWasCreatedFromWebhook`, internal fluent signals under `Vatly\Fluent\Events\`:

<table>
<thead>
  <tr>
    <th>
      Event (<code>
        Vatly\API\Webhooks\Events\…
      </code>
      
      )
    </th>
    
    <th>
      Dispatched when
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        SubscriptionStarted
      </code>
    </td>
    
    <td>
      A <code>
        subscription.started
      </code>
      
       webhook is received
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionBillingUpdated
      </code>
    </td>
    
    <td>
      A <code>
        subscription.billing_updated
      </code>
      
       webhook is received — the stored mandate is refreshed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionUpdated
      </code>
    </td>
    
    <td>
      A <code>
        subscription.updated
      </code>
      
       webhook is received — an immediate plan/price/interval/quantity change; the local <code>
        plan_id
      </code>
      
       / <code>
        name
      </code>
      
       / <code>
        quantity
      </code>
      
       are refreshed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionUpdateScheduled
      </code>
    </td>
    
    <td>
      A <code>
        subscription.update_scheduled
      </code>
      
       webhook is received — a change scheduled for the next cycle; dispatched only (no local change), target values in <code>
        scheduledUpdate
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionResumed
      </code>
    </td>
    
    <td>
      A <code>
        subscription.resumed
      </code>
      
       webhook is received — the stored end date is cleared
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionCanceledImmediately
      </code>
    </td>
    
    <td>
      A <code>
        subscription.canceled_immediately
      </code>
      
       webhook is received
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionCanceledWithGracePeriod
      </code>
    </td>
    
    <td>
      A <code>
        subscription.canceled_with_grace_period
      </code>
      
       webhook is received
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionCancellationGracePeriodCompleted
      </code>
    </td>
    
    <td>
      A <code>
        subscription.cancellation_grace_period_completed
      </code>
      
       webhook is received — the grace period stamped by the cancellation has now elapsed (carries <code>
        customerId
      </code>
      
      , <code>
        subscriptionId
      </code>
      
      , <code>
        endsAt
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OrderPaid
      </code>
    </td>
    
    <td>
      An <code>
        order.paid
      </code>
      
       webhook is received (enriched with the full tax breakdown)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OrderCanceled
      </code>
    </td>
    
    <td>
      An <code>
        order.canceled
      </code>
      
       webhook is received — the local order status is mirrored to <code>
        canceled
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OrderPaymentFailed
      </code>
    </td>
    
    <td>
      An <code>
        order.payment_failed
      </code>
      
       webhook is received — typically the start of dunning (enriched with the full tax breakdown)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OrderChargebackReceived
      </code>
      
       / <code>
        OrderChargebackReversed
      </code>
    </td>
    
    <td>
      An <code>
        order.chargeback_received
      </code>
      
       / <code>
        order.chargeback_reversed
      </code>
      
       webhook is received — enriched with <code>
        customerId
      </code>
      
      , dispute <code>
        status
      </code>
      
      , totals and <code>
        taxSummary
      </code>
      
      ; persisted to <code>
        vatly_chargebacks
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        RefundCompleted
      </code>
      
       / <code>
        RefundFailed
      </code>
      
       / <code>
        RefundCanceled
      </code>
    </td>
    
    <td>
      A <code>
        refund.completed
      </code>
      
       / <code>
        refund.failed
      </code>
      
       / <code>
        refund.canceled
      </code>
      
       webhook is received — each carries the full <code>
        taxSummary
      </code>
      
      ; persisted to <code>
        vatly_refunds
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        CheckoutPaid
      </code>
    </td>
    
    <td>
      A <code>
        checkout.paid
      </code>
      
       webhook is received — the hosted checkout was paid (fires before <code>
        order.paid
      </code>
      
      's enrichment GET; carries <code>
        checkoutId
      </code>
      
      , nullable <code>
        customerId
      </code>
      
       / <code>
        orderId
      </code>
      
      , <code>
        status
      </code>
      
      , <code>
        metadata
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        CheckoutFailed
      </code>
    </td>
    
    <td>
      A <code>
        checkout.failed
      </code>
      
       webhook is received — the hosted checkout's payment failed (route into a retry flow)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        CheckoutCanceled
      </code>
    </td>
    
    <td>
      A <code>
        checkout.canceled
      </code>
      
       webhook is received — the customer abandoned the hosted checkout (cart-abandonment hook)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        CheckoutExpired
      </code>
    </td>
    
    <td>
      A <code>
        checkout.expired
      </code>
      
       webhook is received — the hosted checkout session timed out without completion
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        WebhookSetupReceived
      </code>
    </td>
    
    <td>
      A <code>
        webhook.setup
      </code>
      
       verification call is received — Vatly confirms a newly registered (or re-pointed) endpoint is reachable. There's no resource to enrich and no local row to touch; just acknowledge with a <code>
        2xx
      </code>
      
      . Carries only the webhook envelope (<code>
        eventName
      </code>
      
       / <code>
        object
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OneOffProductUpdateSubmitted
      </code>
      
       / <code>
        OneOffProductUpdateApproved
      </code>
      
       / <code>
        OneOffProductUpdateRejected
      </code>
      
       / <code>
        OneOffProductArchived
      </code>
      
       / <code>
        OneOffProductUnarchived
      </code>
    </td>
    
    <td>
      The <code>
        one_off_product.*
      </code>
      
       product-moderation events — see <a href="#product-moderation-events">
        Product moderation events
      </a>
      
       below
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionPlanUpdateSubmitted
      </code>
      
       / <code>
        SubscriptionPlanUpdateApproved
      </code>
      
       / <code>
        SubscriptionPlanUpdateRejected
      </code>
      
       / <code>
        SubscriptionPlanArchived
      </code>
      
       / <code>
        SubscriptionPlanUnarchived
      </code>
    </td>
    
    <td>
      The <code>
        subscription_plan.*
      </code>
      
       product-moderation events — see <a href="#product-moderation-events">
        Product moderation events
      </a>
      
       below
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        UnsupportedWebhookReceived
      </code>
    </td>
    
    <td>
      A webhook arrives that has no typed mapping (carries the raw <code>
        eventName
      </code>
      
       / <code>
        object
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionWasCreatedFromWebhook
      </code>
      
       (in <code>
        Vatly\Fluent\Events\
      </code>
      
      )
    </td>
    
    <td>
      A new local <code>
        Subscription
      </code>
      
       row was just created from a <code>
        subscription.started
      </code>
      
       webhook (application-level event; carries the stored <code>
        $subscription
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OrderWasCreatedFromWebhook
      </code>
      
       (in <code>
        Vatly\Fluent\Events\
      </code>
      
      )
    </td>
    
    <td>
      The order analogue of <code>
        SubscriptionWasCreatedFromWebhook
      </code>
      
      : a new local <code>
        Order
      </code>
      
       row was just created from an <code>
        order.paid
      </code>
      
       webhook (fires once on a brand-new order; carries the stored <code>
        $order
      </code>
      
      ). A clean hook for receipts / fulfillment
    </td>
  </tr>
</tbody>
</table>

**Money fields.** On the order and refund events (`OrderPaid`, `OrderPaymentFailed`, `RefundCompleted` / `RefundFailed` / `RefundCanceled`), `total` and `subtotal` are non-null `Vatly\API\Types\Money` value objects (a decimal-string `value` plus a `currency`); read the currency via `$event->total->currency` and minor units via `$event->total->toCents()`. These events no longer carry a standalone `currency` field. The chargeback events (`OrderChargebackReceived` / `OrderChargebackReversed`) carry nullable `?Money` `total` / `subtotal` and **keep** their standalone `currency` field.

Exactly one of the webhook events above is dispatched per incoming webhook (`UnsupportedWebhookReceived` is the fallback for unmapped events). `SubscriptionWasCreatedFromWebhook` and `OrderWasCreatedFromWebhook` fire additionally, from the subscription- and order-sync reactions, only when a brand-new local row is created.

## Product moderation events

Vatly emits ten product events for the one-off-product and subscription-plan approval workflow (the "Manage Products" surface). Each is a typed event under `Vatly\API\Webhooks\Events\`, hydrated straight from the fat webhook payload — its `object` is the full `OneOffProduct` / `SubscriptionPlan` resource, carrying `pendingUpdates` (the proposed changes) and `updateStatus` (`pending` while an edit awaits approval, back to `null` once it's approved or rejected):

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      <code>
        eventName
      </code>
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        OneOffProductUpdateSubmitted
      </code>
    </td>
    
    <td>
      <code>
        one_off_product.update_submitted
      </code>
    </td>
    
    <td>
      An edit to a one-off product was submitted for approval — <code>
        pendingUpdates
      </code>
      
       holds the proposed values, <code>
        updateStatus: pending
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OneOffProductUpdateApproved
      </code>
    </td>
    
    <td>
      <code>
        one_off_product.update_approved
      </code>
    </td>
    
    <td>
      A submitted edit was approved and applied — <code>
        pendingUpdates: null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OneOffProductUpdateRejected
      </code>
    </td>
    
    <td>
      <code>
        one_off_product.update_rejected
      </code>
    </td>
    
    <td>
      A submitted edit was rejected — the product is unchanged, <code>
        pendingUpdates: null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OneOffProductArchived
      </code>
    </td>
    
    <td>
      <code>
        one_off_product.archived
      </code>
    </td>
    
    <td>
      A one-off product was archived (<code>
        archivedAt
      </code>
      
       set)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        OneOffProductUnarchived
      </code>
    </td>
    
    <td>
      <code>
        one_off_product.unarchived
      </code>
    </td>
    
    <td>
      A previously archived one-off product was restored
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionPlanUpdateSubmitted
      </code>
    </td>
    
    <td>
      <code>
        subscription_plan.update_submitted
      </code>
    </td>
    
    <td>
      An edit to a subscription plan was submitted for approval
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionPlanUpdateApproved
      </code>
    </td>
    
    <td>
      <code>
        subscription_plan.update_approved
      </code>
    </td>
    
    <td>
      A submitted plan edit was approved and applied
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionPlanUpdateRejected
      </code>
    </td>
    
    <td>
      <code>
        subscription_plan.update_rejected
      </code>
    </td>
    
    <td>
      A submitted plan edit was rejected
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionPlanArchived
      </code>
    </td>
    
    <td>
      <code>
        subscription_plan.archived
      </code>
    </td>
    
    <td>
      A subscription plan was archived
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionPlanUnarchived
      </code>
    </td>
    
    <td>
      <code>
        subscription_plan.unarchived
      </code>
    </td>
    
    <td>
      A previously archived subscription plan was restored
    </td>
  </tr>
</tbody>
</table>

These are product-management signals, not billing events: they carry no customer and there is no local row for the package to keep in sync, so **no built-in reaction touches them**. They are still fully received — signature-verified, recorded in `vatly_webhook_calls` (with `entity_type` `one_off_product` / `subscription_plan` and `vatly_customer_id` `null`), and dispatched onto the event bus — so you can drive your own cache-busting or product-mirroring off them.

Each one-off-product event exposes `$event->oneOffProductId`, `$event->testmode`, and the hydrated `$event->oneOffProduct` (a `Vatly\API\Resources\OneOffProduct`); each subscription-plan event exposes `$event->subscriptionPlanId`, `$event->testmode`, and `$event->subscriptionPlan` (a `Vatly\API\Resources\SubscriptionPlan`).

```php
use Illuminate\Support\Facades\Event;
use Vatly\API\Webhooks\Events\SubscriptionPlanUpdateApproved;

Event::listen(SubscriptionPlanUpdateApproved::class, function (SubscriptionPlanUpdateApproved $event) {
    // $event->subscriptionPlanId              // e.g. "subscription_plan_7Hd9Kf2Lm"
    // $event->subscriptionPlan->pendingUpdates // null once approved
    // Bust your local plan cache, re-pull your products, etc.
});
```

## Built-in reactions

Before the event is dispatched, the package keeps your local tables in sync automatically via fluent's standard webhook *reactions*. These are wired by `WebhookProcessorFactory` inside the `Vatly` composition root — no registration needed on your side. They live under `Vatly\Fluent\Webhooks\Reactions\`:

- **SyncSubscriptionOnStarted** -- On `SubscriptionStarted`, creates (or updates) the local `Subscription` row, then dispatches `SubscriptionWasCreatedFromWebhook` for newly-created rows.
- **CancelSubscriptionOnCanceled** -- On `SubscriptionCanceledImmediately` / `SubscriptionCanceledWithGracePeriod`, sets the local subscription's `ends_at`.
- **StoreOrderOnPaid** -- On `OrderPaid`, stores (or updates) the local `Order` row, then dispatches `OrderWasCreatedFromWebhook` for newly-created rows.
- **StoreOrderOnPaymentFailed** -- On `OrderPaymentFailed`, stores (or updates) the local `Order` row, mirroring the upstream order status verbatim.
- **EndSubscriptionOnGracePeriodCompleted** -- On `SubscriptionCancellationGracePeriodCompleted`, stamps the actual `ends_at` onto the local subscription. Usually an idempotent re-write of what `CancelSubscriptionOnCanceled` already stored, but it self-heals a missed/out-of-order `subscription.canceled_with_grace_period` webhook (which would otherwise leave `ends_at` null and the subscription looking active forever) and corrects any drift between the scheduled and actual end.

The checkout events (`CheckoutPaid` / `CheckoutFailed` / `CheckoutCanceled` / `CheckoutExpired`) ship no built-in reaction — they touch no local table. The checkout payloads carry the full Checkout resource (so they're dispatched without an enrichment GET), and there is no local checkout entity to keep in sync. Listen for them directly to drive receipt/retry/cart-abandonment UI or to flip your own application-level state. `SubscriptionCancellationGracePeriodCompleted` is likewise dispatched (on top of the reaction above) for consumers that want to flip their own application-level "fully ended" status.

## Custom listeners

Listen for the events in your `EventServiceProvider` or using the `Event` facade:

```php
use Illuminate\Support\Facades\Event;
use Vatly\API\Webhooks\Events\SubscriptionStarted;

Event::listen(SubscriptionStarted::class, function (SubscriptionStarted $event) {
    // $event->customerId
    // $event->subscriptionId
    // $event->planId
    // $event->type
    // $event->name
    // $event->quantity

    // Send welcome email, provision features, etc.
});
```

Order events (`OrderPaid` / `OrderPaymentFailed`) carry the full, API-enriched order — including the tax breakdown — so you can materialize an invoice without a follow-up API call:

```php
use Illuminate\Support\Facades\Event;
use Vatly\API\Webhooks\Events\OrderPaid;

Event::listen(OrderPaid::class, function (OrderPaid $event) {
    // $event->orderId
    // $event->customerId
    // $event->status
    // $event->total              // Vatly\API\Types\Money
    // $event->subtotal           // Vatly\API\Types\Money
    // $event->total->currency    // e.g. "EUR"
    // $event->total->value       // decimal string, e.g. "99.00"
    // $event->total->toCents()   // minor units (cents), e.g. 9900
    // $event->taxSummary
    // $event->invoiceNumber
    // $event->paymentMethod
    // $event->metadata
});
```

## Webhook call storage

Every webhook is recorded in the `vatly_webhook_calls` table with:

- `vatly_id` -- The webhook event ID (unique; use this as your dedup key)
- `resource` -- The wrapper resource type (always `webhook_event`)
- `event_name` -- The webhook event type (e.g., `subscription.started`)
- `entity_type` -- The resource type the event relates to (e.g., `subscription`)
- `entity_id` -- The Vatly resource ID the event relates to
- `testmode` -- Whether the event was raised against a testmode entity
- `vatly_created_at` -- When the webhook event was created at Vatly
- `vatly_customer_id` -- The associated customer ID, when present
- `object` -- The full resource payload at the time of the event (JSON)

## Pruning stored webhook calls

`vatly_webhook_calls` is an append-only record of every webhook received, so it grows over time. The package never prunes it for you — schedule the cleanup yourself.

The `Vatly` facade deletes rows older than the default retention window (7 days):

```php
use Vatly\Laravel\Facades\Vatly;

Vatly::cleanUp();   // delete webhook-call rows older than 7 days
```

For a different window, call the model directly — it returns the number of rows deleted:

```php
use Vatly\Laravel\Models\VatlyWebhookCall;

$deleted = VatlyWebhookCall::cleanUp(daysToRetain: 30);   // keep 30 days
```

Rows are pruned by their local `created_at` (when the row was stored), not `vatly_created_at`. The window isn't a config value — it's the `$daysToRetain` argument (default `VatlyWebhookCall::DEFAULT_DAYS_TO_RETAIN`, which is 7).

Run it on a schedule — for example in `routes/console.php`:

```php
use Illuminate\Support\Facades\Schedule;
use Vatly\Laravel\Facades\Vatly;

Schedule::call(fn () => Vatly::cleanUp())->daily();
```

The rows are an audit trail, not an idempotency guard, so pruning is safe. (`vatly_id` is unique if you'd rather build your own dedup on top — in that case keep a window comfortably longer than a webhook might be redelivered within.)
