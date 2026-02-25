#!/usr/bin/env node
/**
 * Transform plain markdown SDK docs into Docus-compatible MDC format.
 * - Adds frontmatter if missing
 * - Wraps consecutive code blocks in ::code-group
 * - Adds navigation ordering
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs'
import { join, basename, extname } from 'path'

const SDK_SOURCE = process.argv[2] || 'tmp/sdk-docs'
const SDK_TARGET = process.argv[3] || 'content/3.php-sdk'

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

  let transformed = content

  // Rewrite internal links to point to SDK pages
  const linkMap = {
    '/checkouts': '/php-sdk/checkouts',
    '/customers': '/php-sdk/customers',
    '/subscriptions': '/php-sdk/subscriptions',
    '/subscription-plans': '/php-sdk/subscriptionplans',
    '/one-off-products': '/php-sdk/oneoffproducts',
    '/orders': '/php-sdk/orders',
    '/refunds': '/php-sdk/refunds',
    '/chargebacks': '/php-sdk/chargebacks',
    '/webhooks': '/php-sdk/webhooks',
    '/order-refunds': '/php-sdk/orders',
    '/global-refunds': '/php-sdk/refunds',
  }
  for (const [from, to] of Object.entries(linkMap)) {
    transformed = transformed.replaceAll(`](${from})`, `](${to})`)
  }

  // Add frontmatter if missing
  if (!hasFrontmatter) {
    transformed = `---\ntitle: "${title}"\ndescription: "Vatly PHP SDK - ${title}"\n---\n\n${transformed}`
  }

  writeFileSync(join(SDK_TARGET, targetName), transformed)
  console.log(`  ${file} -> ${targetName}`)
}

console.log(`\nTransformed ${files.length} files into ${SDK_TARGET}`)
