# Python Fluent

> Build checkout, customer and subscription flows without tying billing to a web framework.

Build checkout, customer and subscription flows without tying billing to a web
framework. Fluent composes the async SDK and your storage driver. Vatly is the
European merchant of record for AI, software and digital products.

**Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

## Install and create a checkout

```bash
python -m pip install vatly-fluent-python==0.1.0a2
```

Python 3.10+ is required. This installs `vatly-api-python==0.1.0a2` too. Set
`VATLY_API_KEY` on the server, then run this async function with your event loop.

```python
from vatly import AsyncVatlyClient, RequestOptions
from vatly_fluent import Vatly, Wiring


async def example():
    async with AsyncVatlyClient() as api:
        vatly = Vatly(
            Wiring(
                api=api,
                redirect_url_success="https://app.example.com/billing/success",
                redirect_url_canceled="https://app.example.com/billing/canceled",
            )
        )
        checkout = (
            await vatly.checkout_builder()
            .with_items(
                [
                    {"id": "one_off_product_example", "quantity": 1},
                ]
            )
            .create(options=RequestOptions(idempotency_key="purchase:42"))
        )
        return checkout.get_url()
```

Replace the product ID and persist the purchase key before making the request.
Redirect the buyer to the URL. This minimal example does not store ownership or
process webhooks; add [storage](/packages/fluent-python/coreconcepts) before granting product access.

## Build your integration

Functions in these guides accept the configured `vatly` instance from
[Configuration](/packages/fluent-python/configuration). Await them inside your application's async
lifespan. IDs and billable entities must be authorized by your application.

<table>
<thead>
  <tr>
    <th>
      Guide
    </th>
    
    <th>
      Task
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="/packages/fluent-python/configuration">
        Configuration
      </a>
    </td>
    
    <td>
      Wire the SDK, redirects and storage
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/coreconcepts">
        Core concepts
      </a>
    </td>
    
    <td>
      Implement drivers and preserve ownership
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/checkouts">
        Checkouts
      </a>
    </td>
    
    <td>
      Sell a cart or a subscription
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/customers">
        Customers
      </a>
    </td>
    
    <td>
      Create, bind and look up billing identities
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/customerportal">
        Customer portal
      </a>
    </td>
    
    <td>
      Send a buyer to hosted account management
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/subscriptions">
        Subscriptions
      </a>
    </td>
    
    <td>
      Change plans, cancel, resume and reconcile
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/orders">
        Orders
      </a>
    </td>
    
    <td>
      Read invoices, lines and reversals
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/webhooks">
        Webhooks
      </a>
    </td>
    
    <td>
      Persist signed events once in a transaction
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/testing">
        Testing
      </a>
    </td>
    
    <td>
      Run a checkout without network access
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/porting">
        Porting
      </a>
    </td>
    
    <td>
      Map JS/PHP concepts to Python
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/development">
        Development
      </a>
    </td>
    
    <td>
      Set up, test and build the package
    </td>
  </tr>
</tbody>
</table>

[API reference](https://docs.vatly.com/api-reference) documents the underlying
requests. These examples are executed with published `0.1.0a2` packages and local
fixtures; no real payments or account changes occur in documentation tests.
