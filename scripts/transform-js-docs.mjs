#!/usr/bin/env node
// Package docs -> ordered Docus pages, shared by JS, Python and PHP Fluent.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync } from 'node:fs'
import { join, basename } from 'node:path'

const [source, target, repository, label = 'Vatly JavaScript packages'] = process.argv.slice(2)
if (!source || !target || !repository) {
  throw new Error('Usage: transform-js-docs.mjs SOURCE TARGET OWNER/REPO')
}
const files = readdirSync(source, { recursive: true }).filter(file => file.endsWith('.md')).sort()
// Fail before removing old pages if a package has not added docs yet.
if (!files.length) throw new Error(`No markdown docs found in ${source}`)

const route = `/packages/${basename(target).replace(/^\d+\./, '')}`
const order = ['README', 'Customers', 'Checkouts', 'Subscriptions', 'SubscriptionPlans',
  'Orders', 'Refunds', 'OneOffProducts', 'Chargebacks', 'Webhooks', 'API']
// Source folders organize authoring, not the public package navigation.
const slug = file => basename(file, '.md').toLowerCase()
const pages = new Map(files.map(file => [file, `${route}/${slug(file)}`]))
if (new Set(pages.values()).size !== files.length) {
  throw new Error('Duplicate page basenames: rename source docs before flattening')
}

// Prepare every page before replacing the previous mirror.
const output = files.map(file => {
  const original = readFileSync(join(source, file), 'utf8')
  const title = original.match(/^#\s+(.+)$/m)?.[1] ?? basename(file, '.md')
  let transformed = original.replace(/^#\s+.+\n+/m, '')
  // Sibling docs (including anchors), source links and images must not resolve
  // relative to the generated site. Use raw URLs for image assets.
  transformed = transformed.replace(/(!?\[[^\]\n]*\])\(([^)]+)\)/g, (match, label, href) => {
    if (/^(?:[a-z]+:|#|\/\/)/i.test(href)) return match
    const [path, anchor = ''] = href.split('#')
    const sibling = new URL(path, `https://docs.invalid/docs/${file}`).pathname.replace(/^\/docs\//, '')
    if (pages.has(sibling)) return `${label}(${pages.get(sibling)}${anchor ? `#${anchor}` : ''})`
    if (path.startsWith('/')) return match
    const resolved = new URL(path, `https://github.com/${repository}/blob/main/docs/${file}`).pathname
    const url = label.startsWith('!')
      ? `https://raw.githubusercontent.com${resolved.replace('/blob/', '/')}`
      : `https://github.com${resolved}`
    return `${label}(${url}${anchor ? `#${anchor}` : ''})`
  })
  transformed = transformed.replace(
    /^> \[!(\w+)\][^\n]*\n((?:>[^\n]*(?:\n|$))*)/gim,
    (_, type, body) => {
      const component = { note: 'note', tip: 'tip', important: 'note', warning: 'warning', caution: 'warning' }[type.toLowerCase()] ?? 'note'
      return `::${component}\n${body.replace(/^> ?/gm, '').replace(/\n+$/, '')}\n::\n`
    },
  )
  if (!original.startsWith('---')) {
    transformed = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(`${label} - ${title}`)}\n---\n\n${transformed}`
  }
  const position = order.indexOf(basename(file, '.md'))
  return [`${position < 0 ? 99 : position}.${slug(file)}.md`, transformed]
})

mkdirSync(target, { recursive: true })
for (const entry of readdirSync(target, { withFileTypes: true })) {
  if (entry.isDirectory() || entry.name.endsWith('.md')) rmSync(join(target, entry.name), { recursive: true })
}
for (const [file, content] of output) writeFileSync(join(target, file), content)
console.log(`Transformed ${output.length} files into ${target}`)
