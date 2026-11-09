# Porting from PHP

> Vatly JavaScript packages - Porting from PHP

This guide describes **TypeScript Fluent 0.1.0-alpha.1**, not every feature added
to newer PHP releases. The initial port follows `vatly/vatly-fluent-php` revision
`db211e0cf8505017fcd2eea056628db2f19f5c8b`; the repository's
[porting record](https://github.com/vatly/vatly-fluent-js/blob/main/PORTING.md) explains the original scope.

## Map concepts, not syntax

<table>
<thead>
  <tr>
    <th>
      PHP concept
    </th>
    
    <th>
      TypeScript equivalent
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Configuration, container, API-only factory
    </td>
    
    <td>
      <code>
        new Vatly({ api: new VatlyClient(...), ...drivers })
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Billable model/trait
    </td>
    
    <td>
      Your own user/account plus <code>
        CustomerProfile
      </code>
      
       and bindings.
    </td>
  </tr>
  
  <tr>
    <td>
      Customer binding repository
    </td>
    
    <td>
      <code>
        CustomerBindings
      </code>
      
       with unique IDs on both sides.
    </td>
  </tr>
  
  <tr>
    <td>
      Checkout/subscription builder
    </td>
    
    <td>
      <code>
        checkoutBuilder(profile)
      </code>
      
       / <code>
        subscribe(profile).toPlan(id)
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      Resource wrappers and getters
    </td>
    
    <td>
      SDK resource properties, or a handle's <code>
        model()
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      Subscription state helpers
    </td>
    
    <td>
      <code>
        handle.state()
      </code>
      
       derived from local <code>
        endsAt
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      Repository interfaces and store/update DTOs
    </td>
    
    <td>
      Structural <code>
        Repository<T>
      </code>
      
      , <code>
        Stored<T>
      </code>
      
      , and partial updates.
    </td>
  </tr>
  
  <tr>
    <td>
      Dedicated event classes
    </td>
    
    <td>
      Discriminated <code>
        DomainEvent
      </code>
      
       union; check <code>
        known
      </code>
      
       then <code>
        eventName
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      FakeVatly
    </td>
    
    <td>
      Inject the SDK <code>
        fetch
      </code>
      
       for tests.
    </td>
  </tr>
  
  <tr>
    <td>
      API exception wrapper
    </td>
    
    <td>
      SDK errors propagate unchanged; local validation uses <code>
        FluentError
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

All remote and driver operations may be asynchronous. Await handle methods and
storage results. SDK resources remain plain typed data; they are not active-record
objects with implicit persistence. No Laravel, ORM, or PHP container is required.

## Subscription checkout

```ts
import type { Vatly } from '@getvatly/fluent';

export async function subscribe(vatly: Vatly, customerId: string, planId: string) {
  const checkout = await vatly.subscribe({ vatlyId: customerId })
    .toPlan(planId)
    .withQuantity(1)
    .create();
  return checkout.getUrl();
}
```

`subscribe` follows the billable action's naming but creates a checkout, not an
immediate local subscription. `withItems` belongs on the general checkout builder
for mixed carts. PHP convenience aliases are not copied where the SDK already
owns the operation; use `vatly.api` as the escape hatch.

## Data and event differences

- Money stays SDK `{ value, currency }` data, not integer-cents persistence DTOs.
Use `toMinorUnits` for bigint math and preserve currency alongside the amount.
- `undefined` means no update; explicit null clears nullable fields. Do not copy
PHP nullable-update conventions blindly.
- Store full resource IDs and fields, including `testmode`, metadata, order lines,
and tax information. `subscriptionPlanId` is not renamed to a PHP `planId` alias.
- Checkout results from builders add `getUrl()`; SDK checkout results do not.
- `local.order_created` and `local.subscription_created` are the two host-created
event names. Repositories may decline a store with null, which skips that event.
- Unknown signed deliveries have `known: false`; retain them for triage. No typed
event constructor should cause the original envelope to be discarded.
- Webhook processing requires host-owned atomic deduplication, repository writes,
audit retention, and outbox dispatch in one transaction. Do not port a recorder
that commits before reactions run.

For adapting existing tables, see [core concepts](/packages/fluent-js/coreconcepts); for the
event-to-repository matrix, see [webhooks](/packages/fluent-js/webhooks). Use the
[API reference](https://docs.vatly.com/api-reference) for remote field details;
the [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.
