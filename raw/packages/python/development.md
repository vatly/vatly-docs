# Development and release

> Maintain the SDK, update its API specification, sync documentation and prepare releases.

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
uv run python scripts/generate.py --check
```

Tests use local HTTP and signed webhook fixtures, not a Vatly account. The second
command checks that generated models, resources, clients and the API inventory
match the pinned specification. CI runs these checks on Python 3.10–3.14.

## Check formatting and types

```bash
uv run ruff check .
uv run ruff format --check .
uv run mypy
```

## Build and check the package

```bash
uv build
uv run twine check dist/*
uv run python scripts/check_package.py
```

The last command installs the built wheel in a fresh environment and checks
imports and `py.typed`. These commands build and validate; they do not publish.

## Update the API specification

Replace `openapi.yaml` deliberately from the [production specification](https://docs.vatly.com/openapi.yaml),
update its provenance below, then regenerate:

```bash
uv run python scripts/generate.py
```

Review the generated diff and rerun the checks above. Do not hand-edit generated
models, resources, clients or `docs/API.md`.

Output models preserve extra fields and keep URLs and emails as strings. The
generator handles two observed API differences: metadata `[]` becomes `{}`, and
response product types accept values such as `digital_download`. Request validation
still follows the pinned schema. Invalid responses raise `VatlyApiError`; avoid
logging response bodies that may contain personal data.

### Pinned source

<table>
<thead>
  <tr>
    <th>
      Source
    </th>
    
    <th>
      Revision
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Production OpenAPI, retrieved 2026-11-13
    </td>
    
    <td>
      <a href="https://github.com/vatly/vatly-docs/blob/66c8205ea886e4cb48e8e3b2e988de3839c6d4d8/public/openapi.yaml" rel="nofollow">
        vatly-docs specification
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Original JS design reference
    </td>
    
    <td>
      <a href="https://github.com/vatly/vatly-api-js/commit/8b0b920c29f7e7b30bf71b9e379ec0a8a1a22028" rel="nofollow">
        SDK revision
      </a>
    </td>
  </tr>
</tbody>
</table>

The checked-in specification is byte-identical to that source and to the bundle
published by Vatly's production release. Its SHA-256 is:

```text
5e648169e101edc8b3e088dc0e28d0f0a293e8a0ed057014c7336057d986def9
```

The specification's generated-at date is not its retrieval date.

## Documentation sync

Edit the flat Markdown guides in `docs/`; keep relative links portable. The API
inventory is generated from `scripts/generate.py`, including its description.

Pushes to `main` affecting `docs/**` notify `vatly/vatly-docs`. The notifier needs
the Actions secret `VATLY_DOCS_DISPATCH_TOKEN` with Contents: write access to that
repository. The sync uses an explicit frontmatter description when present,
otherwise the page's introductory sentence.

## Prepare a release

The published package is [vatly-api-python](https://pypi.org/project/vatly-api-python/);
the import name is `vatly`. Update the package version, `src/vatly/_version.py`
and changelog, then run all checks. Publish the SDK before matching Fluent and
Django versions, only after review and approval.

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
        vatly-api-python
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

Publication starts only from a published GitHub release whose tag matches `v`
plus the package version. Mark alphas as pre-releases. Never reuse a published
version or move a release tag.

Pushing `main` does not publish. Restrict release access: trusted publishing uses
GitHub OIDC, with no environment approval gate or PyPI token. PyPI artifacts,
including packaged source and docs, are public even if the GitHub repo is private.

[Resource guides](/packages/python/readme) · [API inventory](/packages/python/api)
