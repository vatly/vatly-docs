![Vatly Documentation](art/banner.png)

# Vatly Docs

API documentation for [Vatly](https://vatly.com), the Merchant of Record for European software and digital products.

**Live at [docs.vatly.com](https://docs.vatly.com)**

## Stack

- [Docus](https://docus.dev) (Nuxt Content + Nuxt UI)
- Static site deployed via GitHub Pages

## Development

```bash
npm install
npx nuxi dev
```

## Build & Deploy

```bash
npx nuxi build
npx gh-pages --dotfiles -d .output/public
```

## Structure

```
content/
├── index.md                      # Landing page (overridden by app/pages/index.vue)
├── 1.guides/                     # Guides (quickstart, auth, pagination, etc.)
└── 2.api-reference/              # API reference (customers, checkouts, etc.)
app/
├── app.config.ts                 # Docus theme config (logo, colors)
└── pages/index.vue               # Custom landing page
public/
├── openapi.yaml                  # OpenAPI 3.1.0 spec
└── vatly-logo-*.{svg,png}        # Brand assets
```

## Package documentation sync

`.github/workflows/sync-sdk-docs.yml` runs on package `repository_dispatch`
notifications, pushes to this repo's `main`, manual **Sync SDK Docs** runs, and
daily at **04:17 UTC** as a safety net for missed notifications.

Every run pulls **all eight package sources at their current default branch**:
PHP SDK, PHP Fluent, Laravel, JavaScript SDK, JavaScript Fluent, Python SDK,
Python Fluent and Django. Better Auth joins every run only when
`SYNC_BETTER_AUTH_DOCS=true`. The event type/payload means only "resync"; it never
selects a subset of sources. Source notifier workflows need no changes.

`scripts/sync-package-docs.sh` deterministically regenerates all mirrored package
pages and the sitemap. If there is no diff, the run makes **no commit and no
deployment**. Otherwise it creates a signed commit through the GitHub API and
calls the existing deploy workflow. That explicit call is necessary because
commits made with `GITHUB_TOKEN` do not start another push workflow.

The single `sdk-docs-sync` concurrency group has `cancel-in-progress: false`:
one sync runs at a time; GitHub keeps only the latest pending run. Coalescing is
safe because every run imports everything. An in-flight commit is never canceled.
The signed commit uses an expected head SHA. If `main` moves, the workflow resets
only its generated working copy, pulls/rebases onto fresh `main`, regenerates
against it (including the sitemap and current navigation metadata), then retries,
up to three attempts. Auth/validation errors without a branch advance fail rather
than retrying blindly. Concurrent handwritten changes are not overwritten.

The reusable `deploy.yml` always checks out current `main` and shares its existing
`pages` concurrency group with normal push deployments, so package imports and
handwritten docs use the same serialized build/deploy path.

### Existing PHP sources

| Source | Sender | Event | Destination |
| --- | --- | --- | --- |
| `vatly/vatly-api-php` | `notify-docs.yml` / Notify Docs | `sync-sdk-docs` | `content/3.packages/1.php` |
| `vatly/vatly-laravel` | `notify-docs.yml` / Trigger Docs Sync | `sync-laravel-docs` | `content/3.packages/3.laravel` |
| `vatly/vatly-fluent-php` | `notify-docs.yml` / Notify Docs | `sync-fluent-php-docs` | `content/3.packages/2.fluent-php` |

The senders trigger on pushes to `main` affecting `docs/**`, using
`peter-evans/repository-dispatch` and `VATLY_DOCS_DISPATCH_TOKEN`. There is no
release/tag gate. Every event refreshes all enabled sources. The WordPress
plugin is not imported by this workflow. PHP Fluent has two existing guides
(including a nested recipe), but no docs README; setup remains in its source README.
The PHP transformers mirror markdown pages, rewrite links and GitHub alerts,
and preserve existing frontmatter.

### JavaScript sources

| Source | Event | Destination | Publication |
| --- | --- | --- | --- |
| `vatly/vatly-api-js` (`@getvatly/sdk`) | `sync-js-docs` | `content/3.packages/4.javascript` | Automatic |
| `vatly/vatly-fluent-js` (`@getvatly/fluent`) | `sync-fluent-js-docs` | `content/3.packages/5.fluent-js` | Automatic |
| `vatly/vatly-better-auth-js` (`@getvatly/better-auth`) | `sync-better-auth-docs` | `content/3.packages/9.better-auth` | Requires `SYNC_BETTER_AUTH_DOCS=true` |

JS senders mirror the PHP API sender: **Notify Docs**, `notify-docs.yml`, push
to `main`, `docs/**`, dispatch action v4, same dispatch secret. Every sync run
refreshes all enabled sources from their default branches,
without a release or variable gate. `SYNC_JS_DOCS` and `SYNC_FLUENT_JS_DOCS`
are no longer used. Better Auth remains opt-in: its Actions **repository variable
in vatly-docs**, `SYNC_BETTER_AUTH_DOCS`, must equal literal `true`, including
on manual runs. Leave it absent or false until that package is released.

### Python sources

| Source | PyPI / import | Event | Destination |
| --- | --- | --- | --- |
| `vatly/vatly-api-python` | `vatly-api-python` / `vatly` | `sync-python-docs` | `content/3.packages/6.python` |
| `vatly/vatly-fluent-python` | `vatly-fluent-python` / `vatly_fluent` | `sync-fluent-python-docs` | `content/3.packages/7.fluent-python` |
| `vatly/vatly-django` | `vatly-django` / `vatly_django` | `sync-django-docs` | `content/3.packages/8.django` |

Python senders use the same workflow, trigger and dispatch secret as PHP and JS,
without switches or release gates. These sources are public: no source token is
needed. The shared `transform-js-docs.mjs` also handles nested PHP Fluent guides. All
transformers flatten source subdirectories to direct package pages, rewrite
cross-page links and reject duplicate basenames before replacing existing docs.
Group names live in `.navigation.yml`, which transformations preserve; ordering prefixes
control the sidebar without changing public URLs. Keep overview tables in that order.

### Page order and headers

All three transformers use `scripts/package-docs-navigation.mjs` for explicit,
per-package reader journeys. New slugs not yet in a journey sort alphabetically
after the curated pages; add them to the relevant list when importing a new guide.
Generated `navigation.title` supplies concise sidebar labels independently of page
H1s. Overview H1s use the package group's name. Numeric filename prefixes change
ordering only, never public URLs. Do not hand-edit the generated pages.

Descriptions preserve source frontmatter when present, otherwise use a sentence
from the introductory prose (not banners, alpha warnings, headings or code).
No package-name/title placeholder is generated. Missing introductions produce
a sync warning and no invented description. Add an authored `description` in the
source frontmatter to improve a weak excerpt; notably the Python SDK's
`docs/Development.md` needs an introduction/description, and its generated
`docs/API.md` currently only introduces the reference with spec provenance.

To launch a package's docs:

1. Add `docs/*.md` in the package repo (prefer starting with `docs/README.md`).
   The transformer rejects missing or empty docs before deleting any previous
   pages. It handles sibling links
   with anchors, source/assets links, GitHub alerts, and frontmatter. README
   becomes `/packages/<destination-name>/readme`, matching PHP, not an index.
2. Configure `VATLY_DOCS_DISPATCH_TOKEN` as an Actions secret in **each source
   package repo**, or grant it access through an organization secret. Use a
   fine-grained PAT with access to **vatly/vatly-docs** and **Contents: write**
   (or the existing PHP dispatch credential if appropriately scoped). The
   source repo's built-in `GITHUB_TOKEN` cannot dispatch to another repo.
3. If a source is private, set `VATLY_DOCS_SOURCE_TOKEN` in **vatly-docs**:
   a fine-grained PAT with **Contents: read** for the private source repos.
   Public sources need no checkout secret; the workflow falls back to
   `github.token`. The receiver's existing built-in `GITHUB_TOKEN` with
   `contents: write` handles commits and deployment. No npm token is involved.
4. Manually run **Sync SDK Docs** for an initial import; subsequent `docs/**`
   pushes dispatch automatically. Only Better Auth needs an enabling variable:
   set `SYNC_BETTER_AUTH_DOCS=true` in **vatly-docs** after release. Turning
   that switch off stops future imports; it does not remove published pages.

The original personal JS repository URLs now redirect to the canonical Vatly
repositories above; the SDK's actual destination is `vatly/vatly-api-js`.
If a source moves again, update its receiver checkout and its transformer
repository argument in `scripts/sync-package-docs.sh` together (the latter
controls source and asset URLs).

Better Auth was not available when this integration was prepared. Once its repo
exists, copy `.github/templates/notify-better-auth-docs.yml` from this repo to
its `.github/workflows/notify-docs.yml`, add `docs/README.md`, and follow the
same secret and enabling steps. Its receiver is already wired up. No package
release or publication is performed by this documentation mechanism.

Validate JS transformations locally with `node --test scripts/transform-js-docs.test.mjs`.

## License

MIT © [Vatly B.V.](https://vatly.com)

Vatly, the Vatly logo, and associated brand assets are trademarks of Vatly B.V. and may not be used without permission.
