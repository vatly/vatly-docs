# Chargebacks

> Read payment disputes and retain their financial snapshots for accounting.

Read payment disputes and retain their financial snapshots for accounting.
Chargeback methods are read-only. Examples accept the client from [setup](/packages/python/readme).

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    chargeback = client.chargebacks.get("chargeback_example")
    all_disputes = list(client.chargebacks.list_all({"limit": 25}))
    order_disputes = list(client.orders.list_all_chargebacks("order_example"))
    scoped = client.orders.get_chargeback("order_example", "chargeback_example")
    return chargeback, all_disputes, order_disputes, scoped
```

<table>
<thead>
  <tr>
    <th>
      Input
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Chargeback ID
    </td>
    
    <td>
      <code>
        chargeback_...
      </code>
      
       from Vatly
    </td>
  </tr>
  
  <tr>
    <td>
      Order ID
    </td>
    
    <td>
      Required for the <code>
        orders
      </code>
      
      -scoped methods
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        limit
      </code>
      
      , <code>
        startingAfter
      </code>
      
      , <code>
        endingBefore
      </code>
    </td>
    
    <td>
      List size and exclusive pagination cursors
    </td>
  </tr>
</tbody>
</table>

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
        resource
      </code>
    </td>
    
    <td>
      Identifier; resource is <code>
        chargeback
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        original_order_id
      </code>
    </td>
    
    <td>
      Disputed order
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lines
      </code>
    </td>
    
    <td>
      Financial line snapshots
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testmode
      </code>
      
      , <code>
        links
      </code>
    </td>
    
    <td>
      Mode and resource links
    </td>
  </tr>
</tbody>
</table>

`order.chargeback_received` and `order.chargeback_reversed` events contain a
Chargeback object even though `entityType` is `order`. Inspect `event.object.resource`,
not just the envelope's entity type. Verify the [signature](/packages/python/webhooks) first.

[Chargeback API reference](https://docs.vatly.com/api-reference/chargebacks) · [All methods](/packages/python/api#chargebacks)
