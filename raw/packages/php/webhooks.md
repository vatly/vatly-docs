# Webhooks

> Vatly PHP SDK - Webhooks

Vatly sends webhooks to notify your application when events happen — for example, an order being paid, a refund completing, or a subscription being canceled.

## Webhook events

The `eventName` field on a delivery identifies what happened. See [`Vatly\API\Types\WebhookEventName`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Types/WebhookEventName.php) for the constants.

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        order.paid
      </code>
    </td>
    
    <td>
      Order payment was successful.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.canceled
      </code>
    </td>
    
    <td>
      Order was canceled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.chargeback_received
      </code>
    </td>
    
    <td>
      Chargeback was received for an order.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.chargeback_reversed
      </code>
    </td>
    
    <td>
      Chargeback was reversed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.payment_failed
      </code>
    </td>
    
    <td>
      A payment failed and a dunning process was initiated for the order.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.completed
      </code>
    </td>
    
    <td>
      Refund was processed successfully.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.failed
      </code>
    </td>
    
    <td>
      Refund processing failed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.canceled
      </code>
    </td>
    
    <td>
      Refund was canceled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.started
      </code>
    </td>
    
    <td>
      Subscription was started.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_immediately
      </code>
    </td>
    
    <td>
      Subscription was canceled immediately.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_with_grace_period
      </code>
    </td>
    
    <td>
      Subscription was canceled, customer keeps access until the period ends.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.cancellation_grace_period_completed
      </code>
    </td>
    
    <td>
      Grace period after cancellation ended.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.resumed
      </code>
    </td>
    
    <td>
      A canceled subscription was resumed during its grace period.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.paid
      </code>
    </td>
    
    <td>
      Checkout was paid successfully.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.failed
      </code>
    </td>
    
    <td>
      Checkout payment failed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.canceled
      </code>
    </td>
    
    <td>
      Checkout was canceled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.expired
      </code>
    </td>
    
    <td>
      Checkout session expired.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhook.setup
      </code>
    </td>
    
    <td>
      Verification call sent when an endpoint is registered or its URL is updated. <code>
        entityType
      </code>
      
       is <code>
        webhook
      </code>
      
      ; <code>
        object
      </code>
      
       is the (secret-free) endpoint config.
    </td>
  </tr>
</tbody>
</table>

### The `webhook.setup` event

When you register a webhook endpoint (or change its URL), Vatly sends a signed
`webhook.setup` event to confirm the endpoint is reachable. It is delivered as a normal
webhook — same envelope, same signature, same `Vatly-Event-Id` header — so there is
**nothing special to parse**: `Webhook::parse()` returns an ordinary `WebhookPayload`.
Just acknowledge it with a `2xx` and take no action.

For strongly-typed handling, this package ships a
[`WebhookSetupReceived`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Webhooks/Events/WebhookSetupReceived.php) event DTO
(`Vatly\API\Webhooks\Events\WebhookSetupReceived`) that carries the webhook envelope
(`id`, `resource`, `eventName`, `entityType`, `entityId`, `testmode`, `createdAt`,
`object`). Build it from a `WebhookReceived` via `WebhookSetupReceived::fromWebhook()`;
`object` is the (secret-free) endpoint config and may be empty.

---

## The WebhookEvent resource

Every delivery carries a [`WebhookEvent`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Resources/WebhookEvent.php) JSON object in the request body. This is the same shape returned by `GET /v1/webhook-events/:id`.

