# Vatly Docs

Docus-based documentation site for the Vatly API, published to **docs.vatly.com** (GitHub Pages).

## Source of truth: the vatlify OpenAPI spec (`production` branch)

The API is specified in the private **`sandervanhooft/vatlify`** repo under `docs/openapi/`. There is **no local checkout** on this machine — fetch from GitHub via `gh`:

```bash
gh api "repos/sandervanhooft/vatlify/contents/docs/openapi/dist/openapi.bundled.yaml?ref=production" --jq '.content' | base64 -d
```

**Mirror the `production` branch, not `main`.** `production` is the released API that merchants actually call; `main` runs ahead of it with work that hasn't shipped yet. Documenting from `main` leaks unreleased endpoints, fields, and behaviors (e.g. a `test-helpers/.../simulate-payment` endpoint and an async rewrite of `fast-forward-renewal` were on `main` but not `production`). Always fetch with `?ref=production`. Only adopt a change once it has landed on `production` — `main` is deployed to `production` in periodic "Deploy main to production" batches, so a `main` change may sit unreleased for a while.

- Bundled (canonical): `docs/openapi/dist/openapi.bundled.yaml`
- Source: `docs/openapi/openapi.yaml`, paths `docs/openapi/paths/*.yaml`, schemas `docs/openapi/components/schemas/*.yaml`
- `public/openapi.yaml` in **this** repo is a vendored copy of the **`production`** bundle (served at docs.vatly.com/openapi.yaml). Keep it in sync with `production`.

## Ongoing workflow: adopt spec changes, then cascade downstream

When the vatlify OpenAPI changes on **`production`**:

1. Diff the latest `production` bundle against `public/openapi.yaml`; refresh the copy.
2. Update the hand-written API reference (`content/2.api-reference/*.md`) and guides (`content/1.guides/*.md`) to match — endpoints, fields, request/response examples, behaviors.
3. Cascade the same changes to the SDKs, in dependency order, each with an alpha release:
   **`vatly-api-php` → `vatly-fluent-php` → `vatly-laravel`**
   Plus the WordPress consumers when affected: `vatly/vatly-fluentcart-wp` and `sandervanhooft/vatly-pmpro` (these don't cut releases yet).

SDK doc pages (`content/3.packages/1.php/*`, `content/3.packages/2.laravel/*`) are **not** hand-edited here — they auto-sync from each SDK repo's `docs/*.md` via the "Sync SDK Docs" GitHub Action. Fix SDK docs in the SDK repo, not here.

## Repo layout

- `content/` — markdown docs: `0.introduction`, `1.guides`, `2.api-reference`, `3.packages` (synced), `4.integrations`
- `public/` — `openapi.yaml` (vendored spec), logos, static assets
- `nuxt.config.ts` — Docus/site config; `app/` — theme customization
- `scripts/` — `transform-sdk-docs.mjs`, `transform-laravel-docs.mjs`, `generate-sitemap.mjs`

## Conventions

- Merchant-facing language: say **"Products" / "Manage Products"**, never "catalogue."
- Dashboard: the API key and webhooks live under **"Developers"**, not "Settings."
- Do **not** add attribution lines to commit messages or PR descriptions.
- Commits push under the GitHub noreply email (`sandervanhooft@users.noreply.github.com`) — the private email is blocked by push protection.

## Branding (applied)

- Title "Vatly Docs"; wordmark in `public/` (white on dark backgrounds, blue on light).
- Colors: Blue `#326bff`, Black `#161616`, White `#ffffff`. Font: Poppins (300/500/700). Both light and dark mode must look correct.
