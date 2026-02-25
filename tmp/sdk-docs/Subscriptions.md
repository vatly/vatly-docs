# Subscriptions

Subscriptions are created automatically when a customer completes a checkout for a subscription plan. You can then manage the subscription lifecycle through the API.

## The Subscription Resource

Below you'll find all properties for the Vatly Subscription resource.

### Properties

| Name | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the subscription (`sub_...`). |
| `status` | `string` | The status: `active`, `canceled`, `past_due`, `trialing`, `paused`, or `ended`. |
| `customerId` | `string` | The customer ID. |
| `planId` | `string` | The subscription plan ID. |
| `testmode` | `bool` | Whether this is a test subscription. |
| `currentPeriodStart` | `string` | Current billing period start (ISO 8601). |
| `currentPeriodEnd` | `string` | Current billing period end (ISO 8601). |
| `canceledAt` | `string|null` | When the subscription was canceled (ISO 8601). |
| `endedAt` | `string|null` | When the subscription ended (ISO 8601). |
| `trialStart` | `string|null` | Trial period start (ISO 8601). |
| `trialEnd` | `string|null` | Trial period end (ISO 8601). |
| `metadata` | `array` | Your custom metadata. |
| `createdAt` | `string` | Creation timestamp (ISO 8601). |

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

| Name | Type | Description |
| --- | --- | --- |
| `limit` | `integer` | The number of subscriptions to return (default: 10, max: 100). |
| `startingAfter` | `string` | A cursor for pagination. |
| `customerId` | `string` | Filter by customer ID. |




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

// Subscription is now 'canceled' but active until period end
echo $subscription->status;        // 'canceled'
echo $subscription->currentPeriodEnd;  // When it ends
```



---

## Subscription statuses

| Status | Description |
|--------|-------------|
| `active` | Subscription is active and billing |
| `canceled` | Subscription is canceled, active until period end |
| `past_due` | Payment failed, in grace period |
| `trialing` | In trial period |
| `paused` | Subscription is paused |
| `ended` | Subscription has ended |

---

## Helper methods



The Subscription object provides convenient helper methods.




```php
$subscription->isActive();     // true if status is 'active'
$subscription->isCanceled();   // true if status is 'canceled'
$subscription->isTrialing();   // true if status is 'trialing'
$subscription->isPastDue();    // true if status is 'past_due'
$subscription->hasEnded();     // true if status is 'ended'
$subscription->onTrial();      // true if currently in trial
$subscription->onGracePeriod(); // true if canceled but still active
```
