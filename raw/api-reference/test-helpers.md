# Test helpers

> Simulate renewals and payment failures in test mode so you can verify recurring billing flows end to end.

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

<code-group>

```bash [cURL]
curl -X POST https://api.vatly.com/v1/test-helpers/subscriptions/sub_abc123def456/fast-forward-renewal \
  -H "Authorization: Bearer test_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('test_your_api_key_here');

$subscription = $vatly->testHelpers->fastForwardSubscriptionRenewal('sub_abc123def456');
```

```json [Response]
{
  "id": "sub_abc123def456",
  "resource": "subscription",
  "customerId": "cus_xyz789",
  "subscriptionPlanId": "subscription_plan_premium",
  "testmode": true,
  "name": "Premium Plan",
  "description": "Access to all premium features",
  "billingAddress": {
    "fullName": "John Doe",
    "companyName": null,
    "taxId": null,
    "streetAndNumber": "123 Main St",
    "streetAdditional": null,
    "city": "Amsterdam",
    "region": null,
    "postalCode": "1011AB",
    "country": "NL"
  },
  "basePrice": {
    "value": "99.99",
    "currency": "EUR"
  },
  "quantity": 1,
  "interval": "month",
  "intervalCount": 1,
  "status": "active",
  "startedAt": "2026-01-15T10:30:00Z",
  "endedAt": null,
  "canceledAt": null,
  "renewedAt": "2026-02-15T10:30:00Z",
  "renewedUntil": "2026-03-15T10:30:00Z",
  "nextRenewalAt": "2026-03-15T10:30:00Z",
  "trialUntil": null,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/subscriptions/sub_abc123def456",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/cus_xyz789",
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
</tbody>
</table>

---

## Simulate a payment failure

`POST /v1/test-helpers/mandated-payments/{transactionId}/simulate-failure`

Force a mandated payment into a failed state for testing.

Useful for:

- testing payment failure handling and retry logic
- verifying dunning behavior
- validating webhook notifications for failed renewal attempts

### Request body

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
        reason
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Optional failure reason. One of <code>
        insufficient_funds
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
        authentication_failed
      </code>
      
      , or <code>
        general_failure
      </code>
      
      . Defaults to <code>
        general_failure
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

<code-group>

```bash [cURL]
curl -X POST https://api.vatly.com/v1/test-helpers/mandated-payments/mollie_mandated_payment_Xk9pQrSvWm4NjLhYbUcP/simulate-failure \
  -H "Authorization: Bearer test_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "insufficient_funds"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('test_your_api_key_here');

$result = $vatly->testHelpers->simulateMandatedPaymentFailure(
    'mollie_mandated_payment_Xk9pQrSvWm4NjLhYbUcP',
    ['reason' => 'insufficient_funds']
);
```

```json [Response]
{
  "id": "mollie_mandated_payment_Xk9pQrSvWm4NjLhYbUcP",
  "status": "failed",
  "failureReason": "insufficient_funds"
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
      Transaction not found
    </td>
  </tr>
</tbody>
</table>
