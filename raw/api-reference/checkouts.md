# Checkouts

> On this page, we'll dive into the different checkout endpoints you can use to manage your checkouts programmatically.

## The Checkout API Resource

Below you'll find all properties for the Vatly Checkout API resource.

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
      Unique identifier for the checkout (starts with <code>
        chk_
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
        checkout
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        merchantId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Unique identifier for the merchant this checkout belongs to.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orderId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      Unique identifier for the order created from this checkout. Only available when the checkout has been paid successfully.
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
      Whether this checkout is in test mode.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirectUrlSuccess
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The URL to which the checkout should redirect the user after the checkout has been paid successfully.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirectUrlCanceled
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The URL to which the user should get redirected when the user cancels the checkout.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        metadata
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      Arbitrary key-value metadata for your application. Up to 50 keys, with key names up to 40 characters and values up to 500 characters.
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
      The status of the checkout. Can be <code>
        created
      </code>
      
      , <code>
        paid
      </code>
      
      , <code>
        canceled
      </code>
      
      , <code>
        failed
      </code>
      
      , or <code>
        expired
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        expiresAt
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      When this checkout will expire (ISO 8601 format).
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
      The moment the checkout was created, in ISO 8601 format.
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
        checkoutUrl
      </code>
      
       (the hosted checkout page URL), <code>
        self
      </code>
      
      , and optionally <code>
        order
      </code>
      
       (after completion).
    </td>
  </tr>
</tbody>
</table>

---

## List all checkouts

`GET /v1/checkouts`

This endpoint allows you to retrieve a paginated list of all your checkouts. By default, a maximum of ten checkouts are shown per page.

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
      The number of checkouts to return (default: 10, max: 100).
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
      A cursor for use in pagination. Returns results after this checkout ID.
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
      A cursor for use in pagination. Returns results before this checkout ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="lang">

```bash [cURL]
curl -G https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$checkouts = $vatly->checkouts->page();
```

```json [Response]
{
  "data": [
    {
      "id": "chk_abc123def456",
      "resource": "checkout",
      "merchantId": "mer_abc123",
      "orderId": "ord_xyz789",
      "testmode": false,
      "redirectUrlSuccess": "https://example.com/success",
      "redirectUrlCanceled": "https://example.com/canceled",
      "metadata": null,
      "status": "paid",
      "expiresAt": "2024-01-15T14:30:00Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "checkoutUrl": {
          "href": "https://pay.vatly.com/chk_abc123def456",
          "type": "text/html"
        },
        "self": {
          "href": "https://api.vatly.com/v1/checkouts/chk_abc123def456",
          "type": "application/json"
        },
        "order": {
          "href": "https://api.vatly.com/v1/orders/ord_xyz789",
          "type": "application/json"
        }
      }
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/checkouts?limit=10",
      "type": "application/json"
    },
    "next": {
      "href": "https://api.vatly.com/v1/checkouts?startingAfter=chk_abc123def456&limit=10",
      "type": "application/json"
    },
    "prev": null
  },
  "count": 1
}
```

</code-group>

---

## Create a checkout

`POST /v1/checkouts`

This endpoint allows you to start a new hosted Vatly Checkout. Make sure you have at least one subscription plan or one-off product configured in your Vatly account.

Once paid, any subscription plan product assigned to the checkout will kick off a new subscription for that plan.

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
        products
      </code>
    </td>
    
    <td>
      <code>
        array
      </code>
    </td>
    
    <td>
      An array of product objects to include in this checkout. Each product can have: <code>
        id
      </code>
      
       (required, starts with <code>
        prod_
      </code>
      
       or <code>
        plan_
      </code>
      
      ), <code>
        quantity
      </code>
      
       (optional, default: 1), <code>
        price
      </code>
      
       (optional, Money object), <code>
        trialDays
      </code>
      
       (optional, for subscription plans), <code>
        metadata
      </code>
      
       (optional).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirectUrlSuccess
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The URL to which the checkout should redirect the user after the checkout has been paid successfully.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirectUrlCanceled
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The URL to which the user should get redirected when the user cancels the checkout.
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
        metadata
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      Arbitrary key-value metadata for your application.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The ID for an existing customer to associate with this checkout. If provided, the customer's email will be pre-filled. Must match the testmode of the API token.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="lang">

```bash [cURL]
curl https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {"id": "prod_abc123", "quantity": 1},
      {"id": "plan_xyz789", "trialDays": 14}
    ],
    "redirectUrlSuccess": "https://example.com/success",
    "redirectUrlCanceled": "https://example.com/canceled"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$checkout = $vatly->checkouts->create([
  'products' => [
    ['id' => 'prod_abc123', 'quantity' => 1],
    ['id' => 'plan_xyz789', 'trialDays' => 14],
  ],
  'redirectUrlSuccess' => 'https://example.com/success',
  'redirectUrlCanceled' => 'https://example.com/canceled',
]);

// Redirect the user to the checkout URL
header('Location: ' . $checkout->links->checkoutUrl->href, true, 303);
```

```json [Response]
{
  "id": "chk_abc123def456",
  "resource": "checkout",
  "merchantId": "mer_abc123",
  "orderId": null,
  "testmode": false,
  "redirectUrlSuccess": "https://example.com/success",
  "redirectUrlCanceled": "https://example.com/canceled",
  "metadata": null,
  "status": "created",
  "expiresAt": "2024-01-15T14:30:00Z",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "checkoutUrl": {
      "href": "https://pay.vatly.com/chk_abc123def456",
      "type": "text/html"
    },
    "self": {
      "href": "https://api.vatly.com/v1/checkouts/chk_abc123def456",
      "type": "application/json"
    },
    "order": null
  }
}
```

</code-group>

---

## Retrieve a checkout

`GET /v1/checkouts/:id`

This endpoint allows you to retrieve a checkout by providing the checkout id. Refer to [the list](#the-checkout-api-resource) at the top of this page to see which properties are included with checkout objects.

<code-group sync="lang">

```bash [cURL]
curl https://api.vatly.com/v1/checkouts/chk_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$checkout = $vatly->checkouts->get('chk_abc123def456');
```

```json [Response]
{
  "id": "chk_abc123def456",
  "resource": "checkout",
  "merchantId": "mer_abc123",
  "orderId": "ord_xyz789",
  "testmode": false,
  "redirectUrlSuccess": "https://example.com/success",
  "redirectUrlCanceled": "https://example.com/canceled",
  "metadata": null,
  "status": "paid",
  "expiresAt": "2024-01-15T14:30:00Z",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "checkoutUrl": {
      "href": "https://pay.vatly.com/chk_abc123def456",
      "type": "text/html"
    },
    "self": {
      "href": "https://api.vatly.com/v1/checkouts/chk_abc123def456",
      "type": "application/json"
    },
    "order": {
      "href": "https://api.vatly.com/v1/orders/ord_xyz789",
      "type": "application/json"
    }
  }
}
```

</code-group>
