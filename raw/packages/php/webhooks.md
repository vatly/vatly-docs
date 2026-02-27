# Webhooks

Vatly sends webhooks to notify your application when events happen, like successful checkouts, subscription renewals, or chargebacks.

## Webhook Events

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
        checkout.paid
      </code>
    </td>
    
    <td>
      Checkout completed successfully
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.failed
      </code>
    </td>
    
    <td>
      Checkout payment failed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.expired
      </code>
    </td>
    
    <td>
      Checkout expired
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.created
      </code>
    </td>
    
    <td>
      New subscription started
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.renewed
      </code>
    </td>
    
    <td>
      Subscription renewed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled
      </code>
    </td>
    
    <td>
      Subscription canceled
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.ended
      </code>
    </td>
    
    <td>
      Subscription ended
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.paid
      </code>
    </td>
    
    <td>
      Order payment received
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.created
      </code>
    </td>
    
    <td>
      Refund initiated
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.completed
      </code>
    </td>
    
    <td>
      Refund completed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        chargeback.created
      </code>
    </td>
    
    <td>
      Chargeback received
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        chargeback.won
      </code>
    </td>
    
    <td>
      Chargeback dispute won
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        chargeback.lost
      </code>
    </td>
    
    <td>
      Chargeback dispute lost
    </td>
  </tr>
</tbody>
</table>

---

## Handling webhooks

The SDK provides a helper to parse and verify incoming webhooks.

### Webhook payload

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
        id
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Unique webhook event ID.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        type
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Event type (e.g., <code>
        checkout.paid
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        data
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      The resource object that triggered the event.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        createdAt
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      When the event occurred (ISO 8601).
    </td>
  </tr>
</tbody>
</table>

```php
use Vatly\API\VatlyApiClient;
use Vatly\API\Webhook;

$vatly = new VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

// Get the raw webhook payload
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_VATLY_SIGNATURE'] ?? '';
$secret = 'your_webhook_secret';

// Parse and verify the webhook
$event = Webhook::parse($payload, $signature, $secret);

switch ($event->type) {
    case 'checkout.paid':
        $checkout = $event->data;
        // Fulfill the order
        break;

    case 'subscription.renewed':
        $subscription = $event->data;
        // Extend access
        break;

    case 'chargeback.created':
        $chargeback = $event->data;
        // Suspend account, notify team
        break;
}

// Return 200 OK
http_response_code(200);
```

---

## Signature verification

Always verify webhook signatures to ensure the request came from Vatly.

```php
use Vatly\API\Webhook;
use Vatly\API\Exceptions\InvalidSignatureException;

try {
    $event = Webhook::parse($payload, $signature, $secret);
    // Signature valid, process event
} catch (InvalidSignatureException $e) {
    // Invalid signature, reject request
    http_response_code(401);
    exit('Invalid signature');
}
```

---

## Laravel integration

For Laravel applications, you can use controller middleware and route handling.

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Vatly\API\Webhook;

class VatlyWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $event = Webhook::parse(
            $request->getContent(),
            $request->header('Vatly-Signature'),
            config('services.vatly.webhook_secret')
        );

        match ($event->type) {
            'checkout.paid' => $this->handleCheckoutPaid($event->data),
            'subscription.canceled' => $this->handleCanceled($event->data),
            default => null,
        };

        return response()->json(['received' => true]);
    }
}
```

```php
Route::post('/webhooks/vatly', [VatlyWebhookController::class, 'handle'])
    ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
```

---

## Best practices

1. **Always verify signatures** before processing webhooks
2. **Return 200 quickly** to avoid timeout retries
3. **Process asynchronously** for long-running tasks (queue jobs)
4. **Handle duplicates** using the event ID (webhooks may be retried)
5. **Log webhook events** for debugging and auditing
