# Refunds

> A refund returns funds to a customer for an order.

A refund returns funds to a customer for an order. Refunds are **created** against an order (see [Orders](/packages/javascript/orders#refunds-on-an-order)); the top-level `refunds` resource lets you list and retrieve them across all orders.

For all fields and options, see the [Refunds API reference](https://docs.vatly.com/api-reference/global-refunds) and [creating order refunds](https://docs.vatly.com/api-reference/refunds). The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.

## The Refund resource

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
        refund_…
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
      The customer being refunded.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        originalOrderId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The order this refund is against.
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
        pending
      </code>
      
      , <code>
        queued
      </code>
      
      , <code>
        processing
      </code>
      
      , <code>
        refunded
      </code>
      
      , <code>
        failed
      </code>
      
      , or <code>
        canceled
      </code>
      
      . The success event is <code>
        refund.completed
      </code>
      
      , but the status is <code>
        refunded
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        total
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Gross amount refunded (incl. tax).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subtotal
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Net amount refunded (excl. tax).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        taxSummary
      </code>
    </td>
    
    <td>
      <code>
        array
      </code>
    </td>
    
    <td>
      Per-rate VAT breakdown of the refund.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        metadata
      </code>
    </td>
    
    <td>
      <code>
        object | null
      </code>
    </td>
    
    <td>
      The <code>
        metadata
      </code>
      
       sent when the refund was created; <code>
        null
      </code>
      
       when none was sent.
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
      Whether this is a test refund.
    </td>
  </tr>
</tbody>
</table>

## Retrieve a refund

`GET /v1/refunds/{refundId}`

```ts
const refund = await vatly.refunds.get("refund_abc123");
```

## List refunds

`GET /v1/refunds`

```ts
const page = await vatly.refunds.list({ limit: 25 });

for await (const refund of vatly.refunds.listAll()) {
  // ...
}
```

## Creating refunds

Create refunds against an order with `orders.createRefund` / `orders.createFullRefund`:

```ts
await vatly.orders.createRefund("order_abc123", {
  items: [{ itemId: "order_item_abc123", amount: { value: "15.00", currency: "EUR" } }],
  metadata: { ticketId: "SUPPORT-12345" },
});

await vatly.orders.createFullRefund("order_abc123", { metadata: { reason: "cancellation" } });
```

`metadata` is optional and follows the same rules as on checkouts and customers:
string values, at most 50 keys, keys up to 40 characters, values up to 500
characters. It is returned on the refund and in refund webhooks.

Only sales (checkout and subscription orders) can be refunded. For any other
order, such as a payment-method authorization, the API returns `422` with
`details.orderType` naming the order's type.

Listen for the `refund.completed` / `refund.failed` / `refund.canceled` webhooks
to reconcile your local records — the webhook payload carries the full tax
breakdown, so no follow-up call is needed.
