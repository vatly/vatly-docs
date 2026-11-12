# Subscriptions

> Subscriptions are recurring billing relationships.

Subscriptions are recurring billing relationships. They renew automatically according to their plan's interval until canceled.

For all fields and options, see the [Subscriptions API reference](https://docs.vatly.com/api-reference/subscriptions). The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.

## The Subscription resource

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
        subscription_…
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The customer this subscription belongs to.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionPlanId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The plan this subscription is based on.
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
        quantity
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Number of units.
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
        created
      </code>
      
      , <code>
        trial
      </code>
      
      , <code>
        on_grace_period
      </code>
      
      , <code>
        paused
      </code>
      
      , or <code>
        canceled
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
        mandate
      </code>
    </td>
    
    <td>
      <code>
        Mandate | null
      </code>
    </td>
    
    <td>
      Payment method on file: <code>
        { method, maskedIdentifier }
      </code>
      
      . <code>
        null
      </code>
      
       until one is bound.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        startedAt
      </code>
      
       / <code>
        endedAt
      </code>
      
       / <code>
        canceledAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Lifecycle timestamps (ISO 8601).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        nextRenewalAt
      </code>
      
       / <code>
        renewedUntil
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Renewal timestamps.
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
      Whether this is a test subscription.
    </td>
  </tr>
</tbody>
</table>

## Retrieve a subscription

`GET /v1/subscriptions/{subscriptionId}`

```ts
const subscription = await vatly.subscriptions.get("subscription_abc123");
console.log(subscription.mandate?.maskedIdentifier);
```

## List subscriptions

`GET /v1/subscriptions`

```ts
const page = await vatly.subscriptions.list({ limit: 25 });

for await (const sub of vatly.subscriptions.listAll()) {
  // ...
}
```

## Update a subscription

`PATCH /v1/subscriptions/{subscriptionId}`

Common attributes: `quantity`, `subscriptionPlanId` (plan change), `prorate`,
`applyImmediately`, `trialUntil`. Include at least one of `subscriptionPlanId`,
`price`, or `quantity`; `trialUntil` cannot be sent alone. See the
[API reference](https://docs.vatly.com/api-reference/subscriptions) for all options.

```ts
const subscription = await vatly.subscriptions.update("subscription_abc123", {
  quantity: 2,
});
```

## Cancel a subscription

`DELETE /v1/subscriptions/{subscriptionId}` (204: no return value)

```ts
await vatly.subscriptions.cancel("subscription_abc123"); // period end
await vatly.subscriptions.cancel("subscription_other", { immediately: true });
```

The default schedules cancellation at period end (with a grace period);
`immediately: true` cancels immediately. Listen for the
`subscription.canceled_*` webhooks to react.

## Resume a subscription

`POST /v1/subscriptions/{subscriptionId}/resume`

Resume a subscription that was canceled with a grace period, while that grace
period is still active.

```ts
const subscription = await vatly.subscriptions.resume("subscription_abc123");
```

## Update billing details (hosted link)

`POST /v1/subscriptions/{subscriptionId}/billing-update-link`

Returns a hosted link where the customer can update their payment method
(mandate) or billing address. Redirect the customer to it.

```ts
const link = await vatly.subscriptions.createBillingUpdateLink("subscription_abc123", {
  redirectUrlSuccess: "https://yourapp.com/billing/updated",
  redirectUrlCanceled: "https://yourapp.com/billing",
});
redirect(link.href);
```

When the mandate changes, Vatly emits a `subscription.billing_updated` webhook so
you can refresh the masked payment method shown to the customer.
