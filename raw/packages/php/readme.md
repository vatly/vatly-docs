# Getting Started

> Vatly PHP SDK - Getting Started

![Vatly API client for PHP](https://raw.githubusercontent.com/Vatly/vatly-api-php/main/art/banner.png)

Official PHP SDK for the Vatly API. Handle subscriptions, one-off payments, tax compliance, and billing for your SaaS.

> **Looking for the exact field list?** These guides cover the common paths. The authoritative, machine-readable schema for every endpoint lives in the [OpenAPI spec](https://docs.vatly.com/openapi.yaml) — point your AI assistant or codegen tooling at it when an example leaves a field ambiguous.

## Installation

Install the SDK via Composer.

```bash
composer require vatly/vatly-api-php
```

---

## Quick start

Initialize the client with your API key and create a checkout.

### API Keys

Get your API keys from the [Vatly Dashboard](https://my.vatly.com) under **Settings > API**.

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
        live_
      </code>
    </td>
    
    <td>
      <code>
        prefix
      </code>
    </td>
    
    <td>
      Production transactions, real charges.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        test_
      </code>
    </td>
    
    <td>
      <code>
        prefix
      </code>
    </td>
    
    <td>
      Sandbox testing, no real charges.
    </td>
  </tr>
</tbody>
</table>

```php
use Vatly\API\VatlyApiClient;

$vatly = new VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

// Create a checkout
$checkout = $vatly->checkouts->create([
    'products' => [
        ['id' => 'subscription_plan_abc123', 'quantity' => 1]
    ],
    'redirectUrlSuccess' => 'https://yourapp.com/success',
    'redirectUrlCanceled' => 'https://yourapp.com/canceled',
]);

// Redirect customer to checkout
header('Location: ' . $checkout->getCheckoutUrl());
```

---

## Idempotency

The SDK automatically adds an `Idempotency-Key` header to every `POST` and `PATCH` request.
This is enabled by default, so checkout creation and subscription updates are already protected without extra configuration.

`GET` and `DELETE` requests do not include an idempotency header.

### Override the next mutating request

Use `setIdempotencyKey()` when you want to supply the key yourself.
The value is used for the next `POST` or `PATCH` request and then cleared automatically.

```php
$vatly->setIdempotencyKey('checkout-create-123');

$checkout = $vatly->checkouts->create([
    'products' => [
        ['id' => 'subscription_plan_abc123', 'quantity' => 1],
    ],
    'redirectUrlSuccess' => 'https://yourapp.com/success',
    'redirectUrlCanceled' => 'https://yourapp.com/canceled',
]);
```

This also works with resource methods that do not expose request options directly:

```php
$vatly->setIdempotencyKey('subscription-update-123');

$subscription->update([
    'quantity' => 2,
]);
```

### Per-request options on supported endpoint methods

Methods that accept a second or third options array can override the header with `idempotencyKey`.

```php
$checkout = $vatly->checkouts->create([...], [
    'idempotencyKey' => 'checkout-create-123',
]);

$subscription = $vatly->subscriptions->update('subscription_123', [
    'quantity' => 2,
], [
    'idempotencyKey' => 'subscription-update-123',
]);
```

### Custom generator or disable auto-generation

If you need a specific key format, provide your own generator implementation.

```php
use Vatly\API\HttpClient\Idempotency\IdempotencyKeyGeneratorContract;

final class MyIdempotencyKeyGenerator implements IdempotencyKeyGeneratorContract
{
    public function generate(): string
    {
        return bin2hex(random_bytes(16));
    }
}

$vatly->setIdempotencyKeyGenerator(new MyIdempotencyKeyGenerator());
```

To stop the SDK from generating keys automatically:

```php
$vatly->clearIdempotencyKeyGenerator();
```

---

## Resources

The SDK provides access to all Vatly API resources.

<table>
<thead>
  <tr>
    <th>
      Resource
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="/packages/php/checkouts">
        Checkouts
      </a>
    </td>
    
    <td>
      Create hosted payment pages
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/customers">
        Customers
      </a>
    </td>
    
    <td>
      Manage customer records
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/subscriptions">
        Subscriptions
      </a>
    </td>
    
    <td>
      Recurring billing
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/subscriptionplans">
        Subscription Plans
      </a>
    </td>
    
    <td>
      Define subscription products
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/oneoffproducts">
        One-Off Products
      </a>
    </td>
    
    <td>
      Single purchase products
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/orders">
        Orders
      </a>
    </td>
    
    <td>
      Transaction records
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/refunds">
        Refunds
      </a>
    </td>
    
    <td>
      Process refunds
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/chargebacks">
        Chargebacks
      </a>
    </td>
    
    <td>
      Handle disputes
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/webhooks">
        Webhooks
      </a>
    </td>
    
    <td>
      Real-time event notifications
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/php/webhookendpoints">
        Webhook Endpoints
      </a>
    </td>
    
    <td>
      Register delivery endpoints
    </td>
  </tr>
</tbody>
</table>

---

## Error handling

The SDK throws specific exceptions for different error types.

### Exception types

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
        ApiException
      </code>
    </td>
    
    <td>
      <code>
        exception
      </code>
    </td>
    
    <td>
      API errors, including authentication, validation, and transport failures.
    </td>
  </tr>
</tbody>
</table>

```php
use Vatly\API\Exceptions\ApiException;

try {
    $checkout = $vatly->checkouts->create([...]);
} catch (ApiException $e) {
    // API error (network, auth, validation, etc.)
    echo $e->getMessage();
}
```

---

## Requirements

- PHP 8.0+
- cURL extension
- JSON extension
