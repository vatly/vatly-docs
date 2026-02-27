# Webhooks

> Vatly Laravel - Webhooks

Vatly sends webhooks to notify your application of events like subscription starts, cancellations, and payment updates. Vatly Laravel handles webhook verification, storage, and event dispatching automatically.

## Endpoint

The package registers a webhook endpoint at:

```text
POST /webhooks/vatly
```

Configure this URL in your Vatly dashboard. Make sure to set your `VATLY_WEBHOOK_SECRET` in `.env`.

## CSRF protection

Exclude the webhook route from CSRF verification. In Laravel 11+, this is typically done in `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: [
        'webhooks/vatly',
    ]);
})
```

## Events

When a webhook is received, Vatly Laravel dispatches typed events that you can listen to:

<table>
<thead>
  <tr>
    <th>
      Event
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
        WebhookReceived
      </code>
    </td>
    
    <td>
      Raw webhook received (dispatched for every webhook)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionStarted
      </code>
    </td>
    
    <td>
      A new subscription was activated
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionCanceledImmediately
      </code>
    </td>
    
    <td>
      Subscription was canceled and ended immediately
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SubscriptionCanceledWithGracePeriod
      </code>
    </td>
    
    <td>
      Subscription was canceled but remains active until <code>
        ends_at
      </code>
    </td>
  </tr>
</tbody>
</table>

## Built-in listeners

The package includes listeners that automatically handle subscription lifecycle events:

- **StartSubscriptionListener** -- Creates a local `Subscription` model when a subscription starts
- **CancelSubscriptionImmediatelyListener** -- Sets `ends_at` to now when immediately canceled
- **CancelSubscriptionWithGracePeriodListener** -- Sets `ends_at` to the grace period end date

## Custom listeners

Listen for Vatly events in your `EventServiceProvider` or using the `Event` facade:

```php
use Vatly\Fluent\Events\SubscriptionStarted;

Event::listen(SubscriptionStarted::class, function (SubscriptionStarted $event) {
    // $event->subscriptionId
    // $event->planId
    // $event->name
    // $event->quantity
    
    // Send welcome email, provision features, etc.
});
```

## Webhook call storage

Every webhook is recorded in the `vatly_webhook_calls` table with:

- `event_name` -- The webhook event type
- `resource_id` -- The Vatly resource ID
- `resource_name` -- The resource type (e.g., "subscription")
- `vatly_customer_id` -- The associated customer ID
- `object` -- The full webhook payload (JSON)
- `raised_at` -- When the event occurred at Vatly
- `testmode` -- Whether this was a test webhook
