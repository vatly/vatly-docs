# Core concepts and storage

> Connect Fluent to your existing tables through storage drivers.

Connect Fluent to your existing tables through storage drivers. Your application
owns the database, authentication, and jobs; Fluent supplies the contracts.

```ts
import type { Order } from '@getvatly/sdk';
import type { LocalSubscription, Repository, Stored, Wiring } from '@getvatly/fluent';

export function storageDrivers(
  subscriptions: Repository<LocalSubscription>,
  orders: Repository<Stored<Order>>,
): Pick<Wiring, 'subscriptions' | 'orders'> {
  return { subscriptions, orders };
}
```

## Repository behavior

`Stored<T>` adds `hostCustomerId` to the SDK resource. It is null for an unattributed
customer. `LocalSubscription` also adds `endsAt`.

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      Return value
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        findByVatlyId(id)
      </code>
    </td>
    
    <td>
      Record or null.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        store(data)
      </code>
    </td>
    
    <td>
      Saved record, or null to decline storage and skip the local-created event.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        update(id, partial)
      </code>
    </td>
    
    <td>
      Updated record. Omitted/<code>
        undefined
      </code>
      
       fields stay unchanged; null clears a nullable field.
    </td>
  </tr>
</tbody>
</table>

Enforce unique Vatly IDs per tenant, storefront, and mode. Adapt existing tables
rather than duplicating them. `store` can match a pending host record using
checkout metadata and attach its Vatly ID. Metadata helps match records; it does
not authorize access.

`refunds` and `chargebacks` use `ReversalRepository`, which adds `listForOrder(id)`
and `listForCustomer(id)`. Contracts accept sync or async implementations, except
`webhookCalls.process`, which returns a promise.

## Billables and bindings

Keep your user, team, or organization as the billable; there is no `Billable` mixin.
`CustomerProfile` carries `vatlyId`, `email`, and optional `name`. Your application's
ID (`hostId`) is separate from Vatly's customer ID (`vatlyId`). Authorize both.

<table>
<thead>
  <tr>
    <th>
      <code>
        CustomerBindings
      </code>
      
       method
    </th>
    
    <th>
      Behavior
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        bind(vatlyId, hostId)
      </code>
    </td>
    
    <td>
      Associate IDs atomically; enforce uniqueness on both sides.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        record(vatlyId)
      </code>
    </td>
    
    <td>
      Record an unattributed customer without clearing an existing binding.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        vatlyCustomerIdFor(hostId)
      </code>
    </td>
    
    <td>
      Return the Vatly ID or null.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hostCustomerIdFor(vatlyId)
      </code>
    </td>
    
    <td>
      Return the host ID or null.
    </td>
  </tr>
</tbody>
</table>

Do not silently reassign bindings. Keep test and live data separate. See
[customers](/packages/fluent-js/customers) for creation and lookup examples.

## Webhook storage

Wire `webhookCalls` for deduplication and audit retention, and `events` for outbox
writes. They must share a transaction with repositories and bindings. Use your
database's transaction context or request-scoped drivers, not a global variable
shared by concurrent requests. The [webhook transaction steps](/packages/fluent-js/webhooks#idempotency-and-one-transaction)
define what must commit or roll back together.

For remote resource fields, use the [API reference](https://docs.vatly.com/api-reference).
