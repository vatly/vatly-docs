# Subscription plans

> Vatly Python SDK - Subscription plans

Plans define the recurring product, price and billing interval sold through a
[checkout](/packages/python/checkouts). A plan is not a customer's subscription.
Examples accept the client from [setup](/packages/python/readme).

## Create a monthly plan

```python
from vatly import VatlyClient
from vatly.models import CreateSubscriptionPlanRequest


def example(client: VatlyClient):
    return client.subscription_plans.create(
        CreateSubscriptionPlanRequest(
            name="Pro",
            description="Monthly access to Pro",
            base_price={"value": "19.00", "currency": "EUR"},
            product_type="saas",
            interval="month",
            interval_count=1,
        )
    )
```

<table>
<thead>
  <tr>
    <th>
      Input field
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Required?
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        name
      </code>
      
      , <code>
        description
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base_price
      </code>
    </td>
    
    <td>
      EUR money, e.g. <code>
        {"value": "19.00", "currency": "EUR"}
      </code>
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        product_type
      </code>
    </td>
    
    <td>
      <code>
        "saas"
      </code>
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        interval
      </code>
    </td>
    
    <td>
      <code>
        "day"
      </code>
      
      , <code>
        "week"
      </code>
      
      , <code>
        "month"
      </code>
      
      , <code>
        "year"
      </code>
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        interval_count
      </code>
    </td>
    
    <td>
      positive integer
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tax_behavior
      </code>
    </td>
    
    <td>
      <code>
        "exclusive"
      </code>
      
       or <code>
        "inclusive"
      </code>
    </td>
    
    <td>
      No
    </td>
  </tr>
</tbody>
</table>

Use decimal strings, never floats, for money. The current creation contract uses
EUR. Model fields are snake_case; dictionary inputs use `basePrice`, `productType`,
`intervalCount` and `taxBehavior`.

## Find, update and archive

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    plans = list(client.subscription_plans.list_all({"includeArchived": True, "limit": 25}))
    plan = client.subscription_plans.get("subscription_plan_example")
    updated = client.subscription_plans.update(plan.id, {"name": "Pro monthly"})
    client.subscription_plans.archive(updated.id)
    restored = client.subscription_plans.unarchive(updated.id)
    return plans, restored
```

Archiving prevents new sales, not existing renewals. `archive()` returns None;
`unarchive()` returns the plan. Test changes are auto-approved; live changes may
require approval.

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
        id
      </code>
    </td>
    
    <td>
      <code>
        subscription_plan_...
      </code>
      
       catalog ID
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        name
      </code>
      
      , <code>
        description
      </code>
      
      , <code>
        base_price
      </code>
    </td>
    
    <td>
      Product and price
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        interval
      </code>
      
      , <code>
        interval_count
      </code>
    </td>
    
    <td>
      Billing cadence
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testmode
      </code>
      
      , <code>
        links
      </code>
    </td>
    
    <td>
      Mode and resource links
    </td>
  </tr>
</tbody>
</table>

[Plan API reference](https://docs.vatly.com/api-reference/subscription-plans) · [All methods](/packages/python/api#subscription_plans)
