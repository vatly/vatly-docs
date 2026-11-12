# Configuration and lifecycle

> Vatly Python Fluent - Configuration and lifecycle

Construct `Vatly(Wiring(api=api, ...))` with an `AsyncVatlyClient`. The caller owns
the SDK connection pool: use `async with AsyncVatlyClient()` and reuse it per
application/worker lifespan. Fluent creates no additional transport. Pass an
explicit key or use `VATLY_API_KEY`. Live/test share the same URL; keys select mode.

Only `api` and both redirect URLs are needed for anonymous API-only checkout
creation. Add `checkouts` to persist `.for_entity(EntityRef(...))`; add repositories,
`webhook_secret`, `webhook_calls` and `events` for a durable integration. Missing
wiring fails when used. `api` exposes all SDK resources, options, retries and errors.

Use `RequestOptions` for stable idempotency keys, headers and timeouts (seconds).
SDK errors propagate unchanged. Keep API/webhook secrets server-side and separate.
An email-only profile does not create a customer. Authorization is always the host's job.

## Development and releases

Run `.agents/setup` to provision uv 0.12.9, Python 3.12, locked dependencies and an
import sanity check. It is idempotent, has no service/database/secret requirements,
and becomes active for project orbs after reaching the default branch.

uv retains a [pinned SDK wheel](https://github.com/vatly/vatly-fluent-python/blob/main/vendor/README.md) for reproducible development;
published metadata declares the exact PyPI dependency.
[`vatly-fluent-python` 0.1.0a2](https://pypi.org/project/vatly-fluent-python/0.1.0a2/)
was published on 2026-11-12. Publish the matching SDK version first. Keep the
PyPI trusted publisher for project `vatly-fluent-python` with owner
`vatly`, repository `vatly-fluent-python`, workflow `release.yml`; leave the
environment field blank. No GitHub environment or API token is needed. Restrict
repository release access: there is no environment approval gate. Only publish a
GitHub release/tag after explicit authorization and green CI.
The tag must match `v` plus the package version. Pushing main does not publish.
PyPI artifacts are public even when the source GitHub repo is private.
