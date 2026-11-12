# Python SDK

> Use this SDK for typed API calls from Python 3.10+.

Vatly is the European merchant of record for AI, software and digital products.
Use this SDK for typed API calls from Python 3.10+. For a storage-backed billing
integration, use Fluent Python or Vatly Django.

**Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

## Install and connect

```bash
python -m pip install vatly-api-python==0.1.0a2
```

Set `VATLY_API_KEY` in your server environment. Test and live keys use the same
API host; the key selects the mode. Never put credentials in client-side code.

```python
from vatly import VatlyClient


def example():
    with VatlyClient() as client:
        return client.customers.list({"limit": 10}).data
```

Resource-page functions accept that configured client. Copy a function, then call
`example(client)` inside the `with` block. Replace example resource IDs with your
own. Creation, updates, cancellations and refunds mutate the selected account.

## Async applications

```python
from vatly import AsyncVatlyClient


async def example():
    async with AsyncVatlyClient() as client:
        return [customer.id async for customer in client.customers.list_all({"limit": 25})]
```

Async resource methods use `await`; pagination uses `async for`. Both clients
return Pydantic models. Python fields use snake_case; dictionary inputs use Vatly's
camelCase wire keys. Unknown response fields are preserved.

## Choose a guide

<table>
<thead>
  <tr>
    <th>
      Guide
    </th>
    
    <th>
      What you can do
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="/packages/python/configuration">
        Configuration
      </a>
    </td>
    
    <td>
      Set timeouts, retries and handle errors
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/customers">
        Customers
      </a>
    </td>
    
    <td>
      Create/find customers and open their portal
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/checkouts">
        Checkouts
      </a>
    </td>
    
    <td>
      Build a hosted one-off or recurring payment
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/subscriptions">
        Subscriptions
      </a>
    </td>
    
    <td>
      Change plans, cancel, resume and update billing
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/subscriptionplans">
        Subscription plans
      </a>
    </td>
    
    <td>
      Manage recurring catalog products
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/oneoffproducts">
        One-off products
      </a>
    </td>
    
    <td>
      Manage one-time catalog products
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/orders">
        Orders
      </a>
    </td>
    
    <td>
      Read lines, totals and invoice links
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/refunds">
        Refunds
      </a>
    </td>
    
    <td>
      Refund an order and track reversals
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/chargebacks">
        Chargebacks
      </a>
    </td>
    
    <td>
      Read payment disputes
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/webhooks">
        Webhooks
      </a>
    </td>
    
    <td>
      Verify raw signed deliveries
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/webhookendpoints">
        Webhook endpoints
      </a>
    </td>
    
    <td>
      Register and manage receivers
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/api">
        API inventory
      </a>
    </td>
    
    <td>
      Look up every method and endpoint
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/development">
        Development
      </a>
    </td>
    
    <td>
      Contribute, regenerate models and run checks
    </td>
  </tr>
</tbody>
</table>

[API reference](https://docs.vatly.com/api-reference) contains the complete request
and response contracts. Examples in these guides are executed against published
`0.1.0a2` packages with local HTTP fixtures; tests make no Vatly account changes.
