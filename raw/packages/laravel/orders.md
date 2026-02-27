# Orders

Orders represent completed transactions in Vatly. They are created automatically when a checkout completes or a subscription renews.

## Listing orders

```php
// Get all orders for a user
$orders = $user->orders;

// Orders are sorted by most recent first
$latestOrder = $user->orders->first();
```

## How it works

Orders are synced from Vatly via webhooks. The `orders()` relationship returns all orders associated with the billable model through a polymorphic relationship.
