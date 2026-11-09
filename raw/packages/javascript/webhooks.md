# Webhooks

> Vatly JavaScript packages - Webhooks

Vatly sends webhooks to notify your application when events happen — an order being paid, a refund completing, a subscription being canceled. Every delivery is HMAC-signed; the SDK verifies the signature and hands you a typed event.

For event fields and endpoint options, see the [Webhook Events](https://docs.vatly.com/api-reference/webhook-events) and [Webhook Endpoints](https://docs.vatly.com/api-reference/webhook-endpoints) API references. The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.

## Webhook events

The `eventName` field identifies what happened. Names are available as constants
on [`WebhookEventName`](https://github.com/vatly/vatly-api-js/blob/main/src/webhooks/events.ts).

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      <code>
        object
      </code>
      
       type
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
      Order
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
      Order
    </td>
    
    <td>
      Order was canceled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.payment_failed
      </code>
    </td>
    
    <td>
      Order
    </td>
    
    <td>
      A payment failed and dunning started.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.chargeback_received
      </code>
    </td>
    
    <td>
      Chargeback
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
      Chargeback
    </td>
    
    <td>
      A chargeback was reversed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.completed
      </code>
    </td>
    
    <td>
      Refund
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
      Refund
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
      Refund
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
      Subscription
    </td>
    
    <td>
      Subscription was started.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.billing_updated
      </code>
    </td>
    
    <td>
      Subscription
    </td>
    
    <td>
      Billing details (e.g. the mandate) changed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_immediately
      </code>
    </td>
    
    <td>
      Subscription
    </td>
    
    <td>
      Canceled immediately.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_with_grace_period
      </code>
    </td>
    
    <td>
      Subscription
    </td>
    
    <td>
      Canceled; access until period end.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.cancellation_grace_period_completed
      </code>
    </td>
    
    <td>
      Subscription
    </td>
    
    <td>
      Grace period ended.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.resumed
      </code>
    </td>
    
    <td>
      Subscription
    </td>
    
    <td>
      A canceled subscription was resumed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_for_nonpayment
      </code>
    </td>
    
    <td>
      Subscription
    </td>
    
    <td>
      Payment recovery exhausted.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.updated
      </code>
    </td>
    
    <td>
      Subscription
    </td>
    
    <td>
      Immediate/scheduled change or renewal; inspect <code>
        reason
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.update_scheduled
      </code>
    </td>
    
    <td>
      Subscription
    </td>
    
    <td>
      Change scheduled; inspect <code>
        scheduledUpdate
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        one_off_product.update_submitted
      </code>
      
       / <code>
        update_approved
      </code>
      
       / <code>
        update_rejected
      </code>
    </td>
    
    <td>
      OneOffProduct
    </td>
    
    <td>
      Product change review lifecycle (each suffix uses the same prefix).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        one_off_product.archived
      </code>
      
       / <code>
        unarchived
      </code>
    </td>
    
    <td>
      OneOffProduct
    </td>
    
    <td>
      Product availability changed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription_plan.update_submitted
      </code>
      
       / <code>
        update_approved
      </code>
      
       / <code>
        update_rejected
      </code>
    </td>
    
    <td>
      SubscriptionPlan
    </td>
    
    <td>
      Plan change review lifecycle.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription_plan.archived
      </code>
      
       / <code>
        unarchived
      </code>
    </td>
    
    <td>
      SubscriptionPlan
    </td>
    
    <td>
      Plan availability changed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.paid
      </code>
    </td>
    
    <td>
      Checkout
    </td>
    
    <td>
      Checkout was paid.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.failed
      </code>
    </td>
    
    <td>
      Checkout
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
      Checkout
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
      Checkout
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
      Webhook
    </td>
    
    <td>
      Verification call sent when an endpoint is registered or its URL changes.
    </td>
  </tr>
</tbody>
</table>

## Verify and process in one step

`constructWebhookEventFromRequest` reads the raw body and `Vatly-Signature`
header off a Fetch `Request`, verifies the HMAC, and returns a **discriminated**
event. Check `event.known` first, then switch on `event.eventName` to narrow `event.object` to the exact
resource — no casts, no follow-up API call (Vatly sends fat, signed payloads, so
`object` is the full `GET /…/{id}` snapshot).

```ts
import { constructWebhookEventFromRequest } from "@getvatly/sdk/webhooks";

export async function POST(request: Request): Promise<Response> {
  let event;
  try {
    event = await constructWebhookEventFromRequest(request, process.env.VATLY_WEBHOOK_SECRET!);
  } catch {
    return new Response("invalid signature", { status: 400 });
  }

  if (!event.known) {
    // Retain the verified envelope durably for triage, then acknowledge it.
    // Until retention succeeds, retry rather than silently losing the delivery.
    return new Response("unsupported event requires triage", { status: 503 });
  }
  switch (event.eventName) {
    case "order.paid":
      event.object.total; // Money — typed as Order
      break;
    case "subscription.billing_updated":
      event.object.mandate; // typed as Subscription
      break;
    case "webhook.setup":
      return new Response("ok"); // verification handshake — just acknowledge
  }
  return new Response("ok");
}
```

If you already have the raw bytes (e.g. a non-Fetch framework), use
`constructWebhookEvent(rawBody, signatureHeader, secret)`. To verify only and
get the raw `WebhookDelivery` envelope, use `constructEvent` /
`constructEventFromRequest`, then narrow later with `toWebhookEvent(delivery)`.

`VatlyWebhookEvent` includes `KnownWebhookEvent` (`known: true`) and
`UnsupportedWebhookEvent` (`known: false`, `eventName: string`, `object: unknown`).
The SDK adds this discriminator to a shallow copy after verification, overwriting
any wire-supplied flag. It classifies the event name, not the resource schema.
Both sides of `if (event.known)` narrow normally; no custom type guards are needed.
Unknown event names can appear before an SDK upgrade. Keep them for triage and
decide acknowledgement policy explicitly; a successful HMAC is not a reason to
discard an event you cannot yet process.

> **Always verify against the raw body bytes.** Re-serializing the JSON changes
> the bytes (whitespace, key order, number formatting) and breaks the HMAC.

## The `webhook.setup` event

When you register a webhook endpoint (or change its URL), Vatly sends a signed
`webhook.setup` call to confirm the endpoint is reachable. It's delivered as a
normal webhook — same envelope, same signature, same `Vatly-Event-Id` header —
so there's nothing special to parse: verify it and return a `2xx`. Its `object`
is the (secret-free) [webhook endpoint](https://docs.vatly.com/api-reference/webhook-endpoints)
config and `links` is omitted (it's not a persisted event).

## Signature scheme

```text
Vatly-Signature: t=1700000000,v1=<hex_hmac_sha256>
Vatly-Event-Id:  webhook_event_Qk8pRtSvWm2NjLhYcZaE
```

- `t` is unix seconds, captured fresh on each delivery attempt.
- `v1` is `HMAC-SHA256("{t}.{rawBody}", webhookSecret)`, lowercase hex.
- The SDK rejects signatures where `|now − t| > 300` seconds by default
(5-minute clock-skew tolerance). Tune it with `{ toleranceSeconds }`.
- Future algorithm rotation ships `v1=…,v2=…` simultaneously; the SDK verifies
any version it recognizes and ignores the rest.

## Deduplication is your job

The SDK is stateless — it can't remember which events it has verified. The
clock-skew check bounds how long a leaked signature is replayable, but does not
stop replays inside that window. For full replay defense, dedupe on the
retry-stable, signed `event.id` in your own store after verification. The
`Vatly-Event-Id` header is not signed and is for correlation only:

```ts
const event = await constructWebhookEventFromRequest(request, secret);
const eventId = event.id;
if (await store.has(eventId)) return new Response("ok"); // already processed
```

Record successful processing and deduplication atomically; do not mark an event
complete before its business effects succeed. Concurrent deliveries need a
unique constraint or equivalent transactional claim in your store.

## Manage webhook endpoints

```ts
const endpoint = await vatly.webhookEndpoints.create({
  url: "https://yourapp.com/api/webhooks/vatly",
  secret: process.env.VATLY_WEBHOOK_SECRET!,
  enabledEvents: ["order.paid", "subscription.updated"],
});
await vatly.webhookEndpoints.update(endpoint.id, { enabledEvents: [] }); // dormant
const page = await vatly.webhookEndpoints.list();
await vatly.webhookEndpoints.delete(endpoint.id); // 204
```

Secrets are write-only: store the one you supplied. HTTPS URLs must be unique
within the storefront/mode, with up to five endpoints per mode. New event names
are not automatically subscribed; update `enabledEvents` explicitly.

## Rotating secrets

Every verification helper accepts a single secret or an array. During a
rotation, pass both — the SDK accepts whichever signed the delivery:

```ts
const event = await constructWebhookEventFromRequest(request, [
  process.env.VATLY_WEBHOOK_SECRET_OLD!,
  process.env.VATLY_WEBHOOK_SECRET_NEW!,
]);
```

## Fetching a persisted event

Persisted events are available via the API. Note these are returned as the
`WebhookEvent` shape (`GET /webhook-events/{id}`), which — unlike an inbound
delivery — never includes the `webhook.setup` call and always carries `links`:

```ts
const event = await vatly.webhookEvents.get("webhook_event_abc123");
```
