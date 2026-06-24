#!/usr/bin/env node
/**
 * Transform plain markdown Laravel package docs into Docus-compatible MDC format.
 * - Adds frontmatter if missing
 * - Wraps consecutive code blocks in ::code-group
 * - Adds navigation ordering
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'fs'
import { join, basename, extname } from 'path'

const SOURCE = process.argv[2] || 'tmp/laravel-docs'
const TARGET = process.argv[3] || 'content/3.packages/2.laravel'

const ORDER = {
  'README.md': 0,
  'Customers.md': 1,
  'Checkouts.md': 2,
  'Subscriptions.md': 3,
  'Orders.md': 4,
  'Webhooks.md': 5,
  'Comparison.md': 6,
  'Migrating-to-Vatly.md': 7,
}

if (!existsSync(SOURCE)) {
  console.error(`Source directory not found: ${SOURCE}`)
  process.exit(1)
}

mkdirSync(TARGET, { recursive: true })

// Mirror the source dir: drop previously-generated pages so a renamed or removed
// source doc doesn't leave an orphaned page (and stale nav entry) behind.
for (const stale of readdirSync(TARGET).filter(f => extname(f) === '.md')) {
  rmSync(join(TARGET, stale))
}

const files = readdirSync(SOURCE).filter(f => extname(f) === '.md')

for (const file of files) {
  const content = readFileSync(join(SOURCE, file), 'utf-8')
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

  // Rewrite internal links to point to Laravel package pages
  const linkMap = {
    '/checkouts': '/packages/laravel/checkouts',
    '/customers': '/packages/laravel/customers',
    '/subscriptions': '/packages/laravel/subscriptions',
    '/orders': '/packages/laravel/orders',
    '/webhooks': '/packages/laravel/webhooks',
  }
  for (const [from, to] of Object.entries(linkMap)) {
    transformed = transformed.replaceAll(`](${from})`, `](${to})`)
  }

  // Rewrite relative sibling links — `](Subscriptions.md)`, `](./Webhooks.md)`,
  // `](./Webhooks)` — to their docs-site routes. Each page's route is its
  // lowercased file name under /packages/laravel/, so the slug is just the
  // lowercased base name. Without this the renderer keeps the original mixed
  // case (e.g. /packages/laravel/Subscriptions), which 404s on the live site.
  transformed = transformed
    .replace(/\]\((?:\.\/)?([A-Za-z][\w-]*)\.md\)/g, (_, n) => `](/packages/laravel/${n.toLowerCase()})`)
    .replace(/\]\(\.\/([A-Za-z][\w-]*)\)/g, (_, n) => `](/packages/laravel/${n.toLowerCase()})`)

  // Add frontmatter if missing
  if (!hasFrontmatter) {
    transformed = `---\ntitle: "${title}"\ndescription: "Vatly Laravel Package - ${title}"\n---\n\n${transformed}`
  }

  writeFileSync(join(TARGET, targetName), transformed)
  console.log(`  ${file} -> ${targetName}`)
}

console.log(`\nTransformed ${files.length} files into ${TARGET}`)
