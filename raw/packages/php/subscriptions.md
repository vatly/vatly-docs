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
        subscription_...
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
      Resource type, always <code>
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
      ID of the subscription plan this subscription is based on.
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
      Whether this subscription is in test mode.
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
      Name of the subscription (from the plan).
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
      Description of the subscription.
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
        Address
      </code>
    </td>
    
    <td>
      Customer's billing address for this subscription.
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
      Price per billing cycle before taxes.
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
        int
      </code>
    </td>
    
    <td>
      Number of subscription units (e.g. seats).
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
      Billing interval unit: <code>
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
        int
      </code>
    </td>
    
    <td>
      Number of interval units between billing cycles.
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
      The subscription status (see <a href="#subscription-statuses">
        Subscription statuses
      </a>
      
      ).
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
        string
      </code>
    </td>
    
    <td>
      When the subscription started (ISO 8601).
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
      When the subscription ended (ISO 8601).
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
      When the subscription was canceled (ISO 8601).
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
      When the subscription was last renewed (ISO 8601).
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
      Current billing period end date (ISO 8601).
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
      When the next renewal will be attempted (ISO 8601). Null if canceled or ended.
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
      When the trial period ends (ISO 8601). Null if not in trial or trial has ended.
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
        Mandate | null
      </code>
    </td>
    
    <td>
      Payment method on file (<code>
        method
      </code>
      
      , <code>
        maskedIdentifier
      </code>
      
      ). Null when the subscription has no mandate yet.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scheduledUpdate
      </code>
    </td>
    
    <td>
      <code>
        ScheduledSubscriptionUpdate | null
      </code>
    </td>
    
    <td>
      The target values for a change scheduled to take effect at the next billing cycle — set by an update with <code>
        applyImmediately: false
      </code>
      
       — or <code>
        null
      </code>
      
       when nothing is pending. A typed <a href="https://github.com/Vatly/vatly-api-php/blob/main/src/API/Types/ScheduledSubscriptionUpdate.php" rel="nofollow">
        <code>
          ScheduledSubscriptionUpdate
        </code>
      </a>
      
       carrying <code>
        subscriptionPlanId
      </code>
      
      , <code>
        name
      </code>
      
      , <code>
        description
      </code>
      
      , <code>
        basePrice
      </code>
      
       (<code>
        Money
      </code>
      
      ), <code>
        quantity
      </code>
      
      , <code>
        interval
      </code>
      
      , <code>
        intervalCount
      </code>
      
      , and <code>
        effectiveAt
      </code>
      
       (next-renewal date the change applies, nullable). Always present on both the REST resource and webhook deliveries, so this is the authoritative way to reconcile a pending change.
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
        SubscriptionLinks
      </code>
    </td>
    
    <td>
      HATEOAS links to related resources (<code>
        self
      </code>
      
      , <code>
        customer
      </code>
      
      ).
    </td>
  </tr>
</tbody>
</table>

---

## Retrieve a subscription

`GET /v1/subscriptions/:id`

Retrieve a subscription by its ID.

```php
$subscription = $vatly->subscriptions->get('subscription_abc123');

echo $subscription->status;
echo $subscription->subscriptionPlanId;

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
    'customerId' => 'customer_abc123',
]);
```

---

## Update a subscription

`PATCH /v1/subscriptions/:id`

