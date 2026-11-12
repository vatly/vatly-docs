# Subscriptions

> Vatly Python SDK - Subscriptions

Use `client.subscriptions.get(id)`, `list(params)`, or `list_all(params)` to read.
Create a subscription through a checkout containing a subscription-plan ID.

`update(id, body)` changes plan, price or quantity. At least one is required;
`trial_until` cannot be sent alone. By default updates are scheduled; request
`apply_immediately` and the relevant invoice/proration flags deliberately.
`cancel(id, {"immediately": True})` encodes the boolean as `1`, as the server expects.
`resume(id)` is only valid during the cancellation grace period.

`create_billing_update_link(id, body)` returns a hosted link for billing details;
both redirect URLs are required. Check remote status before granting entitlements.
The signed subscription events carry full snapshots, including scheduled changes,
mandate, cancellation reason, and renewal periods.

Test-only helpers live under `client.test_helpers`: `fast_forward_renewal` and
`simulate_order_payment`. They mutate remote data and must never run in CI/live
verification without explicit intent. This repository's tests use mocks only.

See [method inventory](/packages/python/api#subscriptions) and [subscription fields](https://docs.vatly.com/api-reference/subscriptions).
