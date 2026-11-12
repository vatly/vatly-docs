# Webhooks

> Vatly Python SDK - Webhooks

Use signed webhooks to learn about payments and subscription changes. Verify the
exact request bytes before parsing or changing anything. Register delivery URLs
separately with [webhook endpoints](/packages/python/webhookendpoints).

## Verify and parse a delivery

This function accepts the raw HTTP body, `Vatly-Signature` header and your endpoint
secret. It returns a validated event; your route must persist it transactionally.

```python
from vatly.webhooks import construct_webhook_event


def example(raw_body: bytes, signature: str, secret: str):
    event = construct_webhook_event(raw_body, signature, secret)
    return event.id, event.event_name, event.known
```

<table>
<thead>
  <tr>
    <th>
      Input
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
        raw_body
      </code>
    </td>
    
    <td>
      Original bytes, not re-serialized JSON
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        signature
      </code>
    </td>
    
    <td>
      <code>
        Vatly-Signature
      </code>
      
       header: <code>
        t=<seconds>,v1=<HMAC-SHA256>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        secret
      </code>
    </td>
    
    <td>
      Endpoint secret, or a sequence of secrets during rotation
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tolerance
      </code>
    </td>
    
    <td>
      Default 300 seconds of absolute clock skew; keep clocks synchronized
    </td>
  </tr>
</tbody>
</table>

Invalid/missing signatures or invalid signed JSON raise `VatlyInvalidSignatureError`.
`construct_event()` accepts only currently known event names;
`construct_webhook_event()` also preserves future events with `known=False`.

## Check a signature without parsing

```python
from vatly.webhooks import is_valid_webhook_signature


def example(raw_body: bytes, signature: str, secret: str):
    return is_valid_webhook_signature(raw_body, signature, secret)
```

<table>
<thead>
  <tr>
    <th>
      Event field
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
    </td>
    
    <td>
      Signed deduplication authority
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        event_name
      </code>
    </td>
    
    <td>
      For example <code>
        order.paid
      </code>
      
       or <code>
        subscription.started
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      Full resource snapshot; inspect its <code>
        resource
      </code>
      
       discriminator
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testmode
      </code>
      
      , <code>
        created_at
      </code>
    </td>
    
    <td>
      Mode and event creation time
    </td>
  </tr>
</tbody>
</table>

Deduplicate signed `event.id` in the same transaction as business writes and an
outbox. The unsigned `Vatly-Event-Id` header is only diagnostic. Return success
after commit; let failures produce 5xx for retry. Freshness checks do not replace
deduplication, and deduplication does not establish event ordering.

The SDK supplies no database or route. Use Fluent or Django for storage integration.
Do not grant access merely because a browser visited a checkout success URL.

[API reference](https://docs.vatly.com/api-reference) · [Endpoint API reference](https://docs.vatly.com/api-reference/webhook-endpoints)
