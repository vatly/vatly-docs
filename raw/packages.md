# Packages

> Official Vatly SDKs and fluent packages for PHP, Laravel, JavaScript, Python and Django. Installation, package registries and documentation.

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
      
       · <a href="/packages/fluent-php/webhook-flow">
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
        npm install @getvatly/sdk
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
        npm install @getvatly/fluent
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
        pip install vatly-api-python
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
        pip install vatly-fluent-python
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
        pip install vatly-django
      </code>
    </td>
  </tr>
</tbody>
</table>

These packages are in alpha. Every alpha release may include breaking changes. Pin exact versions during alpha. The Python packages require Python 3.10+ and are released at `0.1.0a2`; their import names are `vatly`, `vatly_fluent`, and `vatly_django`, respectively. For example, pin the SDK with `pip install vatly-api-python==0.1.0a2`.

PHP Fluent currently has two in-depth guides, not a complete getting-started section. Follow its [README](https://github.com/vatly/vatly-fluent-php#readme) for setup.

Not using one of these languages? You can use the [REST API directly](/guides/authentication) with any HTTP client.
