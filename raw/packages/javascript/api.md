# SDK operation reference

> Vatly JavaScript packages - SDK operation reference

Import `VatlyClient` from `@getvatly/sdk`. All paths below are relative to `/v1`.
Every method takes optional `RequestOptions` last. For field details, see the
[API reference](https://docs.vatly.com/api-reference); the [OpenAPI spec](https://docs.vatly.com/openapi.yaml)
is also available for tooling. Bodies and results use generated types; server-side validation still applies.
Types, `components`, `paths`, and `operations` are exported from the package root.

<table>
<thead>
  <tr>
    <th>
      SDK method
    </th>
    
    <th>
      HTTP
    </th>
    
    <th>
      Path
    </th>
    
    <th>
      Result
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        checkouts.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /checkouts
      </code>
    </td>
    
    <td>
      Page of Checkout
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkouts.create(body)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /checkouts
      </code>
    </td>
    
    <td>
      Checkout
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkouts.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /checkouts/{id}
      </code>
    </td>
    
    <td>
      Checkout
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customers.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /customers
      </code>
    </td>
    
    <td>
      Page of Customer
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customers.create(body)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /customers
      </code>
    </td>
    
    <td>
      Customer (new or existing)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customers.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /customers/{id}
      </code>
    </td>
    
    <td>
      Customer
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customers.update(id, body)
      </code>
    </td>
    
    <td>
      PATCH
    </td>
    
    <td>
      <code>
        /customers/{id}
      </code>
    </td>
    
    <td>
      Customer
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customers.createPortalSession(id, body?)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /customers/{id}/portal-sessions
      </code>
    </td>
    
    <td>
      PortalSession
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customers.listSubscriptions(id, params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /customers/{id}/subscriptions
      </code>
    </td>
    
    <td>
      Page of Subscription
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customers.getSubscription(id, subId)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /customers/{id}/subscriptions/{subId}
      </code>
    </td>
    
    <td>
      Subscription
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        oneOffProducts.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /one-off-products
      </code>
    </td>
    
    <td>
      Page of OneOffProduct
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        oneOffProducts.create(body)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /one-off-products
      </code>
    </td>
    
    <td>
      OneOffProduct
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        oneOffProducts.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /one-off-products/{id}
      </code>
    </td>
    
    <td>
      OneOffProduct
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        oneOffProducts.update(id, body)
      </code>
    </td>
    
    <td>
      PATCH
    </td>
    
    <td>
      <code>
        /one-off-products/{id}
      </code>
    </td>
    
    <td>
      OneOffProduct
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        oneOffProducts.archive(id)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /one-off-products/{id}/archive
      </code>
    </td>
    
    <td>
      void (204)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        oneOffProducts.unarchive(id)
      </code>
    </td>
    
    <td>
      DELETE
    </td>
    
    <td>
      <code>
        /one-off-products/{id}/archive
      </code>
    </td>
    
    <td>
      OneOffProduct
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionPlans.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /subscription-plans
      </code>
    </td>
    
    <td>
      Page of SubscriptionPlan
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionPlans.create(body)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /subscription-plans
      </code>
    </td>
    
    <td>
      SubscriptionPlan
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionPlans.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /subscription-plans/{id}
      </code>
    </td>
    
    <td>
      SubscriptionPlan
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionPlans.update(id, body)
      </code>
    </td>
    
    <td>
      PATCH
    </td>
    
    <td>
      <code>
        /subscription-plans/{id}
      </code>
    </td>
    
    <td>
      SubscriptionPlan
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionPlans.archive(id)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /subscription-plans/{id}/archive
      </code>
    </td>
    
    <td>
      void (204)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionPlans.unarchive(id)
      </code>
    </td>
    
    <td>
      DELETE
    </td>
    
    <td>
      <code>
        /subscription-plans/{id}/archive
      </code>
    </td>
    
    <td>
      SubscriptionPlan
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /orders
      </code>
    </td>
    
    <td>
      Page of Order
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /orders/{id}
      </code>
    </td>
    
    <td>
      Order
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.createInvoiceUpdateLink(id)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /orders/{id}/invoice-update-link
      </code>
    </td>
    
    <td>
      InvoiceUpdateLink (<code>
        href
      </code>
      
      , <code>
        type
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.listRefunds(id, params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /orders/{id}/refunds
      </code>
    </td>
    
    <td>
      Page of Refund
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.createRefund(id, body)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /orders/{id}/refunds
      </code>
    </td>
    
    <td>
      Refund
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.createFullRefund(id, body?)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /orders/{id}/refunds/full
      </code>
    </td>
    
    <td>
      Refund
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.getRefund(id, refundId)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /orders/{id}/refunds/{refundId}
      </code>
    </td>
    
    <td>
      Refund
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.cancelRefund(id, refundId)
      </code>
    </td>
    
    <td>
      DELETE
    </td>
    
    <td>
      <code>
        /orders/{id}/refunds/{refundId}
      </code>
    </td>
    
    <td>
      void (204)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.listChargebacks(id, params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /orders/{id}/chargebacks
      </code>
    </td>
    
    <td>
      Page of Chargeback
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders.getChargeback(id, chargebackId)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /orders/{id}/chargebacks/{chargebackId}
      </code>
    </td>
    
    <td>
      Chargeback
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refunds.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /refunds
      </code>
    </td>
    
    <td>
      Page of Refund
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refunds.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /refunds/{id}
      </code>
    </td>
    
    <td>
      Refund
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        chargebacks.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /chargebacks
      </code>
    </td>
    
    <td>
      Page of Chargeback
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        chargebacks.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /chargebacks/{id}
      </code>
    </td>
    
    <td>
      Chargeback
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhookEvents.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /webhook-events/{id}
      </code>
    </td>
    
    <td>
      WebhookEvent
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhookEndpoints.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /webhook-endpoints
      </code>
    </td>
    
    <td>
      Page of WebhookEndpoint
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhookEndpoints.create(body)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /webhook-endpoints
      </code>
    </td>
    
    <td>
      WebhookEndpoint
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhookEndpoints.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /webhook-endpoints/{id}
      </code>
    </td>
    
    <td>
      WebhookEndpoint
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhookEndpoints.update(id, body)
      </code>
    </td>
    
    <td>
      PATCH
    </td>
    
    <td>
      <code>
        /webhook-endpoints/{id}
      </code>
    </td>
    
    <td>
      WebhookEndpoint
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhookEndpoints.delete(id)
      </code>
    </td>
    
    <td>
      DELETE
    </td>
    
    <td>
      <code>
        /webhook-endpoints/{id}
      </code>
    </td>
    
    <td>
      void (204)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions.list(params?)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /subscriptions
      </code>
    </td>
    
    <td>
      Page of Subscription
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions.get(id)
      </code>
    </td>
    
    <td>
      GET
    </td>
    
    <td>
      <code>
        /subscriptions/{id}
      </code>
    </td>
    
    <td>
      Subscription
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions.update(id, body)
      </code>
    </td>
    
    <td>
      PATCH
    </td>
    
    <td>
      <code>
        /subscriptions/{id}
      </code>
    </td>
    
    <td>
      Subscription
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions.cancel(id)
      </code>
    </td>
    
    <td>
      DELETE
    </td>
    
    <td>
      <code>
        /subscriptions/{id}
      </code>
    </td>
    
    <td>
      void (204)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions.createBillingUpdateLink(id, body)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /subscriptions/{id}/billing-update-link
      </code>
    </td>
    
    <td>
      SubscriptionBillingUpdateLink (<code>
        href
      </code>
      
      , <code>
        type
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions.resume(id)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /subscriptions/{id}/resume
      </code>
    </td>
    
    <td>
      Subscription
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testHelpers.fastForwardRenewal(id, body?)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /test-helpers/subscriptions/{id}/fast-forward-renewal
      </code>
    </td>
    
    <td>
      Subscription
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testHelpers.simulateOrderPayment(id, body)
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      <code>
        /test-helpers/orders/{id}/simulate-payment
      </code>
    </td>
    
    <td>
      Order
    </td>
  </tr>
</tbody>
</table>

All top-level lists have a `listAll(params?, opts?)` async iterator. Nested
subscription/refund lists have `listAllSubscriptions` / `listAllRefunds`.
Pagination params: `limit`, `startingAfter`, `endingBefore`. Product/plan lists
also accept `includeArchived`. Immediate cancellation uses
`subscriptions.cancel(id, { immediately: true, ...requestOptions })`.

## Alpha migration notes

- Package scope changed to `@getvatly/sdk` (also `@getvatly/sdk/webhooks`).
- Cancellation now accurately returns `Promise<void>`, not a subscription.
Fetch the subscription afterward if needed.
- Billing-update methods now return a hosted link, not a subscription.
Deprecated `updateBilling` / `requestAddressUpdateLink` aliases still work.
- The obsolete `simulatePaymentFailure(transactionId)` endpoint is removed;
use `simulateOrderPayment(orderId, { paymentStatus: "failed" })`.
- `fastForwardRenewal` now takes an optional body second and options third.
- Optional fields with server defaults no longer need to be supplied in requests.
- Errors can expose `details`; only `in_progress` idempotency conflicts retry.
- Subscription updates require at least one of `subscriptionPlanId`, `price`,
or `quantity`; `trialUntil` cannot stand alone. This is validated by the API.

## Deterministic payment testing

Only test-mode keys are allowed (guarded before sending a request):

```ts
const subscription = await vatly.testHelpers.fastForwardRenewal("subscription_123", {
  paymentStatus: "failed",
  failureReason: "card_expired",
});
const order = await vatly.testHelpers.simulateOrderPayment("order_123", {
  paymentStatus: "paid",
});
```

Omitting the renewal body advances the cycle and leaves its payment pending.
`failureReason` only applies with `paymentStatus: "failed"`.
These operations simulate payment outcomes; payment recovery remains managed
by Vatly. Read the production spec for recovery timelines and event semantics.
