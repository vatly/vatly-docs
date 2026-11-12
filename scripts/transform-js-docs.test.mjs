import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

test('Django sync preserves the reader journey, concise navigation and sourced descriptions', () => {
  const root = mkdtempSync(join(tmpdir(), 'vatly-journey-'))
  const source = join(root, 'docs')
  const target = join(root, '8.django')
  try {
    mkdirSync(source)
    // Deliberately not alphabetic; webhooks must not jump before setup pages.
    const journey = ['README', 'Installation', 'Configuration', 'BillableModels', 'Checkout', 'Billing', 'CustomerPortal', 'Webhooks', 'Admin', 'Testing', 'Development']
    for (const file of [...journey].reverse()) {
      writeFileSync(join(source, `${file}.md`), `# Long ${file} heading\n\nUse \`vatly_django\` to handle billing. Another sentence.\n`)
    }
    writeFileSync(join(source, 'README.md'), '# Vatly Django\n\n![Banner](../banner.png)\n\n> **Alpha warning.**\n\nAdd billing to your Django application. Keep secrets on the server.\n')
    writeFileSync(join(source, 'Admin.md'), '---\ntitle: Admin details\ndescription: "Inspect locally stored billing records in Django admin."\n---\n\n# Admin details\n\nA different source introduction.\n')
    writeFileSync(join(source, 'Unlisted.md'), '# Unlisted\n\n## Code only\n\n```python\nprint("not prose")\n```\n')
    const run = () => execFileSync(process.execPath, ['scripts/transform-js-docs.mjs', source, target, 'vatly/vatly-django'], { encoding: 'utf8' })
    run()
    const files = readdirSync(target).sort()
    assert.deepEqual(files.map(f => f.replace(/^\d+\./, '')), [...journey.map(f => `${f.toLowerCase()}.md`), 'unlisted.md'])
    const readme = readFileSync(join(target, '00.readme.md'), 'utf8')
    assert.ok(readme.includes('title: "Django"'))
    assert.ok(readme.includes('description: "Add billing to your Django application."'))
    const billing = readFileSync(join(target, '05.billing.md'), 'utf8')
    assert.ok(billing.includes('title: "Long Billing heading"'))
    assert.ok(billing.includes('navigation:\n  title: "Subscriptions"'))
    assert.ok(billing.includes('description: "Use vatly_django to handle billing."'))
    assert.ok(readFileSync(join(target, '08.admin.md'), 'utf8').includes('description: "Inspect locally stored billing records in Django admin."'))
    assert.ok(!readFileSync(join(target, '99.unlisted.md'), 'utf8').includes('description:'))
    run()
    assert.equal(readFileSync(join(target, '00.readme.md'), 'utf8'), readme)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

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
    assert.deepEqual(readdirSync(target).sort(), ['.navigation.yml', '00.readme.md', '02.customers.md', '12.api.md', '99.host.md'])
    assert.equal(readFileSync(join(target, '.navigation.yml'), 'utf8'), 'title: JavaScript SDK\n')
    const readme = readFileSync(join(target, '00.readme.md'), 'utf8')
    assert.ok(readme.includes('title: "JavaScript SDK"'))
    assert.ok(readme.includes('[Customers](/packages/javascript/customers#creating)'))
    assert.ok(readme.includes('[API](/packages/javascript/api)'))
    assert.ok(readme.includes('[Recipe](/packages/javascript/host#storage)'))
    assert.ok(readme.includes('![Banner](https://raw.githubusercontent.com/vatly/vatly-api-js/main/art/banner.png)'))
    assert.ok(readme.includes('[Source](https://github.com/vatly/vatly-api-js/blob/main/src/client.ts)'))
    assert.ok(readme.includes('[External](https://example.com)'))
    assert.ok(readme.includes('::warning\nKeep the key secret.\n::'))
    assert.ok(readFileSync(join(target, '02.customers.md'), 'utf8').includes('navigation:\n  title: "Customers"'))
    const nested = readFileSync(join(target, '99.host.md'), 'utf8')
    assert.ok(nested.includes('[API](/packages/javascript/api#orders)'))
    assert.ok(nested.includes('[Repository README](https://github.com/vatly/vatly-api-js/blob/main/README.md)'))
    assert.ok(nested.includes('[Example](https://github.com/vatly/vatly-api-js/blob/main/examples/host.php)'))
    execFileSync(process.execPath, ['scripts/transform-js-docs.mjs', source, join(root, '6.python'), 'vatly/vatly-api-python', 'Vatly Python SDK'])
    const python = readFileSync(join(root, '6.python/00.readme.md'), 'utf8')
    assert.ok(python.includes('title: "Python SDK"'))
    assert.ok(!python.includes('description:'))
    assert.ok(python.includes('[Customers](/packages/python/customers#creating)'))
    writeFileSync(join(source, 'Host.md'), '# Duplicate basename\n')
    assert.throws(run)
    assert.equal(readFileSync(join(target, '00.readme.md'), 'utf8'), readme)
    for (const file of readdirSync(source)) rmSync(join(source, file), { recursive: true })
    assert.throws(run)
    assert.equal(readFileSync(join(target, '00.readme.md'), 'utf8'), readme)
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
      assert.deepEqual(readdirSync(target).sort(), ['.navigation.yml', '00.readme.md', '99.host.md'])
      assert.ok(readFileSync(join(target, '00.readme.md'), 'utf8').includes(`[Recipe](/packages/${group}/host#ownership)`))
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
