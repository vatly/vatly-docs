# Webhooks

> In this guide, we will look at how to register and consume webhooks to integrate your app with Vatly.

## Registering webhooks

To register a new webhook, you need to have a URL in your app that Vatly can call. You can configure a new webhook from the Vatly dashboard under [API settings](#). Give your webhook a name, pick the [events](#event-types) you want to listen for, and add your URL.

Now, whenever something of interest happens in your app, a webhook is fired off by Vatly. In the next section, we'll look at how to consume webhooks.

<note>

For security reasons, your webhook URL needs to be HTTPS with a valid certificate and reachable from Vatly.

</note>

## Consuming webhooks

Each delivery is an HTTP `POST` whose body is a `webhook_event` object — the same shape returned by the [Get webhook event](/api-reference/webhook-events) endpoint. Check `eventName` to see what happened, and use `entityType` / `entityId` (or the embedded `object` snapshot) to act on the affected resource.

```json [Example delivery body]
{
  "id": "webhook_event_Qk8pRtSvWm2NjLhYcZaE",
  "resource": "webhook_event",
  "eventName": "order.paid",
  "entityType": "order",
  "entityId": "order_Hn5xWqVfKm8RjTgYbUcP",
  "testmode": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "object": {
    "id": "order_Hn5xWqVfKm8RjTgYbUcP",
    "resource": "order",
    "testmode": false,
    "status": "paid",
    "total": { "value": "29.99", "currency": "EUR" },
    "subtotal": { "value": "24.79", "currency": "EUR" }
  },
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/webhook-events/webhook_event_Qk8pRtSvWm2NjLhYcZaE",
      "type": "application/json"
    }
  }
}
```

Every request also carries two headers you should use:

<table>
<thead>
  <tr>
    <th>
      Header
    </th>
    
    <th>
      Purpose
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
      Lets you verify the delivery really came from Vatly. See <a href="#verifying-signatures">
        Verifying signatures
      </a>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Vatly-Event-Id
      </code>
    </td>
    
    <td>
      The event's ID (also in the body as <code>
        id
      </code>
      
      ). It is <strong>
        stable across retries
      </strong>
      
      , so use it as the key to deduplicate deliveries.
    </td>
  </tr>
</tbody>
</table>

<note>

Respond with a `2xx` status as soon as you've stored the event. Vatly retries deliveries that don't return `2xx`, and the same event may arrive more than once — deduplicate on `Vatly-Event-Id` and do any heavy work asynchronously.

</note>

## Event types

The `eventName` field identifies what happened. The available events are:

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
        checkout.paid
      </code>
    </td>
    
    <td>
      A checkout was paid successfully.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.failed
      </code>
    </td>
    
    <td>
      A checkout payment failed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.canceled
      </code>
    </td>
    
    <td>
      A checkout was canceled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.expired
      </code>
    </td>
    
    <td>
      A checkout session expired.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.paid
      </code>
    </td>
    
    <td>
      An order payment was successful.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.canceled
      </code>
    </td>
    
    <td>
      An order was canceled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.chargeback_received
      </code>
    </td>
    
    <td>
      A chargeback was received for an order.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.chargeback_reversed
      </code>
    </td>
    
    <td>
      A chargeback was reversed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        payment.failed
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
      A refund was processed successfully.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.failed
      </code>
    </td>
    
    <td>
      A refund failed to process.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.canceled
      </code>
    </td>
    
    <td>
      A refund was canceled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.started
      </code>
    </td>
    
    <td>
      A subscription was started.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_immediately
      </code>
    </td>
    
    <td>
      A subscription was canceled immediately.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_with_grace_period
      </code>
    </td>
    
    <td>
      A subscription was canceled; the customer keeps access until the period ends.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.cancellation_grace_period_completed
      </code>
    </td>
    
    <td>
      The grace period after a cancellation ended.
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
        subscription.billing_updated
      </code>
    </td>
    
    <td>
      A subscription's billing details changed — in practice the mandate (payment method on file), e.g. a refreshed masked payment-method identifier.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhook.setup
      </code>
    </td>
    
    <td>
      A verification call Vatly sends when you register a webhook endpoint or change its URL. See the note below.
    </td>
  </tr>
</tbody>
</table>

<note>

**object is the affected resource, keyed by its own resource field** (`order`, `chargeback`, `refund`, `subscription`, `checkout`, or `webhook`). For chargeback events this differs from `entityType`: `order.chargeback_received` / `order.chargeback_reversed` carry `entityType: order` (the order the chargeback belongs to) but the `object` is a Chargeback.

</note>

<note>

**webhook.setup** is delivered when you register an endpoint (or change its URL) to confirm it's reachable. It arrives as a normal, signed delivery (`entityType: webhook`, `object` is the secret-free endpoint config), so there's nothing special to parse — just acknowledge it with a `2xx`. Unlike event deliveries, the setup call is a one-shot verification check: a non-`2xx` response fails endpoint registration and is **not** retried. It is also the one event that is never persisted, so it does not appear on the [Get webhook event](/api-reference/webhook-events) endpoint.

</note>

### Example: `subscription.started`

