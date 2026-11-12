# Manage subscriptions

> Load a locally owned subscription, authorize its entity, then use a handle for plan changes or cancellation.

Load a locally owned subscription, authorize its entity, then use a handle for
plan changes or cancellation. Examples accept the configured `vatly` from
[Configuration](/packages/fluent-python/configuration); its repositories must be wired.

## Load a handle and change a plan

```python
from vatly import RequestOptions
from vatly_fluent import EntityRef, FluentError, Vatly


async def example(vatly: Vatly):
    record = await vatly.wiring.subscriptions.find_by_vatly_id("subscription_example")
    if record is None or record.entity != EntityRef("team", "42"):
        raise FluentError("Subscription is not owned by this team")
    handle = vatly.subscription(record)
    await handle.swap(
        "subscription_plan_pro",
        options=RequestOptions(
            idempotency_key="team-42:plan-change-1",
        ),
    )
    return handle.model().resource
```

The host must authorize team 42 separately. A handle's `model()` is local; methods
such as `sync()` make API calls. Scheduled changes do not prematurely replace the
active plan.

<table>
<thead>
  <tr>
    <th>
      Method
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
        swap
      </code>
    </td>
    
    <td>
      Schedule a plan change by default
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        swap_and_invoice
      </code>
    </td>
    
    <td>
      Apply and invoice immediately
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        swap_without_charge
      </code>
    </td>
    
    <td>
      Apply now, disable proration charge
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cancel(immediately=False)
      </code>
    </td>
    
    <td>
      Request cancellation; wait for signed events to update local state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resume
      </code>
    </td>
    
    <td>
      Resume through the API and save its returned snapshot
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        sync
      </code>
    </td>
    
    <td>
      Refresh full resource and local expiry
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        update_billing
      </code>
    </td>
    
    <td>
      Return hosted billing URL; requires both redirect URLs
    </td>
  </tr>
</tbody>
</table>

## Request cancellation

```python
from vatly import RequestOptions
from vatly_fluent import LocalSubscription, Vatly


async def example(vatly: Vatly, local: LocalSubscription):
    # local has already been authorized by the caller.
    await vatly.subscription(local).cancel(
        immediately=False, options=RequestOptions(idempotency_key="cancel:42")
    )
```

Only offer resume while Vatly permits it. `scheduled_update()`,
`has_scheduled_update()` and `cancellation_reason()` read remotely.

## Use expiry without mistaking it for entitlement

```python
from vatly_fluent import LocalSubscription, Vatly


async def example(vatly: Vatly, local: LocalSubscription):
    handle = vatly.subscription(local)
    await handle.sync()
    return handle.model().resource.status, handle.state()
```

`state()` uses `ends_at` only. Check the resource status and your product's access
rules too. `canceled_at` is the request time, not grace expiry. The shared mapper
uses actual `ended_at`, otherwise usable future renewal/paid/trial information or
a trusted prior end. Missing or conflicting trial/cycle deadlines raise
`FluentError`, preserving committed state. Monitor and reconcile failures; stale
state is not proof of continuing access. An active snapshot clears stale expiry.

## Recover an owned checkout

```python
from vatly_fluent import Vatly


async def example(vatly: Vatly):
    result = await vatly.reconcile_checkout("checkout_example", attempts=2)
    return result.subscriptions, result.pending_subscription_ids, result.legacy_plan_ids
```

Authorize the checkout and wrap local writes in your driver's transaction. Reads
follow checkout → order → distinct subscription IDs; repeated 404s remain pending.
This alpha reports plan-valued lines as `legacy_plan_ids` and does not consume the
proposed `relatedResources.subscriptionId` addition. A plan/customer match is
never an ownership fallback. Trial flows can lack `order.paid`, so reconciliation
must be explicit. Unknown linkage must not grant access.

[Subscription API reference](https://docs.vatly.com/api-reference/subscriptions)
