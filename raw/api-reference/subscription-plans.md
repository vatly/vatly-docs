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
      Unique identifier for the subscription plan (always starts with <code>
        subscription_plan_
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
        active
      </code>
      
       (plan is active and can be subscribed to), <code>
        pending
      </code>
      
       (plan is awaiting approval), or <code>
        rejected
      </code>
      
       (plan has been rejected).
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

This endpoint retrieves a paginated list of all subscription plans. Only plans with `active` status can be used in checkouts.

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

<code-group sync="api">

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
      "id": "subscription_plan_Bm7xNvPwKr3YjTgHcZaE",
      "resource": "subscription_plan",
      "testmode": false,
      "name": "Pro Monthly",
      "description": "Full access to all Pro features, billed monthly",
      "basePrice": {
        "value": "29.00",
        "currency": "EUR"
      },
      "interval": "month",
      "intervalCount": 1,
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/subscription-plans/subscription_plan_Bm7xNvPwKr3YjTgHcZaE",
          "type": "application/json"
        }
      }
    },
    {
      "id": "subscription_plan_Wt5mNvBxKw7YcZaEjLhR",
      "resource": "subscription_plan",
      "testmode": false,
      "name": "Pro Yearly",
      "description": "Full access to all Pro features, billed yearly",
      "basePrice": {
        "value": "290.00",
        "currency": "EUR"
      },
      "interval": "year",
      "intervalCount": 1,
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/subscription-plans/subscription_plan_Wt5mNvBxKw7YcZaEjLhR",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 2,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscription-plans",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Create a subscription plan

`POST /v1/subscription-plans`

Creates a new subscription plan for the authenticated merchant, in the testmode determined from the API token.

A plan created with a `live_` token starts in `pending` status and must be approved by Vatly before it can be used in checkouts — the same review that applies to plans created in the dashboard. A plan created with a `test_` token is auto-approved (`active`) so you can trial checkout immediately.

**Constraints:**

- `productType` must be `saas` — e-books are one-off purchases and cannot be sold on a recurring basis.
- The `day` interval is sandbox-only; live plans support `week`, `month`, and `year`.
- `intervalCount` is bounded per unit: up to 365 days, 52 weeks, or 12 months. `year` always bills once per year (`intervalCount` is ignored).

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
      Display name of the plan (3–255 characters).
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
        productType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Tax product classification. Must be <code>
        saas
      </code>
      
      .
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
      Billing interval unit. One of <code>
        day
      </code>
      
       (sandbox-only), <code>
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
      Number of interval units between billing cycles (at least 1).
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/subscription-plans \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Monthly",
    "description": "Full access to all Pro features, billed monthly",
    "basePrice": { "value": "29.00", "currency": "EUR" },
    "productType": "saas",
    "interval": "month",
    "intervalCount": 1
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$plan = $vatly->subscriptionPlans->create([
  'name' => 'Pro Monthly',
  'description' => 'Full access to all Pro features, billed monthly',
  'basePrice' => ['value' => '29.00', 'currency' => 'EUR'],
  'productType' => 'saas',
  'interval' => 'month',
  'intervalCount' => 1,
]);
```

```json [Response]
{
  "id": "subscription_plan_Bm7xNvPwKr3YjTgHcZaE",
  "resource": "subscription_plan",
  "testmode": false,
  "name": "Pro Monthly",
  "description": "Full access to all Pro features, billed monthly",
  "basePrice": {
    "value": "29.00",
    "currency": "EUR"
  },
  "interval": "month",
  "intervalCount": 1,
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscription-plans/subscription_plan_Bm7xNvPwKr3YjTgHcZaE",
      "type": "application/json"
    }
  }
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

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/subscription-plans/subscription_plan_Bm7xNvPwKr3YjTgHcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$plan = $vatly->subscriptionPlans->get('subscription_plan_Bm7xNvPwKr3YjTgHcZaE');
```

```json [Response]
{
  "id": "subscription_plan_Bm7xNvPwKr3YjTgHcZaE",
  "resource": "subscription_plan",
  "testmode": false,
  "name": "Pro Monthly",
  "description": "Full access to all Pro features, billed monthly",
  "basePrice": {
    "value": "29.00",
    "currency": "EUR"
  },
  "interval": "month",
  "intervalCount": 1,
  "status": "active",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscription-plans/subscription_plan_Bm7xNvPwKr3YjTgHcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>
