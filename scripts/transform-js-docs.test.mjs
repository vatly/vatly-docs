import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

test('mirrors package docs into ordered site pages with usable links and callouts', () => {
  const root = mkdtempSync(join(tmpdir(), 'vatly-docs-'))
  const source = join(root, 'docs')
  const target = join(root, '3.javascript')
  try {
    mkdirSync(source)
    mkdirSync(target)
    writeFileSync(join(target, '99.removed.md'), 'stale')
    writeFileSync(join(source, 'README.md'), '# Start "here"\n\n[Customers](./Customers.md#creating)\n[API](/docs/API.md)\n![Banner](../art/banner.png)\n[Source](../src/client.ts)\n[External](https://example.com)\n\n> [!WARNING]\n> Keep the key secret.\n')
    writeFileSync(join(source, 'Customers.md'), '---\ntitle: Customers\n---\n\n# Customers\n\nBody\n')
    writeFileSync(join(source, 'API.md'), '# API\n\nReference\n')
    const run = () => execFileSync(process.execPath, ['scripts/transform-js-docs.mjs', source, target, 'vatly/vatly-api-js'])
    run()
    assert.deepEqual(readdirSync(target).sort(), ['0.readme.md', '1.customers.md', '10.api.md'])
    const readme = readFileSync(join(target, '0.readme.md'), 'utf8')
    assert.ok(readme.includes('title: "Start \\"here\\""'))
    assert.ok(readme.includes('[Customers](/packages/javascript/customers#creating)'))
    assert.ok(readme.includes('[API](/packages/javascript/api)'))
    assert.ok(readme.includes('![Banner](https://raw.githubusercontent.com/vatly/vatly-api-js/main/art/banner.png)'))
    assert.ok(readme.includes('[Source](https://github.com/vatly/vatly-api-js/blob/main/src/client.ts)'))
    assert.ok(readme.includes('[External](https://example.com)'))
    assert.ok(readme.includes('::warning\nKeep the key secret.\n::'))
    assert.equal(readFileSync(join(target, '1.customers.md'), 'utf8'), '---\ntitle: Customers\n---\n\nBody\n')
    for (const file of readdirSync(source)) rmSync(join(source, file))
    assert.throws(run)
    assert.equal(readFileSync(join(target, '0.readme.md'), 'utf8'), readme)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
