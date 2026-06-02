# Testing

> Use test helper endpoints to simulate billing events like subscription renewals and payment failures in sandbox mode.

## Overview

Vatly provides test helper endpoints that let you simulate billing events without waiting for real billing cycles. These endpoints are only available in **test mode** and require a `test_` prefixed API token.

## Fast-forward subscription renewal

Simulates a subscription renewal cycle, allowing you to test renewal billing flows, lifecycle events, and webhooks without waiting for the actual billing interval.

### Request

`POST /v1/test-helpers/subscriptions/{subscriptionId}/fast-forward-renewal`

<table>
<thead>
  <tr>
    <th>
      Parameter
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
        subscriptionId
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      ID of the subscription to renew (starts with <code>
        subscription_
      </code>
      
      )
    </td>
  </tr>
</tbody>
</table>

No request body is required.

### Example

<code-group sync="client">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/test-helpers/subscriptions/subscription_Lp3mNvBxKw7RjTgYcZaE/fast-forward-renewal \
  -H "Authorization: Bearer test_your_api_key_here"
```

```php [PHP]
$vatly->testHelpers->fastForwardRenewal('subscription_Lp3mNvBxKw7RjTgYcZaE');
```

</code-group>

### Response

Returns the updated subscription with new renewal dates:

```json
{
  "id": "subscription_Lp3mNvBxKw7RjTgYcZaE",
  "resource": "subscription",
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
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
  "startedAt": "2024-01-15T10:30:00Z",
  "endedAt": null,
  "canceledAt": null,
  "renewedAt": "2024-03-15T10:30:00Z",
  "renewedUntil": "2024-04-15T10:30:00Z",
  "nextRenewalAt": "2024-04-15T10:30:00Z",
  "trialUntil": null,
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

## Simulate payment failure

Simulates a failed mandated payment, allowing you to test payment failure handling, retry logic, dunning flows, and webhook notifications.

### Request

`POST /v1/test-helpers/mandated-payments/{transactionId}/simulate-failure`

<table>
<thead>
  <tr>
    <th>
      Parameter
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      In
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
        transactionId
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      path
    </td>
    
    <td>
      ID of the mandated payment transaction to fail
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        reason
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      body
    </td>
    
    <td>
      Failure reason (optional, defaults to <code>
        general_failure
      </code>
      
      )
    </td>
  </tr>
</tbody>
</table>

#### Failure reasons

<table>
<thead>
  <tr>
    <th>
      Reason
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
        insufficient_funds
      </code>
    </td>
    
    <td>
      Customer's account has insufficient funds
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        invalid_mandate
      </code>
    </td>
    
    <td>
      The payment mandate is invalid
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mandate_canceled
      </code>
    </td>
    
    <td>
      The mandate has been canceled
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        account_closed
      </code>
    </td>
    
    <td>
      The customer's account is closed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        card_expired
      </code>
    </td>
    
    <td>
      The customer's card has expired
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        authentication_failed
      </code>
    </td>
    
    <td>
      Payment authentication failed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        general_failure
      </code>
    </td>
    
    <td>
      General payment failure (default)
    </td>
  </tr>
</tbody>
</table>

### Example

<code-group sync="client">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/test-helpers/mandated-payments/mollie_mandated_payment_Xk9pQrSvWm4NjLhYbUcP/simulate-failure \
  -H "Authorization: Bearer test_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "insufficient_funds"
  }'
```

```php [PHP]
$vatly->testHelpers->simulatePaymentFailure(
    'mollie_mandated_payment_Xk9pQrSvWm4NjLhYbUcP',
    ['reason' => 'insufficient_funds']
);
```

</code-group>

### Response

```json
{
  "id": "mollie_mandated_payment_Xk9pQrSvWm4NjLhYbUcP",
  "status": "failed",
  "failureReason": "insufficient_funds"
}
```
