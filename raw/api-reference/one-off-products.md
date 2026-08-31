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
      Default price of the product (can be overridden in checkout). A Money object with <code>
        value
      </code>
      
       (decimal string) and <code>
        currency
      </code>
      
       (ISO 4217 code). Interpretation depends on <code>
        taxBehavior
      </code>
      
      : when <code>
        exclusive
      </code>
      
      , <code>
        basePrice
      </code>
      
       is the net amount and tax is added at checkout; when <code>
        inclusive
      </code>
      
      , <code>
        basePrice
      </code>
      
       already includes tax.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        taxBehavior
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Whether <code>
        basePrice
      </code>
      
       is tax-exclusive (<code>
        exclusive
      </code>
      
      , B2B convention; tax added on top at checkout) or tax-inclusive (<code>
        inclusive
      </code>
      
      , B2C convention; price already includes tax). Immutable after product creation. A checkout may not mix products with different <code>
        taxBehavior
      </code>
      
       values.
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
      
       (software supplied as a service) or <code>
        ebook
      </code>
      
       (an electronic publication supplied as a download or stream).
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
        archivedAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When this product was archived (ISO 8601), or <code>
        null
      </code>
      
       while it is on sale. Always present. An archived product is hidden from <code>
        GET /v1/one-off-products
      </code>
      
       and refused by <code>
        POST /v1/checkouts
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        pendingUpdates
      </code>
    </td>
    
    <td>
      <code>
        object | null
      </code>
    </td>
    
    <td>
      The changes that will take effect once a submitted update is approved, or <code>
        null
      </code>
      
       when there is no pending update. Only the fields that differ from the live product are present.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        updateStatus
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Lifecycle of a pending update, or <code>
        null
      </code>
      
       when there is none. Can be <code>
        pending
      </code>
      
       (an update was submitted and is awaiting review) or <code>
        reviewing
      </code>
      
       (the update is being reviewed).
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

Only products with `active` status can be used in checkouts. Archived products are excluded unless `includeArchived=true` is passed.

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
  
  <tr>
    <td>
      <code>
        includeArchived
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Include archived products in the listing (default: <code>
        false
      </code>
      
      ). Tell them apart by the non-null <code>
        archivedAt
      </code>
      
      .
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
      "taxBehavior": "exclusive",
      "productType": "saas",
      "status": "active",
      "archivedAt": null,
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
        taxBehavior
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Whether <code>
        basePrice
      </code>
      
       is tax-exclusive (<code>
        exclusive
      </code>
      
      , B2B convention) or tax-inclusive (<code>
        inclusive
      </code>
      
      , B2C convention). Defaults to <code>
        exclusive
      </code>
      
      . Immutable after product creation.
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
  "taxBehavior": "exclusive",
  "productType": "saas",
  "status": "pending",
  "archivedAt": null,
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
  "taxBehavior": "exclusive",
  "productType": "saas",
  "status": "active",
  "archivedAt": null,
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

## Request an update to a one-off product

`PATCH /v1/one-off-products/:oneOffProductId`

Submits an update to a live one-off product. Because products drive VAT-bearing sales, the change is held as a pending update and reviewed by Vatly before it takes effect (`updateStatus` moves `pending` → `reviewing` → applied). In test mode the update is approved automatically.

Each request is the **complete set of changes** relative to the current live product. Fields equal to the live value are ignored, and a request that nets to no change clears any pending update. A new request replaces the not-yet-reviewed one; while an update is being reviewed, further requests return `409`.

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
      The ID of the one-off product to update.
    </td>
  </tr>
</tbody>
</table>

### Optional attributes

At least one attribute must be provided. `taxBehavior` is immutable and cannot be changed here.

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
      New display name of the product (3–255 characters).
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
      New description of the product.
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
      New price of the product. A Money object with <code>
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
      New tax product classification. One of <code>
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

<code-group sync="api">

```bash [cURL]
curl -X PATCH https://api.vatly.com/v1/one-off-products/one_off_product_Vr8kQdFhSrG4Y3DnfsdqH \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium License v2",
    "basePrice": { "value": "349.00", "currency": "EUR" }
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$product = $vatly->oneOffProducts->update('one_off_product_Vr8kQdFhSrG4Y3DnfsdqH', [
  'name' => 'Premium License v2',
  'basePrice' => ['value' => '349.00', 'currency' => 'EUR'],
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
  "taxBehavior": "exclusive",
  "productType": "saas",
  "status": "active",
  "archivedAt": null,
  "pendingUpdates": {
    "name": "Premium License v2",
    "basePrice": {
      "value": "349.00",
      "currency": "EUR"
    }
  },
  "updateStatus": "pending",
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

## Archive a one-off product

`POST /v1/one-off-products/:oneOffProductId/archive`

Takes the product out of your sellable catalogue. It is hidden from `GET /v1/one-off-products` (unless `includeArchived=true`) and refused by `POST /v1/checkouts`; existing orders and refunds are untouched.

Archiving applies to *new* checkouts only. A checkout created before the product was archived snapshots its product data at creation time and can still be completed — the same window that applies when a product is rejected after a checkout was opened.

Nothing is deleted — the product remains readable by ID, now carrying a non-null `archivedAt`. Archiving is not queued behind Vatly's product review, and leaves any pending update in place. Repeating the request is a no-op that returns `204` and does not move `archivedAt`. Reverse it with `DELETE /v1/one-off-products/:oneOffProductId/archive`.

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
      The ID of the one-off product to archive.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/one-off-products/one_off_product_Vr8kQdFhSrG4Y3DnfsdqH/archive \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->oneOffProducts->archive('one_off_product_Vr8kQdFhSrG4Y3DnfsdqH');
```

</code-group>

Returns `204 No Content` on success (or when the product is already archived).

---

## Unarchive a one-off product

`DELETE /v1/one-off-products/:oneOffProductId/archive`

Puts an archived product back on sale: it reappears in `GET /v1/one-off-products` and can be added to checkouts again. Calling it on a product that is not archived is a no-op.

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
      The ID of the one-off product to unarchive.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X DELETE https://api.vatly.com/v1/one-off-products/one_off_product_Vr8kQdFhSrG4Y3DnfsdqH/archive \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$product = $vatly->oneOffProducts->unarchive('one_off_product_Vr8kQdFhSrG4Y3DnfsdqH');
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
  "taxBehavior": "exclusive",
  "productType": "saas",
  "status": "active",
  "archivedAt": null,
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
