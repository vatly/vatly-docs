# Core concepts and storage

> Vatly JavaScript packages - Core concepts and storage

Fluent coordinates Vatly API calls with your application's data. It does not
create tables, authenticate users, schedule jobs, or provide a global database.

## Billables are your users or accounts

There is no TypeScript `Billable` model or mixin. Keep your own user, team, or
organization as the billable. A `CustomerProfile` supplies `vatlyId`, `email`,
and optional `name` to the appropriate operation. Builders use `vatlyId`; they
do **not** create a customer from an email. Create or bind a customer first.

Your billable ID (`hostId`) and Vatly's customer ID (`vatlyId`) are different.
Never accept either from a browser without checking the signed-in user's access.

## Choose the contracts you need

<table>
<thead>
  <tr>
    <th>
      Wiring
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
        api
      </code>
    </td>
    
    <td>
      Required SDK client; used for every remote operation.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        bindings
      </code>
    </td>
    
    <td>
      Maps host IDs to Vatly customer IDs; records anonymous customers.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions
      </code>
    </td>
    
    <td>
      Reads/writes <code>
        LocalSubscription
      </code>
      
      , including local <code>
        endsAt
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders
      </code>
    </td>
    
    <td>
      Reads/writes <code>
        Stored<Order>
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refunds
      </code>
      
      , <code>
        chargebacks
      </code>
    </td>
    
    <td>
      Optional reversal repositories with order/customer lists.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhookCalls
      </code>
    </td>
    
    <td>
      Atomic signed-event retention, deduplication, and execution.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        events
      </code>
    </td>
    
    <td>
      Optional dispatcher; persist outbox work inside the same transaction.
    </td>
  </tr>
</tbody>
</table>

Contracts accept synchronous or asynchronous implementations, except
`webhookCalls.process`, which returns a promise. No particular ORM is required.

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

Implement `findByVatlyId(id)`, `store(data)`, and `update(id, partial)` against
your database. `Stored<T>` is the full SDK resource plus `hostCustomerId`, which
may be null for an unattributed customer. `LocalSubscription` also has `endsAt`.

- Enforce unique Vatly resource IDs, scoped by tenant/storefront and mode.
- On partial updates, omitted/`undefined` means unchanged; `null` explicitly clears
a nullable field. Do not translate all missing fields into nulls.
- `store` returns the saved record, or null if you deliberately decline to persist
it. A null return skips the corresponding local-created event.
- `update` returns the updated record; it is not a fire-and-forget write.
- `ReversalRepository` adds `listForOrder(id)` and `listForCustomer(id)`.

If your host already has tables, adapt those tables rather than creating parallel
ones. `store` can locate a pending host record using trusted checkout metadata,
attach the Vatly ID, and return the resulting SDK-shaped record. Metadata is a
correlation aid, not an authorization token. Enforce ownership in your application.

## Binding behavior

Implement all four `CustomerBindings` methods:

- `bind(vatlyId, hostId)` atomically associates the two IDs.
- `record(vatlyId)` records an unattributed customer without clearing an existing binding.
- `vatlyCustomerIdFor(hostId)` and `hostCustomerIdFor(vatlyId)` return an ID or null.

Enforce uniqueness on **both sides** in the database. Fluent's pre-checks do not
replace concurrency-safe constraints. Do not silently reassign an existing binding.
Keep test and live bindings separate.

## Transactions belong to the host

All webhook repositories, bindings, audit records, and outbox writes must join the
transaction started by `webhookCalls.process(event, work)`. A global transaction
variable shared between concurrent requests is not safe. Use your database's
transaction context or request-scoped drivers. See [webhooks](/packages/fluent-js/webhooks) for the
deduplication algorithm and reaction matrix.

For remote resource fields, use the [API reference](https://docs.vatly.com/api-reference).
