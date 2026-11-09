# Webhooks

> Vatly JavaScript packages - Webhooks

Use webhooks to record payments and subscription changes. A checkout success
redirect is not payment confirmation. Vatly signs the delivery's original bytes;
Fluent verifies them before calling any storage driver or reaction.

## Receive a delivery

Pass in configured [storage drivers](/packages/fluent-js/coreconcepts). This Fetch-compatible
handler also fits a Next.js Route Handler's `POST` function.

```ts
import { VatlyInvalidSignatureError } from '@getvatly/sdk';
import { Vatly } from '@getvatly/fluent';

export function webhookRoute(vatly: Vatly) {
  return async function POST(request: Request): Promise<Response> {
    try {
      const processed = await vatly.webhookProcessor().handleRequest(request);
      return new Response(null, { status: processed ? 201 : 200 });
    } catch (error) {
      if (error instanceof VatlyInvalidSignatureError) {
        return new Response('Invalid signature', { status: 400 });
      }
      // Failed storage/reactions must be retried; do not acknowledge success.
      return new Response('Webhook processing failed', { status: 500 });
    }
  };
}
```

Set `webhookSecret` to the endpoint's signing secret, `webhookCalls` to your
transactional implementation, and the repositories you want updated. Keep this
route exempt from browser-session authentication while retaining signature checks.
Do not JSON-parse and reserialize the request first. If your framework provides
raw bytes instead, call `processor.handle(rawBody, signatureHeader)`.

The SDK checks `Vatly-Signature` HMAC and timestamp. For rotation, pass an array
of accepted secrets through `webhookSecret`. Keep a bounded verification tolerance;
disabling timestamp checks is not a replay-prevention strategy.

## Idempotency and one transaction

Implement `WebhookCalls.process(event, work)` with these steps in **one database
transaction shared by every wired driver**:

1. Serialize concurrent processing of the signed `event.id`, using a unique key
or lock. If that ID was already committed, return false without running work.
2. Retain the verified envelope, including unknown events, for audit and triage.
3. Await `work()`: it applies built-in reactions, additional reactions, and dispatch.
4. Mark the ID processed and commit resource changes, bindings, audit, and outbox
records together. Return true. Roll back everything if any step fails.

Do not commit a deduplication row before the work: a later failure would cause all
retries to be discarded. Use the **signed** `event.id`, not the unsigned
`Vatly-Event-Id` correlation header. A timestamp check alone does not deduplicate.
Scope keys and rows by tenant/storefront and mode.

Implement `events.dispatch` as durable outbox writes in that transaction. Send
email, provision external services, or make other network calls from a worker
after commit, not from inside a webhook reaction. Delivery order is not guaranteed;
reconcile conflicting or out-of-order snapshots with the API.

## What Fluent persists

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Built-in action when the repository is wired
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        subscription.started
      </code>
    </td>
    
    <td>
      Create or update a local subscription; a new saved row emits <code>
        local.subscription_created
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.updated
      </code>
      
      , <code>
        subscription.billing_updated
      </code>
    </td>
    
    <td>
      Update plan, name, quantity, status, and non-null mandate on an existing row; otherwise skip.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.resumed
      </code>
    </td>
    
    <td>
      Update an existing row and clear <code>
        endsAt
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      Cancellation events and grace-period completion
    </td>
    
    <td>
      Update an existing row's <code>
        endsAt
      </code>
      
       and cancellation reason.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.paid
      </code>
      
      , <code>
        order.payment_failed
      </code>
    </td>
    
    <td>
      Create or update an order using the signed status; a newly stored paid order emits <code>
        local.order_created
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.canceled
      </code>
    </td>
    
    <td>
      Update status and cancellation reason on an existing order; otherwise skip.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.completed
      </code>
      
      , <code>
        refund.failed
      </code>
      
      , <code>
        refund.canceled
      </code>
    </td>
    
    <td>
      Upsert a refund if <code>
        refunds
      </code>
      
       is wired.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.chargeback_received
      </code>
      
      , <code>
        order.chargeback_reversed
      </code>
    </td>
    
    <td>
      Upsert a chargeback if <code>
        chargebacks
      </code>
      
       is wired.
    </td>
  </tr>
  
  <tr>
    <td>
      Scheduled subscription updates, catalogue, checkout, <code>
        webhook.setup
      </code>
    </td>
    
    <td>
      Dispatch only; no built-in resource write.
    </td>
  </tr>
</tbody>
</table>

No follow-up API GET is required for these reactions: the signed resource snapshot
supplies the data. A missing optional repository skips that write, not dispatch.
Null billing-event mandates do not clear an existing local mandate; explicit
subscription `sync()` reconciles an actual removal.

## Application events and extensions

```ts
import type { DomainEvent, EventDispatcher } from '@getvatly/fluent';

export function billingEvents(
  enqueueInCurrentTransaction: (event: DomainEvent) => Promise<void>,
): EventDispatcher {
  return { dispatch: event => enqueueInCurrentTransaction(event) };
}
```

The event union includes SDK deliveries and the two `local.*_created` events.
Check `event.known` before switching on `eventName`. Future signed event names
have `known: false` and `object: unknown`; retain them, skip built-in writes, and
route them through deduplication, custom reactions, and dispatch for triage.
Types do not runtime-validate every resource field.

`additionalWebhookReactions` accepts `{ supports(event), handle(event) }` objects.
They run after built-ins and before dispatch and must obey the same transaction
and outbox rules. A thrown error rolls back processing and allows retry.

For event fields, see [Webhook Events](https://docs.vatly.com/api-reference/webhook-events).
Register endpoints using [Webhook Endpoints](https://docs.vatly.com/api-reference/webhook-endpoints);
the [webhooks guide](https://docs.vatly.com/guides/webhooks) describes delivery and signatures.