### Properties

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        id
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Unique identifier for the webhook event (<code>
        webhook_event_...
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resource
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Always <code>
        webhook_event
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        eventName
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      One of the events listed above (e.g. <code>
        order.paid
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        entityType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Type of the related resource (e.g. <code>
        order
      </code>
      
      , <code>
        refund
      </code>
      
      , <code>
        subscription
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        entityId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      ID of the related resource (e.g. <code>
        order_Hn5xWqVfKm8RjTgYbUcP
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      <code>
        object|null
      </code>
    </td>
    
    <td>
      The full resource payload at the time of the event. Shape depends on <code>
        entityType
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        createdAt
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      When the event occurred (ISO 8601).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testmode
      </code>
    </td>
    
    <td>
      <code>
        bool
      </code>
    </td>
    
    <td>
      Whether this event was generated in test mode.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        links
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      HATEOAS links — <code>
        links.self.href
      </code>
      
       points to this webhook event.
    </td>
  </tr>
</tbody>
</table>

### Example payload

```json
{
    "id": "webhook_event_Qk8pRtSvWm2NjLhYcZaE",
    "resource": "webhook_event",
    "eventName": "order.paid",
    "entityType": "order",
    "entityId": "order_Hn5xWqVfKm8RjTgYbUcP",
    "object": {
        "id": "order_Hn5xWqVfKm8RjTgYbUcP",
        "resource": "order",
        "status": "paid",
        "total": { "value": "29.99", "currency": "EUR" }
    },
    "createdAt": "2026-01-11T10:50:50+02:00",
    "testmode": true,
    "links": {
        "self": {
            "href": "https://api.vatly.com/v1/webhook-events/webhook_event_Qk8pRtSvWm2NjLhYcZaE",
            "type": "application/json"
        }
    }
}
```

---

## Delivery headers

Each webhook request includes two Vatly-specific headers.

<table>
<thead>
  <tr>
    <th>
      Header
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        Vatly-Signature
      </code>
    </td>
    
    <td>
      Structured signature value: <code>
        t=<unix_seconds>,v1=<hex_hmac_sha256>
      </code>
      
      . Verify this before trusting the payload.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Vatly-Event-Id
      </code>
    </td>
    
    <td>
      The <code>
        id
      </code>
      
       of the underlying webhook event. Stable across retry attempts — use it as your idempotency / dedup key.
    </td>
  </tr>
</tbody>
</table>

The signature scheme prefix (`v1=`) leaves room for future algorithm versions; receivers that verify against `v1` will keep working if additional versions appear alongside it.

---

## Handling webhooks

The SDK ships [`Webhook::parse()`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Webhooks/Webhook.php) — a one-shot helper that verifies the signature, decodes the JSON, and returns a typed [`WebhookPayload`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Webhooks/WebhookPayload.php) ready to dispatch on.

Verification is performed against the **raw request body bytes**. JSON that is parsed and re-encoded will not match the signature — read the body directly (e.g. `file_get_contents('php://input')`) before any framework deserialises it.

```php
use Vatly\API\Exceptions\InvalidSignatureException;
use Vatly\API\Webhooks\Webhook;

$payload   = file_get_contents('php://input');
$signature = $_SERVER['HTTP_VATLY_SIGNATURE'] ?? '';
$secret    = getenv('VATLY_WEBHOOK_SECRET');

try {
    $event = Webhook::parse($payload, $signature, $secret);
} catch (InvalidSignatureException $e) {
    http_response_code(401);
    exit('Invalid signature');
}

// Dedupe with Vatly-Event-Id (stable across retry attempts).
$eventId = $_SERVER['HTTP_VATLY_EVENT_ID'] ?? $event->id;
if (alreadyProcessed($eventId)) {
    http_response_code(200);
    exit;
}

match ($event->eventName) {
    'order.paid'         => handleOrderPaid($event),
    'refund.completed'   => handleRefundCompleted($event),
    'checkout.expired'   => handleCheckoutExpired($event),
    default              => null,
};

markProcessed($eventId);
http_response_code(200);
```

`Webhook::parse()` throws `Vatly\API\Exceptions\InvalidSignatureException` when the signature header is malformed, the timestamp is outside the tolerance window, or the HMAC does not match. It throws `InvalidArgumentException` when the body is not valid JSON or is missing required fields.

### Typed event DTOs

`Webhook::parse()` returns the raw, generic [`WebhookPayload`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Webhooks/WebhookPayload.php). For consumers that prefer a strongly-typed, per-event object, this package also owns immutable event DTOs under [`Vatly\API\Webhooks\Events`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Webhooks/Events). Each DTO:

- exposes a `VATLY_EVENT_NAME` constant (a [`WebhookEventName`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Types/WebhookEventName.php) value) for matching;
- carries `from*()` factory methods — `fromApiOrder()`, `fromApiRefund()`, `fromApiChargeback()`, `fromApiSubscription()` to build from an enriched API resource, and/or `fromWebhook(WebhookReceived $webhook)` to build from the raw payload;
- carries money as [`Money`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Types/Money.php) values (decimal-string + currency) and the per-rate VAT breakdown as a [`TaxSummaryCollection`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Types/TaxSummaryCollection.php). Flatten to integer cents at your persistence edge via [`Money::toCents()`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Types/Money.php).

```php
use Vatly\API\Resources\Order;
use Vatly\API\Webhooks\Events\OrderPaid;

// $order is a fully-hydrated API Order resource (e.g. from $vatly->orders->get(...))
$event = OrderPaid::fromApiOrder($order);

$event->total;             // Vatly\API\Types\Money
$event->total->value;      // decimal string, e.g. "49.99"
$event->total->currency;   // e.g. "USD"
$event->total->toCents();  // int cents, e.g. 4999
$event->taxSummary;        // Vatly\API\Types\TaxSummaryCollection
$event->lines;             // Vatly\API\Types\OrderLineData[]
```

These DTOs are the canonical, framework-agnostic event shapes that higher-level integrations (e.g. `vatly-fluent-php`) build on. The line-item DTO lives at [`Vatly\API\Types\OrderLineData`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Types/OrderLineData.php); its `basePrice`/`total`/`subtotal` are `Money` too.

The full set of incoming webhook payloads is also described in the [webhooks OpenAPI spec](/openapi.yaml) under the top-level `webhooks:` section — one entry per `WebhookEventName`, each referencing the `WebhookDelivery` envelope.

### Replay-window tolerance

The signed timestamp (`t=...`) lets receivers reject stale deliveries. By default signatures more than **300 seconds** old are rejected. If you need a custom window — for example when replaying captured fixtures in a test suite — instantiate [`WebhookSignatureValidator`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Webhooks/WebhookSignatureValidator.php) directly:

```php
use Vatly\API\Webhooks\WebhookSignatureValidator;

$validator = new WebhookSignatureValidator($secret, toleranceSeconds: 60);
$validator->verify($payload, $signature);
```

Keep the default in production. A tighter window makes a leaked signature less useful; a much wider window weakens the replay-defense guarantee.

### Lower-level access

If you only need signature verification (e.g. handling the decoded body yourself, or operating on a non-standard payload shape), use [`WebhookSignatureValidator`](https://github.com/Vatly/vatly-api-php/blob/main/src/API/Webhooks/WebhookSignatureValidator.php) directly. It exposes `verify()`, `isValid()`, and `calculateSignature()`, plus header-name constants:

```php
WebhookSignatureValidator::SIGNATURE_HEADER_NAME; // 'Vatly-Signature'
WebhookSignatureValidator::EVENT_ID_HEADER_NAME;  // 'Vatly-Event-Id'
```

---

## Best practices

1. **Always verify signatures** before processing webhook payloads.
2. **Verify against the raw body**, not parsed-and-reserialised JSON.
3. **Dedupe with Vatly-Event-Id** — retries reuse the same event id, while the signature deliberately rotates per attempt.
4. **Return 200 quickly** to avoid timeout retries. Offload long-running work to a queue.
5. **Log webhook events** for debugging and auditing.
