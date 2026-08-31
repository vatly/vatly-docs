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
      
       is tax-<code>
        exclusive
      </code>
      
       (B2B) or tax-<code>
        inclusive
      </code>
      
       (B2C). Immutable after creation. See <code>
        Vatly\API\Types\TaxBehavior
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
        productType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Tax classification. Always <code>
        saas
      </code>
      
       for plans.
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
        archivedAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the plan was archived (ISO 8601), or <code>
        null
      </code>
      
       while it is open to new business. Use <code>
        $plan->isArchived()
      </code>
      
       for a boolean.
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
      
       when there is none. Only the fields that differ from the live plan are present.
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
      Lifecycle of a pending update: <code>
        pending
      </code>
      
      , <code>
        reviewing
      </code>
      
      , or <code>
        null
      </code>
      
      . See <code>
        Vatly\API\Types\UpdateStatus
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
      <code>
        exclusive
      </code>
      
       (default) or <code>
        inclusive
      </code>
      
      . Immutable after creation.
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
    'taxBehavior' => 'exclusive', // optional; defaults to 'exclusive'
]);

echo $plan->id;      // subscription_plan_...
echo $plan->status;  // 'pending' (live) or 'active' (test)
```

---

## Update a plan

`PATCH /v1/subscription-plans/:id`

Submit an update to a live plan. Each request is the **complete set of changes**
relative to the current live plan and must contain at least one field. In live
mode the change is held as a pending update and reviewed by Vatly before it takes
effect (`updateStatus` moves `pending` → `reviewing` → applied); in test mode it
is approved automatically. A request that nets to no change clears any pending
update; while an update is being reviewed, further requests return `409`.

The `interval` cannot be changed once the plan has ever been used by a
subscription (active or not) — that returns `409`. The price stays changeable.

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
      New display name (3–255 characters).
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
      New description.
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
      New price per interval as <code>
        ['value' => '9.00', 'currency' => 'EUR']
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
      New billing interval. Requires <code>
        intervalCount
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
      Required when <code>
        interval
      </code>
      
       is provided.
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
      <code>
        saas
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

```php
$plan = $vatly->subscriptionPlans->update('subscription_plan_abc123', [
    'name' => 'Pro Weekly',
    'basePrice' => ['value' => '9.00', 'currency' => 'EUR'],
    'interval' => 'week',
    'intervalCount' => 1,
]);

echo $plan->updateStatus;              // 'pending'
echo $plan->pendingUpdates->interval;  // 'week'
```

---

## Archive a plan

`POST /v1/subscription-plans/:id/archive`

Close a plan to new business. It is hidden from list calls (unless
`includeArchived=true`), refused by new checkouts, and can no longer be switched
to from a subscription update. Subscribers already on the plan are deliberately
untouched — a subscription snapshots its plan at signup and renews off that
snapshot, so archiving never cancels anyone or changes what they are billed.
Nothing is deleted; the plan keeps a non-null `archivedAt`. The call returns no
content.

```php
$vatly->subscriptionPlans->archive('subscription_plan_abc123');

// or, on a resource you already hold:
$plan->archive();
```

---

## Unarchive a plan

`DELETE /v1/subscription-plans/:id/archive`

Re-open an archived plan to new business. It reappears in listings and can be
added to checkouts and switched to again. Returns the plan, now open to new
business (`archivedAt` is `null`).

```php
$plan = $vatly->subscriptionPlans->unarchive('subscription_plan_abc123');
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
      Include archived plans in the list. Archived plans are hidden by default; pass <code>
        true
      </code>
      
       to see them (tell them apart by the non-null <code>
        archivedAt
      </code>
      
      ).
    </td>
  </tr>
</tbody>
</table>

```php
$plans = $vatly->subscriptionPlans->page();

foreach ($plans as $plan) {
    echo $plan->name . ': ' . $plan->basePrice->value . ' ' . $plan->basePrice->currency;
}

// Include archived plans in the listing:
$all = $vatly->subscriptionPlans->page(null, null, null, ['includeArchived' => true]);
```
