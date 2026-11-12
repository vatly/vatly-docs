# Receive signed webhooks

> Vatly Django - Receive signed webhooks

Mount the [billing URLs](/packages/django/installation) and register the public HTTPS
`/billing/webhook/` URL in Vatly. Set `VATLY_WEBHOOK_SECRET` to that endpoint's
secret. Installing the package does not register it automatically.

## Use the built-in receiver

The built-in route verifies raw request bytes, checks the key's mode and stores
the signed event ID. No custom view is required. If you need a separate adapter,
the facade exposes the same processor:

```python
from vatly_django.billing import Billing


def example(raw_body: bytes, signature: str):
    return Billing().webhook(raw_body, signature)
```

Pass the unmodified request body and `Vatly-Signature` header. Do not reconstruct
JSON or trust an unsigned Vatly-Event-Id header for deduplication.

<table>
<thead>
  <tr>
    <th>
      Response
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      200 <code>
        processed
      </code>
    </td>
    
    <td>
      Signature accepted and transaction committed
    </td>
  </tr>
  
  <tr>
    <td>
      200 <code>
        duplicate
      </code>
    </td>
    
    <td>
      Same signed ID was already committed
    </td>
  </tr>
  
  <tr>
    <td>
      400
    </td>
    
    <td>
      Invalid signature, JSON or envelope
    </td>
  </tr>
  
  <tr>
    <td>
      405
    </td>
    
    <td>
      Non-POST request
    </td>
  </tr>
  
  <tr>
    <td>
      500
    </td>
    
    <td>
      Processing failure; all writes roll back for a safe delivery retry
    </td>
  </tr>
</tbody>
</table>

Signature freshness defaults to ±300 seconds. Keep server clocks synchronized;
configure a sequence of secrets for rotation. Only this webhook route is CSRF-exempt.

## Know what is stored

<table>
<thead>
  <tr>
    <th>
      Model
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
        BillingScope
      </code>
    </td>
    
    <td>
      Tenant/storefront and mode; serializes callbacks with a database write lock
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        WebhookCall
      </code>
    </td>
    
    <td>
      Signed envelope and processed timestamp, unique per scope/event
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Checkout
      </code>
      
      , <code>
        ResourceLink
      </code>
    </td>
    
    <td>
      Immutable host-owned checkout/resource links
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        BillingResource
      </code>
    </td>
    
    <td>
      Complete financial or subscription snapshot and optional owner
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Outbox
      </code>
    </td>
    
    <td>
      Durable events for your background worker
    </td>
  </tr>
</tbody>
</table>

Audit, dedup, links, snapshots and outbox commit in one transaction. The ORM driver
uses thread-sensitive async adapters so all nested work stays on that connection.
It assumes Django's default database; custom routers need a purpose-built driver.
PostgreSQL supports concurrent workers; SQLite delivery lock failures can be retried.

Built-ins make no implicit API reads. Unknown events remain audited/dispatched.
Customer bindings never fill missing ownership, and deduplication is not event
ordering. Reconcile delayed/conflicting snapshots explicitly.

## Deliver your outbox

```python
from vatly_django.models import Outbox


def example():
    return list(
        Outbox.objects.filter(delivered_at__isnull=True)
        .order_by("pk")
        .values("pk", "event_name", "payload")[:100]
    )
```

This is an inspection query, not a safe concurrent worker. Your worker must claim
rows with database locks, send using an idempotent key (scope + row primary key),
and mark delivered_at after success. External delivery is at least once. Created
events can precede ownership linkage: read current ownership before side effects.
No email sender or entitlement side effect is enabled by default.

[API reference](https://docs.vatly.com/api-reference) · [Admin](/packages/django/admin)
