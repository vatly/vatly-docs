# API reference

> Generated from openapi.yaml.

Generated from `openapi.yaml`. Sync and async clients expose the same methods.
Pass a Pydantic request/params model or a wire-format dictionary. All methods accept keyword-only `options=RequestOptions(...)`.

## `checkouts`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /checkouts
      </code>
    </td>
    
    <td>
      <code>
        Page[Checkout]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create(body)
      </code>
    </td>
    
    <td>
      <code>
        POST /checkouts
      </code>
    </td>
    
    <td>
      <code>
        Checkout
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(checkout_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /checkouts/{checkoutId}
      </code>
    </td>
    
    <td>
      <code>
        Checkout
      </code>
    </td>
  </tr>
</tbody>
</table>

## `customers`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /customers
      </code>
    </td>
    
    <td>
      <code>
        Page[Customer]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create(body)
      </code>
    </td>
    
    <td>
      <code>
        POST /customers
      </code>
    </td>
    
    <td>
      <code>
        Customer
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(customer_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /customers/{customerId}
      </code>
    </td>
    
    <td>
      <code>
        Customer
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        update(customer_id, body)
      </code>
    </td>
    
    <td>
      <code>
        PATCH /customers/{customerId}
      </code>
    </td>
    
    <td>
      <code>
        Customer
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_portal_session(customer_id, body)
      </code>
    </td>
    
    <td>
      <code>
        POST /customers/{customerId}/portal-sessions
      </code>
    </td>
    
    <td>
      <code>
        PortalSession
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        list_subscriptions(customer_id, params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /customers/{customerId}/subscriptions
      </code>
    </td>
    
    <td>
      <code>
        Page[Subscription]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get_subscription(customer_id, subscription_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /customers/{customerId}/subscriptions/{subscriptionId}
      </code>
    </td>
    
    <td>
      <code>
        Subscription
      </code>
    </td>
  </tr>
</tbody>
</table>

## `one_off_products`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /one-off-products
      </code>
    </td>
    
    <td>
      <code>
        Page[OneOffProduct]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create(body)
      </code>
    </td>
    
    <td>
      <code>
        POST /one-off-products
      </code>
    </td>
    
    <td>
      <code>
        OneOffProduct
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(one_off_product_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /one-off-products/{oneOffProductId}
      </code>
    </td>
    
    <td>
      <code>
        OneOffProduct
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        update(one_off_product_id, body)
      </code>
    </td>
    
    <td>
      <code>
        PATCH /one-off-products/{oneOffProductId}
      </code>
    </td>
    
    <td>
      <code>
        OneOffProduct
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        archive(one_off_product_id)
      </code>
    </td>
    
    <td>
      <code>
        POST /one-off-products/{oneOffProductId}/archive
      </code>
    </td>
    
    <td>
      <code>
        None
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unarchive(one_off_product_id)
      </code>
    </td>
    
    <td>
      <code>
        DELETE /one-off-products/{oneOffProductId}/archive
      </code>
    </td>
    
    <td>
      <code>
        OneOffProduct
      </code>
    </td>
  </tr>
</tbody>
</table>

## `subscription_plans`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /subscription-plans
      </code>
    </td>
    
    <td>
      <code>
        Page[SubscriptionPlan]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create(body)
      </code>
    </td>
    
    <td>
      <code>
        POST /subscription-plans
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionPlan
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(subscription_plan_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /subscription-plans/{subscriptionPlanId}
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionPlan
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        update(subscription_plan_id, body)
      </code>
    </td>
    
    <td>
      <code>
        PATCH /subscription-plans/{subscriptionPlanId}
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionPlan
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        archive(subscription_plan_id)
      </code>
    </td>
    
    <td>
      <code>
        POST /subscription-plans/{subscriptionPlanId}/archive
      </code>
    </td>
    
    <td>
      <code>
        None
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unarchive(subscription_plan_id)
      </code>
    </td>
    
    <td>
      <code>
        DELETE /subscription-plans/{subscriptionPlanId}/archive
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionPlan
      </code>
    </td>
  </tr>
</tbody>
</table>

## `orders`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /orders
      </code>
    </td>
    
    <td>
      <code>
        Page[Order]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(order_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /orders/{orderId}
      </code>
    </td>
    
    <td>
      <code>
        Order
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_invoice_update_link(order_id)
      </code>
    </td>
    
    <td>
      <code>
        POST /orders/{orderId}/invoice-update-link
      </code>
    </td>
    
    <td>
      <code>
        InvoiceUpdateLink
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        list_refunds(order_id, params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /orders/{orderId}/refunds
      </code>
    </td>
    
    <td>
      <code>
        Page[Refund]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_refund(order_id, body)
      </code>
    </td>
    
    <td>
      <code>
        POST /orders/{orderId}/refunds
      </code>
    </td>
    
    <td>
      <code>
        Refund
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_full_refund(order_id, body)
      </code>
    </td>
    
    <td>
      <code>
        POST /orders/{orderId}/refunds/full
      </code>
    </td>
    
    <td>
      <code>
        Refund
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get_refund(order_id, refund_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /orders/{orderId}/refunds/{refundId}
      </code>
    </td>
    
    <td>
      <code>
        Refund
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cancel_refund(order_id, refund_id)
      </code>
    </td>
    
    <td>
      <code>
        DELETE /orders/{orderId}/refunds/{refundId}
      </code>
    </td>
    
    <td>
      <code>
        None
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        list_chargebacks(order_id, params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /orders/{orderId}/chargebacks
      </code>
    </td>
    
    <td>
      <code>
        Page[Chargeback]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get_chargeback(order_id, chargeback_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /orders/{orderId}/chargebacks/{chargebackId}
      </code>
    </td>
    
    <td>
      <code>
        Chargeback
      </code>
    </td>
  </tr>
</tbody>
</table>

## `refunds`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /refunds
      </code>
    </td>
    
    <td>
      <code>
        Page[Refund]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(refund_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /refunds/{refundId}
      </code>
    </td>
    
    <td>
      <code>
        Refund
      </code>
    </td>
  </tr>
</tbody>
</table>

## `chargebacks`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /chargebacks
      </code>
    </td>
    
    <td>
      <code>
        Page[Chargeback]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(chargeback_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /chargebacks/{chargebackId}
      </code>
    </td>
    
    <td>
      <code>
        Chargeback
      </code>
    </td>
  </tr>
</tbody>
</table>

## `webhook_events`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        get(event_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /webhook-events/{eventId}
      </code>
    </td>
    
    <td>
      <code>
        WebhookEvent
      </code>
    </td>
  </tr>
</tbody>
</table>

## `webhook_endpoints`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /webhook-endpoints
      </code>
    </td>
    
    <td>
      <code>
        Page[WebhookEndpoint]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create(body)
      </code>
    </td>
    
    <td>
      <code>
        POST /webhook-endpoints
      </code>
    </td>
    
    <td>
      <code>
        WebhookEndpoint
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(webhook_endpoint_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /webhook-endpoints/{webhookEndpointId}
      </code>
    </td>
    
    <td>
      <code>
        WebhookEndpoint
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        update(webhook_endpoint_id, body)
      </code>
    </td>
    
    <td>
      <code>
        PATCH /webhook-endpoints/{webhookEndpointId}
      </code>
    </td>
    
    <td>
      <code>
        WebhookEndpoint
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        delete(webhook_endpoint_id)
      </code>
    </td>
    
    <td>
      <code>
        DELETE /webhook-endpoints/{webhookEndpointId}
      </code>
    </td>
    
    <td>
      <code>
        None
      </code>
    </td>
  </tr>
</tbody>
</table>

## `subscriptions`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        list(params=None)
      </code>
    </td>
    
    <td>
      <code>
        GET /subscriptions
      </code>
    </td>
    
    <td>
      <code>
        Page[Subscription]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        get(subscription_id)
      </code>
    </td>
    
    <td>
      <code>
        GET /subscriptions/{subscriptionId}
      </code>
    </td>
    
    <td>
      <code>
        Subscription
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        update(subscription_id, body)
      </code>
    </td>
    
    <td>
      <code>
        PATCH /subscriptions/{subscriptionId}
      </code>
    </td>
    
    <td>
      <code>
        Subscription
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cancel(subscription_id, params=None)
      </code>
    </td>
    
    <td>
      <code>
        DELETE /subscriptions/{subscriptionId}
      </code>
    </td>
    
    <td>
      <code>
        None
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_billing_update_link(subscription_id, body)
      </code>
    </td>
    
    <td>
      <code>
        POST /subscriptions/{subscriptionId}/billing-update-link
      </code>
    </td>
    
    <td>
      <code>
        CreateSubscriptionBillingUpdateLinkResponse
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resume(subscription_id)
      </code>
    </td>
    
    <td>
      <code>
        POST /subscriptions/{subscriptionId}/resume
      </code>
    </td>
    
    <td>
      <code>
        Subscription
      </code>
    </td>
  </tr>
</tbody>
</table>

## `test_helpers`

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      HTTP endpoint
    </th>
    
    <th>
      Returns
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        fast_forward_renewal(subscription_id, body)
      </code>
    </td>
    
    <td>
      <code>
        POST /test-helpers/subscriptions/{subscriptionId}/fast-forward-renewal
      </code>
    </td>
    
    <td>
      <code>
        Subscription
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        simulate_order_payment(order_id, body)
      </code>
    </td>
    
    <td>
      <code>
        POST /test-helpers/orders/{orderId}/simulate-payment
      </code>
    </td>
    
    <td>
      <code>
        Order
      </code>
    </td>
  </tr>
</tbody>
</table>
