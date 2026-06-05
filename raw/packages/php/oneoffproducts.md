# One-Off Products

> Vatly PHP SDK - One-Off Products

One-off products are single-purchase items (not recurring subscriptions). Create and manage them in the Vatly dashboard, then use the API to retrieve them.

## The One-Off Product Resource

Below you'll find all properties for the Vatly One-Off Product resource.

### Properties

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
      Unique identifier for the product (<code>
        one_off_product_...
      </code>
      
      ).
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
      Display name of the product.
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
      Description of the product.
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
      The price as a <code>
        Money
      </code>
      
       object — read <code>
        ->value
      </code>
      
       (decimal string) and <code>
        ->currency
      </code>
      
       (ISO 4217 code).
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
        bool
      </code>
    </td>
    
    <td>
      Whether this is a test product.
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
      The status: <code>
        approved
      </code>
      
      , <code>
        draft
      </code>
      
      , or <code>
        archived
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
</tbody>
</table>

---

## Retrieve a product

`GET /v1/one-off-products/:id`

Retrieve a one-off product by its ID.

```php
$product = $vatly->oneOffProducts->get('one_off_product_abc123');

echo $product->name;
echo $product->basePrice->value . ' ' . $product->basePrice->currency;
```

---

## List all products

`GET /v1/one-off-products`

Retrieve a paginated list of all one-off products.

### Optional attributes

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
        limit
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      The number of products to return (default: 10, max: 100).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        startingAfter
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      A cursor for pagination.
    </td>
  </tr>
</tbody>
</table>

```php
$products = $vatly->oneOffProducts->list();

foreach ($products as $product) {
    echo $product->name . ': ' . $product->basePrice->value . ' ' . $product->basePrice->currency;
}
```
