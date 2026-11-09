# Customer portal

> Vatly JavaScript packages - Customer portal

Issue a portal session from an authenticated server route. Look up the Vatly
customer from your own user binding; do not take a raw customer ID from the browser.

```ts
import type { Vatly } from '@getvatly/fluent';

export async function portalUrl(vatly: Vatly, authenticatedHostId: string) {
  const customer = await vatly.customers.findByHostCustomerId(authenticatedHostId);
  if (!customer) return null;
  const session = await vatly.customer(customer.id).portalSession({
    returnUrl: 'https://app.example.com/account/billing',
  });
  return session.url;
}
```

Redirect the customer's browser to that URL and use `Cache-Control: no-store`
on your route's response. The session is a short-lived, single-use credential;
never log it, cache it, or store it in the user's record. If a consumed link is
replayed through an idempotency key, request a new session with a fresh key.

The portal lets eligible customers view invoices and manage subscriptions in
the API key's storefront and mode. A one-off buyer can use invoice history too.
Customers need an eligible issued invoice; a subscription alone does not grant
access. The API returns 404 for an ineligible customer. Handle that case by showing
your own billing page instead of repeatedly requesting sessions.

The `returnUrl` is an HTTPS return link, not an automatic redirect. Portal sessions
are scoped to the customer and storefront; they do not expose a storefront picker.
To update subscription billing directly, see [subscriptions](/packages/fluent-js/subscriptions#update-billing-details).

For eligibility and response fields, see
[Create a customer portal session](https://docs.vatly.com/api-reference/customers#create-a-customer-portal-session).
