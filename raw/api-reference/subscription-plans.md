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
      
       already includes tax and the net is back-computed from the buyer's jurisdiction.
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
      
      , the B2B convention) or tax-inclusive (<code>
        inclusive
      </code>
      
      , the B2C convention). Immutable after plan creation — create a new plan for the other mode. A checkout may not mix products with different <code>
        taxBehavior
      </code>
      
       values.
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
        productType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      What kind of product this plan sells. Always <code>
        saas
      </code>
      
       — an e-book is a one-time purchase, so sell it as a one-off product instead. Set when the plan is created.
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
        archivedAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When this plan was archived (ISO 8601), or <code>
        null
      </code>
      
       while it is open to new business. Always present. An archived plan is hidden from <code>
        GET /v1/subscription-plans
      </code>
      
      , refused by <code>
        POST /v1/checkouts
      </code>
      
      , and cannot be switched to from <code>
        PATCH /v1/subscriptions/:id
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
      
       when there is no pending update. Only the fields that actually differ from the live plan are present.
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

This endpoint retrieves a paginated list of all subscription plans. Only plans with `active` status can be used in checkouts. Archived plans are excluded unless `includeArchived=true` is passed.

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
      Include archived plans in the listing. Archived plans are hidden by default because they cannot be sold; set this to <code>
        true
      </code>
      
       to see them alongside the live ones (tell them apart by the non-null <code>
        archivedAt
      </code>
      
      ). Default: <code>
        false
      </code>
      
      .
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
      "taxBehavior": "exclusive",
      "interval": "month",
      "intervalCount": 1,
      "productType": "saas",
      "status": "active",
      "archivedAt": null,
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
      "taxBehavior": "exclusive",
      "interval": "year",
      "intervalCount": 1,
      "productType": "saas",
      "status": "active",
      "archivedAt": null,
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
      
      , the B2B convention) or tax-inclusive (<code>
        inclusive
      </code>
      
      , the B2C convention). Defaults to <code>
        exclusive
      </code>
      
      . Immutable after plan creation — create a new plan for the other mode.
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
  "taxBehavior": "exclusive",
  "interval": "month",
  "intervalCount": 1,
  "productType": "saas",
  "status": "pending",
  "archivedAt": null,
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
  "taxBehavior": "exclusive",
  "interval": "month",
  "intervalCount": 1,
  "productType": "saas",
  "status": "active",
  "archivedAt": null,
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

## Update a subscription plan

`PATCH /v1/subscription-plans/:id`

Submits an update to a live subscription plan. Because plans drive VAT-bearing recurring sales, the change is held as a pending update and reviewed by Vatly before it takes effect (`updateStatus` moves `pending` → `reviewing` → applied). In test mode the update is approved automatically.

Each request is the **complete set of changes** relative to the current live plan, and must contain at least one field. Fields equal to the live value are ignored, and a request that nets to no change clears any pending update. A new request replaces the not-yet-reviewed one; while an update is being reviewed, further requests return `409`. Changing the interval on a plan that has ever been used by a subscription — active or not — also returns `409`. The price stays changeable.

The submitted change is surfaced on the plan resource as `pendingUpdates` (only the fields that differ), with `updateStatus` tracking the review. Approval is signalled by the `subscriptionPlan.update_submitted`, `subscriptionPlan.update_approved`, and `subscriptionPlan.update_rejected` webhook events.

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
      The ID of the subscription plan to update.
    </td>
  </tr>
</tbody>
</table>

### Optional attributes

At least one field must be provided.

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
      New display name of the plan (3–255 characters).
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
      New description of the plan.
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
      New price per billing interval. A Money object with <code>
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
      New billing interval unit. One of <code>
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
      Number of interval units between billing cycles (at least 1). Required when <code>
        interval
      </code>
      
       is provided.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X PATCH https://api.vatly.com/v1/subscription-plans/subscription_plan_Bm7xNvPwKr3YjTgHcZaE \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Weekly",
    "basePrice": { "value": "9.00", "currency": "EUR" },
    "interval": "week",
    "intervalCount": 1
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$plan = $vatly->subscriptionPlans->update('subscription_plan_Bm7xNvPwKr3YjTgHcZaE', [
  'name' => 'Pro Weekly',
  'basePrice' => ['value' => '9.00', 'currency' => 'EUR'],
  'interval' => 'week',
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
  "taxBehavior": "exclusive",
  "interval": "month",
  "intervalCount": 1,
  "productType": "saas",
  "status": "active",
  "archivedAt": null,
  "pendingUpdates": {
    "name": "Pro Weekly",
    "basePrice": {
      "value": "9.00",
      "currency": "EUR"
    },
    "interval": "week",
    "intervalCount": 1
  },
  "updateStatus": "pending",
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

## Archive a subscription plan

`POST /v1/subscription-plans/:id/archive`

Closes the plan to new business. It is hidden from `GET /v1/subscription-plans` (unless `includeArchived=true`), refused by `POST /v1/checkouts`, and can no longer be switched to from `PATCH /v1/subscriptions/:id`.

Subscribers already on the plan are deliberately untouched: a subscription snapshots its plan at signup and renews off that snapshot, so archiving never cancels anyone or changes what they are billed. To end a subscription, cancel it with `DELETE /v1/subscriptions/:id`.

Likewise a checkout created before the plan was archived snapshots its product data at creation time and can still be completed. Archiving applies to *new* checkouts only.

Nothing is deleted — the plan remains readable by id, now carrying a non-null `archivedAt`. Repeating the request is a no-op that returns `204` and does not move `archivedAt`. Reverse it by [unarchiving the plan](#unarchive-a-subscription-plan).

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
      The ID of the subscription plan to archive.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/subscription-plans/subscription_plan_Bm7xNvPwKr3YjTgHcZaE/archive \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->subscriptionPlans->archive('subscription_plan_Bm7xNvPwKr3YjTgHcZaE');
```

</code-group>

Returns `204 No Content` on success (or if the plan was already archived).

---

## Unarchive a subscription plan

`DELETE /v1/subscription-plans/:id/archive`

Re-opens an archived plan to new business: it reappears in `GET /v1/subscription-plans` and can be added to checkouts and switched to again. Calling it on a plan that is not archived is a no-op. The refreshed plan is returned in the response body.

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
      The ID of the subscription plan to unarchive.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X DELETE https://api.vatly.com/v1/subscription-plans/subscription_plan_Wt5mNvBxKw7YcZaEjLhR/archive \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$plan = $vatly->subscriptionPlans->unarchive('subscription_plan_Wt5mNvBxKw7YcZaEjLhR');
```

```json [Response]
{
  "id": "subscription_plan_Wt5mNvBxKw7YcZaEjLhR",
  "resource": "subscription_plan",
  "testmode": false,
  "name": "Pro Monthly",
  "description": "Full access to all Pro features, billed monthly",
  "basePrice": {
    "value": "29.00",
    "currency": "EUR"
  },
  "taxBehavior": "exclusive",
  "interval": "month",
  "intervalCount": 1,
  "productType": "saas",
  "status": "active",
  "archivedAt": null,
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscription-plans/subscription_plan_Wt5mNvBxKw7YcZaEjLhR",
      "type": "application/json"
    }
  }
}
```

</code-group>
