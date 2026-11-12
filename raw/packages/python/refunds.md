# Refunds

> Vatly Python SDK - Refunds

Refunds reverse some or all of an order. Create them through `client.orders`, not
`client.refunds`. The top-level refunds resource is for reads.
Examples accept the client from [setup](/packages/python/readme).

## Issue a full refund

```python
from vatly import RequestOptions, VatlyClient


def example(client: VatlyClient):
    refund = client.orders.create_full_refund(
        "order_example",
        {},
        options=RequestOptions(idempotency_key="refund:request-42"),
    )
    return refund.id, refund.status
```

Keep the same key for retries of this refund. A timeout does not prove it failed;
read the existing refund/order before deciding to issue another.

<table>
<thead>
  <tr>
    <th>
      Operation
    </th>
    
    <th>
      Inputs
    </th>
    
    <th>
      Return
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        orders.create_full_refund
      </code>
    </td>
    
    <td>
      order ID, <code>
        {}
      </code>
      
       or optional metadata
    </td>
    
    <td>
      Refund
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.create_refund
      </code>
    </td>
    
    <td>
      order ID, <code>
        {"items": [...]}
      </code>
      
      ; optional metadata
    </td>
    
    <td>
      Refund
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.cancel_refund
      </code>
    </td>
    
    <td>
      order ID, refund ID
    </td>
    
    <td>
      None
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refunds.get
      </code>
    </td>
    
    <td>
      refund ID
    </td>
    
    <td>
      Refund
    </td>
  </tr>
</tbody>
</table>

## Refund part of a line

```python
from vatly import RequestOptions, VatlyClient


def example(client: VatlyClient):
    return client.orders.create_refund(
        "order_example",
        {
            "items": [
                {"itemId": "order_item_example", "amount": {"value": "5.00", "currency": "EUR"}}
            ],
        },
        options=RequestOptions(idempotency_key="partial-refund:42"),
    )
```

`itemId` must be an original order line ID. `amount` is before tax and must not
exceed that line's remaining refundable amount. Preserve the order currency and
use decimal strings, never rounded floats. Vatly calculates the tax reversal.

## Read and cancel a pending refund

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    refunds = list(client.refunds.list_all({"limit": 25}))
    scoped = list(client.orders.list_all_refunds("order_example"))
    refund = client.orders.get_refund("order_example", "refund_example")
    client.orders.cancel_refund("order_example", refund.id)
    return refunds, scoped
```

Cancellation is only allowed while Vatly permits it; it is not a reversal of a
completed refund. Signed refund events confirm completion, failure or cancellation.

<table>
<thead>
  <tr>
    <th>
      Response field
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        id
      </code>
      
      , <code>
        status
      </code>
    </td>
    
    <td>
      Refund identifier and state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        original_order_id
      </code>
    </td>
    
    <td>
      Order being reversed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lines
      </code>
    </td>
    
    <td>
      Refunded lines and financial details
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testmode
      </code>
      
      , <code>
        metadata
      </code>
    </td>
    
    <td>
      Mode and custom data
    </td>
  </tr>
</tbody>
</table>

[Refund API reference](https://docs.vatly.com/api-reference/refunds) · [All methods](/packages/python/api#refunds)
