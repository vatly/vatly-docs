# Getting Started

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
        ValidationException
      </code>
    </td>
    
    <td>
      <code>
        exception
      </code>
    </td>
    
    <td>
      Invalid request parameters. Check <code>
        getErrors()
      </code>
      
       for field-level details.
    </td>
  </tr>
  
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
      API errors (network, authentication, etc.). Check <code>
        getStatusCode()
      </code>
      
       for HTTP status.
    </td>
  </tr>
</tbody>
</table>

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
