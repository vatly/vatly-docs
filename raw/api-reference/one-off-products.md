# One-off Products

> On this page, we'll dive into the different one-off product endpoints you can use to query your products programmatically.

A one-off product is a digital product that can be bought once. Products can be created via the API or in the Vatly dashboard, and added to checkouts.

Looking for subscription plans? See the [Subscription Plans API](/api-reference/subscription-plans) instead.

## The one-off product model

Below you'll find all properties for the Vatly One-off Product API resource.

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
      Unique identifier for the product (starts with <code>
        one_off_product_
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resource
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The resource type. Always <code>
        one_off_product
      </code>
      
      .
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
      Whether this product is in test mode.
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
        Money
      </code>
    </td>
    
    <td>
      Default price of the product. A Money object with <code>
        value
      </code>
      
       (decimal string) and <code>
        currency
      </code>
      
       (ISO 4217 code). Can be overridden in checkout.
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
      Current status of the product. Can be <code>
        active
      </code>
      
       (product is active and can be purchased), <code>
        pending
      </code>
      
       (awaiting approval), or <code>
        rejected
      </code>
      
       (has been rejected).
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
      When this product was created (ISO 8601 format).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        links
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      HATEOAS links to related resources. Contains <code>
        self
      </code>
      
       link.
    </td>
  </tr>
</tbody>
</table>

---

## List all one-off products

`GET /v1/one-off-products`

This endpoint retrieves a paginated list of all one-off products.

Only products with `active` status can be used in checkouts.

### Optional parameters

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
      A cursor for use in pagination. Returns results after this product ID.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        endingBefore
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      A cursor for use in pagination. Returns results before this product ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/one-off-products \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$products = $vatly->oneOffProducts->page();
```

```json [Response]
{
  "data": [
    {
      "id": "one_off_product_Vr8kQdFhSrG4Y3DnfsdqH",
      "resource": "one_off_product",
      "testmode": false,
      "name": "Premium License",
      "description": "Lifetime access to all premium features",
      "basePrice": {
        "value": "299.00",
        "currency": "EUR"
      },
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/one-off-products/one_off_product_Vr8kQdFhSrG4Y3DnfsdqH",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/one-off-products",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Create a one-off product

`POST /v1/one-off-products`

Creates a new one-off product for the authenticated merchant, in the testmode determined from the API token.

A product created with a `live_` token starts in `pending` status and must be approved by Vatly before it can be used in checkouts — the same review that applies to products created in the dashboard. A product created with a `test_` token is auto-approved (`active`) so you can trial checkout immediately.

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
      Display name of the product (3–255 characters).
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
        Money
      </code>
    </td>
    
    <td>
      Price of the product. A Money object with <code>
        value
      </code>
      
       (decimal string) and <code>
        currency
      </code>
      
       (ISO 4217 code).
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
      Tax product classification. One of <code>
        saas
      </code>
      
       (Software as a Service) or <code>
        ebook
      </code>
      
       (electronic book).
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/one-off-products \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium License",
    "description": "Lifetime access to all premium features",
    "basePrice": { "value": "299.00", "currency": "EUR" },
    "productType": "saas"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$product = $vatly->oneOffProducts->create([
  'name' => 'Premium License',
  'description' => 'Lifetime access to all premium features',
  'basePrice' => ['value' => '299.00', 'currency' => 'EUR'],
  'productType' => 'saas',
]);
```

```json [Response]
{
  "id": "one_off_product_Vr8kQdFhSrG4Y3DnfsdqH",
  "resource": "one_off_product",
  "testmode": false,
  "name": "Premium License",
  "description": "Lifetime access to all premium features",
  "basePrice": {
    "value": "299.00",
    "currency": "EUR"
  },
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/one-off-products/one_off_product_Vr8kQdFhSrG4Y3DnfsdqH",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Get a specific one-off product

`GET /v1/one-off-products/:oneOffProductId`

This endpoint retrieves a specific one-off product by its ID.

### Parameters

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
        oneOffProductId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The ID of the one-off product to retrieve.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/one-off-products/one_off_product_Vr8kQdFhSrG4Y3DnfsdqH \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$product = $vatly->oneOffProducts->get('one_off_product_Vr8kQdFhSrG4Y3DnfsdqH');
```

```json [Response]
{
  "id": "one_off_product_Vr8kQdFhSrG4Y3DnfsdqH",
  "resource": "one_off_product",
  "testmode": false,
  "name": "Premium License",
  "description": "Lifetime access to all premium features",
  "basePrice": {
    "value": "299.00",
    "currency": "EUR"
  },
  "status": "active",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/one-off-products/one_off_product_Vr8kQdFhSrG4Y3DnfsdqH",
      "type": "application/json"
    }
  }
}
```

</code-group>
