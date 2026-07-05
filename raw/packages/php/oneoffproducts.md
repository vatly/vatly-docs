# One-Off Products

> Vatly PHP SDK - One-Off Products

One-off products are single-purchase items (not recurring subscriptions). Create them in the Vatly dashboard or through the API, then use them in checkouts. Live products are reviewed and approved by Vatly before they can be added to checkouts.

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
        active
      </code>
      
       (purchasable), <code>
        pending
      </code>
      
       (awaiting approval), or <code>
        rejected
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

## Create a product

`POST /v1/one-off-products`

Create a one-off product. A product created with a `live_` token starts in
`pending` status and must be approved by Vatly before it can be added to
checkouts; a product created with a `test_` token is auto-approved (`active`) so
you can trial checkout immediately.

### Required attributes

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
        name
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Display name (3–255 characters).
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
        string
      </code>
    </td>
    
    <td>
      Detailed description of the product.
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
        array
      </code>
    </td>
    
    <td>
      Price as <code>
        ['value' => '299.00', 'currency' => 'EUR']
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        productType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Tax classification: <code>
        saas
      </code>
      
       or <code>
        ebook
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

```php
$product = $vatly->oneOffProducts->create([
    'name' => 'Premium License',
    'description' => 'Lifetime access to all premium features',
    'basePrice' => ['value' => '299.00', 'currency' => 'EUR'],
    'productType' => 'saas',
]);

echo $product->id;      // one_off_product_...
echo $product->status;  // 'pending' (live) or 'active' (test)
```

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
