# Orders

> Orders contain purchased lines, tax and financial totals.

Orders contain purchased lines, tax and financial totals. Read an order after its
checkout has an `order_id`. Keep exact decimal amounts for accounting.
Examples accept the client from [setup](/packages/python/readme).

## Read an order and its lines

```python
from decimal import Decimal
from vatly import VatlyClient


def example(client: VatlyClient):
    order = client.orders.get("order_example")
    lines = [(line.product_type, line.product_id, line.quantity) for line in order.lines]
    refundable = Decimal(order.refundable_subtotal.root.value)
    return order.status, lines, refundable
```

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
      
      , <code>
        customer_id
      </code>
    </td>
    
    <td>
      Order identity and payment state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lines
      </code>
    </td>
    
    <td>
      OrderLine models with <code>
        id
      </code>
      
      , <code>
        product_type
      </code>
      
      , <code>
        product_id
      </code>
      
      , <code>
        quantity
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refundable_subtotal
      </code>
      
      , <code>
        reversed_subtotal
      </code>
    </td>
    
    <td>
      Money wrappers; read <code>
        .root.value
      </code>
      
       and <code>
        .root.currency
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        links.customer_invoice
      </code>
    </td>
    
    <td>
      Optional customer invoice link
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

`product_type="subscription_plan"` means `product_id` is a plan ID;
`"subscription"` means a subscription ID. Never substitute one for the other.
This alpha has no typed related-resources accessor; extra response fields survive
validation, but application linkage support still needs a package update.

## List orders and request an invoice-details link

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    orders = list(client.orders.list_all({"limit": 25}))
    link = client.orders.create_invoice_update_link("order_example")
    return orders, link.href
```

The hosted link lets the customer update invoice details. Authorize the order
before returning it. List filters include `limit`, `startingAfter`, `endingBefore`;
see the API reference for resource-specific filters.

Use [refunds](/packages/python/refunds) for reversals and [chargebacks](/packages/python/chargebacks) for disputes.
Ownership comes from your checkout records, not a shared customer ID.

[Order API reference](https://docs.vatly.com/api-reference/orders) · [All methods](/packages/python/api#orders)
