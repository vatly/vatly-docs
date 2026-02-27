# Subscriptions

> On this page, we'll dive into the different subscription endpoints you can use to manage subscriptions programmatically.

## The Subscription API Resource

The subscription model contains all the information about recurring billing relationships with customers.

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
      Unique identifier for the subscription (starts with <code>
        sub_
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
        subscription
      </code>
      
      .
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
      ID of the customer who owns this subscription.
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
        name
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The name for the subscription (from the plan).
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
      The description for the subscription.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        billingAddress
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      The customer billing address for the subscription. Includes <code>
        fullName
      </code>
      
      , <code>
        companyName
      </code>
      
      , <code>
        vatNumber
      </code>
      
      , <code>
        streetAndNumber
      </code>
      
      , <code>
        streetAdditional
      </code>
      
      , <code>
        city
      </code>
      
      , <code>
        region
      </code>
      
      , <code>
        postalCode
      </code>
      
      , and <code>
        country
      </code>
      
      .
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
      The base price per billing cycle before taxes. A Money object with <code>
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
        quantity
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      The quantity for the subscription (e.g., number of seats).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        interval
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The billing interval. Can be <code>
        day
      </code>
      
      , <code>
        week
      </code>
      
      , <code>
        month
      </code>
      
      , or <code>
        year
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        intervalCount
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      The interval count, e.g., "3" for charging every 3 months.
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
      The status for the subscription. Can be <code>
        created
      </code>
      
      , <code>
        trial
      </code>
      
      , <code>
        active
      </code>
      
      , <code>
        canceled
      </code>
      
      , <code>
        on_grace_period
      </code>
      
      , or <code>
        paused
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        startedAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the subscription started (ISO 8601 format).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        endedAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the subscription ended (ISO 8601 format). Null if the subscription is still active.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cancelledAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the subscription was cancelled (ISO 8601 format). Null if not cancelled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        renewedAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the subscription was last renewed (ISO 8601 format).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        renewedUntil
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Current billing period end date (ISO 8601 format).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        nextRenewalAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the next renewal will be attempted (ISO 8601 format). Null if subscription is canceled or ended.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trialUntil
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the trial period ends (ISO 8601 format). Null if not in trial or trial has ended.
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
      
       and <code>
        customer
      </code>
      
       links.
    </td>
  </tr>
</tbody>
</table>

---

## List all subscriptions

`GET /v1/subscriptions`

This endpoint allows you to retrieve a paginated list of all subscriptions across your account.

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
      The number of subscriptions to return (default: 10, max: 100).
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
      A cursor for use in pagination. Returns results after this subscription ID.
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
      A cursor for use in pagination. Returns results before this subscription ID.
    </td>
  </tr>
</tbody>
</table>

<code-group>

```bash [cURL]
curl -G https://api.vatly.com/v1/subscriptions \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscriptions = $vatly->subscriptions->page();
```

```json [Response]
{
  "data": [
    {
      "id": "sub_abc123def456",
      "resource": "subscription",
      "customerId": "cus_xyz789",
      "testmode": false,
      "name": "Premium Plan",
      "description": "Access to all premium features",
      "billingAddress": {
        "fullName": "John Doe",
        "companyName": null,
        "vatNumber": null,
        "streetAndNumber": "123 Main St",
        "streetAdditional": "Suite 123",
        "city": "Anytown",
        "region": "CA",
        "postalCode": "12345",
        "country": "US"
      },
      "basePrice": {
        "value": "99.99",
        "currency": "EUR"
      },
      "quantity": 1,
      "interval": "month",
      "intervalCount": 1,
      "status": "active",
      "startedAt": "2023-01-01T00:00:00Z",
      "endedAt": null,
      "cancelledAt": null,
      "renewedAt": "2023-06-01T00:00:00Z",
      "renewedUntil": "2023-07-01T00:00:00Z",
      "nextRenewalAt": "2023-07-01T00:00:00Z",
      "trialUntil": null,
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/subscriptions/sub_abc123def456",
          "type": "application/json"
        },
        "customer": {
          "href": "https://api.vatly.com/v1/customers/cus_xyz789",
          "type": "application/json"
        }
      }
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions?limit=10",
      "type": "application/json"
    },
    "next": {
      "href": "https://api.vatly.com/v1/subscriptions?startingAfter=sub_abc123def456&limit=10",
      "type": "application/json"
    },
    "prev": null
  },
  "count": 1
}
```

</code-group>

---

## Get a subscription

`GET /v1/subscriptions/:id`

This endpoint allows you to retrieve a specific subscription by its ID.

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
        subscriptionId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the subscription.
    </td>
  </tr>
</tbody>
</table>

<code-group>

```bash [cURL]
curl https://api.vatly.com/v1/subscriptions/sub_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscription = $vatly->subscriptions->get('sub_abc123def456');
```

```json [Response]
{
  "id": "sub_abc123def456",
  "resource": "subscription",
  "customerId": "cus_xyz789",
  "testmode": false,
  "name": "Premium Plan",
  "description": "Access to all premium features",
  "billingAddress": {
    "fullName": "John Doe",
    "companyName": null,
    "vatNumber": null,
    "streetAndNumber": "123 Main St",
    "streetAdditional": "Suite 123",
    "city": "Anytown",
    "region": "CA",
    "postalCode": "12345",
    "country": "US"
  },
  "basePrice": {
    "value": "99.99",
    "currency": "EUR"
  },
  "quantity": 1,
  "interval": "month",
  "intervalCount": 1,
  "status": "active",
  "startedAt": "2023-01-01T00:00:00Z",
  "endedAt": null,
  "cancelledAt": null,
  "renewedAt": "2023-06-01T00:00:00Z",
  "renewedUntil": "2023-07-01T00:00:00Z",
  "nextRenewalAt": "2023-07-01T00:00:00Z",
  "trialUntil": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/sub_abc123def456",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/cus_xyz789",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## List customer subscriptions

`GET /v1/customers/:customerId/subscriptions`

This endpoint allows you to retrieve a paginated list of all subscriptions for a specific customer.

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
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the customer.
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
      The number of subscriptions to return (default: 10, max: 100).
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
      A cursor for use in pagination. Returns results after this subscription ID.
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
      A cursor for use in pagination. Returns results before this subscription ID.
    </td>
  </tr>
</tbody>
</table>

<code-group>

```bash [cURL]
curl -G https://api.vatly.com/v1/customers/cus_xyz789/subscriptions \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscriptions = $vatly->customers->subscriptions('cus_xyz789')->page();
```

```json [Response]
{
  "data": [
    {
      "id": "sub_abc123def456",
      "resource": "subscription",
      "customerId": "cus_xyz789",
      "testmode": false,
      "name": "Premium Plan",
      "description": "Access to all premium features",
      "status": "active",
      "startedAt": "2023-01-01T00:00:00Z",
      "nextRenewalAt": "2023-07-01T00:00:00Z"
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers/cus_xyz789/subscriptions?limit=10",
      "type": "application/json"
    },
    "next": {
      "href": "https://api.vatly.com/v1/customers/cus_xyz789/subscriptions?startingAfter=sub_abc123def456&limit=10",
      "type": "application/json"
    },
    "prev": null
  },
  "count": 1
}
```

</code-group>

---

## Get a customer subscription

`GET /v1/customers/:customerId/subscriptions/:subscriptionId`

This endpoint allows you to retrieve a specific subscription for a specific customer.

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
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the customer.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the subscription.
    </td>
  </tr>
</tbody>
</table>

<code-group>

```bash [cURL]
curl https://api.vatly.com/v1/customers/cus_xyz789/subscriptions/sub_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscription = $vatly->customers->subscriptions('cus_xyz789')->get('sub_abc123def456');
```

```json [Response]
{
  "id": "sub_abc123def456",
  "resource": "subscription",
  "customerId": "cus_xyz789",
  "testmode": false,
  "name": "Premium Plan",
  "description": "Access to all premium features",
  "billingAddress": {
    "fullName": "John Doe",
    "companyName": null,
    "vatNumber": null,
    "streetAndNumber": "123 Main St",
    "streetAdditional": "Suite 123",
    "city": "Anytown",
    "region": "CA",
    "postalCode": "12345",
    "country": "US"
  },
  "basePrice": {
    "value": "99.99",
    "currency": "EUR"
  },
  "quantity": 1,
  "interval": "month",
  "intervalCount": 1,
  "status": "active",
  "startedAt": "2023-01-01T00:00:00Z",
  "endedAt": null,
  "cancelledAt": null,
  "renewedAt": "2023-06-01T00:00:00Z",
  "renewedUntil": "2023-07-01T00:00:00Z",
  "nextRenewalAt": "2023-07-01T00:00:00Z",
  "trialUntil": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/sub_abc123def456",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/cus_xyz789",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Update a subscription

`PATCH /v1/subscriptions/:id`

This endpoint allows you to update a subscription. You can change the plan, quantity, or apply proration settings.

### Optional attributes

At least one of `subscriptionPlanId` or `quantity` must be provided.

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
        subscriptionPlanId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The ID of the subscription plan to update to (starts with <code>
        plan_
      </code>
      
      ). Must match the testmode of the current subscription.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        quantity
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      The new quantity for the subscription. Must be at least 1.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        prorate
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether to prorate charges for the partial billing period. If true, the customer is credited for unused time on the old plan and charged for remaining time on the new plan. Default: <code>
        true
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        applyImmediately
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether to apply changes immediately or at the end of the current billing period. Default: <code>
        false
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        invoiceImmediately
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether to generate an invoice immediately for proration. Only applies when <code>
        applyImmediately
      </code>
      
       and <code>
        prorate
      </code>
      
       are both true. Default: <code>
        false
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        anchor
      </code>
    </td>
    
    <td>
      <code>
        date
      </code>
    </td>
    
    <td>
      Reset the billing anchor to this date. Cannot be combined with <code>
        trialUntil
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trialUntil
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Extend or set a trial period until this date (ISO 8601 format). Cannot be combined with <code>
        anchor
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

<code-group>

```bash [cURL]
curl -X PATCH https://api.vatly.com/v1/subscriptions/sub_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriptionPlanId": "plan_yearly123",
    "quantity": 3,
    "prorate": true,
    "applyImmediately": true
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscription = $vatly->subscriptions->update('sub_abc123def456', [
    'subscriptionPlanId' => 'plan_yearly123',
    'quantity' => 3,
    'prorate' => true,
    'applyImmediately' => true,
]);
```

```json [Response]
{
  "id": "sub_abc123def456",
  "resource": "subscription",
  "customerId": "cus_xyz789",
  "testmode": false,
  "name": "Premium Yearly",
  "description": "Access to all premium features, billed annually",
  "billingAddress": {
    "fullName": "John Doe",
    "companyName": null,
    "vatNumber": null,
    "streetAndNumber": "123 Main St",
    "streetAdditional": "Suite 123",
    "city": "Anytown",
    "region": "CA",
    "postalCode": "12345",
    "country": "US"
  },
  "basePrice": {
    "value": "999.00",
    "currency": "EUR"
  },
  "quantity": 3,
  "interval": "year",
  "intervalCount": 1,
  "status": "active",
  "startedAt": "2023-01-01T00:00:00Z",
  "endedAt": null,
  "cancelledAt": null,
  "renewedAt": "2023-06-01T00:00:00Z",
  "renewedUntil": "2024-06-01T00:00:00Z",
  "nextRenewalAt": "2024-06-01T00:00:00Z",
  "trialUntil": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/sub_abc123def456",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/cus_xyz789",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Update subscription billing details

`PATCH /v1/subscriptions/:id/update-billing`

This endpoint initiates a hosted flow for updating subscription billing details. It returns a URL where the customer can update their billing address, VAT number, and other invoice details.

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
        redirectUrlSuccess
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      URL to redirect after successful billing update.
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
      URL to redirect if customer cancels the update.
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
        billingAddress
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      Pre-fill billing address fields. Customer can modify these values in the hosted form.
    </td>
  </tr>
</tbody>
</table>

<code-group>

```bash [cURL]
curl -X PATCH https://api.vatly.com/v1/subscriptions/sub_abc123def456/update-billing \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "redirectUrlSuccess": "https://example.com/billing-updated",
    "redirectUrlCanceled": "https://example.com/billing-canceled",
    "billingAddress": {
      "country": "NL",
      "streetAndNumber": "456 New St",
      "city": "Amsterdam",
      "postalCode": "1012AB"
    }
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$response = $vatly->subscriptions->updateBilling('sub_abc123def456', [
    'redirectUrlSuccess' => 'https://example.com/billing-updated',
    'redirectUrlCanceled' => 'https://example.com/billing-canceled',
    'billingAddress' => [
        'country' => 'NL',
        'streetAndNumber' => '456 New St',
        'city' => 'Amsterdam',
        'postalCode' => '1012AB',
    ],
]);

// Redirect the customer to the hosted billing update page
header('Location: ' . $response->href, true, 303);
```

```json [Response]
{
  "href": "https://vatly.com/subscriptions/sub_abc123def456/billing?token=xyz...",
  "type": "text/html"
}
```

</code-group>

---

## Cancel a subscription

`DELETE /v1/subscriptions/:id`

This endpoint allows you to cancel a subscription. By default, the subscription will remain active until the end of the current billing period (grace period), after which it will be fully canceled. Set `immediately=true` to cancel immediately.

### Optional query parameters

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
        immediately
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Cancel immediately instead of at period end. Default: <code>
        false
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

<code-group>

```bash [cURL]
curl -X DELETE https://api.vatly.com/v1/subscriptions/sub_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```bash [cURL (immediate)]
curl -X DELETE "https://api.vatly.com/v1/subscriptions/sub_abc123def456?immediately=true" \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->subscriptions->cancel('sub_abc123def456');
```

</code-group>

Returns `204 No Content` on success.
