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

When a webhook is received, the driver's `LaravelEventDispatcher` forwards fluent's typed domain events straight onto Laravel's event bus, so you listen for the fluent classes directly. They all live under the `Vatly\Fluent\Events\` namespace:

<table>
<thead>
  <tr>
    <th>
      Event (<code>
        Vatly\Fluent\Events\…
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

The checkout events (`CheckoutPaid` / `CheckoutFailed` / `CheckoutCanceled` / `CheckoutExpired`) and `SubscriptionCancellationGracePeriodCompleted` ship no built-in reaction — they touch no local table. The checkout payloads carry the full Checkout resource (so they're dispatched without an enrichment GET), and the grace-period-completed transition needs no write because the cancellation that scheduled the grace period already stamped `ends_at` onto the local subscription. Listen for them directly to drive receipt/retry/cart-abandonment UI or to flip your own application-level state.

## Custom listeners

Listen for the fluent events in your `EventServiceProvider` or using the `Event` facade:

```php
use Illuminate\Support\Facades\Event;
use Vatly\Fluent\Events\SubscriptionStarted;

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
use Vatly\Fluent\Events\OrderPaid;

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
