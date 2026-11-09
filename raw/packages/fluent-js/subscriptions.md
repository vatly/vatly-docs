# Subscriptions

> Vatly JavaScript packages - Subscriptions

Start a subscription through a [checkout](/packages/fluent-js/checkouts). To manage one locally,
pass a `LocalSubscription` from your host repository to `vatly.subscription(record)`.
Wire the same `subscriptions` repository into `Vatly`; swap, resume, and sync write
through it. Authorize the record against the signed-in customer before every action.

## Change plan or quantity

These are separate actions; invoke the one that matches your billing policy.

```ts
import type { LocalSubscription, Vatly } from '@getvatly/fluent';

export async function schedulePlan(vatly: Vatly, local: LocalSubscription, planId: string) {
  return vatly.subscription(local).swap(planId, { quantity: 2 });
}

export async function changeAndInvoice(vatly: Vatly, local: LocalSubscription, planId: string) {
  return vatly.subscription(local).swapAndInvoice(planId, { quantity: 2 });
}

export async function changeWithoutCharge(vatly: Vatly, local: LocalSubscription, planId: string) {
  return vatly.subscription(local).swapWithoutCharge(planId);
}
```

`swap(planId, body?, requestOptions?)` forwards the SDK update options. Without
`applyImmediately`, the API's scheduled-change behavior applies. `swapAndInvoice`
forces `applyImmediately: true` and `invoiceImmediately: true`;
`swapWithoutCharge` forces `applyImmediately: true` and `prorationCharge: false`.
Read the API's proration rules before choosing a policy.

The handle updates local plan and quantity from the returned resource, not from
the request. A scheduled swap therefore leaves the current local plan unchanged.
`scheduledUpdate()` reads the pending change from the API; `hasScheduledUpdate()`
returns whether one exists. Other plan properties stay on the SDK resource.

## Cancel and resume

```ts
import type { LocalSubscription, Vatly } from '@getvatly/fluent';

export async function cancelNow(vatly: Vatly, local: LocalSubscription, operationId: string) {
  await vatly.subscription(local).cancel({
    immediately: true,
    idempotencyKey: `cancel:${operationId}`,
  });
}

export async function resume(vatly: Vatly, local: LocalSubscription) {
  const handle = await vatly.subscription(local).resume();
  return handle.model();
}
```

Use `cancel()` for the API's default cancellation timing. Cancellation does not
speculatively set local `endsAt`; verified cancellation webhooks update it. Resume
uses the API response and clears local `endsAt`. API eligibility still applies.
`cancellationReason()` fetches the remote reason. `sync()` fetches the resource,
persists it, and derives `endsAt` from `endedAt ?? canceledAt` for reconciliation.

`model()` is the handle's local record, not an implicit API fetch. `state()` derives
`active`, `valid`, `recurring`, `cancelled`, `onGracePeriod`, and `ended` from `endsAt`
using PHP-compatible rules. These are not a substitute for Vatly's `status`:
for example, a paused remote subscription is not represented by those predicates.

## Update billing details

```ts
import type { LocalSubscription, Vatly } from '@getvatly/fluent';

export async function billingUpdateUrl(vatly: Vatly, local: LocalSubscription) {
  return vatly.subscription(local).updateBilling({
    redirectUrlSuccess: 'https://app.example.com/billing/updated',
    redirectUrlCanceled: 'https://app.example.com/billing/canceled',
  });
}
```

Redirect the customer to the returned URL. It is an on-demand hosted flow, not a
direct write of invoice-address fields. Both redirect URLs are required, either
here or in global wiring. Do not log or persist the returned billing URL.
Handle `subscription.billing_updated` to reconcile local payment details.

For all options, eligibility, and fields, see the
[Subscriptions API reference](https://docs.vatly.com/api-reference/subscriptions).
