#!/usr/bin/env node
/**
 * Transform plain markdown Laravel package docs into Docus-compatible MDC format.
 * - Adds frontmatter if missing
 * - Wraps consecutive code blocks in ::code-group
 * - Adds navigation ordering
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs'
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
}

if (!existsSync(SOURCE)) {
  console.error(`Source directory not found: ${SOURCE}`)
  process.exit(1)
}

mkdirSync(TARGET, { recursive: true })

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

  let transformed = content

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

  // Add frontmatter if missing
  if (!hasFrontmatter) {
    transformed = `---\ntitle: "${title}"\ndescription: "Vatly Laravel Package - ${title}"\n---\n\n${transformed}`
  }

  writeFileSync(join(TARGET, targetName), transformed)
  console.log(`  ${file} -> ${targetName}`)
}

console.log(`\nTransformed ${files.length} files into ${TARGET}`)
