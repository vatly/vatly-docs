# Vatly Docs

API documentation for [Vatly](https://vatly.com) — the Merchant of Record billing platform for European SaaS companies.

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
├── openapi.yaml                  # OpenAPI 3.2 spec
└── vatly-logo-*.{svg,png}        # Brand assets
```

## License

Proprietary © [Vatly](https://vatly.com)
