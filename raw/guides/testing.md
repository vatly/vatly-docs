# Testing

> Use test helper endpoints to simulate billing events like subscription renewals in sandbox mode.

## Overview

Vatly provides test helper endpoints that let you simulate billing events without waiting for real billing cycles. These endpoints are only available in **test mode** and require a `test_` prefixed API token.

## Taxes in test mode

<warning>

In test mode, Vatly does **not** run real tax determination. Checkouts and orders created with a `test_` token use a **fixed, predefined set of tax rates** so results are predictable while you build your integration. **These rates are simulated for testing only — they are not guaranteed to match real, current statutory rates, and must never be relied upon for pricing decisions, accounting, invoicing, or tax compliance.** Switch to a `live_` token to get Vatly's real, jurisdiction-accurate tax determination.

</warning>

### How test-mode rates are applied

The buyer's country determines a single fixed **standard** VAT rate from a built-in lookup. Any country without a specific entry is taxed at a flat **20%**. As an example of multi-rate handling, a Canada (`CA`) buyer also gets an additional 9.975% `QST` line. Only the standard rate is ever applied — there are no reduced or product-specific rates, and the lookup is not kept in sync with statutory changes.

### Tax IDs and reverse charge in test mode

Tax IDs are **not** checked against VIES or any real registry in test mode. A test tax ID is treated as **valid only when it starts with the buyer's uppercase country code** — for example `DE123456789` is valid for a German buyer, while `de123456789` or `FR123…` for a German buyer is not.

When a **valid** test tax ID is supplied and the buyer's country **differs** from the seller's, a **0% reverse charge** is applied (B2B cross-border). Otherwise the buyer's country standard rate applies.

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
