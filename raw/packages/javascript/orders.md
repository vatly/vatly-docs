# Orders

> Vatly JavaScript packages - Orders

An order is the transaction record created when a checkout is paid. It carries the full tax breakdown needed to issue a compliant invoice — and it's where you create refunds and inspect chargebacks.

For all fields and options, see the [Orders API reference](https://docs.vatly.com/api-reference/orders). The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.

## The Order resource

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
        order_…
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
        string | null
      </code>
    </td>
    
    <td>
      The customer this order belongs to.
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
        created
      </code>
      
      , <code>
        pending
      </code>
      
      , <code>
        paid
      </code>
      
      , <code>
        canceled
      </code>
      
      , or <code>
        expired
      </code>
      
      . Payment recovery is signaled by <code>
        order.payment_failed
      </code>
      
      , not a status of that name.
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
      Gross amount (incl. tax).
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
      Net amount (excl. tax).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        reversedSubtotal
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Net amount already reversed via refunds/chargebacks.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refundableSubtotal
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Net amount still refundable.
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
      Per-rate VAT breakdown.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lines
      </code>
    </td>
    
    <td>
      <code>
        OrderLine[]
      </code>
    </td>
    
    <td>
      Line items, incl. <code>
        productType
      </code>
      
       / <code>
        productId
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        invoiceNumber
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Assigned once the invoice is issued.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        paymentMethod
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Payment method used.
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
      Custom metadata carried from the checkout.
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
      Whether this is a test order.
    </td>
  </tr>
</tbody>
</table>

## Retrieve an order

`GET /v1/orders/{orderId}`

```ts
const order = await vatly.orders.get("order_abc123");
console.log(order.total.value, order.total.currency);
```

## List orders

`GET /v1/orders`

```ts
const page = await vatly.orders.list({ limit: 25 });

for await (const order of vatly.orders.listAll()) {
  // ...
}
```

## Invoice update link (hosted)

`POST /v1/orders/{orderId}/invoice-update-link`

Returns a hosted link where the customer can correct their invoice details
(billing address, VAT number, company name).

```ts
const link = await vatly.orders.createInvoiceUpdateLink("order_abc123");
redirect(link.href);
```

## Refunds on an order

Refunds are created against the order they belong to.

```ts
// Partial refund of specific items:
const refund = await vatly.orders.createRefund("order_abc123", {
  items: [
    { itemId: "order_item_abc123", amount: { value: "15.00", currency: "EUR" } },
  ],
});

// Full refund of the entire order:
const full = await vatly.orders.createFullRefund("order_abc123");

// List / get / cancel:
const page = await vatly.orders.listRefunds("order_abc123", { limit: 10 });
for await (const r of vatly.orders.listAllRefunds("order_abc123")) {
  // ...
}
const one = await vatly.orders.getRefund("order_abc123", "refund_abc123");
await vatly.orders.cancelRefund("order_abc123", "refund_abc123"); // only while pending
```

See [Refunds](/packages/javascript/refunds) for the top-level refund endpoints.

## Chargebacks on an order

```ts
const page = await vatly.orders.listChargebacks("order_abc123");
const chargeback = await vatly.orders.getChargeback("order_abc123", "chargeback_abc123");
```

See [Chargebacks](/packages/javascript/chargebacks) for the top-level chargeback endpoints.
