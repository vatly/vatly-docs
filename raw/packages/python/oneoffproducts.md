# One-off products

> Sell a digital product once rather than on a recurring schedule.

Sell a digital product once rather than on a recurring schedule. Create it in the
catalog, then pass its ID to a [checkout](/packages/python/checkouts).
Examples accept the client from [setup](/packages/python/readme).

## Create a product

```python
from vatly import VatlyClient
from vatly.models import CreateOneOffProductRequest


def example(client: VatlyClient):
    return client.one_off_products.create(
        CreateOneOffProductRequest(
            name="Python handbook",
            description="A downloadable programming book",
            product_type="ebook",
            base_price={"value": "29.00", "currency": "EUR"},
        )
    )
```

<table>
<thead>
  <tr>
    <th>
      Input field
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Required?
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        name
      </code>
      
      , <code>
        description
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base_price
      </code>
    </td>
    
    <td>
      EUR money with a two-decimal string
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        product_type
      </code>
    </td>
    
    <td>
      <code>
        "saas"
      </code>
      
       or <code>
        "ebook"
      </code>
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tax_behavior
      </code>
    </td>
    
    <td>
      <code>
        "exclusive"
      </code>
      
       or <code>
        "inclusive"
      </code>
    </td>
    
    <td>
      No
    </td>
  </tr>
</tbody>
</table>

Dictionary inputs use `basePrice`, `productType` and `taxBehavior`. Responses may
contain additional product-type strings; the SDK preserves them. That does not
make those strings valid creation inputs.

## Read, update and archive

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    products = list(client.one_off_products.list_all({"includeArchived": True}))
    product = client.one_off_products.get("one_off_product_example")
    client.one_off_products.update(product.id, {"name": "Revised handbook"})
    client.one_off_products.archive(product.id)
    return products, client.one_off_products.unarchive(product.id)
```

Archiving stops new sales and returns None. Unarchiving returns the product.
Live catalog changes may await approval; test-mode changes are auto-approved.

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
    </td>
    
    <td>
      <code>
        one_off_product_...
      </code>
      
       catalog ID
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        name
      </code>
      
      , <code>
        description
      </code>
    </td>
    
    <td>
      Buyer-facing content
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base_price
      </code>
      
      , <code>
        product_type
      </code>
    </td>
    
    <td>
      Exact price and category
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

[Product API reference](https://docs.vatly.com/api-reference/one-off-products) · [All methods](/packages/python/api#one_off_products)
