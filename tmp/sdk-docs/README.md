# Vatly PHP SDK

Official PHP SDK for the Vatly API. Handle subscriptions, one-off payments, tax compliance, and billing for your SaaS.

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

| Name | Type | Description |
| --- | --- | --- |
| `live_` | `prefix` | Production transactions, real charges. |
| `test_` | `prefix` | Sandbox testing, no real charges. |




```php
use Vatly\Api\VatlyApiClient;

$vatly = new VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

// Create a checkout
$checkout = $vatly->checkouts->create([
    'products' => [
        ['id' => 'plan_abc123', 'quantity' => 1]
    ],
    'redirectUrlSuccess' => 'https://yourapp.com/success',
    'redirectUrlCanceled' => 'https://yourapp.com/canceled',
]);

// Redirect customer to checkout
header('Location: ' . $checkout->getCheckoutUrl());
```



---

## Resources



The SDK provides access to all Vatly API resources.




| Resource | Description |
|----------|-------------|
| [Checkouts](/checkouts) | Create hosted payment pages |
| [Customers](/customers) | Manage customer records |
| [Subscriptions](/subscriptions) | Recurring billing |
| [Subscription Plans](/subscription-plans) | Define subscription products |
| [One-Off Products](/one-off-products) | Single purchase products |
| [Orders](/orders) | Transaction records |
| [Refunds](/refunds) | Process refunds |
| [Chargebacks](/chargebacks) | Handle disputes |
| [Webhooks](/webhooks) | Real-time event notifications |



---

## Error handling



The SDK throws specific exceptions for different error types.

### Exception types

| Name | Type | Description |
| --- | --- | --- |
| `ValidationException` | `exception` | Invalid request parameters. Check `getErrors()` for field-level details. |
| `ApiException` | `exception` | API errors (network, authentication, etc.). Check `getStatusCode()` for HTTP status. |




```php
use Vatly\Api\Exceptions\ApiException;
use Vatly\Api\Exceptions\ValidationException;

try {
    $checkout = $vatly->checkouts->create([...]);
} catch (ValidationException $e) {
    // Invalid request parameters
    echo $e->getMessage();
    print_r($e->getErrors());
} catch (ApiException $e) {
    // API error (network, auth, etc.)
    echo $e->getMessage();
    echo $e->getStatusCode();
}
```



---

## Requirements

- PHP 8.1+
- cURL extension
- JSON extension
