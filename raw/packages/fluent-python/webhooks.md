# Process signed webhooks

> Fluent verifies a delivery, updates local snapshots and dispatches events through your storage driver.

Fluent verifies a delivery, updates local snapshots and dispatches events through
your storage driver. Your framework route supplies the raw bytes and signature.
Use the `vatly` instance wired in [Configuration](/packages/fluent-python/configuration).

```python
from vatly_fluent import Vatly


async def example(vatly: Vatly, raw_body: bytes, signature: str):
    processed = await vatly.webhook_processor().handle(raw_body, signature)
    return "processed" if processed else "duplicate"
```

Respond 2xx after commit, including for a committed duplicate. Invalid signatures
raise `VatlyInvalidSignatureError`; return 400. Let processing/storage failures
return 5xx so Vatly retries. Do not parse and re-encode the body before verification.

## Make delivery atomic

<table>
<thead>
  <tr>
    <th>
      Driver responsibility
    </th>
    
    <th>
      Required behavior
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        webhook_calls.process(event, work)
      </code>
    </td>
    
    <td>
      Claim signed <code>
        event.id
      </code>
      
      ; run <code>
        work
      </code>
      
      ; commit all writes together
    </td>
  </tr>
  
  <tr>
    <td>
      Repositories and checkout links
    </td>
    
    <td>
      Participate in that same transaction
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        events.dispatch(event)
      </code>
    </td>
    
    <td>
      Write an outbox entry, not a network side effect
    </td>
  </tr>
  
  <tr>
    <td>
      Failure or concurrent duplicate
    </td>
    
    <td>
      Roll back on failure; enforce DB uniqueness/locking
    </td>
  </tr>
</tbody>
</table>

The signature's default clock tolerance is 300 seconds; secret sequences support
rotation. Deduplicate the **signed** ID, not an unsigned event-ID header. Scope all
claims by tenant/storefront/mode. Unknown signed events remain retained/dispatched.

## Know what the built-in reactions do

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Local effect
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
      Upsert; first save emits <code>
        local.subscription_created
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Subscription update/billing/resume/cancel events
    </td>
    
    <td>
      Update an existing snapshot and lifecycle expiry
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
      Upsert order snapshot; first paid save emits <code>
        local.order_created
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.canceled
      </code>
    </td>
    
    <td>
      Update an existing order
    </td>
  </tr>
  
  <tr>
    <td>
      Refund/chargeback events
    </td>
    
    <td>
      Upsert optional reversal repositories
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.paid
      </code>
    </td>
    
    <td>
      Link through a host-owned checkout record
    </td>
  </tr>
  
  <tr>
    <td>
      Other/unknown events
    </td>
    
    <td>
      Dispatch without an invented resource write
    </td>
  </tr>
</tbody>
</table>

Reactions make no implicit API reads. Customer bindings never determine ownership.
Created events can precede eventual ownership linkage; outbox consumers must read
current persisted ownership before acting. Dispatch external effects after commit
with idempotent consumer keys. Deduplication is not event ordering: reconcile stale
or conflicting snapshots explicitly. See [subscription recovery](/packages/fluent-python/subscriptions).

[API reference](https://docs.vatly.com/api-reference) · [Endpoint API reference](https://docs.vatly.com/api-reference/webhook-endpoints)
