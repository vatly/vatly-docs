# Webhooks

> Vatly Python SDK - Webhooks

> Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.

Verify the exact raw request bytes before parsing or acting. This example is
framework-independent; obtain `raw_body` and the signature header in your server:

```python
from vatly.webhooks import construct_webhook_event


def receive(raw_body: bytes, signature: str, secret: str):
    event = construct_webhook_event(raw_body, signature, secret)
    if not event.known:
        return retain_for_triage(event)  # your durable storage
    return handle_verified_event(event)  # your application
```

Header: `Vatly-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256>`.
Signed input: timestamp, a period, then raw body. Default absolute clock-skew
tolerance is 300 seconds, including future timestamps. Zero disables freshness.
Secret sequences support rotation. Unknown signature versions are ignored.
`verify_webhook_signature` raises `VatlyInvalidSignatureError`; the boolean helper
is `is_valid_webhook_signature`. `construct_event` returns the strict production
`WebhookDelivery`. `construct_webhook_event` additionally supports future event
names with `known=False`, preserving their payload. Known objects are Pydantic
resources discriminated by `object.resource`, not `entityType`: chargeback events
have an order entity but a chargeback object. Setup events need no links.

Timestamp checks are not deduplication. Deduplicate by the **signed event.id**
in the same transaction as business changes and your outbox. The header
`Vatly-Event-Id` is useful for diagnostics but is not the signed authority.
Return success only after committing; let storage/processing failures retry.
No framework adapters, persistence, or implicit API reads are installed by the SDK.
