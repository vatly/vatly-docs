#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from the content/ directory.
 *
 * The sitemap used to be hand-maintained, which meant every newly-added page —
 * and especially pages synced in from the vatly-laravel / vatly-api-php repos —
 * silently went missing from it. This walks content/ and derives the exact
 * route Docus serves for each page, so the sitemap can never drift again.
 *
 * Route derivation (verified against the live site):
 *   - Strip the leading "N." ordering prefix from every path segment.
 *   - A file named `index.md` maps to its parent directory's route.
 *   - `readme.md` is NOT special — it stays as `/.../readme`.
 *   - content/index.md -> "/"  (home)
 *
 * Run: node scripts/generate-sitemap.mjs
 */

import { readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = join(ROOT, 'content')
const OUTPUT = join(ROOT, 'public', 'sitemap.xml')
const BASE_URL = 'https://docs.vatly.com'

// Strip the leading "N." ordering prefix (e.g. "7.migrating-to-vatly" -> "migrating-to-vatly").
const stripOrder = (name) => name.replace(/^\d+\./, '')

// Numeric sort key from the leading "N." prefix. `index` sorts first so a
// directory's own page leads its children; unprefixed files sort last.
const orderKey = (name) => {
  const base = name.replace(/\.md$/, '')
  if (base === 'index') return -1
  const m = name.match(/^(\d+)\./)
  return m ? parseInt(m[1], 10) : 1e9
}

// SEO priority, derived from route depth so it needs no per-page upkeep.
const priorityFor = (segments) => {
  if (segments.length === 0) return '1.0' // home
  if (segments.length === 1) return segments[0] === 'introduction' ? '0.9' : '0.7'
  if (segments[0] === 'packages') {
    return segments[segments.length - 1] === 'readme' ? '0.7' : '0.6'
  }
  return '0.8' // guides/*, api-reference/*
}

/** Recursively collect route segment-arrays from a content directory. */
function collect(dir, segments, routes) {
  const entries = readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() || e.name.endsWith('.md'))
    .sort((a, b) => orderKey(a.name) - orderKey(b.name) || a.name.localeCompare(b.name))

  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      collect(full, [...segments, stripOrder(entry.name)], routes)
    } else {
      const base = stripOrder(entry.name.replace(/\.md$/, ''))
      routes.push(base === 'index' ? segments : [...segments, base])
    }
  }
}

const routes = []
collect(CONTENT_DIR, [], routes)

const urls = routes.map((segments) => {
  const loc = segments.length ? `${BASE_URL}/${segments.join('/')}` : `${BASE_URL}/`
  return `  <url><loc>${loc}</loc><priority>${priorityFor(segments)}</priority></url>`
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

writeFileSync(OUTPUT, xml)
console.log(`Wrote ${routes.length} URLs to ${OUTPUT.replace(ROOT + '/', '')}`)
for (const segments of routes) {
  console.log(`  /${segments.join('/')}`)
}
