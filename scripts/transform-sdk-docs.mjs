#!/usr/bin/env node
/**
 * Transform plain markdown SDK docs into Docus-compatible MDC format.
 * - Adds frontmatter if missing
 * - Wraps consecutive code blocks in ::code-group
 * - Adds navigation ordering
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'fs'
import { join, basename, extname } from 'path'
import { pagePosition, pageMetadata } from './package-docs-navigation.mjs'

const SDK_SOURCE = process.argv[2] || 'tmp/sdk-docs'
const SDK_TARGET = process.argv[3] || 'content/3.packages/1.php'

if (!existsSync(SDK_SOURCE)) {
  console.error(`Source directory not found: ${SDK_SOURCE}`)
  process.exit(1)
}

const files = readdirSync(SDK_SOURCE, { recursive: true }).filter(f => extname(f) === '.md')
if (!files.length) throw new Error(`No markdown docs found in ${SDK_SOURCE}`)
const pages = new Map(files.map(file => [file, `/packages/php/${basename(file, '.md').toLowerCase()}`]))
if (new Set(pages.values()).size !== files.length) throw new Error('Duplicate page basenames: rename source docs before flattening')

mkdirSync(SDK_TARGET, { recursive: true })

// Mirror the source dir: drop previously-generated pages so a renamed or removed
// source doc doesn't leave an orphaned page (and stale nav entry) behind.
for (const entry of readdirSync(SDK_TARGET, { withFileTypes: true })) {
  if (entry.isDirectory() || extname(entry.name) === '.md') rmSync(join(SDK_TARGET, entry.name), { recursive: true })
}

for (const file of files) {
  const content = readFileSync(join(SDK_SOURCE, file), 'utf-8')
  const order = pagePosition(SDK_TARGET, file)
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

  // Flatten source folders while resolving links relative to the original file.
  transformed = transformed.replace(/(!?\[[^\]\n]*\])\(([^)]+)\)/g, (match, label, href) => {
    if (/^(?:[a-z]+:|#|\/\/)/i.test(href)) return match
    const [path, anchor = ''] = href.split('#')
    const key = new URL(path, `https://docs.invalid/docs/${file}`).pathname.replace(/^\/docs\//, '')
    const page = pages.get(key) || pages.get(`${key}.md`)
    if (page) return `${label}(${page}${anchor ? `#${anchor}` : ''})`
    if (path.startsWith('/')) return match
    const resolved = new URL(path, `https://github.com/Vatly/vatly-api-php/blob/main/docs/${file}`).pathname
    const url = label.startsWith('!') ? `https://raw.githubusercontent.com${resolved.replace('/blob/', '/')}` : `https://github.com${resolved}`
    return `${label}(${url}${anchor ? `#${anchor}` : ''})`
  })

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
    transformed = `---\ntitle: ${JSON.stringify(title)}\n---\n\n${transformed}`
  }

  writeFileSync(join(SDK_TARGET, targetName), pageMetadata(transformed, SDK_TARGET, file))
  console.log(`  ${file} -> ${targetName}`)
}

console.log(`\nTransformed ${files.length} files into ${SDK_TARGET}`)
