# Testing

> Vatly JavaScript packages - Testing

Use isolated tests for your application and driver contracts, then a test-mode
account for hosted checkout and real webhook delivery. A passing mocked test
does not establish live API or payment-provider behavior.

## An isolated API call

Inject the SDK's `fetch` rather than maintaining a second fake billing API.
This executable example uses no credentials and makes no network request:

```ts
import { VatlyClient } from '@getvatly/sdk';
import { Vatly } from '@getvatly/fluent';

export async function testCheckoutLookup() {
  const vatly = new Vatly({
    api: new VatlyClient({
      apiKey: 'test_local_fixture_not_a_real_key',
      maxRetries: 0,
      fetch: async (input, init) => {
        if (new URL(String(input)).pathname !== '/v1/checkouts/checkout_fixture'
          || init?.method !== 'GET') throw new Error('Unexpected request');
        return new Response(JSON.stringify({ customerId: 'customer_fixture' }), {
          headers: { 'content-type': 'application/json' },
        });
      },
    }),
  });
  const id = await vatly.customerIdFromCheckout('checkout_fixture');
  if (id !== 'customer_fixture') throw new Error('Incorrect customer');
}
```

That minimal response tests only the lookup; use full resource fixtures when
testing other behavior. SDK types are not runtime validation of your fixture.

## Test your storage boundary

Exercise database uniqueness for customer bindings and Vatly IDs, both modes,
partial updates that omit fields versus explicitly clear them, and a `store`
that deliberately returns null. For webhook processing, test:

- Valid, invalid, stale, and rotated signatures over the original bytes.
- Concurrent copies of one signed event: exactly one committed processing run.
- Failure midway through a reaction: no partial rows, audit marker, or outbox;
a retry must complete successfully.
- Unknown signed event names: retained and dispatched without built-in writes.
- Out-of-order subscription/order snapshots and reconciliation policy.

Use an independent HMAC signer in tests, not the verification function under test
to derive the expected signature. Keep production timestamp checks enabled.

## Live test-mode workflow

1. Use a real `test_` key in `VATLY_API_KEY`, with customers and catalogue IDs
from that same storefront/mode. Test keys do not create real charges.
2. Run your server locally. Expose only its webhook route with an HTTPS tunnel,
register that public URL as a webhook endpoint, and store its signing secret
as `VATLY_WEBHOOK_SECRET`. A Vatly server cannot call your localhost directly.
3. Create a checkout and pay through the hosted test flow. Retain checkout/order
IDs and inspect verified `checkout.paid` and `order.paid` deliveries.
4. Confirm duplicate delivery is harmless and failed work stays retryable. Do not
infer payment from a redirect alone. Delete or disable temporary endpoints
before closing a tunnel; keep a record of test resources you create.

`vatly.testHelpers()` exposes `advanceRenewal`, `forceRenewalPaid`,
`forceRenewalFailed`, `forceOrderPaymentPaid`, `forceOrderPaymentFailed`, and the
SDK-style `fastForwardRenewal`/`simulateOrderPayment`. **These mutate account data.**
Use only with explicit permission and disposable test resources, never existing
subscriptions/orders just because a key is in test mode. Mode assertions on a
checkout builder do not turn a live key into a test key.

## Run this package's checks

```sh
pnpm install --frozen-lockfile
pnpm check
```

The suite checks the public Fluent API through the installed SDK. For an edge host,
run your application in its local edge runtime too; Node tests alone do not establish
edge compatibility. Verify Fetch/Web Crypto and your storage adapter's runtime support.

See the [testing guide](https://docs.vatly.com/guides/testing) and
[Test Helpers API reference](https://docs.vatly.com/api-reference/test-helpers).
