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
        subscription_
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
        subscriptionPlanId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      ID of the subscription plan this subscription is based on (starts with <code>
        subscription_plan_
      </code>
      
      ).
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
        taxId
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
        mandate
      </code>
    </td>
    
    <td>
      <code>
        object | null
      </code>
    </td>
    
    <td>
      The payment method (mandate) on file. Contains <code>
        method
      </code>
      
       (e.g. <code>
        card
      </code>
      
      , <code>
        sepa_debit
      </code>
      
      , <code>
        paypal
      </code>
      
      , <code>
        bacs_debit
      </code>
      
      ) and <code>
        maskedIdentifier
      </code>
      
       (e.g. the last 4 digits). Null if no mandate is set.
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
      When the subscription actually ended (ISO 8601 format). Stays <code>
        null
      </code>
      
       during a cancellation grace period — it is only set once the subscription has fully ended.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        canceledAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the subscription was canceled (ISO 8601 format). Set while in <code>
        on_grace_period
      </code>
      
      , and cleared again if the subscription is resumed. Null if not canceled.
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

<code-group sync="api">

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
      "id": "subscription_Lp3mNvBxKw7RjTgYcZaE",
      "resource": "subscription",
      "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
      "testmode": false,
      "name": "Pro Monthly",
      "description": "Full access to all Pro features",
      "billingAddress": {
        "fullName": "John Doe",
        "companyName": "Acme Corp",
        "taxId": null,
        "streetAndNumber": "123 Main Street",
        "streetAdditional": null,
        "city": "Berlin",
        "region": null,
        "postalCode": "10115",
        "country": "DE"
      },
      "basePrice": {
        "value": "29.00",
        "currency": "EUR"
      },
      "quantity": 1,
      "interval": "month",
      "intervalCount": 1,
      "status": "active",
      "startedAt": "2024-01-15T10:30:00Z",
      "endedAt": null,
      "canceledAt": null,
      "renewedAt": "2024-02-15T10:30:00Z",
      "renewedUntil": "2024-03-15T10:30:00Z",
      "nextRenewalAt": "2024-03-15T10:30:00Z",
      "trialUntil": null,
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE",
          "type": "application/json"
        },
        "customer": {
          "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE",
          "type": "application/json"
        }
      }
    },
    {
      "id": "subscription_Wt5mNvBxKw7YcZaEjLhR",
      "resource": "subscription",
      "customerId": "customer_Mn6xBtPvKw2RjTgYcZaE",
      "testmode": false,
      "name": "Enterprise Yearly",
      "description": "Enterprise features with priority support",
      "billingAddress": {
        "fullName": "Jane Smith",
        "companyName": "TechCorp Ltd",
        "taxId": "GB123456789",
        "streetAndNumber": "456 Tech Lane",
        "streetAdditional": null,
        "city": "London",
        "region": null,
        "postalCode": "EC1A 1BB",
        "country": "GB"
      },
      "basePrice": {
        "value": "990.00",
        "currency": "EUR"
      },
      "quantity": 5,
      "interval": "year",
      "intervalCount": 1,
      "status": "active",
      "startedAt": "2024-01-01T00:00:00Z",
      "endedAt": null,
      "canceledAt": null,
      "renewedAt": "2024-01-01T00:00:00Z",
      "renewedUntil": "2025-01-01T00:00:00Z",
      "nextRenewalAt": "2025-01-01T00:00:00Z",
      "trialUntil": null,
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/subscriptions/subscription_Wt5mNvBxKw7YcZaEjLhR",
          "type": "application/json"
        },
        "customer": {
          "href": "https://api.vatly.com/v1/customers/customer_Mn6xBtPvKw2RjTgYcZaE",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 2,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
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

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscription = $vatly->subscriptions->get('subscription_Lp3mNvBxKw7RjTgYcZaE');
```

```json [Response]
{
  "id": "subscription_Lp3mNvBxKw7RjTgYcZaE",
  "resource": "subscription",
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
  "testmode": false,
  "name": "Pro Monthly",
  "description": "Full access to all Pro features",
  "billingAddress": {
    "fullName": "John Doe",
    "companyName": "Acme Corp",
    "taxId": null,
    "streetAndNumber": "123 Main Street",
    "streetAdditional": null,
    "city": "Berlin",
    "region": null,
    "postalCode": "10115",
    "country": "DE"
  },
  "basePrice": {
    "value": "29.00",
    "currency": "EUR"
  },
  "quantity": 1,
  "interval": "month",
  "intervalCount": 1,
  "status": "active",
  "startedAt": "2024-01-15T10:30:00Z",
  "endedAt": null,
  "canceledAt": null,
  "renewedAt": "2024-02-15T10:30:00Z",
  "renewedUntil": "2024-03-15T10:30:00Z",
  "nextRenewalAt": "2024-03-15T10:30:00Z",
  "trialUntil": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE",
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

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE/subscriptions \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscriptions = $vatly->customers->subscriptions('customer_Lp3mNvBxKw7RjTgYcZaE')->page();
```

```json [Response]
{
  "data": [
    {
      "id": "subscription_Lp3mNvBxKw7RjTgYcZaE",
      "resource": "subscription",
      "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
      "testmode": false,
      "name": "Pro Monthly",
      "description": "Full access to all Pro features",
      "billingAddress": {
        "fullName": "John Doe",
        "companyName": "Acme Corp",
        "taxId": null,
        "streetAndNumber": "123 Main Street",
        "streetAdditional": null,
        "city": "Berlin",
        "region": null,
        "postalCode": "10115",
        "country": "DE"
      },
      "basePrice": {
        "value": "29.00",
        "currency": "EUR"
      },
      "quantity": 1,
      "interval": "month",
      "intervalCount": 1,
      "status": "active",
      "startedAt": "2024-01-15T10:30:00Z",
      "endedAt": null,
      "canceledAt": null,
      "renewedAt": "2024-02-15T10:30:00Z",
      "renewedUntil": "2024-03-15T10:30:00Z",
      "nextRenewalAt": "2024-03-15T10:30:00Z",
      "trialUntil": null,
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE",
          "type": "application/json"
        },
        "customer": {
          "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE/subscriptions",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
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

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscription = $vatly->customers->subscriptions('customer_Lp3mNvBxKw7RjTgYcZaE')->get('subscription_Lp3mNvBxKw7RjTgYcZaE');
```

```json [Response]
{
  "id": "subscription_Lp3mNvBxKw7RjTgYcZaE",
  "resource": "subscription",
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
  "testmode": false,
  "name": "Pro Monthly",
  "description": "Full access to all Pro features",
  "billingAddress": {
    "fullName": "John Doe",
    "companyName": "Acme Corp",
    "taxId": null,
    "streetAndNumber": "123 Main Street",
    "streetAdditional": null,
    "city": "Berlin",
    "region": null,
    "postalCode": "10115",
    "country": "DE"
  },
  "basePrice": {
    "value": "29.00",
    "currency": "EUR"
  },
  "quantity": 1,
  "interval": "month",
  "intervalCount": 1,
  "status": "active",
  "startedAt": "2024-01-15T10:30:00Z",
  "endedAt": null,
  "canceledAt": null,
  "renewedAt": "2024-02-15T10:30:00Z",
  "renewedUntil": "2024-03-15T10:30:00Z",
  "nextRenewalAt": "2024-03-15T10:30:00Z",
  "trialUntil": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Update a subscription

`PATCH /v1/subscriptions/:id`

This endpoint allows you to update a subscription. You can change the plan, quantity, or recurring price, and control proration and timing.

### Optional attributes

At least one of `subscriptionPlanId`, `quantity`, or `price` must be provided.

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
        subscription_plan_
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
      The new total quantity for the subscription (e.g. number of seats). This sets the quantity to the given value — it is not added to the current quantity. Must be at least 1.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        price
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      Set a new recurring price while keeping the current plan. A Money object with <code>
        value
      </code>
      
       (decimal string) and <code>
        currency
      </code>
      
       (<code>
        EUR
      </code>
      
       or <code>
        USD
      </code>
      
      ); the currency must match the subscription's own currency. Sent alongside <code>
        subscriptionPlanId
      </code>
      
      , it overrides the new plan's default price.
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
      Set the billing anchor to a specific calendar date (<code>
        YYYY-MM-DD
      </code>
      
      , interpreted in UTC); the billing cycle is recalculated around it. Cannot be combined with <code>
        resetAnchor
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resetAnchor
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Reset the billing anchor to "now" — the moment the update is processed becomes the new cycle anchor and future renewals align to it. Cannot be combined with <code>
        anchor
      </code>
      
      . Default: <code>
        false
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

<code-group sync="api">

```bash [cURL]
curl -X PATCH https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriptionPlanId": "subscription_plan_Wt5mNvBxKw7YcZaEjLhR",
    "prorate": true,
    "applyImmediately": true
  }'
```

```bash [cURL (change price)]
curl -X PATCH https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "price": { "value": "29.00", "currency": "EUR" },
    "applyImmediately": true
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscription = $vatly->subscriptions->update('subscription_Lp3mNvBxKw7RjTgYcZaE', [
    'subscriptionPlanId' => 'subscription_plan_Wt5mNvBxKw7YcZaEjLhR',
    'prorate' => true,
    'applyImmediately' => true,
]);
```

```json [Response]
{
  "id": "subscription_Lp3mNvBxKw7RjTgYcZaE",
  "resource": "subscription",
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
  "testmode": false,
  "name": "Pro Yearly",
  "description": "Full access to all Pro features, billed yearly",
  "billingAddress": {
    "fullName": "John Doe",
    "companyName": "Acme Corp",
    "taxId": null,
    "streetAndNumber": "123 Main Street",
    "streetAdditional": null,
    "city": "Berlin",
    "region": null,
    "postalCode": "10115",
    "country": "DE"
  },
  "basePrice": {
    "value": "290.00",
    "currency": "EUR"
  },
  "quantity": 1,
  "interval": "year",
  "intervalCount": 1,
  "status": "active",
  "startedAt": "2024-01-15T10:30:00Z",
  "endedAt": null,
  "canceledAt": null,
  "renewedAt": "2024-02-15T10:30:00Z",
  "renewedUntil": "2025-02-15T10:30:00Z",
  "nextRenewalAt": "2025-02-15T10:30:00Z",
  "trialUntil": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Create billing update link

`POST /v1/subscriptions/:id/billing-update-link`

Creates a signed link that the customer can use to update the billing details for this subscription — billing address, VAT number, and company name — via a hosted flow.

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

<code-group sync="api">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE/billing-update-link \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "redirectUrlSuccess": "https://example.com/billing-updated",
    "redirectUrlCanceled": "https://example.com/account/billing",
    "billingAddress": {
      "companyName": "Acme Corp",
      "taxId": "DE123456789"
    }
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$response = $vatly->subscriptions->createBillingUpdateLink('subscription_Lp3mNvBxKw7RjTgYcZaE', [
    'redirectUrlSuccess' => 'https://example.com/billing-updated',
    'redirectUrlCanceled' => 'https://example.com/account/billing',
    'billingAddress' => [
        'companyName' => 'Acme Corp',
        'taxId' => 'DE123456789',
    ],
]);

// Redirect the customer to the hosted billing update page
header('Location: ' . $response->href, true, 303);
```

```json [Response]
{
  "href": "https://vatly.com/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE/billing?token=xyz...",
  "type": "text/html"
}
```

</code-group>

---

## Cancel a subscription

`DELETE /v1/subscriptions/:id`

This endpoint allows you to cancel a subscription. By default, the subscription will remain active until the end of the current billing period (grace period), after which it will be fully canceled. Set `immediately=true` to cancel immediately.

During the grace period the subscription's `status` is `on_grace_period` and `canceledAt` is set, while `endedAt` stays `null`. A grace-period cancellation can still be reversed with [Resume a subscription](#resume-a-subscription) until the period lapses. A subscription canceled with `immediately=true` (status `canceled`) cannot be reactivated — create a new subscription instead.

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
curl -X DELETE https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```bash [cURL (immediate)]
curl -X DELETE "https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE?immediately=true" \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->subscriptions->cancel('subscription_Lp3mNvBxKw7RjTgYcZaE');
```

</code-group>

Returns `204 No Content` on success.

---

## Resume a subscription

`POST /v1/subscriptions/:id/resume`

Resumes a subscription that was canceled **with a grace period**, while it is still within that period.

**When this works:**

- The subscription's `status` is `on_grace_period`.
- `endedAt` stays `null` throughout the grace period — resumability is keyed off `status`, not `endedAt`.

**Result:**

- Status returns to `active`.
- The existing billing cycle and renewal schedule are preserved (no new charge fires immediately) and the original payment mandate remains in effect.
- `canceledAt` is cleared and a `subscription.resumed` webhook is delivered.
- The refreshed subscription is returned in the response body.

**When this does not work** (returns `422`):

- The subscription was canceled immediately (`status` is `canceled`).
- The grace period has already lapsed (`status` is now `canceled` and `endedAt` is set).
- The subscription is already active (the no-op is rejected for clarity, not silently ignored).

In all of those cases, create a new subscription instead.

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
      The unique identifier of the subscription.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE/resume \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$subscription = $vatly->subscriptions->resume('subscription_Lp3mNvBxKw7RjTgYcZaE');
```

```json [Response]
{
  "id": "subscription_Lp3mNvBxKw7RjTgYcZaE",
  "resource": "subscription",
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
  "subscriptionPlanId": "subscription_plan_Rk5pQrSvWm8NjLhYbUcP",
  "testmode": false,
  "name": "Pro Monthly",
  "status": "active",
  "basePrice": {
    "value": "29.00",
    "currency": "EUR"
  },
  "quantity": 1,
  "interval": "month",
  "intervalCount": 1,
  "startedAt": "2024-01-15T10:30:00Z",
  "endedAt": null,
  "canceledAt": null,
  "renewedAt": "2024-02-15T10:30:00Z",
  "renewedUntil": "2024-03-15T10:30:00Z",
  "nextRenewalAt": "2024-03-15T10:30:00Z",
  "trialUntil": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>
