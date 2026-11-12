# Open the customer portal

> The portal lets buyers manage billing, invoices and subscriptions in Vatly.

The portal lets buyers manage billing, invoices and subscriptions in Vatly.
Bind a known customer from trusted provisioning code before opening it.

```python
from vatly_django.billing import Billing


def example(billable):
    billing = Billing()
    # Verify customer_example belongs to this billable before binding.
    billing.bind_customer(billable, "customer_example")
    return billing.portal(billable)
```

The sample accepts a saved billable your application has authorized. There is no
automatic remote customer creation or email lookup. Bindings are unique in both
directions and do not grant order/subscription ownership.

## Add a portal button

For a bound, logged-in billable, use the built-in CSRF-protected POST route:

```html
<form method="post" action="{% url 'vatly_django:portal' %}">
  {% csrf_token %}
  <button type="submit">Manage billing</button>
</form>
```

<table>
<thead>
  <tr>
    <th>
      Setting/result
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
        VATLY_PORTAL_REDIRECT_URL
      </code>
    </td>
    
    <td>
      Optional <code>
        returnUrl
      </code>
      
       link inside the portal
    </td>
  </tr>
  
  <tr>
    <td>
      302
    </td>
    
    <td>
      Redirect to a fresh single-use session
    </td>
  </tr>
  
  <tr>
    <td>
      400
    </td>
    
    <td>
      No authorized customer binding
    </td>
  </tr>
  
  <tr>
    <td>
      502
    </td>
    
    <td>
      Upstream SDK failure
    </td>
  </tr>
</tbody>
</table>

Never log/cache the credential-bearing URL or accept a browser-supplied customer
ID. Each visit creates a short-lived session for the API key's storefront and mode.

[Customer API reference](https://docs.vatly.com/api-reference/customers)
