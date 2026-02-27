# Subscription Plans

Subscription plans define recurring billing products. Create and manage plans in the Vatly dashboard, then use the API to retrieve them.

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
        plan_...
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
      `string
    </td>
    
    <td>
      null`
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        amount
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      Price in cents.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        currency
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Three-letter ISO currency code.
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
        trialDays
      </code>
    </td>
    
    <td>
      `integer
    </td>
    
    <td>
      null`
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
        approved
      </code>
      
      , <code>
        draft
      </code>
      
      , or <code>
        archived
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

## Retrieve a plan

`GET /v1/subscription-plans/:id`

Retrieve a subscription plan by its ID.

```php
$plan = $vatly->subscriptionPlans->get('plan_abc123');

echo $plan->name;
echo $plan->amount / 100 . ' ' . $plan->currency;
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
