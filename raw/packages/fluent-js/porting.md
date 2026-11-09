# Porting from PHP

> Vatly JavaScript packages - Porting from PHP

Replace PHP's billable action with a builder on a configured `Vatly` instance:

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

Await remote calls and driver results. Resources are plain data, not active-record
models. Use `vatly.api` for SDK operations without Fluent helpers.

## PHP to TypeScript

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
      Configuration/container
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
      Your user/account plus <code>
        CustomerProfile
      </code>
      
       and <a href="/packages/fluent-js/coreconcepts#billables-and-bindings">
        bindings
      </a>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      Checkout/subscription builder
    </td>
    
    <td>
      <a href="/packages/fluent-js/checkouts">
        Checkouts
      </a>
      
      : <code>
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
      Resource getters
    </td>
    
    <td>
      SDK properties or <code>
        handle.model()
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      Subscription state helpers
    </td>
    
    <td>
      <a href="/packages/fluent-js/subscriptions">
        Subscriptions
      </a>
      
      : <code>
        handle.state()
      </code>
      
       from local <code>
        endsAt
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      Repository interfaces and DTOs
    </td>
    
    <td>
      <a href="/packages/fluent-js/coreconcepts">
        Storage contracts
      </a>
      
      : <code>
        Repository<T>
      </code>
      
      , <code>
        Stored<T>
      </code>
      
      , partial updates.
    </td>
  </tr>
  
  <tr>
    <td>
      Event classes
    </td>
    
    <td>
      <a href="/packages/fluent-js/webhooks">
        Webhooks
      </a>
      
      : <code>
        DomainEvent
      </code>
      
      ; check <code>
        known
      </code>
      
      , then <code>
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
      <a href="/packages/fluent-js/testing">
        Testing
      </a>
      
      : inject SDK <code>
        fetch
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      API exception wrapper
    </td>
    
    <td>
      <a href="/packages/fluent-js/configuration#handle-errors-and-retries">
        Configuration
      </a>
      
      : SDK errors pass through; <code>
        FluentError
      </code>
      
       covers local input/wiring.
    </td>
  </tr>
</tbody>
</table>

Keep full SDK fields, including `testmode`, metadata, lines, and tax data. Use
`subscriptionPlanId`, not a PHP `planId` alias. Money stays `{ value, currency }`;
see [money and reversals](/packages/fluent-js/orders#money-and-reversals) for bigint conversion.
Follow the linked storage and webhook contracts rather than copying PHP update
or audit behavior: null/omitted fields and transaction boundaries differ.

This documents Fluent `0.1.0-alpha.1`, ported from PHP revision
`db211e0cf8505017fcd2eea056628db2f19f5c8b`, not later PHP additions.
The [porting record](https://github.com/vatly/vatly-fluent-js/blob/main/PORTING.md) lists the original scope. Use the
[API reference](https://docs.vatly.com/api-reference) for remote field details;
the [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.
