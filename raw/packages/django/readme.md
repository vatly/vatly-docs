# Django

> Add hosted checkout, customer billing and signed webhook persistence to Django.

Add hosted checkout, customer billing and signed webhook persistence to Django.
Vatly is the European Merchant of Record for AI, software and digital products.
This package builds on Fluent Python and the Python SDK.

**Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

## Start here

```bash
python -m pip install vatly-django==0.1.0a2
```

Follow [Installation](/packages/django/installation) to add the app, URLs and database tables,
then configure a server-owned product offer and add a checkout form. You do not
need a custom user model: the `Billing` facade accepts any saved Django model.

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
      <a href="/packages/django/installation">
        Installation
      </a>
    </td>
    
    <td>
      Install, connect URLs and run migrations
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/configuration">
        Configuration
      </a>
    </td>
    
    <td>
      Set credentials, offers and tenant scope
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/billablemodels">
        Billable models
      </a>
    </td>
    
    <td>
      Add billing helpers to your user or team model
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/checkout">
        Checkout
      </a>
    </td>
    
    <td>
      Start a purchase with a durable retry key
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/customerportal">
        Customer portal
      </a>
    </td>
    
    <td>
      Open hosted billing for an authorized customer
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/billing">
        Subscriptions
      </a>
    </td>
    
    <td>
      Inspect, cancel, resume and reconcile owned subscriptions
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/webhooks">
        Webhooks
      </a>
    </td>
    
    <td>
      Verify, deduplicate and persist deliveries atomically
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/admin">
        Admin
      </a>
    </td>
    
    <td>
      Inspect billing records without editing them
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/testing">
        Testing
      </a>
    </td>
    
    <td>
      Exercise checkout and signed webhooks offline
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/development">
        Development
      </a>
    </td>
    
    <td>
      Run contributor checks and understand release tooling
    </td>
  </tr>
</tbody>
</table>

Python 3.10+; Django 5.2 LTS, 6.0 and 6.1 within their supported Python ranges.
Code samples are executed with the published `0.1.0a2` packages and local fixtures.
See the [API reference](https://docs.vatly.com/api-reference) for Vatly's fields.
