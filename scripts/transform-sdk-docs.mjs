#!/usr/bin/env node
/**
 * Transform plain markdown SDK docs into Docus-compatible MDC format.
 * - Adds frontmatter if missing
 * - Wraps consecutive code blocks in ::code-group
 * - Adds navigation ordering
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'fs'
import { join, basename, extname } from 'path'

const SDK_SOURCE = process.argv[2] || 'tmp/sdk-docs'
const SDK_TARGET = process.argv[3] || 'content/3.packages/1.php'

const ORDER = {
  'README.md': 0,
  'Customers.md': 1,
  'Checkouts.md': 2,
  'Subscriptions.md': 3,
  'SubscriptionPlans.md': 4,
  'Orders.md': 5,
  'Refunds.md': 6,
  'OneOffProducts.md': 7,
  'Chargebacks.md': 8,
  'Webhooks.md': 9,
}

if (!existsSync(SDK_SOURCE)) {
  console.error(`Source directory not found: ${SDK_SOURCE}`)
  process.exit(1)
}

mkdirSync(SDK_TARGET, { recursive: true })

// Mirror the source dir: drop previously-generated pages so a renamed or removed
// source doc doesn't leave an orphaned page (and stale nav entry) behind.
for (const stale of readdirSync(SDK_TARGET).filter(f => extname(f) === '.md')) {
  rmSync(join(SDK_TARGET, stale))
}

const files = readdirSync(SDK_SOURCE).filter(f => extname(f) === '.md')

for (const file of files) {
  const content = readFileSync(join(SDK_SOURCE, file), 'utf-8')
  const order = ORDER[file] ?? 99
  const name = basename(file, '.md')
  const targetName = `${order}.${name.toLowerCase().replace(/([A-Z])/g, (m, c, i) => i ? '-' + c.toLowerCase() : c.toLowerCase())}.md`

  // Extract title from first # heading
  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : name

  // Check if frontmatter already exists
  const hasFrontmatter = content.startsWith('---')

  // Strip the first H1 heading to avoid duplicate with frontmatter title.
  // The `m` flag lets this match even when a banner image precedes the H1
  // (e.g. `![…](banner.png)` at the very top of the README) — the image is
  // kept, only the title line is removed.
  let transformed = content.replace(/^#\s+.+\n+/m, '')

  // Rewrite internal links to point to SDK pages
  const linkMap = {
    '/checkouts': '/packages/php/checkouts',
    '/customers': '/packages/php/customers',
    '/subscriptions': '/packages/php/subscriptions',
    '/subscription-plans': '/packages/php/subscriptionplans',
    '/one-off-products': '/packages/php/oneoffproducts',
    '/orders': '/packages/php/orders',
    '/refunds': '/packages/php/refunds',
    '/chargebacks': '/packages/php/chargebacks',
    '/webhooks': '/packages/php/webhooks',
    '/order-refunds': '/packages/php/orders',
    '/global-refunds': '/packages/php/refunds',
  }
  for (const [from, to] of Object.entries(linkMap)) {
    transformed = transformed.replaceAll(`](${from})`, `](${to})`)
  }

  // Rewrite SDK-repo-relative links like (/docs/Checkouts.md) → (/packages/php/checkouts).
  // The README in the SDK repo points at sibling files; in the docs site those become
  // separate pages under /packages/php/<lowercased-name>.
  transformed = transformed.replace(
    /\]\(\/docs\/([A-Za-z]+)\.md\)/g,
    (_, name) => `](/packages/php/${name.toLowerCase()})`
  )

  // The SDK docs link to source files with GitHub-relative paths (e.g.
  // `[Webhook](../src/API/Webhooks/Webhook.php)`), which resolve on GitHub
  // but 404 in the docs site. Rewrite them to absolute github.com URLs.
  transformed = transformed.replaceAll(
    '](../src/',
    '](https://github.com/Vatly/vatly-api-php/blob/main/src/',
  )

  // Convert GitHub alert blockquotes (> [!NOTE] / [!TIP] / [!WARNING] / …) into
  // Docus MDC callouts — see transform-laravel-docs.mjs.
  transformed = transformed.replace(
    /^> \[!(\w+)\][^\n]*\n((?:>[^\n]*(?:\n|$))*)/gim,
    (_, type, body) => {
      const comp = { note: 'note', tip: 'tip', important: 'note', warning: 'warning', caution: 'warning' }[type.toLowerCase()] ?? 'note'
      const inner = body.replace(/^> ?/gm, '').replace(/\n+$/, '')
      return `::${comp}\n${inner}\n::\n`
    },
  )

  // Add frontmatter if missing
  if (!hasFrontmatter) {
    transformed = `---\ntitle: "${title}"\ndescription: "Vatly PHP SDK - ${title}"\n---\n\n${transformed}`
  }

  writeFileSync(join(SDK_TARGET, targetName), transformed)
  console.log(`  ${file} -> ${targetName}`)
}

console.log(`\nTransformed ${files.length} files into ${SDK_TARGET}`)
