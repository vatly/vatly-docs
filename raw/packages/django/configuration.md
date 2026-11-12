# Configure billing

> Vatly Django - Configure billing

Keep keys on the server. `test_` and `live_` select mode on the same API host.
Add these values to your project's settings after [installation](/packages/django/installation).

```python
import os

VATLY_API_KEY = os.environ["VATLY_API_KEY"]
VATLY_WEBHOOK_SECRET = os.environ["VATLY_WEBHOOK_SECRET"]
VATLY_SCOPE = "my-tenant/my-storefront"
VATLY_REDIRECT_URL_SUCCESS = "https://app.example.com/billing/success"
VATLY_REDIRECT_URL_CANCELED = "https://app.example.com/billing/canceled"
VATLY_PORTAL_REDIRECT_URL = "https://app.example.com/account/billing"
VATLY_CHECKOUTS = {
    "book": {"products": [{"id": "one_off_product_example", "quantity": 1}]},
    "pro": {"products": [{"id": "subscription_plan_example", "quantity": 1}]},
}
```

Replace catalog IDs with your own. Offers are an allowlist, not buyer-provided
payloads. Products, quantity and redirect destinations stay under server control.

<table>
<thead>
  <tr>
    <th>
      Setting
    </th>
    
    <th>
      Required?
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
        VATLY_API_KEY
      </code>
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      May fall back to the environment
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VATLY_SCOPE
      </code>
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      Stable tenant/storefront identity, up to 200 characters
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VATLY_WEBHOOK_SECRET
      </code>
    </td>
    
    <td>
      For webhooks
    </td>
    
    <td>
      Secret string or rotation sequence
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VATLY_REDIRECT_URL_SUCCESS
      </code>
      
      , <code>
        VATLY_REDIRECT_URL_CANCELED
      </code>
    </td>
    
    <td>
      For checkout
    </td>
    
    <td>
      HTTPS return destinations
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VATLY_PORTAL_REDIRECT_URL
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Optional return link in the portal
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VATLY_CHECKOUTS
      </code>
    </td>
    
    <td>
      For checkout
    </td>
    
    <td>
      Offer slug → products; optional locale, metadata, billingAddress
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VATLY_BILLABLE_RESOLVER
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Dotted callable taking request; defaults to request.user
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VATLY_SCOPE_RESOLVER
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Dotted callable taking request; chooses a trusted scope
    </td>
  </tr>
</tbody>
</table>

## Bill an organization instead of the user

A billable resolver must verify membership before returning a saved team/model.
For the default user case, the equivalent resolver is:

```python
from django.core.exceptions import PermissionDenied


def example(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("Login required")
    return request.user
```

Put your resolver in an importable module and set its dotted path in settings.
Never trust a query-string tenant/customer ID as authorization. The facade uses
one API key/secret configuration per deployment; scope resolvers alone do not
switch credentials. For a multi-credential registry, compose ORMDriver and Fluent
explicitly. Webhook routing must also select trusted credentials and scope.

[Billable models](/packages/django/billablemodels) · [API reference](https://docs.vatly.com/api-reference)
