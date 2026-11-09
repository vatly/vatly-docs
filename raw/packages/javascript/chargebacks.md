# Chargebacks

> Vatly JavaScript packages - Chargebacks

A chargeback is a payment dispute raised by the cardholder's bank against an order. Vatly records it (and any later reversal) so you can suspend access and reconcile the reversed VAT.

For all fields and options, see the [Chargebacks API reference](https://docs.vatly.com/api-reference/chargebacks). The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.

## The Chargeback resource

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
        chargeback_…
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
      The customer who disputed.
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
      The order being disputed.
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
      Dispute status.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        reason
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Reason given, if any.
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
      Gross amount disputed (incl. tax).
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
      Net amount disputed (excl. tax).
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
        testmode
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether this is a test chargeback.
    </td>
  </tr>
</tbody>
</table>

## Retrieve a chargeback

`GET /v1/chargebacks/{chargebackId}`

```ts
const chargeback = await vatly.chargebacks.get("chargeback_abc123");
```

## List chargebacks

`GET /v1/chargebacks`

```ts
const page = await vatly.chargebacks.list({ limit: 25 });

for await (const chargeback of vatly.chargebacks.listAll()) {
  // ...
}
```

Chargebacks for a specific order are also available via
`vatly.orders.listChargebacks(orderId)` and
`vatly.orders.getChargeback(orderId, chargebackId)` — see [Orders](/packages/javascript/orders#chargebacks-on-an-order).

## Reacting to disputes

Listen for the `order.chargeback_received` and `order.chargeback_reversed`
webhooks. The delivery's `entityId` is the order id and `object` is the full
Chargeback (incl. the tax breakdown), so you can suspend access and reconcile
the reversed VAT without a follow-up call.
