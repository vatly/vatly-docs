# Subscriptions

> Vatly PHP SDK - Subscriptions

Subscriptions are created automatically when a customer completes a checkout for a subscription plan. You can then manage the subscription lifecycle through the API.

## The Subscription Resource

Below you'll find all properties for the Vatly Subscription resource.

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
      Unique identifier for the subscription (<code>
        sub_...
      </code>
      
      ).
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
      
      , <code>
        created
      </code>
      
      , <code>
        trial
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
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The customer ID.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        planId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The subscription plan ID.
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
      Whether this is a test subscription.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        currentPeriodStart
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Current billing period start (ISO 8601).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        currentPeriodEnd
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Current billing period end (ISO 8601).
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
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      When the subscription was canceled (ISO 8601).
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
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      When the subscription ended (ISO 8601).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trialStart
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      Trial period start (ISO 8601).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trialEnd
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      Trial period end (ISO 8601).
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
        array
      </code>
    </td>
    
    <td>
      Your custom metadata.
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

## Retrieve a subscription

`GET /v1/subscriptions/:id`

Retrieve a subscription by its ID.

```php
$subscription = $vatly->subscriptions->get('sub_abc123');

echo $subscription->status;
echo $subscription->planId;

if ($subscription->isActive()) {
    echo 'Subscription is active';
}
```

---

## List all subscriptions

`GET /v1/subscriptions`

Retrieve a paginated list of all subscriptions.

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
      A cursor for pagination.
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
      Filter by customer ID.
    </td>
  </tr>
</tbody>
</table>

```php
$subscriptions = $vatly->subscriptions->list();

foreach ($subscriptions as $subscription) {
    echo $subscription->id . ': ' . $subscription->status;
}

// Filter by customer
$subscriptions = $vatly->subscriptions->list([
    'customerId' => 'cus_abc123',
]);
```

---

## Cancel a subscription

`DELETE /v1/subscriptions/:id`

Cancel a subscription. The subscription will remain active until the end of the current billing period.

```php
$subscription = $vatly->subscriptions->cancel('sub_abc123');

// Subscription is now on grace period until current period ends
echo $subscription->status;        // 'on_grace_period'
echo $subscription->currentPeriodEnd;  // When it ends
```

---

## Subscription statuses

<table>
<thead>
  <tr>
    <th>
      Status
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
        active
      </code>
    </td>
    
    <td>
      Subscription is active and billing
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        created
      </code>
    </td>
    
    <td>
      Subscription created, not yet active
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trial
      </code>
    </td>
    
    <td>
      In trial period
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        on_grace_period
      </code>
    </td>
    
    <td>
      Canceled but still active until current period ends
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        paused
      </code>
    </td>
    
    <td>
      Subscription is paused
    </td>
  </tr>
</tbody>
</table>

---

## Helper methods

The Subscription object provides convenient helper methods.

```php
$subscription->isActive();       // true if status is 'active'
$subscription->isCreated();      // true if status is 'created'
$subscription->onTrial();        // true if status is 'trial'
$subscription->onGracePeriod();  // true if status is 'on_grace_period'
$subscription->isPaused();       // true if status is 'paused'
```
