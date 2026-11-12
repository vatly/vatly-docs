# Open the customer portal

> Send an authenticated buyer to Vatly's hosted portal to manage subscriptions, invoices and billing details.

Send an authenticated buyer to Vatly's hosted portal to manage subscriptions,
invoices and billing details. Create a new session for each visit.

```python
from vatly_fluent import FluentError, Vatly


async def example(vatly: Vatly):
    # The host authorizes user-42 before this lookup.
    customer = await vatly.customers.find_by_host_customer_id("user-42")
    if customer is None:
        raise FluentError("No billing customer is bound to this user")
    session = await vatly.customer(customer.id).portal_session(
        {
            "returnUrl": "https://app.example.com/account/billing",
        }
    )
    return session.url
```

Pass the configured `vatly` from [Configuration](/packages/fluent-python/configuration). The key selects
the storefront and mode; the portal does not show a storefront picker.

<table>
<thead>
  <tr>
    <th>
      Field
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Input <code>
        returnUrl
      </code>
    </td>
    
    <td>
      Optional HTTPS return link; <code>
        {}
      </code>
      
       omits it
    </td>
  </tr>
  
  <tr>
    <td>
      Response <code>
        url
      </code>
    </td>
    
    <td>
      Short-lived, single-use credential-bearing entry URL
    </td>
  </tr>
  
  <tr>
    <td>
      Response <code>
        expires_at
      </code>
    </td>
    
    <td>
      Expiry of that entry link
    </td>
  </tr>
</tbody>
</table>

Redirect the browser to `session.url`. Do not log, cache, email as a permanent link,
or expose a portal session for an unverified customer ID. SDK errors propagate.

For one subscription's invoice-address change, use its
`update_billing()` helper in [Subscriptions](/packages/fluent-python/subscriptions).

[Portal API reference](https://docs.vatly.com/api-reference/customers)
