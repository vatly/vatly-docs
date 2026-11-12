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
    writeFileSync(join(target, '.navigation.yml'), 'title: JavaScript SDK\n')
    writeFileSync(join(source, 'README.md'), '# Start "here"\n\n[Customers](./Customers.md#creating)\n[API](/docs/API.md)\n[Recipe](recipes/Host.md#storage)\n![Banner](../art/banner.png)\n[Source](../src/client.ts)\n[External](https://example.com)\n\n> [!WARNING]\n> Keep the key secret.\n')
    writeFileSync(join(source, 'Customers.md'), '---\ntitle: Customers\n---\n\n# Customers\n\nBody\n')
    writeFileSync(join(source, 'API.md'), '# API\n\nReference\n')
    mkdirSync(join(source, 'recipes'))
    writeFileSync(join(source, 'recipes', 'Host.md'), '# Host guide\n\n[API](../API.md#orders)\n[Repository README](../../README.md)\n[Example](../../examples/host.php)\n')
    const run = () => execFileSync(process.execPath, ['scripts/transform-js-docs.mjs', source, target, 'vatly/vatly-api-js'])
    run()
    assert.deepEqual(readdirSync(target).sort(), ['.navigation.yml', '0.readme.md', '1.customers.md', '10.api.md', '99.host.md'])
    assert.equal(readFileSync(join(target, '.navigation.yml'), 'utf8'), 'title: JavaScript SDK\n')
    const readme = readFileSync(join(target, '0.readme.md'), 'utf8')
    assert.ok(readme.includes('title: "Start \\"here\\""'))
    assert.ok(readme.includes('[Customers](/packages/javascript/customers#creating)'))
    assert.ok(readme.includes('[API](/packages/javascript/api)'))
    assert.ok(readme.includes('[Recipe](/packages/javascript/host#storage)'))
    assert.ok(readme.includes('![Banner](https://raw.githubusercontent.com/vatly/vatly-api-js/main/art/banner.png)'))
    assert.ok(readme.includes('[Source](https://github.com/vatly/vatly-api-js/blob/main/src/client.ts)'))
    assert.ok(readme.includes('[External](https://example.com)'))
    assert.ok(readme.includes('::warning\nKeep the key secret.\n::'))
    assert.equal(readFileSync(join(target, '1.customers.md'), 'utf8'), '---\ntitle: Customers\n---\n\nBody\n')
    const nested = readFileSync(join(target, '99.host.md'), 'utf8')
    assert.ok(nested.includes('[API](/packages/javascript/api#orders)'))
    assert.ok(nested.includes('[Repository README](https://github.com/vatly/vatly-api-js/blob/main/README.md)'))
    assert.ok(nested.includes('[Example](https://github.com/vatly/vatly-api-js/blob/main/examples/host.php)'))
    execFileSync(process.execPath, ['scripts/transform-js-docs.mjs', source, join(root, '6.python'), 'vatly/vatly-api-python', 'Vatly Python SDK'])
    const python = readFileSync(join(root, '6.python/0.readme.md'), 'utf8')
    assert.ok(python.includes('description: "Vatly Python SDK - Start \\"here\\""'))
    assert.ok(python.includes('[Customers](/packages/python/customers#creating)'))
    writeFileSync(join(source, 'Host.md'), '# Duplicate basename\n')
    assert.throws(run)
    assert.equal(readFileSync(join(target, '0.readme.md'), 'utf8'), readme)
    for (const file of readdirSync(source)) rmSync(join(source, file), { recursive: true })
    assert.throws(run)
    assert.equal(readFileSync(join(target, '0.readme.md'), 'utf8'), readme)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

for (const [script, group] of [['sdk', 'php'], ['laravel', 'laravel']]) {
  test(`${group} also flattens source folders and preserves navigation metadata`, () => {
    const root = mkdtempSync(join(tmpdir(), 'vatly-docs-'))
    const source = join(root, 'docs')
    const target = join(root, group)
    try {
      mkdirSync(join(source, 'recipes'), { recursive: true })
      mkdirSync(join(target, '99.old-folder'), { recursive: true })
      writeFileSync(join(target, '99.old-folder/removed.md'), 'stale')
      writeFileSync(join(target, '.navigation.yml'), `title: ${group}\n`)
      writeFileSync(join(source, 'README.md'), '# Start\n\n[Recipe](recipes/Host.md#ownership)\n')
      writeFileSync(join(source, 'recipes/Host.md'), '# Host\n\n[Start](../README.md)\n[Repository](../../README.md)\n')
      const run = () => execFileSync(process.execPath, [`scripts/transform-${script}-docs.mjs`, source, target])
      run()
      assert.deepEqual(readdirSync(target).sort(), ['.navigation.yml', '0.readme.md', '99.host.md'])
      assert.ok(readFileSync(join(target, '0.readme.md'), 'utf8').includes(`[Recipe](/packages/${group}/host#ownership)`))
      assert.ok(readFileSync(join(target, '99.host.md'), 'utf8').includes(`[Start](/packages/${group}/readme)`))
      assert.ok(readFileSync(join(target, '99.host.md'), 'utf8').includes(`/blob/main/README.md)`))
      assert.equal(readFileSync(join(target, '.navigation.yml'), 'utf8'), `title: ${group}\n`)
      const previous = readFileSync(join(target, '99.host.md'), 'utf8')
      writeFileSync(join(source, 'Host.md'), '# Duplicate\n')
      assert.throws(run)
      assert.equal(readFileSync(join(target, '99.host.md'), 'utf8'), previous)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
}
