# Customers and bindings

> Vatly JavaScript packages - Customers and bindings

Bind your authenticated user or organization to a Vatly customer before starting
a checkout. These examples assume [configured binding storage](/packages/fluent-js/coreconcepts).

## Create and bind

```ts
import type { Vatly } from '@getvatly/fluent';

export async function customerFor(vatly: Vatly, hostId: string, email: string) {
  const existing = await vatly.customers.findByHostCustomerId(hostId);
  if (existing) return existing;
  return vatly.customers.createFor(
    hostId,
    { email, name: 'Example Customer' },
    { metadata: { accountId: hostId } },
    { idempotencyKey: `customer-for:${hostId}` },
  );
}
```

`createFor` rejects an already-bound host. The API may return an existing customer
for an email rather than creating one; Fluent still checks the binding before
attaching it. Concurrent requests need database uniqueness constraints. A binding
failure cannot roll back remote customer creation: reconcile the customer before
retrying instead of repeatedly creating identities.

For a Vatly customer you already verified belongs to the user, call
`vatly.customers.attribute(vatlyId, hostId)`. To create without a host owner, use
`createUnattributed(profile, extra?, requestOptions?)`; it still needs `bindings`
to record the returned ID.

## Read and update identity

```ts
import type { Vatly } from '@getvatly/fluent';

export async function updateIdentity(vatly: Vatly, customerId: string) {
  const customer = vatly.customer(customerId);
  await customer.update({ name: null }); // Explicitly clear the display name.
  await customer.sync();                // Refresh the cached API resource.
  return customer.identity();          // { name, email }
}

export async function matchingCustomers(vatly: Vatly, email: string) {
  const ids: string[] = [];
  for await (const customer of vatly.customers.findByEmail(email)) ids.push(customer.id);
  return ids;
}
```

Handles fetch lazily and cache per handle. `model()` returns the SDK customer;
`name()` and `email()` read that model. Email matching is server-side and traverses
cursor pages. `findOneByEmail` returns the first match or null, not a uniqueness
guarantee or proof of ownership. Updating identity does not change invoice addresses;
use the [billing-update flow](/packages/fluent-js/subscriptions#update-billing-details).

## Returning from checkout

`customerIdFromCheckout(checkoutId)` returns an ID or null for a missing customer
or 404; other API errors propagate. `claimCustomerFromCheckout(checkoutId, hostId)`
binds that customer, but only call it **after** your host verifies checkout ownership.
A checkout ID in the return URL is not proof. Signed payment webhooks, not the return
page, determine payment status.

See [customer portal](/packages/fluent-js/customerportal) for portal links and the
[Customers API reference](https://docs.vatly.com/api-reference/customers) for field details.
