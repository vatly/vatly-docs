---
title: "Packages"
description: "Official Vatly SDKs and fluent packages for PHP, Laravel, JavaScript, Python and Django. Installation, package registries and documentation."
---

> Official Vatly packages for your language or framework.

Vatly is the European merchant of record for AI, software and digital products. These official packages connect billing, subscriptions, and tax compliance to your application.

## Available packages

| Language / Framework | Package | Install |
| --- | --- | --- |
| PHP SDK | [vatly/vatly-api-php](https://packagist.org/packages/vatly/vatly-api-php) · [Docs](/packages/php/readme) · [GitHub](https://github.com/vatly/vatly-api-php) | `composer require vatly/vatly-api-php` |
| PHP Fluent | [vatly/vatly-fluent-php](https://packagist.org/packages/vatly/vatly-fluent-php) · [Docs](/packages/fluent-php/webhook-flow) · [GitHub](https://github.com/vatly/vatly-fluent-php) | `composer require vatly/vatly-fluent-php` |
| Laravel | [vatly/vatly-laravel](https://packagist.org/packages/vatly/vatly-laravel) · [Docs](/packages/laravel/readme) · [GitHub](https://github.com/vatly/vatly-laravel) | `composer require vatly/vatly-laravel` |
| JavaScript SDK | [@getvatly/sdk](https://www.npmjs.com/package/@getvatly/sdk) · [Docs](/packages/javascript/readme) · [GitHub](https://github.com/vatly/vatly-api-js) | `npm install @getvatly/sdk` |
| JavaScript Fluent | [@getvatly/fluent](https://www.npmjs.com/package/@getvatly/fluent) · [Docs](/packages/fluent-js/readme) · [GitHub](https://github.com/vatly/vatly-fluent-js) | `npm install @getvatly/fluent` |
| Python SDK | [vatly-api-python](https://pypi.org/project/vatly-api-python/) · [Docs](/packages/python/readme) · [GitHub](https://github.com/vatly/vatly-api-python) | `pip install vatly-api-python` |
| Python Fluent | [vatly-fluent-python](https://pypi.org/project/vatly-fluent-python/) · [Docs](/packages/fluent-python/readme) · [GitHub](https://github.com/vatly/vatly-fluent-python) | `pip install vatly-fluent-python` |
| Django | [vatly-django](https://pypi.org/project/vatly-django/) · [Docs](/packages/django/readme) · [GitHub](https://github.com/vatly/vatly-django) | `pip install vatly-django` |

These packages are in alpha. Every alpha release may include breaking changes. Pin exact versions during alpha. The Python packages require Python 3.10+ and are released at `0.1.0a2`; their import names are `vatly`, `vatly_fluent`, and `vatly_django`, respectively. For example, pin the SDK with `pip install vatly-api-python==0.1.0a2`.

PHP Fluent currently has two in-depth guides, not a complete getting-started section. Follow its [README](https://github.com/vatly/vatly-fluent-php#readme) for setup.

Not using one of these languages? You can use the [REST API directly](/guides/authentication) with any HTTP client.