Change a subscription's plan, quantity and/or price. **At least one of
subscriptionPlanId, quantity, or price is required.**

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
        subscriptionPlanId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Switch to a new plan (<code>
        subscription_plan_...
      </code>
      
      ). Must match the subscription's testmode.
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
        int
      </code>
    </td>
    
    <td>
      The <strong>
        new total
      </strong>
      
       quantity (e.g. number of seats). This sets the quantity to the given value — it is not added to the current quantity.
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
        array
      </code>
    </td>
    
    <td>
      Override the recurring price: <code>
        ['value' => '99.99', 'currency' => 'EUR']
      </code>
      
      . The <code>
        currency
      </code>
      
       must match the subscription's currency. Provide <code>
        price
      </code>
      
       alone to change the price in place, or combine it with <code>
        subscriptionPlanId
      </code>
      
       to switch plans at a custom price (overriding the new plan's default).
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
        bool
      </code>
    </td>
    
    <td>
      Prorate charges for the partial billing period (default <code>
        true
      </code>
      
      ).
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
        bool
      </code>
    </td>
    
    <td>
      Apply the change now (<code>
        true
      </code>
      
      ) or at the end of the current period (<code>
        false
      </code>
      
      , default).
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
        bool
      </code>
    </td>
    
    <td>
      Generate and charge a proration invoice immediately. Only applies when <code>
        applyImmediately
      </code>
      
       and <code>
        prorate
      </code>
      
       are both <code>
        true
      </code>
      
      . Defaults to <code>
        false
      </code>
      
      , which parks the proration delta on the current cycle and bills it as a line on the next renewal invoice (and waives it if the subscription is cancelled first). <strong>
        Set this to <code>
          true
        </code>
        
         on yearly and other long-interval plans
      </strong>
      
      , where the deferral to the next renewal costs you the most.
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
        string | null
      </code>
    </td>
    
    <td>
      Set the billing anchor to a specific date (<code>
        YYYY-MM-DD
      </code>
      
      , UTC). Cannot be combined with <code>
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
        bool
      </code>
    </td>
    
    <td>
      Reset the billing anchor to now. Cannot be combined with <code>
        anchor
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
        string | null
      </code>
    </td>
    
    <td>
      Extend or set a trial until this date (ISO 8601). Cannot be combined with <code>
        anchor
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

```php
// Change the quantity (new total) and pass a custom idempotency key.
$subscription = $vatly->subscriptions->update('subscription_123', [
    'quantity' => 2,
], [
    'idempotencyKey' => 'subscription-update-123',
]);

// Switch plan at a custom price (currency must match the subscription).
$subscription = $vatly->subscriptions->update('subscription_123', [
    'subscriptionPlanId' => 'subscription_plan_Wt5mNvBxKw7YcZaEjLhR',
    'price' => ['value' => '99.99', 'currency' => 'EUR'],
    'applyImmediately' => true,
]);
```

If you already have a `Subscription` resource instance, set the key on the client before calling the resource method:

```php
$vatly->setIdempotencyKey('subscription-update-123');

$subscription->update([
    'quantity' => 2,
]);
```

If you do not provide a custom key, the SDK generates one automatically for the `PATCH` request.

---

## Cancel a subscription

`DELETE /v1/subscriptions/:id`

Cancel a subscription. The subscription will remain active until the end of the current billing period.

```php
$subscription = $vatly->subscriptions->cancel('subscription_abc123');

// Subscription is now on grace period until current period ends
echo $subscription->status;        // 'on_grace_period'
echo $subscription->renewedUntil;  // Current billing period end
```

---

## Resume a subscription

`POST /v1/subscriptions/:id/resume`

Reverse a pending cancellation while the subscription is still on its grace period. Once a subscription has fully ended it cannot be resumed.

```php
$subscription = $vatly->subscriptions->resume('subscription_abc123');

echo $subscription->status; // 'active'
```

If you already have a `Subscription` resource instance:

```php
$subscription->resume();
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
      Subscription is active and will renew
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        created
      </code>
    </td>
    
    <td>
      Subscription has been created but not yet started
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trial
      </code>
    </td>
    
    <td>
      Subscription is in trial period
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        on_grace_period
      </code>
    </td>
    
    <td>
      Subscription is canceled but still active until the period ends
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        paused
      </code>
    </td>
    
    <td>
      Subscription is temporarily paused
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        canceled
      </code>
    </td>
    
    <td>
      Subscription has been canceled
    </td>
  </tr>
</tbody>
</table>

---

## Helper methods

The Subscription object provides convenient helper methods.

```php
$subscription->isActive();         // true if status is 'active'
$subscription->isTrial();          // true if status is 'trial'
$subscription->isOnGracePeriod();  // true if status is 'on_grace_period'
$subscription->isCanceled();       // true if status is 'canceled'
```
