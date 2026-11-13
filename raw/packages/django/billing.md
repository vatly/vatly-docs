# Manage owned subscriptions

> Use the facade with a saved, authorized billable.

Use the facade with a saved, authorized billable. It checks local ownership before
subscription mutations. A raw Vatly customer ID is never enough to authorize one.

## Read current local subscriptions

```python
from vatly_django.billing import Billing


def example(billable):
    return list(
        Billing().resources(billable, "subscription").values("vatly_id", "snapshot", "ends_at")
    )
```

<table>
<thead>
  <tr>
    <th>
      Stored field
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
        vatly_id
      </code>
    </td>
    
    <td>
      Subscription identifier
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        snapshot
      </code>
    </td>
    
    <td>
      Full Vatly resource using wire keys, including status
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ends_at
      </code>
    </td>
    
    <td>
      Derived expiry, not cancellation request time
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        entity_kind
      </code>
      
      , <code>
        entity_id
      </code>
      
      , <code>
        scope
      </code>
    </td>
    
    <td>
      Host ownership and tenant/storefront/mode
    </td>
  </tr>
</tbody>
</table>

`BillableMixin.subscribed()` requires active/trial/on_grace_period status and no
expired local end. It is a convenience policy, not your complete entitlement rule.
Failed or stale synchronization must not be treated as proof of access.

## Cancel or resume from a user action

These functions belong in authenticated, CSRF-protected POST handlers:

```python
from vatly_django.billing import Billing


def example(billable):
    Billing().subscription_action(billable, "subscription_example", "cancel", immediately=False)
```

```python
from vatly_django.billing import Billing


def example(billable):
    Billing().subscription_action(billable, "subscription_example", "resume")
```

<table>
<thead>
  <tr>
    <th>
      Action
    </th>
    
    <th>
      Behavior
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        cancel
      </code>
    </td>
    
    <td>
      Request cancellation; signed events update local state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resume
      </code>
    </td>
    
    <td>
      Resume during grace and persist the API response
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        sync
      </code>
    </td>
    
    <td>
      Refresh a subscription snapshot
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        swap
      </code>
      
      , <code>
        swap_and_invoice
      </code>
      
      , <code>
        swap_without_charge
      </code>
    </td>
    
    <td>
      Plan-change policies; pass <code>
        plan_id
      </code>
    </td>
  </tr>
</tbody>
</table>

The facade's action helper returns None. Use Fluent/SDK RequestOptions directly
when your mutation workflow needs an explicit stable idempotency key.

## Reconcile a known checkout

```python
from vatly_django.billing import Billing


def example(billable):
    result = Billing().reconcile(billable, "checkout_example")
    # Schedule a bounded later reconcile while either tuple is not empty.
    return result.unresolved_line_ids, result.pending_subscription_ids
```

The facade checks the checkout's host record, performs bounded API reads and
persists snapshots/links transactionally. This may hold the scope lock during
reads; run it in a worker for busy deployments. It emits no created outbox event.

Signup lines reference their plan and name their subscription in
`relatedResources.subscriptionId`; renewal lines reference the subscription as
their product. Both link the subscription to the checkout's billable.

<table>
<thead>
  <tr>
    <th>
      Result field
    </th>
    
    <th>
      Meaning
    </th>
    
    <th>
      What to do
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        subscriptions
      </code>
    </td>
    
    <td>
      Linked and stored subscriptions
    </td>
    
    <td>
      Nothing
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        pending_subscription_ids
      </code>
    </td>
    
    <td>
      Referenced, but not readable yet
    </td>
    
    <td>
      Reconcile again later
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unresolved_line_ids
      </code>
    </td>
    
    <td>
      Signup lines whose <code>
        subscriptionId
      </code>
      
       is still null
    </td>
    
    <td>
      Reconcile again later; it may never resolve
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        legacy_plan_ids
      </code>
    </td>
    
    <td>
      Plan lines on historical orders without <code>
        relatedResources
      </code>
    </td>
    
    <td>
      Resolve manually
    </td>
  </tr>
</tbody>
</table>

A signed `order.paid` snapshot is frozen when it is sent and can carry a null
`subscriptionId`, so the first order may still need an explicit reconcile. Schedule
a bounded number of later reconciles while `unresolved_line_ids` is not empty.
Never guess by customer/plan/quantity. Missing subscription IDs remain pending,
not entitled. Trial flows may lack an order.paid event.

Grace expiry uses Fluent's shared mapper. `canceledAt` is the request time.
Missing or ambiguous period deadlines raise and retain the prior committed state;
monitor and reconcile instead of inventing an expiry. Active snapshots clear stale
ends after resume. [Fluent's guide](https://docs.vatly.com/packages/fluent-python/subscriptions)
describes this policy and its limits.

[Subscription API reference](https://docs.vatly.com/api-reference/subscriptions)
