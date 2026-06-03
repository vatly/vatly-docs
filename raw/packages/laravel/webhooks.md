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

When a webhook is received, the driver's `LaravelEventDispatcher` forwards the typed domain events straight onto Laravel's event bus, so you listen for the DTO classes directly. The webhook event DTOs live in `vatly-api-php` under the `Vatly\API\Webhooks\Events\` namespace (so a payload change is a single api-php release); the one exception is `LocalSubscriptionCreated`, an internal fluent signal under `Vatly\Fluent\Events\`:

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
        PaymentFailed
      </code>
    </td>
    
    <td>
      A <code>
        payment.failed
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
        LocalSubscriptionCreated
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
</tbody>
</table>

Exactly one of the webhook events above is dispatched per incoming webhook (`UnsupportedWebhookReceived` is the fallback for unmapped events). `LocalSubscriptionCreated` fires additionally, from the subscription-sync reaction, only when a brand-new local row is created.

## Built-in reactions

Before the event is dispatched, the package keeps your local tables in sync automatically via fluent's standard webhook *reactions*. These are wired by `WebhookProcessorFactory` inside the `Vatly` composition root — no registration needed on your side. They live under `Vatly\Fluent\Webhooks\Reactions\`:

- **SyncSubscriptionOnStarted** -- On `SubscriptionStarted`, creates (or updates) the local `Subscription` row, then dispatches `LocalSubscriptionCreated` for newly-created rows.
- **CancelSubscriptionOnCanceled** -- On `SubscriptionCanceledImmediately` / `SubscriptionCanceledWithGracePeriod`, sets the local subscription's `ends_at`.
- **StoreOrderOnPaid** -- On `OrderPaid`, stores (or updates) the local `Order` row.
- **StoreOrderOnPaymentFailed** -- On `PaymentFailed`, stores (or updates) the local `Order` row, mirroring the upstream order status verbatim.
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

Order events (`OrderPaid` / `PaymentFailed`) carry the full, API-enriched order — including the tax breakdown — so you can materialize an invoice without a follow-up API call:

```php
use Illuminate\Support\Facades\Event;
use Vatly\API\Webhooks\Events\OrderPaid;

Event::listen(OrderPaid::class, function (OrderPaid $event) {
    // $event->orderId
    // $event->customerId
    // $event->status
    // $event->total      // minor units (cents)
    // $event->subtotal   // minor units (cents)
    // $event->currency
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
