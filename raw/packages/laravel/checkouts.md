# Checkouts

Checkouts redirect your customer to Vatly's hosted payment page. After payment, the customer is redirected back to your application.

## Creating a checkout

```php
$checkout = $user->checkout()
    ->withItems(collect(['product_abc123']))
    ->create(
        redirectUrlSuccess: 'https://your-app.com/success',
        redirectUrlCanceled: 'https://your-app.com/canceled',
    );

// Redirect the customer
return redirect($checkout->url);
```

## Subscription checkouts

For subscriptions, use the `subscribe()` method which provides a fluent builder:

```php
$checkout = $user->subscribe()
    ->toPlan('subscription_plan_monthly')
    ->create();

return redirect($checkout->url);
```

## Checkout with metadata

```php
$checkout = $user->checkout()
    ->withItems(collect(['product_abc123']))
    ->withMetadata(['campaign' => 'summer-2025'])
    ->create(
        redirectUrlSuccess: 'https://your-app.com/success',
        redirectUrlCanceled: 'https://your-app.com/canceled',
    );
```

## Testmode

```php
$checkout = $user->checkout()
    ->withItems(collect(['product_abc123']))
    ->inTestmode()
    ->create(
        redirectUrlSuccess: 'https://your-app.com/success',
        redirectUrlCanceled: 'https://your-app.com/canceled',
    );
```

## How it works

The checkout flow:

1. Your app creates a checkout session via the Vatly API
2. The customer is redirected to Vatly's hosted payment page
3. After payment, the customer returns to your `redirectUrlSuccess`
4. Vatly sends a webhook to confirm the payment (see [Webhooks](/packages/laravel/webhooks))

The redirect URLs default to the values in your `vatly.php` config but can be overridden per checkout.
