# Build your own integration

> Understand what adopting Vatly involves: responsibilities, checkout and fulfillment, choosing an integration path, and preparing your developer or AI agent.

You do not need to build a payment form or your own tax and invoicing workflow to sell with Vatly. Vatly is the European merchant of record for AI, software and digital products: it acts as the legal seller and provides hosted checkout. Your app delivers the product and controls access.

This guide helps you decide what to connect before writing code or asking an agent to implement it. Whether a developer or an AI agent does the work, the responsibilities are the same.

## Choose your starting point

- **Using Lovable or Bolt?** Follow the [Lovable](/integrations/lovable) or [Bolt](/integrations/bolt) guide for the setup in your platform and a ready-to-use agent prompt. Find platform-specific instructions under [Integrations](/integrations).
- **Connecting your own app?** Continue below to plan the integration and choose the right implementation documentation.
- **Ready to make an API request?** The [Quickstart](/guides/quickstart) covers your first authenticated call. It is a technical first step, not a complete payment integration.

## What Vatly handles, and what stays in your app

<table>
<thead>
  <tr>
    <th>
      Vatly handles
    </th>
    
    <th>
      Your app handles
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Being the legal seller, including tax and customer invoicing for Vatly sales
    </td>
    
    <td>
      Your software or digital product, customer accounts, and support for your product
    </td>
  </tr>
  
  <tr>
    <td>
      The hosted checkout and payment flow
    </td>
    
    <td>
      Your pricing UI and the decision about which products a customer can buy
    </td>
  </tr>
  
  <tr>
    <td>
      Billing events, including payments and subscription changes
    </td>
    
    <td>
      Delivering downloads, activating licenses, or granting and updating access
    </td>
  </tr>
  
  <tr>
    <td>
      A hosted customer portal for eligible customers
    </td>
    
    <td>
      Authenticating the customer and opening their portal session securely
    </td>
  </tr>
</tbody>
</table>

Portal access requires an issued invoice. See the [customer portal documentation](/packages/fluent-js/customerportal). Your existing login and database can remain in place; adding Vatly does not require replacing them.

## What a purchase looks like

1. A customer chooses a product or plan in your app.
2. Your backend checks what that customer can buy and asks Vatly to create a checkout. The API key stays on your server.
3. Your app sends the customer to Vatly's hosted checkout to pay, then shows a return page in your app.
4. Vatly sends a signed notification, called a webhook, to your backend. Your app verifies it before recording the purchase and delivering access.
5. For subscriptions, your app keeps access in step with renewals, cancellations, and other billing changes. Refunds and disputes also need an access policy.

The return page is not proof of payment. A customer may close the checkout tab or visit the return URL directly; delivery must depend on the verified billing result, not that browser visit. The [Selling Workflow](/guides/selling-workflow) walks through the sale lifecycle in more detail.

## Prepare a test integration

[Create a Vatly account](https://my.vatly.com), get a `test_` key under **Developers » API keys**, and create a test product under **Manage Products**. Choose a one-off product for a single purchase or a subscription plan for recurring access. Keep the key, products, and customers in the same storefront and mode.

Your app needs a deployed backend that can call Vatly privately, receive HTTPS webhooks, and store billing state. A frontend-only site needs a backend or server functions for these tasks. Store API keys and webhook signing secrets in that backend's secret manager—not browser code, frontend environment variables, or agent chat.

Test mode is available before going live. Your first milestone is one complete test purchase that grants the right customer access, not a finished billing dashboard.

## Choose your tools

For app-level billing, start with a fluent package rather than assembling every flow from low-level API calls:

- **JavaScript / TypeScript:** [`@getvatly/fluent`](/packages/fluent-js/readme) builds on `@getvatly/sdk` with checkout and subscription builders, customer bindings, and webhook processing. Follow [configuration](/packages/fluent-js/configuration) for compatible versions and runtime requirements.
- **PHP:** [PHP Fluent](/packages/fluent-php/webhook-flow) provides higher-level billing flows. The [Laravel package](/packages/laravel/readme) wires fluent for Laravel.
- **Python:** [Python Fluent](/packages/fluent-python/readme) provides async-first billing flows and storage contracts. The [Django package](/packages/django/readme) integrates fluent with Django's ORM and webhook handling. Both are available on PyPI.
- **Direct API access:** Use the matching [SDK](/packages) when you only need the API client, or the [HTTP API](/api-reference) from another server-side language. The [Python SDK](/packages/python/readme) is available on PyPI as `vatly-api-python` (import `vatly`).

The JavaScript, Python, Django and PHP fluent packages are **alpha**. Every alpha release may include breaking changes. Pin exact versions during alpha. Follow each package's installation guidance and review upgrades. Fluent packages provide building blocks, not your app's access policy or a database integration that configures itself: your developer or agent must wire the required storage drivers and authorization checks.

## Hand off a clear brief

Give your developer or agent the decisions that belong to your business:

- Which products or plans you will sell, and what each purchase unlocks.
- Which existing login, database, and deployed backend to use.
- Where customers should return after completing or canceling checkout.
- How access should change after a renewal, cancellation, refund, or dispute.

Ask them to follow the chosen package's checkout and webhook documentation, and to show you the deployed checkout flow and webhook URL. Secrets should be entered through the host's secure secret form, never included in the brief. Agents can use the [documentation index](https://docs.vatly.com/llms.txt), [API reference](/api-reference), and [OpenAPI specification](https://docs.vatly.com/openapi.yaml) to check implementation details.

## Know when you are ready to sell

Before switching to live credentials, review the integration as a customer:

- A completed test purchase grants the right access; a canceled checkout or a visit to the return URL alone does not.
- Customers cannot buy on another user's account or grant themselves access through the browser.
- Repeated webhook deliveries do not fulfill a purchase twice, invalid signatures are rejected, and failed processing can retry.
- Subscription and post-payment changes follow the access policy you chose.

Your implementer can use the [webhook guide](/guides/webhooks), [test-mode guide](/guides/testing), and package-specific tests for these checks. Live selling also requires [Vatly approval, product review, and Mollie verification](/introduction#going-live). A working test integration is not a guarantee of a go-live date.
