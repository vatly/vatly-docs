# Read orders and reversals

> Use an order handle to read purchased lines, an invoice link and exact reversal amounts.

Use an order handle to read purchased lines, an invoice link and exact reversal
amounts. Authorize the order in your application first. Examples accept the
configured `vatly` from [Configuration](/packages/fluent-python/configuration).

```python
from vatly_fluent import Vatly


async def example(vatly: Vatly):
    order = vatly.order("order_example")
    return {
        "invoice_url": await order.invoice_url(),
        "lines": await order.lines(),
        "refundable": await order.refundable_subtotal(),
        "partially_reversed": await order.is_partially_reversed(),
        "refunds": await order.refunds(),
    }
```

<table>
<thead>
  <tr>
    <th>
      Method
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
        model
      </code>
      
      , <code>
        sync
      </code>
    </td>
    
    <td>
      Cached SDK Order; refresh the handle
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        invoice_url
      </code>
    </td>
    
    <td>
      Customer invoice URL or None
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lines
      </code>
    </td>
    
    <td>
      OrderLine models
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        reversed_subtotal
      </code>
      
      , <code>
        refundable_subtotal
      </code>
    </td>
    
    <td>
      <code>
        Decimal
      </code>
      
       in currency units
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        is_reversed
      </code>
      
      , <code>
        is_fully_reversed
      </code>
      
      , <code>
        is_partially_reversed
      </code>
    </td>
    
    <td>
      Predicates derived from both totals
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
      Local stored records, or an empty list without repositories
    </td>
  </tr>
</tbody>
</table>

`model()` and the derived fields share one lazy read; `sync()` refreshes it. Do not
convert financial values to floats. Preserve each amount's currency from the SDK
resource when combining totals.

## Request a full refund

```python
from vatly import RequestOptions
from vatly_fluent import Vatly


async def example(vatly: Vatly):
    return await vatly.api.orders.create_full_refund(
        "order_example",
        {},
        options=RequestOptions(idempotency_key="refund:42"),
    )
```

Fluent exposes the raw SDK as `vatly.api` for operations without a convenience
handle. A timeout is ambiguous; reuse the same refund key instead of issuing a
second refund. Signed reversal events update optional local repositories.

[Order API reference](https://docs.vatly.com/api-reference/orders) · [Refund reference](https://docs.vatly.com/api-reference/refunds)
