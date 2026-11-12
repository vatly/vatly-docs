# Create and find customers

> Bind a host user to a Vatly billing identity once, then reuse it.

Bind a host user to a Vatly billing identity once, then reuse it. Bindings require
the configured storage driver; examples accept `vatly` from [Configuration](/packages/fluent-python/configuration).

## Create a customer for a host user

```python
from vatly import RequestOptions
from vatly_fluent import CustomerProfile, Vatly


async def example(vatly: Vatly):
    return await vatly.customers.create_for(
        "user-42",
        CustomerProfile(email="buyer@example.com", name="Alex"),
        options=RequestOptions(idempotency_key="signup:user-42"),
    )
```

`create_for` rejects an already-bound host. To reuse an existing customer, authorize
its ID then call `await vatly.customers.attribute(customer_id, host_id)` instead.
Conflicting bindings fail rather than silently moving customers between users.

<table>
<thead>
  <tr>
    <th>
      Profile field
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
      Existing authorized customer, used by checkout builders
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        email
      </code>
    </td>
    
    <td>
      Required when creating a new customer
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        name
      </code>
    </td>
    
    <td>
      Optional communication name
    </td>
  </tr>
</tbody>
</table>

An email-only checkout profile does not create a customer. Explicitly create it
first if you need a durable binding. Bindings do not assign order ownership.

## Look up and refresh identity

```python
from vatly_fluent import Vatly


async def example(vatly: Vatly):
    found = await vatly.customers.find_one_by_email("buyer@example.com")
    handle = vatly.customer("customer_example")
    identity = await handle.identity()
    await handle.update({"name": "Alex Morgan"})
    await handle.sync()
    return found, identity, await handle.email()
```

`model()`, `name()`, `email()` and `identity()` share a cached snapshot. `sync()`
and `update()` refresh it. Name/email are not invoice address fields; use the
[portal](/packages/fluent-python/customerportal) for hosted billing management.

<table>
<thead>
  <tr>
    <th>
      Lookup
    </th>
    
    <th>
      Return
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        find_by_host_customer_id
      </code>
    </td>
    
    <td>
      Customer or None
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        find_by_vatly_customer_id
      </code>
    </td>
    
    <td>
      Customer, or the SDK's not-found error
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        find_by_email
      </code>
    </td>
    
    <td>
      Async iterator of matching customers
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        find_one_by_email
      </code>
    </td>
    
    <td>
      First match or None, not a global identity assertion
    </td>
  </tr>
</tbody>
</table>

`claim_customer_from_checkout` is only for an already host-authorized checkout;
it binds billing identity, not entitlements. Never accept arbitrary buyer-supplied IDs.

[Customer API reference](https://docs.vatly.com/api-reference/customers)
