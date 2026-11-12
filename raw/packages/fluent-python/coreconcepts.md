# Driver contracts and ownership

> Vatly Python Fluent - Driver contracts and ownership

Fluent's async `Protocol`s adapt existing databases; there are no framework models
or containers. Implement synchronous storage inside async adapters deliberately,
using your framework's thread/transaction rules. The [SQLite example](https://github.com/vatly/vatly-fluent-python/blob/main/examples/sqlite_driver.py)
demonstrates the contract, not a production async database strategy.

`Stored[T]` wraps the untouched SDK `resource` with `entity: EntityRef | None`.
`LocalSubscription` also adds `ends_at`. Repository methods are
`find_by_vatly_id`, `store` and `update`. `store` may return None to decline saving;
then no local-created event is emitted. `update` takes wrapper field changes:
omitted keys stay unchanged; None explicitly clears. `resource` is a complete SDK
snapshot. `ReversalRepository` adds `list_for_order` and `list_for_customer`.

Scope all unique IDs and lookups by tenant, storefront and test/live mode.
`CheckoutRecords.record(CheckoutRecord(...))` stores an authorized host entity.
`find(checkout_id)` reads it; `link(checkout_id, resource_type, resource_id)` binds
orders/subscriptions; `find_for_resource` follows the link. Identical repeats are
idempotent; conflicting ownership must fail, never silently reassign.

`CustomerBindings` is separate billing identity: atomic `bind`, non-clearing
`record`, and lookups in both directions. Unique constraints on both sides protect
concurrent binding. These bindings **never determine resource ownership**.

`WebhookCalls.process(event, work)` must commit signed-ID dedup, audit, repository
writes, checkout links and the outbox together. Write external effects to the outbox
with `EventDispatcher.dispatch`; send them after commit. Driver concurrency must
not interleave transactions on a shared connection. See [webhooks](/packages/fluent-python/webhooks).
