# Getting Started

> Vatly JavaScript packages - Getting Started

> **Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

`@getvatly/fluent` adds checkout builders, customer bindings, subscription and
order handles, and webhook processing to `@getvatly/sdk`. Your application owns
authentication, database tables, and background jobs. No framework or ORM is required.

These guides target **Fluent 0.1.0-alpha.1 with SDK 0.3.0-alpha.2**:

```sh
npm install --save-exact @getvatly/sdk@0.3.0-alpha.2 @getvatly/fluent@0.1.0-alpha.1
```

## Start here

1. [Installation and configuration](/packages/fluent-js/configuration): server-only setup, API keys,
redirects, errors, and runtime support.
2. [Core concepts and storage](/packages/fluent-js/coreconcepts): billables, bindings, repositories,
and adapting your existing tables.
3. [Customers and bindings](/packages/fluent-js/customers): create or link a customer to your user.
4. [Checkouts](/packages/fluent-js/checkouts): one-off purchases, subscriptions, trials, and retries.
5. [Webhooks](/packages/fluent-js/webhooks): verify deliveries and commit billing changes safely.

## Manage billing

- [Subscriptions](/packages/fluent-js/subscriptions): swap, cancel, resume, and update billing.
- [Customer portal](/packages/fluent-js/customerportal): issue a single-use portal link for a user.
- [Orders and invoices](/packages/fluent-js/orders): invoice links, order lines, refunds, and money.
- [Testing](/packages/fluent-js/testing): isolated tests, test-mode checkouts, and webhook delivery.
- [Porting from PHP](/packages/fluent-js/porting): map PHP concepts to the TypeScript API.

## First checkout

Run this on your server with a customer and product from the same storefront and
API-key mode. Authenticate the caller and authorize their customer before using it.

```ts
import { VatlyClient } from '@getvatly/sdk';
import { Vatly } from '@getvatly/fluent';

export async function startCheckout(apiKey: string, customerId: string, productId: string) {
  const vatly = new Vatly({
    api: new VatlyClient({ apiKey }),
    redirectUrlSuccess: 'https://app.example.com/billing/return',
    redirectUrlCanceled: 'https://app.example.com/billing/canceled',
  });
  const checkout = await vatly.checkoutBuilder({ vatlyId: customerId })
    .withItems([{ id: productId, quantity: 1 }])
    .create();
  return checkout.getUrl(); // Redirect the customer's browser to this URL.
}
```

A return-page visit is not payment confirmation. Use verified webhooks to grant
access, record payment, and update subscriptions. API-only checkout creation needs
no local repositories; webhook persistence does.

For field details, see the [API reference](https://docs.vatly.com/api-reference).
The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.
