# Subscription Plans

> Vatly JavaScript packages - Subscription Plans

Subscription plans define recurring products, prices, and billing intervals.
The API supports creation, updates, archive and unarchive.

> **Authoritative field reference.** This page covers the common cases. The complete, canonical schema lives in the [OpenAPI spec](https://docs.vatly.com/openapi.yaml) (see the `SubscriptionPlan` schema). When in doubt, trust the spec.

## The Subscription Plan resource

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
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
        id
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Unique identifier (<code>
        subscription_plan_…
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resource
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Always <code>
        subscription_plan
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        name
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Display name.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Optional description.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        basePrice
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Price per interval, e.g. <code>
        { value: "29.00", currency: "EUR" }
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        interval
      </code>
      
       / <code>
        intervalCount
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       / <code>
        number
      </code>
    </td>
    
    <td>
      Billing cadence (e.g. <code>
        month
      </code>
      
       × 1).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        status
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        active
      </code>
      
      , <code>
        pending
      </code>
      
      , or <code>
        rejected
      </code>
      
      . Archive state is separate in <code>
        archivedAt
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        createdAt
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Creation timestamp (ISO 8601).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testmode
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether this is a test plan.
    </td>
  </tr>
</tbody>
</table>

## Retrieve a subscription plan

`GET /v1/subscription-plans/{subscriptionPlanId}`

```ts
const plan = await vatly.subscriptionPlans.get("subscription_plan_abc123");
console.log(plan.basePrice.value, plan.basePrice.currency);
```

## List subscription plans

`GET /v1/subscription-plans`

```ts
const page = await vatly.subscriptionPlans.list({ limit: 25 });

for await (const plan of vatly.subscriptionPlans.listAll()) {
  // ...
}
```

To sell a plan, pass its `id` in a [checkout](/packages/javascript/checkouts)'s `products`.

## Create, update and archive

```ts
const plan = await vatly.subscriptionPlans.create({
  name: "Pro Monthly", description: "Pro features", productType: "saas",
  basePrice: { value: "29.00", currency: "EUR" }, interval: "month", intervalCount: 1,
});
await vatly.subscriptionPlans.update(plan.id, { interval: "week", intervalCount: 2 });
await vatly.subscriptionPlans.archive(plan.id); // 204: no return value
const restored = await vatly.subscriptionPlans.unarchive(plan.id);
const all = await vatly.subscriptionPlans.list({ includeArchived: true });
```

New prices are EUR-only. `taxBehavior` defaults to `exclusive` and is immutable.
Plans sell `saas` only; `day` intervals are test-mode-only. Creation and updates
may require approval; inspect `status`, `pendingUpdates`, and `updateStatus`.
