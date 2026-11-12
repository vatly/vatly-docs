# Customers

> Vatly Python SDK - Customers

Keep a Vatly customer ID alongside your own user or company. Customers hold billing
identity; a shared email or customer ID is not proof that someone owns an order.
Pass a configured `VatlyClient` to the functions below; see [setup](/packages/python/readme).

## Create, retrieve and update

```python
from vatly import RequestOptions, VatlyClient
from vatly.models import CreateCustomerRequest


def example(client: VatlyClient):
    customer = client.customers.create(
        CreateCustomerRequest(email="buyer@example.com", name="Alex"),
        options=RequestOptions(idempotency_key="signup:user-42"),
    )
    saved = client.customers.get(customer.id)
    updated = client.customers.update(saved.id, {"name": "Alex Morgan"})
    return updated.id, updated.email
```

<table>
<thead>
  <tr>
    <th>
      Create/update parameter
    </th>
    
    <th>
      Type
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
        email
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      Required on create; optional on update
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        name
      </code>
    </td>
    
    <td>
      string or null
    </td>
    
    <td>
      Optional name; null clears it on update
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        metadata
      </code>
    </td>
    
    <td>
      object
    </td>
    
    <td>
      Optional custom data on create; not an update field
    </td>
  </tr>
</tbody>
</table>

Update changes name/email, not invoice addresses. Use the hosted billing flows for
address changes. Keep the same idempotency key when retrying the same signup.

## Find by email and read subscriptions

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    customers = list(client.customers.list_all({"email": "buyer@example.com", "limit": 25}))
    subscriptions = list(client.customers.list_all_subscriptions("customer_example"))
    return customers, subscriptions
```

Email lookup returns zero or more customers within the API key's storefront and
mode. General list filters are `limit` (1–100), `startingAfter`, or `endingBefore`;
do not send both cursors. `list()` returns one page; `list_all()` yields resources.

## Open the hosted portal

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    session = client.customers.create_portal_session(
        "customer_example", {"returnUrl": "https://app.example.com/billing"}
    )
    return session.url
```

Authorize the customer before calling this. Redirect the browser to the returned
single-use URL; never cache or log it. `returnUrl` is optional; use `{}` for no
return link. It does not automatically redirect the customer back.

<table>
<thead>
  <tr>
    <th>
      Response field
    </th>
    
    <th>
      Python type
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
      
      , <code>
        email
      </code>
    </td>
    
    <td>
      str
    </td>
    
    <td>
      Customer identity
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        name
      </code>
    </td>
    
    <td>
      str or None
    </td>
    
    <td>
      Display name
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        created_at
      </code>
      
      , <code>
        testmode
      </code>
    </td>
    
    <td>
      datetime, bool
    </td>
    
    <td>
      Creation time and mode
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        metadata
      </code>
      
      , <code>
        links
      </code>
    </td>
    
    <td>
      model objects
    </td>
    
    <td>
      Custom data and resource links
    </td>
  </tr>
  
  <tr>
    <td>
      Portal <code>
        url
      </code>
      
      , <code>
        expires_at
      </code>
    </td>
    
    <td>
      str, datetime
    </td>
    
    <td>
      Temporary entry URL and expiry
    </td>
  </tr>
</tbody>
</table>

[Customer API reference](https://docs.vatly.com/api-reference/customers) · [All methods](/packages/python/api#customers)
