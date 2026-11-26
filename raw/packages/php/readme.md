# PHP SDK

> Official PHP SDK for the Vatly API.

![Vatly API client for PHP](https://raw.githubusercontent.com/Vatly/vatly-api-php/main/art/banner.png)

Official PHP SDK for the Vatly API. Handle subscriptions, one-off payments, tax compliance, and billing for your SaaS.

> **Looking for the exact field list?** These guides cover the common paths. The authoritative, machine-readable schema for every endpoint lives in the [OpenAPI spec](https://docs.vatly.com/openapi.yaml) — point your AI assistant or codegen tooling at it when an example leaves a field ambiguous.

## Installation

The SDK is in alpha, and every alpha release may include breaking changes. Allow alpha releases, then install the SDK via Composer. `prefer-stable` keeps your other dependencies on stable releases.

```bash
composer config minimum-stability alpha
composer config prefer-stable true
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
header('Location: ' . $checkout->links->checkoutUrl->href);
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

## Identifying your integration

Every request's `User-Agent` starts with `vatly/vatly-api-php/<version>`, followed by the PHP and HTTP client versions. A package or plugin built on this client adds its own token with `addVersionString()`, using its Composer package name (or plugin slug) and version, so Vatly sees every package involved:

```php
$vatly->addVersionString('acme/vatly-shop-plugin/1.4.0');
// User-Agent: vatly/vatly-api-php/0.1.0-alpha.40 PHP/8.4.1 curl/8.5.0 acme/vatly-shop-plugin/1.4.0
```

## Error handling

Every exception the SDK throws implements `Vatly\API\Exceptions\VatlyException`, so one `catch` covers API errors and webhook signature failures.

When the API answers with an error, the SDK throws an `ApiException`, or the subclass for the HTTP status:

<table>
<thead>
  <tr>
    <th>
      Status
    </th>
    
    <th>
      Exception
    </th>
    
    <th>
      When
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        401
      </code>
    </td>
    
    <td>
      <code>
        AuthenticationException
      </code>
    </td>
    
    <td>
      The API key is missing or invalid.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        403
      </code>
    </td>
    
    <td>
      <code>
        ForbiddenException
      </code>
    </td>
    
    <td>
      The API key is invalid, revoked, or not allowed to perform this operation.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        404
      </code>
    </td>
    
    <td>
      <code>
        NotFoundException
      </code>
    </td>
    
    <td>
      The resource does not exist, or not in the API key's mode.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        409
      </code>
    </td>
    
    <td>
      <code>
        ConflictException
      </code>
    </td>
    
    <td>
      For example, an idempotency key reused with other parameters, or a request still in progress.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        422
      </code>
    </td>
    
    <td>
      <code>
        ValidationException
      </code>
    </td>
    
    <td>
      The request is invalid. <code>
        getErrors()
      </code>
      
       lists the messages per field.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        429
      </code>
    </td>
    
    <td>
      <code>
        RateLimitException
      </code>
    </td>
    
    <td>
      Too many requests. Wait <code>
        getRetryAfter()
      </code>
      
       seconds.
    </td>
  </tr>
  
  <tr>
    <td>
      other
    </td>
    
    <td>
      <code>
        ApiException
      </code>
    </td>
    
    <td>
      Any other error status.
    </td>
  </tr>
</tbody>
</table>

An `ApiException` without a status code means no response arrived (for example, a connection error), or the SDK refused the call before sending it.

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        getMessage()
      </code>
    </td>
    
    <td>
      The API's error message. It never contains the request body or the API key.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        getStatusCode()
      </code>
    </td>
    
    <td>
      The HTTP status, or <code>
        null
      </code>
      
       when there was no response.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        getErrors()
      </code>
    </td>
    
    <td>
      Validation messages per field (dot notation), such as <code>
        ['products.0.id' => ['The selected products.0.id is invalid.']]
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        getDetails()
      </code>
    </td>
    
    <td>
      The error's <code>
        details
      </code>
      
       object, such as <code>
        ['idempotency_outcome' => 'in_progress']
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        getRetryAfter()
      </code>
    </td>
    
    <td>
      Seconds from the <code>
        Retry-After
      </code>
      
       header, sent on <code>
        429
      </code>
      
       and on a <code>
        409
      </code>
      
       while an idempotent request is in progress.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        getResponseBody()
      </code>
    </td>
    
    <td>
      The raw response body.
    </td>
  </tr>
</tbody>
</table>

Branch on the exception class or status code, not on the message text.

```php
use Vatly\API\Exceptions\ApiException;
use Vatly\API\Exceptions\RateLimitException;
use Vatly\API\Exceptions\ValidationException;

try {
    $checkout = $vatly->checkouts->create([...]);
} catch (ValidationException $e) {
    foreach ($e->getErrors() as $field => $messages) {
        // e.g. 'products.0.id' => ['The selected products.0.id is invalid.']
    }
} catch (RateLimitException $e) {
    $waitSeconds = $e->getRetryAfter() ?? 60;
} catch (ApiException $e) {
    $status = $e->getStatusCode(); // null when no response arrived
}
```

---

## Backward compatibility

From v1.0.0, this package follows [semantic versioning](https://semver.org): a minor or patch release does not break code that uses its public API. These are not part of that API:

- Anything marked `@internal`, such as `ResourceFactory`, the webhook event constructors (build events with `WebhookEventFactory`), and `FakeIdempotencyKeyGenerator`.
- Extending the SDK's classes. Subclassing them is not covered by semver; only these interfaces are meant to be implemented: `HttpClientInterface`, `HttpClientFactoryInterface` and `IdempotencyKeyGeneratorContract`.

## Requirements

- PHP 8.0+
- cURL extension
- JSON extension
