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
        cus_
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
      The email address for the customer.
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

<code-group>

```bash [cURL]
curl -G https://api.vatly.com/v1/customers \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$customers = $vatly->customers->page();
```

```json [Response]
{
  "data": [
    {
      "id": "cus_abc123def456",
      "resource": "customer",
      "testmode": false,
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00Z",
      "metadata": {},
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/customers/cus_abc123def456",
          "type": "application/json"
        }
      }
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers?limit=10",
      "type": "application/json"
    },
    "next": {
      "href": "https://api.vatly.com/v1/customers?startingAfter=cus_abc123def456&limit=10",
      "type": "application/json"
    },
    "prev": null
  },
  "count": 1
}
```

</code-group>

---

## Create a customer

`POST /v1/customers`

This endpoint allows you to add a new customer to Vatly. To add a customer, you must provide their email address.

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
      The email address for the customer.
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
</tbody>
</table>

<code-group>

```bash [cURL]
curl https://api.vatly.com/v1/customers \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com"}'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->customers->create([
  'email' => 'john@example.com',
]);
```

```json [Response]
{
  "id": "cus_abc123def456",
  "resource": "customer",
  "testmode": false,
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00Z",
  "metadata": {},
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers/cus_abc123def456",
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

<code-group>

```bash [cURL]
curl https://api.vatly.com/v1/customers/cus_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->customers->get('cus_abc123def456');
```

```json [Response]
{
  "id": "cus_abc123def456",
  "resource": "customer",
  "testmode": false,
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00Z",
  "metadata": {},
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers/cus_abc123def456",
      "type": "application/json"
    }
  }
}
```

</code-group>
