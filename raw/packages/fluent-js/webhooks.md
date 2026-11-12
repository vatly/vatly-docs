# Webhooks

> Vatly JavaScript packages - Webhooks

Record payments and subscription changes from signed webhooks, not checkout
redirects. Pass a configured `Vatly` to this Fetch handler, or export the returned
function as a Next.js Route Handler's `POST`:

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

Set `webhookSecret`, `webhookCalls`, and the repositories you want updated in
[configuration](/packages/fluent-js/configuration). This route needs no browser session; signatures
authenticate deliveries. Pass the original unread request, not reserialized JSON.
For raw bytes, use `processor.handle(rawBody, signatureHeader)`.

The SDK checks `Vatly-Signature` HMAC and timestamp before touching storage.
Keep timestamp checks enabled. To rotate secrets, set `webhookSecret` to an array
of accepted secrets.

## Idempotency and one transaction

Implement `WebhookCalls.process(event, work)` in one transaction shared by all
[storage drivers](/packages/fluent-js/coreconcepts#webhook-storage):

1. Lock or claim the signed `event.id`. If already committed, return false.
2. Retain the verified envelope, including unknown events.
3. Await `work()` to run reactions and dispatch.
4. Mark the ID processed and commit resource changes, bindings, audit, and outbox
together. Return true. Roll back everything on failure.

Never commit the deduplication row before the work; a failure would lose the retry.
Use signed `event.id`, not the unsigned `Vatly-Event-Id` header. Scope keys and rows
by tenant, storefront, and mode. Timestamp checks alone do not deduplicate.

Write to an outbox in `events.dispatch`. Send email and make network calls from a
worker after commit. Deliveries can arrive out of order; reconcile conflicting
snapshots with the API.

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

Reactions use the signed snapshot without an API GET. Missing repositories skip
writes, not dispatch. Null billing-event mandates leave the local mandate unchanged;
subscription `sync()` reconciles removal.

Before using subscription state to grant or revoke access, read the
[grace-period limitation in this alpha](/packages/fluent-js/subscriptions#grace-period-limitation-in-010-alpha1).

## Application events and extensions

```ts
import type { DomainEvent, EventDispatcher } from '@getvatly/fluent';

export function billingEvents(
  enqueueInCurrentTransaction: (event: DomainEvent) => Promise<void>,
): EventDispatcher {
  return { dispatch: event => enqueueInCurrentTransaction(event) };
}
```

Check `event.known` before switching on `eventName`. The union includes SDK
deliveries and the two local-created events above. Unknown signed events have
`known: false` and `object: unknown`; retain and dispatch them without built-in
writes. Types do not validate resource fields at runtime.

`additionalWebhookReactions` takes `{ supports(event), handle(event) }` objects.
They run after built-ins and before dispatch, in the same transaction. Throw to
roll back and allow retry.

For event fields, see [Webhook Events](https://docs.vatly.com/api-reference/webhook-events).
Register endpoints using [Webhook Endpoints](https://docs.vatly.com/api-reference/webhook-endpoints);
the [webhooks guide](https://docs.vatly.com/guides/webhooks) describes delivery and signatures.
