# Start a checkout

> Configure a book offer in settings, then POST to the built-in checkout route as an authenticated user.

Configure a `book` offer in [settings](/packages/django/configuration), then POST to the built-in
checkout route as an authenticated user. The view accepts an idempotency key, not
buyer-controlled products or prices.

## Prepare one key per purchase

```python
from uuid import uuid4


def example():
    return {"purchase_key": str(uuid4())}
```

Persist the key with the host's purchase intent and pass it to your template.
Re-render/retry with the same key after an ambiguous failure; do not generate a
new UUID just because the API timed out. A genuinely new purchase needs a new key.

```html
<form method="post" action="{% url 'vatly_django:checkout' offer='book' %}">
  {% csrf_token %}
  <input type="hidden" name="idempotency_key" value="{{ purchase_key }}">
  <button type="submit">Buy the book</button>
</form>
```

## Call from your own POST view

Pass a saved, authorized billable and the key you persisted:

```python
from vatly_django.billing import Billing


def example(billable, purchase_key):
    return Billing().checkout(billable, "book", idempotency_key=purchase_key)
```

Redirect to the returned hosted URL. A durable CheckoutAttempt records the entity,
payload fingerprint and key before network I/O. Reusing the key for a different
entity or changed offer fails. Idempotency retention is finite; investigate stale
attempts rather than blindly retrying forever.

<table>
<thead>
  <tr>
    <th>
      Built-in view result
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      302
    </td>
    
    <td>
      Redirect to hosted checkout, or login for an unauthenticated request
    </td>
  </tr>
  
  <tr>
    <td>
      400
    </td>
    
    <td>
      Invalid key or offer
    </td>
  </tr>
  
  <tr>
    <td>
      403
    </td>
    
    <td>
      CSRF rejection
    </td>
  </tr>
  
  <tr>
    <td>
      405
    </td>
    
    <td>
      Non-POST request
    </td>
  </tr>
  
  <tr>
    <td>
      502
    </td>
    
    <td>
      SDK failure; retry/reconcile using the same purchase key
    </td>
  </tr>
</tbody>
</table>

A return-page visit is not proof of payment. [Signed webhooks](/packages/django/webhooks) update
local records; [reconciliation](/packages/django/billing) handles missing snapshots. Customer
identity alone never assigns a purchase to a billable.

[Checkout API reference](https://docs.vatly.com/api-reference/checkouts)
