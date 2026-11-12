---
title: "Integrations"
description: "Connect Vatly to Lovable, Bolt, or your own app. Find builder guides, fluent packages, SDKs, and API documentation for European software and digital products."
---

Use Vatly as the merchant of record for European software and digital products, including apps built with AI app builders. Vatly acts as the legal seller and handles tax and invoicing; your app delivers the product and controls customer access.

## Choose your builder

These guides explain where server code and secrets belong and give you a prompt to paste into your builder's agent:

| Builder | Start here |
| --- | --- |
| Lovable | [Lovable payments with Vatly](/integrations/lovable): choose the right backend for your project and add checkout using Lovable Cloud or Supabase. |
| Bolt.new | [Bolt payments with Vatly](/integrations/bolt): connect billing through Bolt Cloud server functions, Supabase, or your existing backend. |

These are custom API integrations, not native connectors or endorsements by Lovable or Bolt. They use Vatly's existing packages and API; no platform changes are required on Vatly's side.

<span id="create-a-checkout-with-the-javascript-sdk"></span>
<span id="create-a-checkout"></span>

## Choose your integration approach

- **Building billing flows in JavaScript or TypeScript?** Start with [`@getvatly/fluent`](/packages/fluent-js/readme). It builds on `@getvatly/sdk` with checkout and subscription builders, customer bindings, and webhook processing. Connect its storage drivers to your database where needed; it does not replace your app's authorization or fulfillment logic. Both packages are **alpha**: use the compatible, exact versions in [installation and configuration](/packages/fluent-js/configuration).
- **Need lower-level JavaScript API access?** Use [`@getvatly/sdk`](/packages/javascript/readme) directly, or through the fluent package's API client for operations without a fluent helper.
- **Building a PHP app?** Start with [`vatly/vatly-fluent-php`](https://github.com/vatly/vatly-fluent-php) for higher-level billing flows, or the [Laravel package](/packages/laravel/readme), which wires fluent for Laravel. Use the [PHP SDK](/packages/php/readme) when you only need the API client. Follow each package's alpha installation guidance.
- **Using another backend language?** Follow the [Quickstart](/guides/quickstart) and choose from the [available packages](/packages). The [Python SDK](https://github.com/vatly/vatly-api-python) is alpha and not yet published on PyPI; follow its repository's installation instructions.
- **Prefer plain HTTP?** Use the [API reference](/api-reference) and [OpenAPI specification](https://docs.vatly.com/openapi.yaml) from any server-side language.

Lovable and Bolt's managed server code uses JavaScript/TypeScript. A separately hosted backend can use another language; Vatly's API does not require JavaScript.

<span id="prepare-your-vatly-account"></span>
<span id="keep-credentials-on-the-server"></span>
<span id="verify-webhooks-before-granting-access"></span>

## Before you connect

1. [Create a Vatly account and get a test API key](https://my.vatly.com) under **Developers » API keys**. Follow the [Quickstart](/guides/quickstart) for account setup and create your test product under **Manage Products**.
2. Keep API keys and webhook secrets **server-side only**, in your backend's secret manager. Never paste them into agent chat, browser code, or frontend environment variables such as `VITE_*` or `NEXT_PUBLIC_*`.
3. Confirm purchases through [verified webhooks](/guides/webhooks), not the success redirect. Your backend must authenticate checkout requests and process repeated deliveries safely. Follow your chosen package's checkout and webhook guides for implementation.

<span id="test-before-publishing"></span>

Complete a [test-mode checkout and webhook flow](/guides/testing) before publishing. Live selling also requires [Vatly approval, product review, and Mollie verification](/introduction#going-live).

## Documentation for your agent

Start with the builder guide and your chosen package's documentation, rather than asking the agent to guess an integration. The [agent-friendly index](https://docs.vatly.com/llms.txt), [full documentation](https://docs.vatly.com/llms-full.txt), and [API reference](https://docs.vatly.com/api-reference) provide the implementation details. Checkout examples live in the package docs; delivery and signature rules live in the [webhook guide](/guides/webhooks).
