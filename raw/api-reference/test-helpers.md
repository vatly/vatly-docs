# Test helpers

> Simulate subscription renewals in test mode so you can verify recurring billing flows end to end.

## Test helper endpoints

Vatly provides a small set of test helper endpoints for recurring billing scenarios. These endpoints are only available in test mode.

<warning>

Use a `test_` API token for every endpoint on this page. Test helper endpoints are not available with live credentials.

</warning>

---

## Fast-forward subscription renewal

`POST /v1/test-helpers/subscriptions/{subscriptionId}/fast-forward-renewal`

Simulate a renewal cycle for an existing subscription.

Useful for:

- testing renewal billing flows without waiting for the real billing interval
- verifying subscription lifecycle events and webhook delivery
- validating dunning or invoice follow-up automation in your sandbox flow
- forcing the renewal payment to fail so you can exercise your payment-recovery handling

### Request body

The request body is optional. Omit it to advance the billing cycle and leave the renewal payment pending (this endpoint's original behaviour).

<table>
<thead>
  <tr>
    <th>
      Attribute
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
        paymentStatus
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      Optional. Outcome to force on the renewal payment. One of <code>
        paid
      </code>
      
       or <code>
        failed
      </code>
      
      . Omit to leave the renewal payment pending. <code>
        failed
      </code>
      
       declines the payment and starts a payment recovery for the renewal order (delivering <code>
        order.payment_failed
      </code>
      
       to your webhook endpoint); <code>
        paid
      </code>
      
       settles it.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        failureReason
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      Optional. Which decline to simulate. Only valid alongside <code>
        paymentStatus: failed
      </code>
      
       (sending it with <code>
        paid
      </code>
      
       is rejected). Soft declines (<code>
        insufficient_funds
      </code>
      
      , <code>
        temporary_decline
      </code>
      
      , <code>
        general_failure
      </code>
      
      ) keep the payment method and retry on a multi-week timeline; every other value is a hard decline that drives the customer to supply a new payment method on a short timeline. Defaults to <code>
        general_failure
      </code>
      
      . Allowed values: <code>
        insufficient_funds
      </code>
      
      , <code>
        temporary_decline
      </code>
      
      , <code>
        general_failure
      </code>
      
      , <code>
        invalid_mandate
      </code>
      
      , <code>
        mandate_canceled
      </code>
      
      , <code>
        account_closed
      </code>
      
      , <code>
        card_expired
      </code>
      
      , <code>
        card_lost_or_stolen
      </code>
      
      , <code>
        invalid_card_details
      </code>
      
      , <code>
        authentication_failed
      </code>
      
      , <code>
        fraud_suspected
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

<note>

Requesting an outcome for a renewal that produced no payable order, or whose payment has already settled, returns a `409` error rather than a silent no-op.

</note>

<code-group>

```bash [cURL]
curl -X POST https://api.vatly.com/v1/test-helpers/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE/fast-forward-renewal \
  -H "Authorization: Bearer test_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentStatus": "failed",
    "failureReason": "card_expired"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('test_your_api_key_here');

$subscription = $vatly->testHelpers->fastForwardRenewal('subscription_Lp3mNvBxKw7RjTgYcZaE', [
    'paymentStatus' => 'failed',
    'failureReason' => 'card_expired',
]);
```

```json [Response]
{
  "id": "subscription_Lp3mNvBxKw7RjTgYcZaE",
  "resource": "subscription",
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
  "subscriptionPlanId": "subscription_plan_Rk5pQrSvWm8NjLhYbUcP",
  "testmode": true,
  "name": "Pro Monthly",
  "description": "Full access to all Pro features",
  "billingAddress": {
    "fullName": "John Doe",
    "companyName": "Acme Corp",
    "streetAndNumber": "123 Main Street",
    "city": "Berlin",
    "postalCode": "10115",
    "country": "DE"
  },
  "basePrice": {
    "value": "29.00",
    "currency": "EUR"
  },
  "quantity": 1,
  "interval": "month",
  "intervalCount": 1,
  "status": "active",
  "mandate": {
    "method": "card",
    "maskedIdentifier": "4242"
  },
  "startedAt": "2024-01-15T10:30:00Z",
  "endedAt": null,
  "canceledAt": null,
  "renewedAt": "2024-03-15T10:30:00Z",
  "renewedUntil": "2024-04-15T10:30:00Z",
  "nextRenewalAt": "2024-04-15T10:30:00Z",
  "trialUntil": null,
  "scheduledUpdate": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/customer_Lp3mNvBxKw7RjTgYcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>

### Errors

<table>
<thead>
  <tr>
    <th>
      Status
    </th>
    
    <th>
      Meaning
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
      Missing or invalid API key
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        403
      </code>
    </td>
    
    <td>
      Endpoint not available for this token or resource
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        404
      </code>
    </td>
    
    <td>
      Subscription not found
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        409
      </code>
    </td>
    
    <td>
      No payable renewal order exists, or its payment has already settled
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        422
      </code>
    </td>
    
    <td>
      Invalid request body (for example, <code>
        failureReason
      </code>
      
       sent with <code>
        paymentStatus: paid
      </code>
      
      )
    </td>
  </tr>
</tbody>
</table>
