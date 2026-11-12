# Getting started

> Vatly Python Fluent - Getting started

> **Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

Use Fluent for a billing integration; use the raw SDK for direct API calls. Fluent
depends on `vatly-api-python==0.1.0a2` and Python 3.10+. Follow the [quick start](https://github.com/vatly/vatly-fluent-python/blob/main/README.md)
for your first hosted checkout, then add storage for signed events and ownership.

<table>
<thead>
  <tr>
    <th>
      Guide
    </th>
    
    <th>
      Responsibility
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
      Keys, lifecycle, dependency bootstrap, release
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/coreconcepts">
        Core concepts
      </a>
    </td>
    
    <td>
      Driver contracts, entities, scope and transactions
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/checkouts">
        Checkouts
      </a>
    </td>
    
    <td>
      One-off/mixed/subscription builders and retries
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/customers">
        Customers
      </a>
    </td>
    
    <td>
      Billing identity and immutable bindings
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/customerportal">
        Customer portal
      </a>
    </td>
    
    <td>
      Short-lived hosted portal sessions
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/subscriptions">
        Subscriptions
      </a>
    </td>
    
    <td>
      Swaps, cancellation, state, reconciliation
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/orders">
        Orders
      </a>
    </td>
    
    <td>
      Lines, money and reversals
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/webhooks">
        Webhooks
      </a>
    </td>
    
    <td>
      Signed snapshots, atomic processing and outbox
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/testing">
        Testing
      </a>
    </td>
    
    <td>
      SQLite example, mock transport and local checks
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/porting">
        Porting
      </a>
    </td>
    
    <td>
      Source provenance and intentional differences
    </td>
  </tr>
</tbody>
</table>

Pushes to `main` affecting `docs/**` notify `vatly/vatly-docs`, which imports
these guides automatically. The notifier requires the Actions secret
`VATLY_DOCS_DISPATCH_TOKEN` with Contents: write access to `vatly/vatly-docs`.
