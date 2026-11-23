# SDKs & Packages

> Official Vatly SDKs, fluent packages and integrations for PHP, Laravel, JavaScript, Python, Django, FluentCart and Paid Memberships Pro. Installation, package registries and documentation.

> Official Vatly packages for your language or framework.

Vatly is the European merchant of record for AI, software and digital products. These official packages connect billing, subscriptions, and tax compliance to your application.

## Available packages

<table>
<thead>
  <tr>
    <th>
      Language / Framework
    </th>
    
    <th>
      Package
    </th>
    
    <th>
      Install
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      PHP SDK
    </td>
    
    <td>
      <a href="https://packagist.org/packages/vatly/vatly-api-php" rel="nofollow">
        vatly/vatly-api-php
      </a>
      
       · <a href="/packages/php/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-api-php" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      <code>
        composer require vatly/vatly-api-php
      </code>
      
       (after allowing alpha, see below)
    </td>
  </tr>
  
  <tr>
    <td>
      PHP Fluent
    </td>
    
    <td>
      <a href="https://packagist.org/packages/vatly/vatly-fluent-php" rel="nofollow">
        vatly/vatly-fluent-php
      </a>
      
       · <a href="/packages/fluent-php/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-fluent-php" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      <code>
        composer require vatly/vatly-fluent-php
      </code>
      
       (after allowing alpha, see below)
    </td>
  </tr>
  
  <tr>
    <td>
      Laravel
    </td>
    
    <td>
      <a href="https://packagist.org/packages/vatly/vatly-laravel" rel="nofollow">
        vatly/vatly-laravel
      </a>
      
       · <a href="/packages/laravel/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-laravel" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      <code>
        composer require vatly/vatly-laravel
      </code>
      
       (after allowing alpha, see below)
    </td>
  </tr>
  
  <tr>
    <td>
      JavaScript SDK
    </td>
    
    <td>
      <a href="https://www.npmjs.com/package/@getvatly/sdk" rel="nofollow">
        @getvatly/sdk
      </a>
      
       · <a href="/packages/javascript/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-api-js" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      <code>
        npm install --save-exact @getvatly/sdk
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      JavaScript Fluent
    </td>
    
    <td>
      <a href="https://www.npmjs.com/package/@getvatly/fluent" rel="nofollow">
        @getvatly/fluent
      </a>
      
       · <a href="/packages/fluent-js/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-fluent-js" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      <code>
        npm install --save-exact @getvatly/sdk @getvatly/fluent
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Python SDK
    </td>
    
    <td>
      <a href="https://pypi.org/project/vatly-api-python/" rel="nofollow">
        vatly-api-python
      </a>
      
       · <a href="/packages/python/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-api-python" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      <code>
        pip install --pre vatly-api-python
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Python Fluent
    </td>
    
    <td>
      <a href="https://pypi.org/project/vatly-fluent-python/" rel="nofollow">
        vatly-fluent-python
      </a>
      
       · <a href="/packages/fluent-python/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-fluent-python" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      <code>
        pip install --pre vatly-fluent-python
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Django
    </td>
    
    <td>
      <a href="https://pypi.org/project/vatly-django/" rel="nofollow">
        vatly-django
      </a>
      
       · <a href="/packages/django/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-django" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      <code>
        pip install --pre vatly-django
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      FluentCart (WordPress)
    </td>
    
    <td>
      Unreleased · <a href="/packages/fluentcart/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-fluentcart-wp" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      Build from source
    </td>
  </tr>
  
  <tr>
    <td>
      Paid Memberships Pro (WordPress)
    </td>
    
    <td>
      <a href="https://github.com/vatly/vatly-pmpro/releases/latest" rel="nofollow">
        GitHub Releases
      </a>
      
       · <a href="/packages/pmpro/readme">
        Docs
      </a>
      
       · <a href="https://github.com/vatly/vatly-pmpro" rel="nofollow">
        GitHub
      </a>
    </td>
    
    <td>
      Upload the release zip in WordPress
    </td>
  </tr>
</tbody>
</table>

These packages are in alpha. Every alpha release may include breaking changes. Lock the version you install and review the release notes before upgrading. The install commands above get the latest alpha. For the PHP packages, first run `composer config minimum-stability alpha` and `composer config prefer-stable true`, because Composer installs only stable releases by default. For the Python packages, `--pre` selects the latest alpha. The Python packages require Python 3.10+; their import names are `vatly`, `vatly_fluent`, and `vatly_django`, respectively.

The FluentCart plugin has not been released yet. Its payment flow is not yet verified against current FluentCart versions, so use it only in test mode.

The Paid Memberships Pro plugin is in alpha and requires Paid Memberships Pro 3.x. It is not on WordPress.org or Packagist: download the zip from [GitHub Releases](https://github.com/vatly/vatly-pmpro/releases/latest) and upload it under **Plugins → Add New → Upload Plugin**.

Not using one of these languages? You can use the [REST API directly](/guides/authentication) with any HTTP client.
