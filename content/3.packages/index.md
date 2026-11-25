---
title: "SDKs & Packages"
description: "Official Vatly SDKs, fluent packages and integrations for PHP, Laravel, JavaScript, Python, Django, FluentCart and Paid Memberships Pro. Installation, package registries and documentation."
---

> Official Vatly packages for your language or framework.

Vatly is the European merchant of record for AI, software and digital products. These official packages connect billing, subscriptions, and tax compliance to your application.

## Available packages

| Language / Framework | Package | Install |
| --- | --- | --- |
| PHP SDK | [vatly/vatly-api-php](https://packagist.org/packages/vatly/vatly-api-php) · [Docs](/packages/php/readme) · [GitHub](https://github.com/vatly/vatly-api-php) | `composer require vatly/vatly-api-php` (after allowing alpha, see below) |
| PHP Fluent | [vatly/vatly-fluent-php](https://packagist.org/packages/vatly/vatly-fluent-php) · [Docs](/packages/fluent-php/readme) · [GitHub](https://github.com/vatly/vatly-fluent-php) | `composer require vatly/vatly-fluent-php` (after allowing alpha, see below) |
| Laravel | [vatly/vatly-laravel](https://packagist.org/packages/vatly/vatly-laravel) · [Docs](/packages/laravel/readme) · [GitHub](https://github.com/vatly/vatly-laravel) | `composer require vatly/vatly-laravel` (after allowing alpha, see below) |
| JavaScript SDK | [@getvatly/sdk](https://www.npmjs.com/package/@getvatly/sdk) · [Docs](/packages/javascript/readme) · [GitHub](https://github.com/vatly/vatly-api-js) | `npm install --save-exact @getvatly/sdk` |
| JavaScript Fluent | [@getvatly/fluent](https://www.npmjs.com/package/@getvatly/fluent) · [Docs](/packages/fluent-js/readme) · [GitHub](https://github.com/vatly/vatly-fluent-js) | `npm install --save-exact @getvatly/sdk @getvatly/fluent` |
| Python SDK | [vatly-api-python](https://pypi.org/project/vatly-api-python/) · [Docs](/packages/python/readme) · [GitHub](https://github.com/vatly/vatly-api-python) | `pip install --pre vatly-api-python` |
| Python Fluent | [vatly-fluent-python](https://pypi.org/project/vatly-fluent-python/) · [Docs](/packages/fluent-python/readme) · [GitHub](https://github.com/vatly/vatly-fluent-python) | `pip install --pre vatly-fluent-python` |
| Django | [vatly-django](https://pypi.org/project/vatly-django/) · [Docs](/packages/django/readme) · [GitHub](https://github.com/vatly/vatly-django) | `pip install --pre vatly-django` |
| FluentCart (WordPress) | [vatly/vatly-fluentcart](https://packagist.org/packages/vatly/vatly-fluentcart) · [Docs](/packages/fluentcart/readme) · [GitHub](https://github.com/vatly/vatly-fluentcart-wp) | Upload the [release zip](https://github.com/vatly/vatly-fluentcart-wp/releases/latest) in WordPress, or `composer require vatly/vatly-fluentcart` (after allowing alpha, see below) |
| Paid Memberships Pro (WordPress) | [vatly/vatly-pmpro](https://packagist.org/packages/vatly/vatly-pmpro) · [Docs](/packages/pmpro/readme) · [GitHub](https://github.com/vatly/vatly-pmpro) | Upload the [release zip](https://github.com/vatly/vatly-pmpro/releases/latest) in WordPress, or `composer require vatly/vatly-pmpro` (after allowing alpha, see below) |

These packages are in alpha. Every alpha release may include breaking changes. Lock the version you install and review the release notes before upgrading. The install commands above get the latest alpha. For the PHP packages, first run `composer config minimum-stability alpha` and `composer config prefer-stable true`, because Composer installs only stable releases by default. For the Python packages, `--pre` selects the latest alpha. The Python packages require Python 3.10+; their import names are `vatly`, `vatly_fluent`, and `vatly_django`, respectively.

The FluentCart plugin is in alpha and requires FluentCart 2.3 or newer. It is not on WordPress.org: download the zip from [GitHub Releases](https://github.com/vatly/vatly-fluentcart-wp/releases/latest) and upload it under **Plugins → Add New → Upload Plugin**. Sites that manage plugins with Composer, such as Bedrock, can require it from Packagist instead.

The Paid Memberships Pro plugin is in alpha and requires Paid Memberships Pro 3.x. It is not on WordPress.org: download the zip from [GitHub Releases](https://github.com/vatly/vatly-pmpro/releases/latest) and upload it under **Plugins → Add New → Upload Plugin**. Sites that manage plugins with Composer, such as Bedrock, can require it from Packagist instead.

Not using one of these languages? You can use the [REST API directly](/guides/authentication) with any HTTP client.
