# Development and release

> Set up the repository, run checks and build the Django package locally.

Set up the repository, run checks and build the Django package locally.

## Set up the repository

Run commands from the repository root. On Linux or in an Amp orb:

```bash
.agents/setup
```

Setup installs uv 0.12.9 and Python 3.12, restores locked dependencies and runs
Django's system checks. It needs no API credentials and makes no Vatly calls.
It does not migrate your application's database or create test data.

## Run tests

```bash
uv run pytest --cov
uv run python -m django makemigrations \
  --check --dry-run --settings=tests.settings
```

Tests apply real migrations to a temporary database and use local HTTP and signed
webhook fixtures. They check ownership, CSRF, duplicate delivery, rollback and
subscription state without changing a Vatly account.

SQLite is the default. The PostgreSQL-only concurrency test skips locally unless
PostgreSQL is configured; CI runs it against PostgreSQL 17.

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

The last command installs the built wheel in a fresh environment, migrates an
empty database and checks imports and the `py.typed` marker. None of these
commands publishes a package.

## Supported versions

<table>
<thead>
  <tr>
    <th>
      Component
    </th>
    
    <th>
      Versions checked in CI
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Python
    </td>
    
    <td>
      3.10–3.14
    </td>
  </tr>
  
  <tr>
    <td>
      Django
    </td>
    
    <td>
      5.2 LTS, 6.0 and 6.1 in compatible Python combinations
    </td>
  </tr>
  
  <tr>
    <td>
      PostgreSQL
    </td>
    
    <td>
      17, including concurrent webhook delivery
    </td>
  </tr>
</tbody>
</table>

## Pinned dependencies

Development uses the SDK and Fluent wheels in `vendor/`. Normal PyPI installs
resolve the exact published dependencies instead. Check the pinned files before
refreshing them:

```bash
sha256sum --check vendor/SHA256SUMS
```

## Prepare a release

The published package is [vatly-django](https://pypi.org/project/vatly-django/);
the import name is `vatly_django`. Release matching versions in SDK → Fluent →
Django order, only after review and approval.

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
        vatly-django
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

The workflow publishes only when a GitHub release is published with a tag matching
`v` plus the package version. Pushing `main` or running a local build does not
publish. Restrict release access: there is no environment approval gate or PyPI
token, and all PyPI artifacts are public.

[Offline testing examples](/packages/django/testing) · [Installation](/packages/django/installation)
