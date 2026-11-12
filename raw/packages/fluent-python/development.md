# Development and release

> Set up the repository, test billing integrations and build the Fluent package locally.

## Set up the repository

Run commands from the repository root. On Linux or in an Amp orb:

```bash
.agents/setup
```

Setup installs uv 0.12.9 and Python 3.12, restores locked dependencies and checks
imports. It needs no API credentials and makes no Vatly calls.

## Run tests

```bash
uv run pytest --cov
```

Tests use the real SDK with local HTTP and signed webhook fixtures. The SQLite
driver tests cover storage, ownership, duplicate delivery, rollback and the outbox.
No test changes a Vatly account. See [offline examples](/packages/fluent-python/testing) for host tests.

## Check formatting and types

```bash
uv run ruff check .
uv run ruff format --check .
uv run mypy
```

CI runs tests and these checks on Python 3.10–3.14. Type checks also include the
example storage driver.

## Build and check the package

```bash
uv build
uv run twine check dist/*
uv run python scripts/check_package.py
```

The last command installs the built wheel in a fresh environment and checks
imports and `py.typed`. These commands do not publish anything.

## Pinned SDK dependency

Development uses the SDK wheel in `vendor/`. Published Fluent metadata declares
the normal, exact PyPI dependency instead. Verify the pinned file before updating:

```bash
sha256sum --check vendor/SHA256SUMS
```

Keep published wheels immutable. Use a new alpha version when dependency behavior
changes; do not silently replace a version's wheel.

## Documentation sync

Keep guides directly under `docs/` and link each page from [the overview](/packages/fluent-python/readme).
Pushes to `main` affecting `docs/**` notify `vatly/vatly-docs`. The notifier needs
`VATLY_DOCS_DISPATCH_TOKEN` with Contents: write access to that repository.
The sync uses an explicit frontmatter description when present, otherwise the
page's introductory sentence.

## Prepare a release

The published package is [vatly-fluent-python](https://pypi.org/project/vatly-fluent-python/);
the import name is `vatly_fluent`. Publish the matching SDK version first, then
Fluent, then Django, only after review and approval.

<table>
<thead>
  <tr>
    <th>
      PyPI trusted publisher field
    </th>
    
    <th>
      Value
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Owner
    </td>
    
    <td>
      <code>
        vatly
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Repository
    </td>
    
    <td>
      <code>
        vatly-fluent-python
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Workflow
    </td>
    
    <td>
      <code>
        release.yml
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Environment
    </td>
    
    <td>
      Leave blank
    </td>
  </tr>
</tbody>
</table>

The workflow publishes only from a published GitHub release whose tag matches
`v` plus the package version. Mark alphas as pre-releases. Pushing `main` does not
publish. Restrict release access: trusted publishing needs no environment approval
or PyPI token, and PyPI artifacts are public.

[Storage contracts](/packages/fluent-python/coreconcepts) · [Porting notes](/packages/fluent-python/porting)
