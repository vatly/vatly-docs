# Vatly SDKs

> Install official Vatly SDKs and fluent billing packages for PHP, Laravel, JavaScript, Python and Django. Compare availability and find package guides.

Vatly is the European merchant of record for AI, software and digital products. Use a fluent package for app-level billing, or an SDK for direct API calls.

## PHP SDK

The official PHP SDK is the primary way to interact with the Vatly API from your PHP application.

For installation, usage examples, and the full list of available resources, see the [PHP SDK docs](/packages/php/readme).

## PHP Fluent

[`vatly/vatly-fluent-php`](https://packagist.org/packages/vatly/vatly-fluent-php) adds higher-level billing flows to the PHP SDK.

```bash
composer require vatly/vatly-fluent-php
```

Follow its [README](https://github.com/vatly/vatly-fluent-php#readme) for setup. The synced docs currently cover [webhook flow](/packages/fluent-php/webhook-flow) and [adapting to your framework](/packages/fluent-php/host-owns-its-tables).

## Laravel

The Vatly Laravel package was inspired by Laravel Cashier and provides a fluent way of integrating Vatly into your application.

For installation and usage examples, see the [Laravel Vatly docs](/packages/laravel/readme).

## JavaScript SDK

The official JavaScript / TypeScript SDK, [`@getvatly/sdk`](https://www.npmjs.com/package/@getvatly/sdk), provides a typed client for the Vatly API on Node.js and edge runtimes.

```bash
npm install @getvatly/sdk
```

For installation, usage examples, and the full list of available resources, see the [JavaScript / TypeScript SDK docs](/packages/javascript/readme). The source is available on [GitHub](https://github.com/vatly/vatly-api-js).

## JavaScript Fluent

The framework-agnostic fluent package, [`@getvatly/fluent`](https://www.npmjs.com/package/@getvatly/fluent), builds on `@getvatly/sdk` with checkout builders, customer and subscription handles, and webhook processing.

```bash
npm install @getvatly/sdk @getvatly/fluent
```

For installation and usage examples, see the [fluent JavaScript / TypeScript docs](/packages/fluent-js/readme). The source is available on [GitHub](https://github.com/vatly/vatly-fluent-js).

## Python SDK

[`vatly-api-python`](https://pypi.org/project/vatly-api-python/) provides typed synchronous and asynchronous API clients for Python 3.10+. Import it as `vatly`.

```bash
pip install vatly-api-python
```

See the [Python SDK docs](/packages/python/readme) for initialization and API resources, or the source on [GitHub](https://github.com/vatly/vatly-api-python).

## Python Fluent

[`vatly-fluent-python`](https://pypi.org/project/vatly-fluent-python/) builds on the Python SDK with async-first billing flows, checkout builders, subscriptions and transactional webhooks. Import it as `vatly_fluent`.

```bash
pip install vatly-fluent-python
```

See the [Python Fluent docs](/packages/fluent-python/readme) for storage contracts and configuration, or the source on [GitHub](https://github.com/vatly/vatly-fluent-python).

## Django

[`vatly-django`](https://pypi.org/project/vatly-django/) integrates Python Fluent with Django, including ORM storage, billable operations and webhook handling. Import it as `vatly_django`.

```bash
pip install vatly-django
```

See the [Django docs](/packages/django/readme) for installation and settings, or the source on [GitHub](https://github.com/vatly/vatly-django). Like Laravel for PHP, Django is the framework integration; its reference lives under Packages.

These packages are in alpha. Every alpha release may include breaking changes. Pin exact versions during alpha. All three Python packages are released at `0.1.0a2`; for example, use `pip install vatly-django==0.1.0a2` to pin Django and its matching Python package dependencies.

---

## SDK availability

<table>
<thead>
  <tr>
    <th>
      SDK
    </th>
    
    <th>
      Status
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="/packages/php/readme">
        PHP SDK
      </a>
    </td>
    
    <td>
      Available (alpha)
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-php/webhook-flow">
        PHP Fluent
      </a>
    </td>
    
    <td>
      Available (alpha)
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/laravel/readme">
        Laravel
      </a>
    </td>
    
    <td>
      Available (alpha)
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/readme">
        JavaScript SDK
      </a>
    </td>
    
    <td>
      Available (alpha)
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-js/readme">
        JavaScript Fluent
      </a>
    </td>
    
    <td>
      Available (alpha)
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/python/readme">
        Python SDK
      </a>
    </td>
    
    <td>
      Available (alpha)
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/fluent-python/readme">
        Python Fluent
      </a>
    </td>
    
    <td>
      Available (alpha)
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/django/readme">
        Django
      </a>
    </td>
    
    <td>
      Available (alpha)
    </td>
  </tr>
  
  <tr>
    <td>
      Ruby
    </td>
    
    <td>
      Planned
    </td>
  </tr>
</tbody>
</table>

In the meantime, you can use the [REST API directly](/guides/authentication) with any HTTP client in any language.

---

## OpenAPI specification

The whole Vatly API is described by an OpenAPI 3.1 specification. Download it here:

[https://docs.vatly.com/openapi.yaml](https://docs.vatly.com/openapi.yaml)

Use it to generate a typed client in your language, import the API into Postman, Insomnia, or another tool, or feed it to your own codegen and tests. It stays in sync with the live API, so a client generated from it matches this reference.

## Point your AI agent at the docs

These docs are built to be read by AI coding agents, not only by people. Point an assistant such as Claude or ChatGPT at `docs.vatly.com` and it can build your integration against the real API surface.

- **llms.txt**: a machine-readable index of the site at [docs.vatly.com/llms.txt](https://docs.vatly.com/llms.txt), with the full documentation as one file at [docs.vatly.com/llms-full.txt](https://docs.vatly.com/llms-full.txt). Give your agent either one and it has the whole reference in a single fetch.
- **Markdown for every page**: put `/raw` in front of any docs path and add `.md`. For this page that is [docs.vatly.com/raw/guides/sdks.md](https://docs.vatly.com/raw/guides/sdks.md).
- **Open in ChatGPT or Claude**: every page has buttons in its header to copy it as Markdown or open it straight in ChatGPT or Claude.
- **OpenAPI spec**: the [specification above](#openapi-specification) gives an agent the exact endpoints, parameters, and schemas.
