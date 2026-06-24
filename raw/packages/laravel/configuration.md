# Configuration

> Vatly Laravel Package - Configuration

Vatly Laravel needs your API credentials, webhook secret, and default redirect URLs.

## Publish the config file

```bash
php artisan vendor:publish --tag=vatly-config
```

This publishes `config/vatly.php` so you can customize the package defaults.

## Environment variables

Add your credentials to `.env`:

```env
VATLY_KEY=test_xxxxxxxxxxxxxxxxxxxx
VATLY_WEBHOOK_SECRET=your-webhook-secret
VATLY_REDIRECT_URL_SUCCESS=https://your-app.com/checkout/success
VATLY_REDIRECT_URL_CANCELED=https://your-app.com/checkout/canceled
```

## Available config options

<table>
<thead>
  <tr>
    <th>
      Config key
    </th>
    
    <th>
      Env variable
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
        api_key
      </code>
    </td>
    
    <td>
      <code>
        VATLY_KEY
      </code>
    </td>
    
    <td>
      Your Vatly API key. Use <code>
        test_
      </code>
      
       in test mode and <code>
        live_
      </code>
      
       in production.
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
      Secret used to verify incoming webhook signatures.
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
      Default success URL for hosted checkout and billing flows.
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
      Default cancel URL for hosted checkout and billing flows.
    </td>
  </tr>
</tbody>
</table>

## Example config file

```php
return [
    'api_key' => env('VATLY_KEY'),
    'webhook_secret' => env('VATLY_WEBHOOK_SECRET'),
    'redirect_url_success' => env('VATLY_REDIRECT_URL_SUCCESS'),
    'redirect_url_canceled' => env('VATLY_REDIRECT_URL_CANCELED'),
];
```

## Test mode vs live mode

The package uses whatever API key you configure:

- `test_...` keys talk to your Vatly test environment
- `live_...` keys talk to your live environment

Use test credentials while building your integration. Switch to your live key only when your products, Mollie onboarding, and webhook handling are ready for production.

## Webhook configuration

Make sure your webhook secret in `.env` matches the webhook endpoint configured in Vatly. The package uses this secret to verify the `x-vatly-signature` header on incoming webhooks.

For the full webhook setup flow, see [Webhooks](/packages/laravel/webhooks).
