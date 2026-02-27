# Getting Started

> Vatly Laravel - Getting Started

Vatly Laravel provides a Cashier-like integration for [Vatly](https://vatly.com) billing in your Laravel application. It handles subscriptions, checkouts, customers, webhooks, and payment method updates.

## Requirements

- PHP 8.2+
- Laravel 11 or 12
- A Vatly API key

## Installation

```bash
composer require vatly/vatly-laravel:v0.2.0-alpha.1
```

> **Note:** This is an alpha release. Pin to an exact version to avoid breaking changes.

## Configuration

Publish the config file:

```bash
php artisan vendor:publish --tag=vatly-config
```

Add your credentials to `.env`:

```env
VATLY_KEY=test_xxxxxxxxxxxxxxxxxxxx
VATLY_WEBHOOK_SECRET=your-webhook-secret
VATLY_REDIRECT_URL_SUCCESS=https://your-app.com/checkout/success
VATLY_REDIRECT_URL_CANCELED=https://your-app.com/checkout/canceled
```

### Available config options

<table>
<thead>
  <tr>
    <th>
      Key
    </th>
    
    <th>
      Env variable
    </th>
    
    <th>
      Default
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        api_key
      </code>
    </td>
    
    <td>
      <code>
        VATLY_KEY
      </code>
    </td>
    
    <td>
      (required)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        api_url
      </code>
    </td>
    
    <td>
      <code>
        VATLY_API_URL
      </code>
    </td>
    
    <td>
      <code>
        https://api.vatly.com
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        api_version
      </code>
    </td>
    
    <td>
      <code>
        VATLY_API_VERSION
      </code>
    </td>
    
    <td>
      <code>
        v1
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhook_secret
      </code>
    </td>
    
    <td>
      <code>
        VATLY_WEBHOOK_SECRET
      </code>
    </td>
    
    <td>
      (required for webhooks)
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
        VATLY_TESTMODE
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        billable_model
      </code>
    </td>
    
    <td>
      <code>
        VATLY_BILLABLE_MODEL
      </code>
    </td>
    
    <td>
      <code>
        App\Models\User
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirect_url_success
      </code>
    </td>
    
    <td>
      <code>
        VATLY_REDIRECT_URL_SUCCESS
      </code>
    </td>
    
    <td>
      (required for checkouts)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirect_url_canceled
      </code>
    </td>
    
    <td>
      <code>
        VATLY_REDIRECT_URL_CANCELED
      </code>
    </td>
    
    <td>
      (required for checkouts)
    </td>
  </tr>
</tbody>
</table>

## Database setup

Publish and run the migrations:

```bash
php artisan vendor:publish --tag=vatly-billable-migrations
php artisan vendor:publish --tag=vatly-migrations
php artisan migrate
```

This creates:

- A `vatly_id` column on your users table
- A `vatly_subscriptions` table
- A `vatly_webhook_calls` table

## Billable model

Add the `Billable` trait and implement `BillableInterface` on your User model:

```php
use Vatly\Fluent\Contracts\BillableInterface;
use Vatly\Laravel\Billable;

class User extends Authenticatable implements BillableInterface
{
    use Billable;
}
```

This gives your User model access to all Vatly billing methods: customer management, subscriptions, checkouts, and orders.
