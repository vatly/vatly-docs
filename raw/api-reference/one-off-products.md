# One-off Products

> On this page, we'll dive into the different one-off product endpoints you can use to query your products programmatically.

A one-off product is a digital product that can be bought once. Products are configured in the Vatly dashboard and can be added to checkouts.

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
        prod_
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
        approved
      </code>
      
       (active and can be purchased), <code>
        draft
      </code>
      
       (not yet available), or <code>
        archived
      </code>
      
       (has been archived).
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

<code-group sync="lang">

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
      "id": "prod_abc123def456",
      "resource": "one_off_product",
      "testmode": false,
      "name": "Premium License",
      "description": "Lifetime access to all premium features",
      "basePrice": {
        "value": "99.99",
        "currency": "EUR"
      },
      "status": "approved",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/one-off-products/prod_abc123def456",
          "type": "application/json"
        }
      }
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/one-off-products?limit=10",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  },
  "count": 1
}
```

</code-group>

---

## Get a specific one-off product

`GET /v1/one-off-products/:id`

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
        id
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

<code-group sync="lang">

```bash [cURL]
curl https://api.vatly.com/v1/one-off-products/prod_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$product = $vatly->oneOffProducts->get('prod_abc123def456');
```

```json [Response]
{
  "id": "prod_abc123def456",
  "resource": "one_off_product",
  "testmode": false,
  "name": "Premium License",
  "description": "Lifetime access to all premium features",
  "basePrice": {
    "value": "99.99",
    "currency": "EUR"
  },
  "status": "approved",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/one-off-products/prod_abc123def456",
      "type": "application/json"
    }
  }
}
```

</code-group>
