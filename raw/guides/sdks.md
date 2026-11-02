# Vatly SDKs

> Vatly offers official SDKs to make integrating the API into your application quick and easy.

## PHP SDK

The official PHP SDK is the primary way to interact with the Vatly API from your PHP application.

For installation, usage examples, and the full list of available resources, see the [PHP SDK docs](/packages/php/readme).

## Laravel

The Vatly Laravel package was inspired by Laravel Cashier and provides a fluent way of integrating Vatly into your application.

For installation and usage examples, see the [Laravel Vatly docs](/packages/laravel/readme).

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
        PHP
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
      JavaScript / Node.js
    </td>
    
    <td>
      Coming soon
    </td>
  </tr>
  
  <tr>
    <td>
      Python
    </td>
    
    <td>
      Coming soon
    </td>
  </tr>
  
  <tr>
    <td>
      Ruby
    </td>
    
    <td>
      Coming soon
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
