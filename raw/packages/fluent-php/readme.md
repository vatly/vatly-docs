# Getting started

> Vatly PHP Fluent - Getting started

Sell a download, start a subscription, and keep your app's billing records in step with Vatly.
Vatly is the European merchant of record for AI, software and digital products.

> **Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

Fluent adds checkout builders, subscription operations, customer bindings, and a webhook processing pipeline to `vatly/vatly-api-php`. You keep your database and framework. Fluent calls your storage contracts to save orders and subscriptions.

## Start a subscription

Install the package using [Configuration](/packages/fluent-php/configuration). This function creates a hosted checkout and returns the URL to send to the browser:

```php
use Vatly\Fluent\CustomerProfile;
use Vatly\Fluent\Vatly;

function subscriptionCheckout(string $apiKey, string $customerId, string $planId): string
{
    $vatly = Vatly::apiOnly($apiKey);
    $checkout = $vatly->subscriptionBuilder(new CustomerProfile(vatlyId: $customerId))
        ->toPlan($planId)
        ->withRedirectUrlSuccess('https://app.example.com/billing/return')
        ->withRedirectUrlCanceled('https://app.example.com/billing/canceled')
        ->create();

    return $checkout->links->checkoutUrl->href;
}
```

Use a customer and plan from the same storefront and mode as your key. Authorize the signed-in user's access to that customer first. Redirect to the returned URL, then use [Webhooks](/packages/fluent-php/webhooks) to confirm the subscription and grant access. The return page alone is not proof of payment.

## Choose your layer

<table>
<thead>
  <tr>
    <th>
      You need
    </th>
    
    <th>
      Use
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Billing in a Laravel app
    </td>
    
    <td>
      <a href="https://github.com/vatly/vatly-laravel" rel="nofollow">
        vatly-laravel
      </a>
      
      . It wires Fluent into Laravel for you.
    </td>
  </tr>
  
  <tr>
    <td>
      Fluent billing flows in plain PHP, Symfony, WordPress, or a custom driver
    </td>
    
    <td>
      This package. Start without storage; add repositories when you need local records.
    </td>
  </tr>
  
  <tr>
    <td>
      A few direct API calls, without local billing state
    </td>
    
    <td>
      <a href="https://docs.vatly.com/packages/php/readme" rel="nofollow">
        vatly-api-php
      </a>
      
      . No Fluent layer required.
    </td>
  </tr>
</tbody>
</table>

With the raw SDK you assemble checkout payloads and coordinate webhook persistence yourself. Fluent gives those common tasks names: `toPlan()`, `swapAndInvoice()`, `updateBilling()`, and `webhookProcessor()->handle()`. It does not supply tables, routes, authorization, transactions, or exactly-once delivery.

## Guides

<table>
<thead>
  <tr>
    <th>
      Task
    </th>
    
    <th>
      Page
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Install, set keys, redirects, and handle errors
    </td>
    
    <td>
      <a href="/packages/fluent-php/configuration">
        Configuration
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Connect billables and storage
    </td>
    
    <td>
      <a href="/packages/fluent-php/coreconcepts">
        Core concepts
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Link your users to Vatly customers
    </td>
    
    <td>
      <a href="/packages/fluent-php/customers">
        Customers
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Sell one-off products and subscriptions
    </td>
    
    <td>
      <a href="/packages/fluent-php/checkouts">
        Checkouts
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Swap, cancel, resume, and update billing
    </td>
    
    <td>
      <a href="/packages/fluent-php/subscriptions">
        Subscriptions
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Open hosted self-service billing
    </td>
    
    <td>
      <a href="/packages/fluent-php/customerportal">
        Customer portal
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Verify deliveries and handle retries safely
    </td>
    
    <td>
      <a href="/packages/fluent-php/webhooks">
        Webhooks
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Choose which events to persist or listen for
    </td>
    
    <td>
      <a href="/packages/fluent-php/webhook-flow">
        Event flow
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Show invoices, lines, refunds, and chargebacks
    </td>
    
    <td>
      <a href="/packages/fluent-php/orders">
        Orders
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Test without charging a customer
    </td>
    
    <td>
      <a href="/packages/fluent-php/testing">
        Testing
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Reuse your existing order and subscription tables
    </td>
    
    <td>
      <a href="/packages/fluent-php/host-owns-its-tables">
        Host tables
      </a>
    </td>
  </tr>
</tbody>
</table>

For request and response fields, see the [API reference](https://docs.vatly.com/api-reference).
