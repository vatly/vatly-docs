# Testing

> Test API calls without a network by injecting the SDK's fetch.

Test API calls without a network by injecting the SDK's `fetch`:

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

This fixture tests only customer lookup. Use full resource fixtures for other
operations; SDK types do not validate them at runtime.

## Test your storage boundary

Check the [storage contracts](/packages/fluent-js/coreconcepts): uniqueness under concurrency,
test/live separation, omitted versus null updates, and a declined `store`.

For [webhooks](/packages/fluent-js/webhooks), test valid, invalid, stale, and rotated signatures
using an independent HMAC signer. Concurrent copies must commit once. A failed
reaction must roll back rows, audit markers, and outbox work, then succeed on retry.
Also test unknown events and out-of-order snapshots. Keep timestamp checks enabled.

## Live test-mode workflow

1. Set `VATLY_API_KEY` to a real `test_` key. Use customer and catalogue IDs from
its storefront and mode. Test keys do not create real charges.
2. Expose your local webhook route through an HTTPS tunnel. Register the public
URL and save its signing secret as `VATLY_WEBHOOK_SECRET`.
3. Pay through a [hosted checkout](/packages/fluent-js/checkouts). Save the checkout/order IDs and
confirm signed `checkout.paid` and `order.paid` deliveries.
4. Check duplicate and failed deliveries. Delete or disable temporary endpoints
before closing the tunnel; record any resources you create.

`vatly.testHelpers()` exposes `advanceRenewal`, `forceRenewalPaid`,
`forceRenewalFailed`, `forceOrderPaymentPaid`, `forceOrderPaymentFailed`, and the
SDK-style `fastForwardRenewal`/`simulateOrderPayment`. These mutate account data.
Use them only with permission and disposable test resources, not existing
subscriptions or orders just because the key is in test mode.

## Test your edge runtime

For edge hosts, also run your app in the local edge runtime with its storage adapter.
Node tests alone do not check edge compatibility.

See the [testing guide](https://docs.vatly.com/guides/testing) and
[Test Helpers API reference](https://docs.vatly.com/api-reference/test-helpers).
