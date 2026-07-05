# Subscription Plans

> Vatly PHP SDK - Subscription Plans

Subscription plans define recurring billing products. Create them in the Vatly dashboard or through the API, then use them in checkouts. Live plans are reviewed and approved by Vatly before they can be added to checkouts.

## The Subscription Plan Resource

Below you'll find all properties for the Vatly Subscription Plan resource.

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
      Unique identifier for the plan (<code>
        subscription_plan_...
      </code>
      
      ).
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
        string | null
      </code>
    </td>
    
    <td>
      Description of the plan.
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
      Price per interval as a <code>
        Money
      </code>
      
       object — read <code>
        ->value
      </code>
      
       (decimal string) and <code>
        ->currency
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
      Billing interval: <code>
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
      Number of intervals between billings.
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
        bool
      </code>
    </td>
    
    <td>
      Whether this is a test plan.
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
      The status: <code>
        active
      </code>
      
       (subscribable), <code>
        pending
      </code>
      
       (awaiting approval), or <code>
        rejected
      </code>
      
      .
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
      Creation timestamp (ISO 8601).
    </td>
  </tr>
</tbody>
</table>

---

## Create a plan

`POST /v1/subscription-plans`

Create a subscription plan. A plan created with a `live_` token starts in
`pending` status and must be approved by Vatly before it can be added to
checkouts; a plan created with a `test_` token is auto-approved (`active`).

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
      Display name (3–255 characters).
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
        array
      </code>
    </td>
    
    <td>
      Price per interval as <code>
        ['value' => '29.00', 'currency' => 'EUR']
      </code>
      
      .
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
      Tax classification. Only <code>
        saas
      </code>
      
       is billable on a recurring basis.
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
      Billing interval unit. <code>
        day
      </code>
      
       is sandbox-only; live plans support <code>
        week
      </code>
      
      , <code>
        month
      </code>
      
      , <code>
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
      Interval units between billings (≤ 365 days / 52 weeks / 12 months). For <code>
        year
      </code>
      
      , billing is always annual and this is ignored.
    </td>
  </tr>
</tbody>
</table>

```php
$plan = $vatly->subscriptionPlans->create([
    'name' => 'Pro Monthly',
    'description' => 'Full access to all Pro features, billed monthly',
    'basePrice' => ['value' => '29.00', 'currency' => 'EUR'],
    'productType' => 'saas',
    'interval' => 'month',
    'intervalCount' => 1,
]);

echo $plan->id;      // subscription_plan_...
echo $plan->status;  // 'pending' (live) or 'active' (test)
```

---

## Retrieve a plan

`GET /v1/subscription-plans/:id`

Retrieve a subscription plan by its ID.

```php
$plan = $vatly->subscriptionPlans->get('subscription_plan_abc123');

echo $plan->name;
echo $plan->basePrice->value . ' ' . $plan->basePrice->currency;
echo $plan->interval;
```

---

## List all plans

`GET /v1/subscription-plans`

Retrieve a paginated list of all subscription plans.

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
      The number of plans to return (default: 10, max: 100).
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
      A cursor for pagination.
    </td>
  </tr>
</tbody>
</table>

```php
$plans = $vatly->subscriptionPlans->list();

foreach ($plans as $plan) {
    echo $plan->name . ': ' . ($plan->amount / 100) . ' ' . $plan->currency;
}
```
