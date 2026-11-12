#!/usr/bin/env node
/**
 * Transform plain markdown Laravel package docs into Docus-compatible MDC format.
 * - Adds frontmatter if missing
 * - Wraps consecutive code blocks in ::code-group
 * - Adds navigation ordering
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'fs'
import { join, basename, extname } from 'path'
import { pagePosition, pageMetadata } from './package-docs-navigation.mjs'

const SOURCE = process.argv[2] || 'tmp/laravel-docs'
const TARGET = process.argv[3] || 'content/3.packages/3.laravel'

if (!existsSync(SOURCE)) {
  console.error(`Source directory not found: ${SOURCE}`)
  process.exit(1)
}

const files = readdirSync(SOURCE, { recursive: true }).filter(f => extname(f) === '.md')
if (!files.length) throw new Error(`No markdown docs found in ${SOURCE}`)
const pages = new Map(files.map(file => [file, `/packages/laravel/${basename(file, '.md').toLowerCase()}`]))
if (new Set(pages.values()).size !== files.length) throw new Error('Duplicate page basenames: rename source docs before flattening')

mkdirSync(TARGET, { recursive: true })

// Mirror the source dir: drop previously-generated pages so a renamed or removed
// source doc doesn't leave an orphaned page (and stale nav entry) behind.
for (const entry of readdirSync(TARGET, { withFileTypes: true })) {
  if (entry.isDirectory() || extname(entry.name) === '.md') rmSync(join(TARGET, entry.name), { recursive: true })
}

for (const file of files) {
  const content = readFileSync(join(SOURCE, file), 'utf-8')
  const order = pagePosition(TARGET, file)
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
    const resolved = new URL(path, `https://github.com/Vatly/vatly-laravel/blob/main/docs/${file}`).pathname
    const url = label.startsWith('!') ? `https://raw.githubusercontent.com${resolved.replace('/blob/', '/')}` : `https://github.com${resolved}`
    return `${label}(${url}${anchor ? `#${anchor}` : ''})`
  })

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

  // Convert GitHub alert blockquotes (> [!NOTE] / [!TIP] / [!WARNING] / …) into
  // Docus MDC callouts. Authors keep GitHub-native alert syntax in the source (it
  // renders on github.com); the docs site gets proper callout boxes. The theme
  // ships note / tip / warning, so IMPORTANT maps to note and CAUTION to warning.
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

  writeFileSync(join(TARGET, targetName), pageMetadata(transformed, TARGET, file))
  console.log(`  ${file} -> ${targetName}`)
}

console.log(`\nTransformed ${files.length} files into ${TARGET}`)
