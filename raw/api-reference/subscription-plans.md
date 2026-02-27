# Subscription Plans

> On this page, we'll dive into the different subscription plan endpoints you can use to query your plans programmatically.

## The subscription plan model

The subscription plan model contains all the information about the subscription plans you create, including the name, description, price, and billing interval.

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
      Unique identifier for the subscription plan (starts with <code>
        plan_
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
        subscription_plan
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
      Whether this plan is in test mode.
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
      Display name of the plan.
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
      Detailed description of the plan.
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
      Price per billing interval. A Money object with <code>
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
        interval
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Billing interval unit. Can be <code>
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
      Number of interval units between billing cycles. For example, <code>
        interval: month
      </code>
      
       with <code>
        intervalCount: 3
      </code>
      
       bills every 3 months.
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
      Current status of the plan. Can be <code>
        approved
      </code>
      
       (active and can be subscribed to), <code>
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
      When this plan was created (ISO 8601 format).
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

## List all subscription plans

`GET /v1/subscription-plans`

This endpoint retrieves a paginated list of all subscription plans.

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
        limit
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      The number of subscription plans to return (default: 10, max: 100).
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
      A cursor for use in pagination. Returns results after this plan ID.
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
      A cursor for use in pagination. Returns results before this plan ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="lang">

```bash [cURL]
curl -G https://api.vatly.com/v1/subscription-plans \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$plans = $vatly->subscriptionPlans->page();
```

```json [Response]
{
  "data": [
    {
      "id": "plan_abc123def456",
      "resource": "subscription_plan",
      "testmode": false,
      "name": "Pro Monthly",
      "description": "Full access to all Pro features, billed monthly",
      "basePrice": {
        "value": "29.99",
        "currency": "EUR"
      },
      "interval": "month",
      "intervalCount": 1,
      "status": "approved",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/subscription-plans/plan_abc123def456",
          "type": "application/json"
        }
      }
    },
    {
      "id": "plan_yearly789xyz",
      "resource": "subscription_plan",
      "testmode": false,
      "name": "Pro Yearly",
      "description": "Full access to all Pro features, billed yearly",
      "basePrice": {
        "value": "299.99",
        "currency": "EUR"
      },
      "interval": "year",
      "intervalCount": 1,
      "status": "approved",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/subscription-plans/plan_yearly789xyz",
          "type": "application/json"
        }
      }
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscription-plans?limit=10",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  },
  "count": 2
}
```

</code-group>

---

## Retrieve a subscription plan

`GET /v1/subscription-plans/:id`

This endpoint retrieves a specific subscription plan by its ID.

### URL parameters

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
      The ID of the subscription plan to retrieve.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="lang">

```bash [cURL]
curl https://api.vatly.com/v1/subscription-plans/plan_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$plan = $vatly->subscriptionPlans->get('plan_abc123def456');
```

```json [Response]
{
  "id": "plan_abc123def456",
  "resource": "subscription_plan",
  "testmode": false,
  "name": "Pro Monthly",
  "description": "Full access to all Pro features, billed monthly",
  "basePrice": {
    "value": "29.99",
    "currency": "EUR"
  },
  "interval": "month",
  "intervalCount": 1,
  "status": "approved",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscription-plans/plan_abc123def456",
      "type": "application/json"
    }
  }
}
```

</code-group>
