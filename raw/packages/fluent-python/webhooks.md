# Transactional webhooks

> Vatly Python Fluent - Transactional webhooks

Call `await vatly.webhook_processor().handle(raw_bytes, signature_header)` in your
framework route. Signature/HMAC freshness checks happen before storage, using the
SDK. Missing/invalid signatures raise `VatlyInvalidSignatureError`. Keep the default
300-second tolerance; arrays of secrets support rotation. Unknown signed events
are retained and dispatched, not applied to known repositories.

Implement `WebhookCalls.process(event, work)` in **one transaction** shared by all
drivers. Lock/claim the signed event.id, skip committed duplicates, retain the
envelope, await work, mark processed and commit. Roll back every write on failure
so delivery retries can finish. Concurrency requires DB uniqueness/locking, not a
check-then-insert in memory. Scope every key by tenant/storefront/mode. An unsigned
Vatly-Event-Id header is not a dedup authority. Mode mismatches fail before storage.

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Built-in behavior
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      subscription.started
    </td>
    
    <td>
      Upsert; newly saved row emits local.subscription_created
    </td>
  </tr>
  
  <tr>
    <td>
      subscription.updated / billing_updated
    </td>
    
    <td>
      Update existing resource; null mandate preserves local value
    </td>
  </tr>
  
  <tr>
    <td>
      subscription.resumed
    </td>
    
    <td>
      Update existing row; clear ends_at
    </td>
  </tr>
  
  <tr>
    <td>
      cancellation / grace-period completion
    </td>
    
    <td>
      Update existing row and ends_at
    </td>
  </tr>
  
  <tr>
    <td>
      order.paid / payment_failed
    </td>
    
    <td>
      Upsert signed snapshot; new paid row emits local.order_created
    </td>
  </tr>
  
  <tr>
    <td>
      order.canceled
    </td>
    
    <td>
      Update existing snapshot only
    </td>
  </tr>
  
  <tr>
    <td>
      refund.* / order.chargeback_*
    </td>
    
    <td>
      Optional reversal upsert
    </td>
  </tr>
  
  <tr>
    <td>
      checkout.paid
    </td>
    
    <td>
      Link own checkout record to order; link subscription IDs from an already stored order
    </td>
  </tr>
  
  <tr>
    <td>
      scheduled updates / products / setup / unknown
    </td>
    
    <td>
      Dispatch without built-in resource writes
    </td>
  </tr>
</tbody>
</table>

Missing repositories skip persistence, not dispatch. Local-created events fire
only when a row is first saved, not on every payment status transition. Custom
`additional_webhook_reactions` run after built-ins and before final dispatch,
inside the same transaction. Write transactional outbox rows in `events.dispatch`,
then send external effects after commit. Throw on processing failure; respond 5xx,
not 2xx, so Vatly retries. A duplicate committed event may respond 200.

No implicit API reads occur. All six checkout/order/subscription delivery orders
are tested to converge using host records and stored snapshots. Missing snapshots,
AUTH_REQUEST trials and legacy plan references need explicit reconciliation jobs.
Delayed stale events can still overwrite newer snapshots: dedup is not ordering;
reconcile conflicts with the API. Never infer ownership from customerId or metadata.
