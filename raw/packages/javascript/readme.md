# Getting Started

> Vatly JavaScript packages - Getting Started

![Vatly SDK for JavaScript & TypeScript](https://raw.githubusercontent.com/vatly/vatly-api-js/main/art/banner.png)

> **Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

Official TypeScript SDK for the Vatly Merchant of Record API. Handle checkouts, subscriptions, one-off payments, EU VAT compliance, and billing for your SaaS — on Node, Cloudflare Workers, Vercel Edge, Deno, and Bun.

> **Looking for the exact field list?** These guides cover the common paths. The authoritative, machine-readable schema for every endpoint lives in the [OpenAPI spec](https://docs.vatly.com/openapi.yaml) — point your AI assistant or codegen tooling at it when an example leaves a field ambiguous.

## Installation

Install the alpha once published (package name is `@getvatly/sdk`, not the GitHub organization).

```bash
npm install @getvatly/sdk@alpha
# or: pnpm add @getvatly/sdk@alpha / yarn add @getvatly/sdk@alpha
```

The package ships ESM + CommonJS builds and its own TypeScript types. It uses the
platform `fetch` and Web Crypto — no `axios`, `node-fetch`, or `node:crypto` — so
the same code runs everywhere modern JavaScript runs.

## Quick start

Initialize the client with your API key and create a checkout.

### API Keys

Get your API keys from the [Vatly Dashboard](https://my.vatly.com) under **Settings > API**.

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        live_
      </code>
    </td>
    
    <td>
      <code>
        prefix
      </code>
    </td>
    
    <td>
      Production transactions, real charges.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        test_
      </code>
    </td>
    
    <td>
      <code>
        prefix
      </code>
    </td>
    
    <td>
      Sandbox testing, no real charges.
    </td>
  </tr>
</tbody>
</table>

The client validates the key format at construction and exposes the detected
mode on `client.mode` (`"live"` or `"test"`).

```ts
import { VatlyClient } from "@getvatly/sdk";

const vatly = new VatlyClient({
  apiKey: process.env.VATLY_API_KEY, // live_… or test_…
});

// Create a checkout
const checkout = await vatly.checkouts.create({
  redirectUrlSuccess: "https://yourapp.com/success",
  redirectUrlCanceled: "https://yourapp.com/canceled",
  products: [{ id: "subscription_plan_abc123", quantity: 1 }],
});

// Redirect the customer to the hosted checkout page
console.log(checkout.links.checkoutUrl.href);
```

On Node, `VATLY_API_KEY` is read from `process.env` as a fallback. On edge
runtimes without `process`, pass `apiKey` explicitly.

## Idempotency

The SDK automatically attaches an `Idempotency-Key` header to every `POST`,
`PATCH`, and `DELETE` request (a UUID v4). Checkout creation, subscription
updates, and refund cancellations are protected out of the box, and the key is
reused across automatic retries so a retried call is deduped server-side.

### Override the key per call

Pass `idempotencyKey` in the request options when you have your own request ID:

```ts
await vatly.checkouts.create(body, { idempotencyKey: "checkout-create-123" });

await vatly.subscriptions.update("subscription_123", { quantity: 2 }, {
  idempotencyKey: "subscription-update-123",
});
```

### Custom generator or disable auto-generation

```ts
// Custom generator (e.g. tie keys to a tracing span)
new VatlyClient({ idempotencyKeyGenerator: () => span.context().traceId });

// Disable entirely — caller must supply opts.idempotencyKey for retries to work
new VatlyClient({ idempotencyKeyGenerator: false });
```

## Retries

GETs and keyed mutations retry `429`, `5xx`, timeouts, and network failures
with exponential backoff and jitter (default `maxRetries: 2`), honoring
`Retry-After`. Keyed `409` errors retry only when
`details.idempotency_outcome` is `in_progress`. An `unknown` outcome requires
reading/reconciling the resource before any further mutation.

## Pagination

List endpoints are cursor-paginated. Use `list()` for a single page or
`listAll()` to walk every page with `for await`:

```ts
const page = await vatly.orders.list({ limit: 25 });

for await (const order of vatly.orders.listAll({ limit: 100 })) {
  // ...
}
```

## Resources

The SDK provides access to all Vatly API resources. The complete method and
return-type inventory is in the [operation reference](/packages/javascript/api).

<table>
<thead>
  <tr>
    <th>
      Resource
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="/packages/javascript/checkouts">
        Checkouts
      </a>
    </td>
    
    <td>
      Create hosted payment pages
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/customers">
        Customers
      </a>
    </td>
    
    <td>
      Manage customer records
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/subscriptions">
        Subscriptions
      </a>
    </td>
    
    <td>
      Recurring billing
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/subscriptionplans">
        Subscription Plans
      </a>
    </td>
    
    <td>
      Define subscription products
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/oneoffproducts">
        One-Off Products
      </a>
    </td>
    
    <td>
      Single-purchase products
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/orders">
        Orders
      </a>
    </td>
    
    <td>
      Transaction records
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/refunds">
        Refunds
      </a>
    </td>
    
    <td>
      Process refunds
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/chargebacks">
        Chargebacks
      </a>
    </td>
    
    <td>
      Handle disputes
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/packages/javascript/webhooks">
        Webhooks
      </a>
    </td>
    
    <td>
      Endpoint management and real-time event notifications
    </td>
  </tr>
</tbody>
</table>

## Error handling

Every non-2xx response maps to a typed error extending `VatlyError`.

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Status
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        VatlyAuthError
      </code>
    </td>
    
    <td>
      <code>
        401
      </code>
    </td>
    
    <td>
      Missing or invalid API key.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VatlyForbiddenError
      </code>
    </td>
    
    <td>
      <code>
        403
      </code>
    </td>
    
    <td>
      Authenticated but not allowed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VatlyNotFoundError
      </code>
    </td>
    
    <td>
      <code>
        404
      </code>
    </td>
    
    <td>
      Resource does not exist.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VatlyConflictError
      </code>
    </td>
    
    <td>
      <code>
        409
      </code>
    </td>
    
    <td>
      Conflict; inspect <code>
        .details
      </code>
      
       and <code>
        .retryAfter
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VatlyValidationError
      </code>
    </td>
    
    <td>
      <code>
        422
      </code>
    </td>
    
    <td>
      Invalid request; exposes <code>
        .errors: Record<string, string[]>
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VatlyRateLimitError
      </code>
    </td>
    
    <td>
      <code>
        429
      </code>
    </td>
    
    <td>
      Rate limited; exposes <code>
        .retryAfter
      </code>
      
       (seconds).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VatlyApiError
      </code>
    </td>
    
    <td>
      other
    </td>
    
    <td>
      Any other API error.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VatlyConnectionError
      </code>
      
       / <code>
        VatlyTimeoutError
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Network failure / timeout.
    </td>
  </tr>
</tbody>
</table>

```ts
import { VatlyValidationError } from "@getvatly/sdk";

try {
  await vatly.customers.create({ email: "" });
} catch (err) {
  if (err instanceof VatlyValidationError) {
    console.error(err.errors.email);
  } else {
    throw err;
  }
}
```

## Money

Monetary amounts are `Money` objects — `{ value, currency }` where `value` is a
**decimal string** to preserve precision. Never coerce `value` to a JavaScript
`number`. Helpers convert to/from integer minor units:

```ts
import { toMinorUnits, fromMinorUnits } from "@getvatly/sdk";

toMinorUnits({ value: "29.00", currency: "EUR" }); // → 2900n
fromMinorUnits(2900n, "EUR");                       // → { value: "29.00", currency: "EUR" }
```

## Requirements

- Node 20+, Cloudflare Workers, Vercel Edge, Deno, or Bun
- Platform `fetch` and Web Crypto (built in on all supported runtimes)
