# Customers

> On this page, we'll dive into the different customer endpoints you can use to manage your Vatly customers programmatically.

## The Customer API Resource

Below you'll find all properties for the Vatly Customer API resource.

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
      Unique identifier for the customer (starts with <code>
        customer_
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
        customer
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
      Whether this resource is in test mode.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        email
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The customer's email address. Internationalized domains are stored and returned in their Punycode (ASCII) form per UTS #46 — e.g. <code>
        user@xn--mller-kva.de
      </code>
      
      . Convert back to Unicode for display in your own UI.
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
        string | null
      </code>
    </td>
    
    <td>
      The customer's display / account-holder name. An identity field used for communication (dunning emails, dashboard) — distinct from, and with no effect on, the billing name on invoices.
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
      When this customer was created (ISO 8601 format).
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
        object | null
      </code>
    </td>
    
    <td>
      Arbitrary key-value metadata for your application. Up to 50 keys, with key names up to 40 characters and values up to 500 characters.
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

## List all customers

`GET /v1/customers`

This endpoint allows you to retrieve a paginated list of all your customers. By default, a maximum of ten customers are shown per page.

Pass `email` to filter the list down to the customers holding an address — the way back to a customer id you no longer have.

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
        email
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Return customers with this email address, within the storefront and mode the API token is scoped to. Canonicalized before matching, exactly as on write. Beyond that the comparison is exact, so <code>
        büyer@example.com
      </code>
      
       does not match <code>
        buyer@example.com
      </code>
      
      . An address can be held by more than one customer, in which case all of them are returned. A value that is not a valid email address returns <code>
        422
      </code>
      
      .
    </td>
  </tr>
  
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
      The number of customers to return (default: 10, max: 100).
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
      A cursor for use in pagination. Returns results after this customer ID.
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
      A cursor for use in pagination. Returns results before this customer ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/customers \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d email=john.doe@example.com
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$customers = $vatly->customers->page(['email' => 'john.doe@example.com']);
```

```json [Response]
{
  "data": [
    {
      "id": "customer_7kBmRtPvXw2NjLhYcZaE",
      "resource": "customer",
      "testmode": false,
      "email": "john.doe@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-15T10:30:00Z",
      "metadata": {
        "userId": "user_Qp8kNvBxKw7RjTgYcZaE"
      },
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/customers/customer_7kBmRtPvXw2NjLhYcZaE",
          "type": "application/json"
        }
      }
    },
    {
      "id": "customer_Lp3mNvBxKw7RjTgYcZaE",
      "resource": "customer",
      "testmode": false,
      "email": "jane.smith@acme.com",
      "name": "Jane Smith",
      "createdAt": "2024-01-10T08:15:00Z",
      "metadata": {},
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 2,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Create a customer

`POST /v1/customers`

Creates a customer, or returns the one that already holds the address.

Customers are uniquely identified by email within a storefront and testmode, and this endpoint is get-or-create on that key: posting an address that already exists returns the existing customer rather than a validation error, so an integration that lost its Vatly customer id can always get back to it. The status code says which happened:

<table>
<thead>
  <tr>
    <th>
      Status
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
        201
      </code>
    </td>
    
    <td>
      The customer was created by this request.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        200
      </code>
    </td>
    
    <td>
      A customer with this email already existed and is returned unchanged.
    </td>
  </tr>
</tbody>
</table>

A `200` response never modifies the customer — `name` and `metadata` in the request body are ignored for an existing customer. Use [`PATCH /v1/customers/:id`](#update-a-customer) to change one.

A `201` can also complete a create that was interrupted before it finished, in which case the customer keeps the `id` and `createdAt` of that earlier attempt — so `createdAt` may predate the request. Treat it as when the customer came into being, not as when this call happened.

Addresses are canonicalized before they are compared, so `User@MÜLLER.de` and `user@xn--mller-kva.de` are the same customer. Beyond that the comparison is exact — `büyer@example.com` is a different mailbox and gets its own customer.

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
        email
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The email address for the customer. Must be unique within the merchant's account for the given testmode.
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
        name
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The customer's display / account-holder name (max 255 characters).
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
    </td>
    
    <td>
      Arbitrary key-value metadata for your application.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/customers \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com", "metadata": {"userId": "user_Qp8kNvBxKw7RjTgYcZaE"}}'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->customers->create([
  'email' => 'customer@example.com',
  'metadata' => [
    'userId' => 'user_Qp8kNvBxKw7RjTgYcZaE',
  ],
]);
```

```json [Response]
{
  "id": "customer_7kBmRtPvXw2NjLhYcZaE",
  "resource": "customer",
  "testmode": false,
  "email": "customer@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "metadata": {
    "userId": "user_Qp8kNvBxKw7RjTgYcZaE"
  },
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers/customer_7kBmRtPvXw2NjLhYcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Retrieve a customer

`GET /v1/customers/:id`

This endpoint allows you to retrieve a customer by providing their Vatly id. Refer to [the list](#the-customer-api-resource) at the top of this page to see which properties are included with customer objects.

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/customers/customer_7kBmRtPvXw2NjLhYcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->customers->get('customer_7kBmRtPvXw2NjLhYcZaE');
```

```json [Response]
{
  "id": "customer_7kBmRtPvXw2NjLhYcZaE",
  "resource": "customer",
  "testmode": false,
  "email": "john.doe@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "metadata": {
    "userId": "user_Qp8kNvBxKw7RjTgYcZaE"
  },
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers/customer_7kBmRtPvXw2NjLhYcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Update a customer

`PATCH /v1/customers/:id`

Updates a customer's identity fields. Only `name` and `email` may be changed here, and both are optional — send whichever you want to update.

Billing-address details (company name, tax ID, street, city, country, etc.) are **not** supported by this endpoint and are ignored. Amend those through the [hosted billing-update flow](/api-reference/subscriptions#create-billing-update-link), which validates tax-relevant data centrally so invoices stay accurate.

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
        name
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      The customer's display / account-holder name (max 255 characters).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        email
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The customer's email address. Must be unique within the merchant's account for the given testmode.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X PATCH https://api.vatly.com/v1/customers/customer_7kBmRtPvXw2NjLhYcZaE \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "new.email@example.com"}'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$customer = $vatly->customers->update('customer_7kBmRtPvXw2NjLhYcZaE', [
  'name' => 'John Doe',
  'email' => 'new.email@example.com',
]);
```

```json [Response]
{
  "id": "customer_7kBmRtPvXw2NjLhYcZaE",
  "resource": "customer",
  "testmode": false,
  "email": "new.email@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "metadata": {
    "userId": "user_Qp8kNvBxKw7RjTgYcZaE"
  },
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers/customer_7kBmRtPvXw2NjLhYcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Create a customer portal session

`POST /v1/customers/:customerId/portal-sessions`

Creates a short-lived, single-use link that sends an authenticated customer straight to this API token's storefront in Vatly's hosted portal. The session is locked to the customer, storefront, merchant, and live/test mode represented by the token; it never exposes a storefront picker or other stores associated with the same email address.

Redirect the customer's browser to `url`. The link expires after roughly 15 minutes by default and can be consumed once. If an idempotency key replays a response after its URL has already been used, request a replacement with a fresh key.

The response is credential-bearing, so it is returned with `Cache-Control: no-store, private`. Do not log or store the `url`.

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
        returnUrl
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Absolute HTTPS URL without embedded credentials, rendered as a return link in the hosted portal (max 2048 bytes). Vatly never fetches or automatically redirects to this URL.
    </td>
  </tr>
</tbody>
</table>

### Response

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
        url
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Single-use HTTPS URL to redirect the customer to.
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
    </td>
    
    <td>
      Expiry of the one-time entry link, not of the resulting browser session (ISO 8601 format).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        returnUrl
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      The validated absolute HTTPS return URL supplied in the request, or <code>
        null
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/customers/customer_7kBmRtPvXw2NjLhYcZaE/portal-sessions \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"returnUrl": "https://merchant.example/account/billing"}'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->customers->createPortalSession('customer_7kBmRtPvXw2NjLhYcZaE', [
  'returnUrl' => 'https://merchant.example/account/billing',
]);
```

```json [Response]
{
  "url": "https://billing.vatly.com/authenticate?credential=...",
  "expiresAt": "2026-09-01T12:15:00Z",
  "returnUrl": "https://merchant.example/account/billing"
}
```

</code-group>
