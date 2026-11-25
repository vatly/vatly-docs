# Laravel

> Vatly Laravel provides a Cashier-like integration for Vatly billing in your Laravel application.

![Vatly for Laravel](https://raw.githubusercontent.com/Vatly/vatly-laravel/main/art/banner.png)

Vatly Laravel provides a Cashier-like integration for [Vatly](https://vatly.com) billing in your Laravel application. It handles subscriptions, checkouts, customers, webhooks, and payment method updates.

<note>

**Evaluating Vatly, or moving from another biller?**

- [How Vatly compares to Cashier (Stripe, Paddle) & Lemon Squeezy](/packages/laravel/comparison) — for a greenfield app.
- [Migrating from Cashier](/packages/laravel/migrating-to-vatly) — run it alongside your current one and move customers over gradually.

</note>

## Requirements

- PHP 8.3+
- Laravel 12 or 13
- A Vatly API key

## Installation

```bash
composer config minimum-stability alpha
composer config prefer-stable true
composer require vatly/vatly-laravel
```

<warning>

This package is in alpha, and every alpha release may include breaking changes. The two `config` commands let Composer install alpha releases while `prefer-stable` keeps your other dependencies on stable releases. Composer installs the latest alpha and records it in `composer.lock`.

</warning>

To keep your app on `"minimum-stability": "stable"` instead, require the package and its two Vatly dependencies with an `@alpha` flag each. A stability flag only applies to the package it is written on, so requiring just `vatly/vatly-laravel:^0.7@alpha` fails because `vatly/vatly-fluent-php` and `vatly/vatly-api-php` are alpha too:

```bash
composer require vatly/vatly-laravel:^0.7@alpha vatly/vatly-fluent-php:^0.8@alpha vatly/vatly-api-php:^0.1@alpha
```

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

<note>

Testmode is automatically determined from your API key prefix. Keys starting with `test_` use testmode; keys starting with `live_` use production mode. No configuration needed.

</note>

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
use Vatly\Laravel\Contracts\BillableInterface;
use Vatly\Laravel\Billable;

class User extends Authenticatable implements BillableInterface
{
    use Billable;
}
```

This gives your User model access to all Vatly billing methods: customer management, subscriptions, checkouts, and orders.
