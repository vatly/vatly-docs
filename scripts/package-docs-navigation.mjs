import { basename } from 'node:path'

// Slugs, not source titles: editorial changes must not reorder the sidebar.
const sdk = ['readme', 'configuration', 'customers', 'checkouts', 'subscriptions', 'subscriptionplans', 'orders', 'oneoffproducts', 'refunds', 'chargebacks', 'webhooks', 'webhookendpoints', 'api', 'development']
const fluent = ['readme', 'configuration', 'coreconcepts', 'customers', 'checkouts', 'subscriptions', 'orders', 'customerportal', 'webhooks', 'webhook-flow', 'host-owns-its-tables', 'testing', 'porting', 'development']
export const packageNavigation = {
  php: { title: 'PHP SDK', order: sdk },
  'fluent-php': { title: 'PHP Fluent', order: fluent },
  laravel: { title: 'Laravel', order: ['readme', 'configuration', 'customers', 'checkouts', 'subscriptions', 'orders', 'webhooks', 'comparison', 'migrating-to-vatly'] },
  javascript: { title: 'JavaScript SDK', order: sdk },
  'fluent-js': { title: 'JavaScript Fluent', order: fluent },
  python: { title: 'Python SDK', order: sdk },
  'fluent-python': { title: 'Python Fluent', order: fluent },
  django: { title: 'Django', order: ['readme', 'installation', 'configuration', 'billablemodels', 'checkout', 'billing', 'customerportal', 'webhooks', 'admin', 'testing', 'development'] },
}

const labels = {
  readme: 'Getting started', installation: 'Installation', configuration: 'Configuration',
  coreconcepts: 'Core concepts', customers: 'Customers', checkouts: 'Checkouts',
  checkout: 'Checkout', subscriptions: 'Subscriptions', billing: 'Subscriptions',
  subscriptionplans: 'Subscription plans', orders: 'Orders', oneoffproducts: 'One-off products',
  refunds: 'Refunds', chargebacks: 'Chargebacks', customerportal: 'Customer portal',
  webhooks: 'Webhooks', webhookendpoints: 'Webhook URLs', api: 'API reference',
  'webhook-flow': 'Webhook event flow', 'host-owns-its-tables': 'Existing tables',
  testing: 'Testing', porting: 'Porting', development: 'Development',
  comparison: 'Comparison', 'migrating-to-vatly': 'Migrating from Cashier',
  billablemodels: 'Billable models', admin: 'Admin',
}

export function pagePosition(target, file) {
  const group = basename(target).replace(/^\d+\./, '')
  const slug = basename(file, '.md').toLowerCase()
  const position = (packageNavigation[group]?.order ?? sdk).indexOf(slug)
  // New, unlisted pages follow the curated journey, alphabetically by slug.
  return String(position < 0 ? 99 : position).padStart(2, '0')
}

export function pageMetadata(content, target, file) {
  const group = basename(target).replace(/^\d+\./, '')
  const slug = basename(file, '.md').toLowerCase()
  const match = content.match(/^---\n([\s\S]*?)\n---\n*/)
  let metadata = match?.[1] ?? ''
  const body = match ? content.slice(match[0].length) : content
  const set = (key, value) => {
    const line = `${key}: ${JSON.stringify(value)}`
    const pattern = new RegExp(`^${key}:.*$`, 'm')
    metadata = pattern.test(metadata) ? metadata.replace(pattern, () => line) : `${metadata}\n${line}`.trim()
  }
  if (slug === 'readme' && packageNavigation[group]) set('title', packageNavigation[group].title)

  // Prefer an authored description, otherwise use the first prose sentence.
  // Never invent a package-name/title concatenation when prose is missing.
  const existing = metadata.match(/^description:\s*(.*)$/m)?.[1] ?? ''
  const title = metadata.match(/^title:\s*(.*)$/m)?.[1] ?? ''
  const plain = text => text.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/`|\*\*|__/g, '')
    .replace(/\s+/g, ' ').replace(/^["']|["']$/g, '').trim()
  const intro = body.split(/^#{1,6}\s|^```/m)[0]
  const prose = intro.split(/\n\s*\n/)
    .find(paragraph => /^[A-Za-z`]/.test(paragraph.trim()) && !/^Alpha\b/i.test(plain(paragraph)))
  const description = prose ? plain(prose).split(/(?<=[.!?])\s+/)
    .find(sentence => !/^Vatly is the European merchant of record\b/.test(sentence))?.replace(/:$/, '.') : ''
  if (!existing || plain(existing) === plain(title) || /^['"]?Vatly .* - /.test(existing)) {
    if (description && /[.!?]$/.test(description) && description !== plain(title)) set('description', description)
    else {
      metadata = metadata.replace(/^description:.*\n?/m, '')
      console.warn(`Missing source description: ${group}/${file}`)
    }
  }
  // Docus uses navigation.title for sidebar labels without changing page H1s.
  if (labels[slug] && !/^navigation:/m.test(metadata)) {
    metadata += `\nnavigation:\n  title: ${JSON.stringify(labels[slug])}`
  }
  return `---\n${metadata.trim()}\n---\n\n${body}`
}
