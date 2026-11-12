# Choose a billable model

> Vatly Django - Choose a billable model

A billable is the saved user, team or company your application has authorized to
buy. Existing models can use `Billing()` without changing their inheritance.

```python
from vatly_django.billing import Billing


def example(billable):
    billing = Billing()
    return billing.resources(billable, "subscription")
```

Pass a saved, already-authorized model instance. Queries include its entity,
scope and mode; no customer-ID ownership fallback is used.

## Add Cashier-style methods

For a model in your `teams` app, inherit the abstract mixin:

```python
from django.db import models
from vatly_django.mixins import BillableMixin


class Team(BillableMixin):
    name = models.CharField(max_length=200)

    class Meta:
        app_label = "teams"
```

Keep your model's normal fields and permissions. Run `makemigrations teams` and
`migrate` as usual; the mixin itself adds no columns. Do not replace an existing
auth user model just to integrate billing.

<table>
<thead>
  <tr>
    <th>
      Mixin method
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
        checkout(offer, idempotency_key=...)
      </code>
    </td>
    
    <td>
      Create a hosted purchase
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        billing_portal()
      </code>
    </td>
    
    <td>
      Open the bound customer's portal
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptions()
      </code>
      
      , <code>
        subscribed()
      </code>
    </td>
    
    <td>
      Read owned subscriptions and convenience access state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cancel_subscription(id, immediately=False)
      </code>
    </td>
    
    <td>
      Request cancellation
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resume_subscription(id)
      </code>
    </td>
    
    <td>
      Resume and refresh the snapshot
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        swap_subscription(id, plan_id)
      </code>
    </td>
    
    <td>
      Request a plan change
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        billing(scope=...)
      </code>
    </td>
    
    <td>
      Access the underlying facade
    </td>
  </tr>
</tbody>
</table>

Entity identity is the Django model label plus primary key. Renaming models or
changing keys needs a migration of your billing references. Deleting a user does
not cascade through these generic billing references; apply your retention policy.

[Checkout](/packages/django/checkout) · [Subscription access rules](/packages/django/billing) · [API reference](https://docs.vatly.com/api-reference)
