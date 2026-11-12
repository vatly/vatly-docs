# Getting started

> Vatly Python SDK - Getting started

> **Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

Use `vatly-api-python==0.1.0a2`, imported as `vatly`. Requires Python 3.10+.
Create `VatlyClient` inside `with`, or `AsyncVatlyClient` inside `async with`, to
close the connection pool. Both accept an explicit API key or `VATLY_API_KEY`.
Test and live modes use the same API host; keys select the mode.

See the [SDK README](https://github.com/vatly/vatly-api-python/blob/main/README.md) for runnable initialization, checkout,
pagination, retries, configuration, errors and development commands.

<table>
<thead>
  <tr>
    <th>
      Guide
    </th>
    
    <th>
      Purpose
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="/packages/python/api">
        API
      </a>
    </td>
    
    <td>
      Every method, endpoint and response
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/checkouts">
        Checkouts
      </a>
    </td>
    
    <td>
      Hosted payment pages
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/customers">
        Customers
      </a>
    </td>
    
    <td>
      Customer identity and portal sessions
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/subscriptions">
        Subscriptions
      </a>
    </td>
    
    <td>
      Recurring billing
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/subscriptionplans">
        Subscription Plans
      </a>
    </td>
    
    <td>
      Subscription products
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/oneoffproducts">
        One-Off Products
      </a>
    </td>
    
    <td>
      One-time products
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/orders">
        Orders
      </a>
    </td>
    
    <td>
      Transactions and nested financial operations
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/refunds">
        Refunds
      </a>
    </td>
    
    <td>
      Reversals
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/chargebacks">
        Chargebacks
      </a>
    </td>
    
    <td>
      Disputes
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/webhooks">
        Webhooks
      </a>
    </td>
    
    <td>
      Signatures, events and endpoints
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/development">
        Development
      </a>
    </td>
    
    <td>
      Spec/docs sync, setup, release
    </td>
  </tr>
</tbody>
</table>
