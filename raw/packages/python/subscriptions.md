# Subscriptions

> Vatly Python SDK - Subscriptions

A paid checkout containing a subscription plan starts recurring billing. There is
no direct `subscriptions.create()`. Read and manage the resulting subscription ID
after establishing who owns it. Examples use the client from [setup](/packages/python/readme).

## Read and change a subscription

```python
from vatly import RequestOptions, VatlyClient


def example(client: VatlyClient):
    subscription = client.subscriptions.get("subscription_example")
    changed = client.subscriptions.update(
        subscription.id,
        {"subscriptionPlanId": "subscription_plan_pro", "quantity": 2},
        options=RequestOptions(idempotency_key="plan-change:42"),
    )
    return changed.status, changed.scheduled_update
```

Changes are scheduled by default. Inspect `scheduled_update`; do not immediately
replace the active plan in your application.

<table>
<thead>
  <tr>
    <th>
      Update parameter (wire key)
    </th>
    
    <th>
      Purpose
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        subscriptionPlanId
      </code>
      
      , <code>
        quantity
      </code>
      
      , <code>
        price
      </code>
    </td>
    
    <td>
      Send at least one to request a change
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        applyImmediately
      </code>
    </td>
    
    <td>
      Apply now instead of scheduling
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        invoiceImmediately
      </code>
      
      , <code>
        prorate
      </code>
      
      , <code>
        prorationCharge
      </code>
    </td>
    
    <td>
      Explicit invoicing/proration choices
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trialUntil
      </code>
    </td>
    
    <td>
      Optional aware datetime; cannot be the sole change
    </td>
  </tr>
</tbody>
</table>

## Cancel, resume and update billing details

These are separate user actions. Only resume during a valid grace period.

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    client.subscriptions.cancel("subscription_example", {"immediately": False})
```

For a later, separate resume request:

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    return client.subscriptions.resume("subscription_example")
```

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    link = client.subscriptions.create_billing_update_link(
        "subscription_example",
        {
            "redirectUrlSuccess": "https://app.example.com/billing/success",
            "redirectUrlCanceled": "https://app.example.com/billing/canceled",
        },
    )
    return link.href
```

Cancellation returns None; resume returns a Subscription. Set `immediately=True`
only when the user intends immediate cancellation. Reuse business idempotency
keys with `RequestOptions` when retrying mutations.

<table>
<thead>
  <tr>
    <th>
      Response field
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
        status
      </code>
    </td>
    
    <td>
      Current lifecycle state; inspect it before granting access
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customer_id
      </code>
      
      , <code>
        subscription_plan_id
      </code>
      
      , <code>
        quantity
      </code>
    </td>
    
    <td>
      Billing identity and current purchase
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        canceled_at
      </code>
    </td>
    
    <td>
      Cancellation <strong>
        request
      </strong>
      
       time, not grace expiry
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ended_at
      </code>
    </td>
    
    <td>
      Actual end when present
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        next_renewal_at
      </code>
      
      , <code>
        renewed_until
      </code>
      
      , <code>
        trial_until
      </code>
    </td>
    
    <td>
      Period information; nullable
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scheduled_update
      </code>
    </td>
    
    <td>
      Pending changes or None
    </td>
  </tr>
</tbody>
</table>

Do not infer a subscription ID from a plan ID. Initial order lines can still
reference plans; this alpha does not consume the proposed related-resources
subscription reference. [Fluent's guide](https://docs.vatly.com/packages/fluent-python/subscriptions)
explains recovery and expiry limits.

[Subscription API reference](https://docs.vatly.com/api-reference/subscriptions) · [All methods](/packages/python/api#subscriptions)
