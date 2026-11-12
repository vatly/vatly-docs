# Webhook endpoints

> Endpoints tell Vatly where to send events.

Endpoints tell Vatly where to send events. Configure these from trusted server-side
administration, not from a buyer's request. Examples accept the client from
[setup](/packages/python/readme); running them changes your Vatly configuration.

## Register an HTTPS receiver

```python
import secrets
from vatly import VatlyClient


def example(client: VatlyClient):
    secret = secrets.token_urlsafe(32)
    endpoint = client.webhook_endpoints.create(
        {
            "url": "https://app.example.com/billing/webhook/",
            "secret": secret,
            "enabledEvents": ["order.paid", "subscription.started"],
        }
    )
    # Store secret in your secret manager; do not log it.
    return endpoint.id
```

<table>
<thead>
  <tr>
    <th>
      Input (wire key)
    </th>
    
    <th>
      Required?
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
        url
      </code>
    </td>
    
    <td>
      Yes on create
    </td>
    
    <td>
      Public HTTPS receiver
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        secret
      </code>
    </td>
    
    <td>
      Yes on create
    </td>
    
    <td>
      Secret used to verify deliveries
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        enabledEvents
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Event names to subscribe to; see API reference for defaults
    </td>
  </tr>
</tbody>
</table>

Subscribe to every lifecycle event your integration needs, including cancellation,
resume and refund events. The minimal example above is not a complete billing policy.

## List, update and remove an endpoint

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    endpoints = list(client.webhook_endpoints.list_all({"limit": 25}))
    endpoint = client.webhook_endpoints.get("webhook_endpoint_example")
    updated = client.webhook_endpoints.update(
        endpoint.id,
        {
            "url": "https://app.example.com/billing/webhook/",
        },
    )
    client.webhook_endpoints.delete(updated.id)
    return endpoints
```

Deletion returns None. Coordinate secret rotation with your receiver, which can
accept old and new secrets temporarily. Do not expose endpoint secrets to browsers.

<table>
<thead>
  <tr>
    <th>
      Response field
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
        url
      </code>
    </td>
    
    <td>
      Endpoint identity and destination
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        enabled_events
      </code>
    </td>
    
    <td>
      Event subscriptions
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testmode
      </code>
      
      , <code>
        links
      </code>
    </td>
    
    <td>
      Mode and resource links
    </td>
  </tr>
</tbody>
</table>

[Endpoint API reference](https://docs.vatly.com/api-reference/webhook-endpoints) · [Verify deliveries](/packages/python/webhooks)