```json [subscription.started]
{
  "id": "webhook_event_b167W0AChY7Z0Amr",
  "resource": "webhook_event",
  "eventName": "subscription.started",
  "entityType": "subscription",
  "entityId": "subscription_QdEpFhdSrG4Y3DnfsdqsH",
  "testmode": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "object": {
    "id": "subscription_QdEpFhdSrG4Y3DnfsdqsH",
    "resource": "subscription",
    "customerId": "customer_Bm7xNvPwKr3YjTgHcZaE",
    "subscriptionPlanId": "subscription_plan_Rk5pQrSvWm8NjLhYbUcP",
    "testmode": false,
    "name": "Premium Plan",
    "status": "active",
    "basePrice": { "value": "99.99", "currency": "EUR" },
    "quantity": 1,
    "interval": "month",
    "intervalCount": 1,
    "startedAt": "2024-01-15T10:30:00Z",
    "nextRenewalAt": "2024-02-15T10:30:00Z",
    "links": {
      "self": {
        "href": "https://api.vatly.com/v1/subscriptions/subscription_QdEpFhdSrG4Y3DnfsdqsH",
        "type": "application/json"
      },
      "customer": {
        "href": "https://api.vatly.com/v1/customers/customer_Bm7xNvPwKr3YjTgHcZaE",
        "type": "application/json"
      }
    }
  },
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/webhook-events/webhook_event_b167W0AChY7Z0Amr",
      "type": "application/json"
    }
  }
}
```

## Inspecting webhooks

To make integrating Vatly as smooth as possible, you can inspect a detailed webhook history in your Vatly dashboard.

If you store the event ID from a webhook delivery, you can also retrieve the full stored event later via the API:

- [Get webhook event](/api-reference/webhook-events)

That endpoint returns the event metadata plus the exact resource snapshot that was delivered at the time.

## Testing webhook flows

For recurring billing flows, Vatly also exposes test helpers so you can trigger webhook-producing scenarios in test mode:

- [Fast-forward subscription renewal](/api-reference/test-helpers)
- [Simulate a mandated payment failure](/api-reference/test-helpers)

This is useful when you want to verify renewals, failure handling, retries, and dunning behavior without waiting for real billing dates.

---

## Verifying signatures

To know for sure that a webhook was sent by Vatly and not a malicious actor, verify the signature on every delivery. Vatly signs each request with the `Vatly-Signature` header, which has the structured form:

```text
Vatly-Signature: t=<unix_seconds>,v1=<hex_hmac_sha256>
```

- `t` is the Unix timestamp (in seconds) when the signature was generated.
- `v1` is `HMAC-SHA256("{t}.{rawBody}", yourWebhookSecret)`, hex-encoded — the timestamp and a literal `.` prepended to the **exact raw request body**.

To verify a delivery:

1. Parse `t` and `v1` out of the header.
2. Reject the request if `t` is more than **300 seconds** (5 minutes) from your server's current time — this guards against replay.
3. Recompute the HMAC over `"{t}.{rawBody}"` using your webhook secret and the **raw request body bytes** (not a re-serialized copy — re-encoding JSON changes the bytes and breaks the signature).
4. Compare your value against `v1` using a constant-time comparison.

<note>

Future signature schemes will ship alongside `v1` (e.g. `t=…,v1=…,v2=…`). Match on the `v1=` key specifically rather than assuming the order or the only scheme present, so your code keeps working when new versions are added.

</note>

<tip>

If you use a Vatly SDK, signature verification is built in — for example PHP's `Vatly\API\Webhooks\Webhook::parse($rawBody, $signatureHeader, $secret)` or the Node SDK's `constructEvent()`. They parse the header, enforce the tolerance window, and verify the HMAC for you, throwing on failure.

</tip>

To verify it yourself:

<code-group sync="api">

```js [JavaScript]
import crypto from 'node:crypto'

// `rawBody` must be the exact bytes Vatly sent (e.g. express.raw()), not a parsed object.
function verifyVatlySignature(rawBody, header, secret, toleranceSeconds = 300) {
  const parts = Object.fromEntries(header.split(',').map((kv) => kv.split('=')))
  const timestamp = Number(parts.t)
  const signature = parts.v1
  if (!timestamp || !signature) throw new Error('Malformed Vatly-Signature header')

  // Replay protection
  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > toleranceSeconds) {
    throw new Error('Signature timestamp outside tolerance window')
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex')

  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
    throw new Error('Invalid Vatly signature')
  }
}
```

```python [Python]
import hashlib
import hmac
import time

def verify_vatly_signature(raw_body: str, header: str, secret: str, tolerance_seconds: int = 300) -> None:
    parts = dict(part.split("=", 1) for part in header.split(","))
    timestamp, signature = parts.get("t"), parts.get("v1")
    if not timestamp or not signature:
        raise ValueError("Malformed Vatly-Signature header")

    # Replay protection
    if abs(int(time.time()) - int(timestamp)) > tolerance_seconds:
        raise ValueError("Signature timestamp outside tolerance window")

    message = f"{timestamp}.{raw_body}".encode()
    expected = hmac.new(secret.encode(), message, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(expected, signature):
        raise ValueError("Invalid Vatly signature")
```

```php [PHP]
$payload = file_get_contents('php://input');
$header = $_SERVER['HTTP_VATLY_SIGNATURE'] ?? '';
$toleranceSeconds = 300;

$parts = [];
foreach (explode(',', $header) as $part) {
    [$key, $value] = array_pad(explode('=', $part, 2), 2, null);
    $parts[trim((string) $key)] = trim((string) $value);
}
$timestamp = $parts['t'] ?? null;
$signature = $parts['v1'] ?? null;

if (! $timestamp || ! $signature || abs(time() - (int) $timestamp) > $toleranceSeconds) {
    http_response_code(400);
    exit('Invalid signature');
}

$expected = hash_hmac('sha256', $timestamp . '.' . $payload, $secret);

if (hash_equals($expected, $signature)) {
    // Request is verified
} else {
    http_response_code(400);
    exit('Invalid signature');
}
```

</code-group>

Keep your webhook secret safe and never commit it to source control. If it leaks, you can no longer trust that a given webhook was sent by Vatly.
