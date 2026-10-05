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

Simulate a renewal cycle for an existing subscription. The subscription must be active and have a scheduled next renewal.

This helper is **asynchronous, just like a live renewal**. The request is validated straight away, but the renewal itself runs from a queue a few seconds later — so the response returns the subscription **as it was before the renewal**: `renewedAt`, `renewedUntil`, and `nextRenewalAt` have not moved yet. Follow the `order.paid` and `order.payment_failed` webhooks for the outcome, exactly as your live integration should.

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

The renewal payment is simulated **locally** — Vatly never submits a charge to the provider sandbox. When `paymentStatus` is provided it is the deterministic outcome; when it is omitted the payment stays pending, and you can settle or decline it later with [Simulate an order payment](#simulate-an-order-payment). A requested `failed` outcome can start payment recovery even before a payment exists, but `paid` cannot be applied until there is a chargeable payment. If the payment mandate is not active yet, the cycle still advances. Only one unresolved fast-forward per subscription may be in flight at a time — a second request returns `409` while the first is still queued, running, or awaiting recovery.

</note>

<note>

Because the simulated payment lives only inside Vatly, it cannot receive a provider-originated chargeback or dispute. Use a normal provider-backed test payment when you need to test chargeback webhooks.

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
  "cancellationReason": null,
  "mandate": {
    "method": "card",
    "maskedIdentifier": "4242"
  },
  "startedAt": "2024-01-15T10:30:00Z",
  "endedAt": null,
  "canceledAt": null,
  "renewedAt": null,
  "renewedUntil": null,
  "nextRenewalAt": "2024-02-15T10:30:00Z",
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
      A fast-forward for this subscription is still queued, running, or awaiting recovery
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

---

## Simulate an order payment

`POST /v1/test-helpers/orders/{orderId}/simulate-payment`

Settle or decline the pending payment of a test order that was charged to the customer's saved payment method — for example a subscription renewal, or a subscription update made with `invoiceImmediately: true`. Payments created locally by the fast-forward and payment-recovery helpers stay pending until you simulate an outcome here; provider-backed sandbox payments may settle on their own.

Unlike [fast-forward renewal](#fast-forward-subscription-renewal), this does **not** advance the billing cycle — it only resolves a payment that is already awaiting an outcome.

This helper is **asynchronous, just like a live payment**. The request is validated straight away, but the outcome is applied from a queue a few seconds later, so the returned order is still awaiting payment. Follow the `order.paid` / `order.payment_failed` webhooks for the result.

### Request body

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
      Required. Outcome to force on the order's pending payment. One of <code>
        paid
      </code>
      
       or <code>
        failed
      </code>
      
      . <code>
        paid
      </code>
      
       settles it (delivering <code>
        order.paid
      </code>
      
      ); <code>
        failed
      </code>
      
       declines it and starts a payment recovery (delivering <code>
        order.payment_failed
      </code>
      
      ).
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

A payment that already completed or failed cannot be simulated again. If the payment mandate is not active yet, no payment exists: `failed` still starts a payment recovery, but `paid` is rejected. Only one simulation per order can be queued at a time — a second request while one is queued returns `409`.

</note>

<code-group>

```bash [cURL]
curl -X POST https://api.vatly.com/v1/test-helpers/orders/order_Hn5xWqVfKm8RjTgYbUcP/simulate-payment \
  -H "Authorization: Bearer test_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentStatus": "paid"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('test_your_api_key_here');

$order = $vatly->testHelpers->simulateOrderPayment('order_Hn5xWqVfKm8RjTgYbUcP', [
    'paymentStatus' => 'paid',
]);
```

```json [Response]
{
  "id": "order_Hn5xWqVfKm8RjTgYbUcP",
  "resource": "order",
  "customerId": "customer_Xk9pQrSvWm4NjLhYbUcP",
  "testmode": true,
  "metadata": {},
  "paymentMethod": null,
  "createdAt": "2024-01-15T10:30:00Z",
  "status": "pending",
  "invoiceNumber": null,
  "total": {
    "value": "35.09",
    "currency": "EUR"
  },
  "subtotal": {
    "value": "29.00",
    "currency": "EUR"
  },
  "reversedSubtotal": {
    "value": "0.00",
    "currency": "EUR"
  },
  "refundableSubtotal": {
    "value": "29.00",
    "currency": "EUR"
  },
  "taxSummary": [
    {
      "taxRate": {
        "name": "VAT",
        "percentage": 21,
        "taxablePercentage": 100
      },
      "amount": {
        "value": "6.09",
        "currency": "EUR"
      }
    }
  ],
  "lines": [
    {
      "id": "order_item_Jk4pQrSvWm8NjLhYbUcP",
      "resource": "orderline",
      "description": "Pro Monthly Subscription",
      "quantity": 1,
      "basePrice": {
        "value": "29.00",
        "currency": "EUR"
      },
      "total": {
        "value": "35.09",
        "currency": "EUR"
      },
      "subtotal": {
        "value": "29.00",
        "currency": "EUR"
      },
      "taxes": [
        {
          "taxRate": {
            "name": "VAT",
            "percentage": 21,
            "taxablePercentage": 100
          },
          "amount": {
            "value": "6.09",
            "currency": "EUR"
          }
        }
      ],
      "productType": "subscription",
      "productId": "subscription_Hn5xWqVfKm8RjTgYbUcP"
    }
  ],
  "customerDetails": {
    "fullName": "John Doe",
    "companyName": "Acme Corp",
    "streetAndNumber": "123 Main Street",
    "city": "Berlin",
    "postalCode": "10115",
    "country": "DE",
    "email": "john@acme.com"
  },
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/orders/order_Hn5xWqVfKm8RjTgYbUcP",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/customer_Xk9pQrSvWm4NjLhYbUcP",
      "type": "application/json"
    },
    "customerInvoice": {
      "href": "https://vatly.com/invoices/order_Hn5xWqVfKm8RjTgYbUcP",
      "type": "text/html"
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
      Order not found
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        409
      </code>
    </td>
    
    <td>
      A simulation for this order is already queued
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
      
      , or <code>
        paid
      </code>
      
       requested before a chargeable payment exists)
    </td>
  </tr>
</tbody>
</table>
