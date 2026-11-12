# Refunds

> Vatly Python SDK - Refunds

Read refunds via `client.refunds.list`, `list_all`, and `get`. Order-scoped
operations are `orders.list_refunds`, `list_all_refunds`, `get_refund`,
`create_refund`, `create_full_refund`, and `cancel_refund`.

Partial refunds use `CreateRefundRequest` with order lines and amounts; full
refunds accept `CreateFullRefundRequest` or `{}`. A cancellation returns `None`.
Use stable idempotency keys for business operations; a timeout does not prove
that a refund failed. Read/reconcile before issuing another mutation when the
server reports an unknown outcome. Webhooks confirm completion/failure/cancellation.

See [method inventory](/packages/python/api#refunds) and [refund fields](https://docs.vatly.com/api-reference/refunds).
