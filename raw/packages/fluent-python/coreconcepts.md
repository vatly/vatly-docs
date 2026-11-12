# Store ownership safely

> Your application decides which user, team or organization owns a purchase.

Your application decides which user, team or organization owns a purchase. Fluent
stores that decision as an `EntityRef` on your checkout record. A customer binding
is billing identity only; it never grants access to another entity's resources.

## Attach an authorized entity

```python
from vatly import RequestOptions
from vatly_fluent import EntityRef, Vatly


async def example(vatly: Vatly):
    # The host must authorize team 42 before running this function.
    return (
        await vatly.subscribe()
        .to_plan("subscription_plan_example")
        .for_entity(EntityRef("team", "42"))
        .create(options=RequestOptions(idempotency_key="team-42:purchase-1"))
    )
```

Save the checkout record durably. Signed checkout/order/subscription snapshots
then follow those links; never infer ownership from email, customerId or metadata.

## Implement the storage contracts

<table>
<thead>
  <tr>
    <th>
      Contract
    </th>
    
    <th>
      Methods or responsibility
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        CheckoutRecords
      </code>
    </td>
    
    <td>
      <code>
        record
      </code>
      
      , <code>
        find
      </code>
      
      , <code>
        link
      </code>
      
      , <code>
        find_for_resource
      </code>
      
      ; reject conflicting ownership
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        CustomerBindings
      </code>
    </td>
    
    <td>
      <code>
        bind
      </code>
      
      , <code>
        record
      </code>
      
      , lookups both ways; unique on both identities
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Repository
      </code>
    </td>
    
    <td>
      <code>
        find_by_vatly_id
      </code>
      
      , <code>
        store
      </code>
      
      , <code>
        update
      </code>
      
       complete wrapper records
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ReversalRepository
      </code>
    </td>
    
    <td>
      Repository plus <code>
        list_for_order
      </code>
      
      , <code>
        list_for_customer
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        WebhookCalls
      </code>
    </td>
    
    <td>
      <code>
        process(event, work)
      </code>
      
       claims signed ID, runs work and commits atomically
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        EventDispatcher
      </code>
    </td>
    
    <td>
      <code>
        dispatch(event)
      </code>
      
       writes a transactional outbox entry
    </td>
  </tr>
</tbody>
</table>

All methods are async. `Stored[T]` contains `resource` and optional `entity`;
`LocalSubscription` also contains `ends_at`. Updates omit unchanged fields; None
explicitly clears a field. A repository may decline a new save by returning None.

Scope every unique key and lookup by tenant, storefront and mode. Use database
constraints and locks, not an in-memory check followed by an insert. Webhook audit,
deduplication, links, snapshots and outbox must share one transaction.

The repository's `examples/sqlite_driver.py` is a runnable reference, not an installed
production driver. It uses one connection and lock per instance. Use an async-native
database driver or your framework's thread/transaction adapter for production.
For Django, use its supplied ORMDriver. See [webhook processing](/packages/fluent-python/webhooks).

[API reference](https://docs.vatly.com/api-reference)
