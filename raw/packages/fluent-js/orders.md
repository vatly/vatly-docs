# Orders and invoices

> Vatly JavaScript packages - Orders and invoices

An order records a purchase and its tax breakdown. Use a verified `order.paid`
event to persist it or trigger fulfillment, not a checkout return-page visit.
Authorize the order's customer before showing an invoice or allowing any mutation.

## Read the order and invoice

```ts
import type { Vatly } from '@getvatly/fluent';

export async function invoice(vatly: Vatly, orderId: string) {
  const order = vatly.order(orderId);
  const model = await order.model();
  return {
    id: model.id,
    status: model.status,
    total: model.total,
    lines: await order.lines(),
    invoiceUrl: await order.invoiceUrl(),
  };
}
```

The order handle fetches from the API lazily and caches per handle. `sync()`
refreshes it. `invoiceUrl()` returns a URL or null when the invoice link is absent.
`lines()` returns full SDK order lines; it does not require a separate line repository.
`vatly.order(id)` does not require local order storage for these API reads.

## Money and reversals

Money values stay decimal strings with their currency; do not use floating-point
arithmetic for totals. SDK `toMinorUnits` returns a `bigint` for integer-unit math.

```ts
import { toMinorUnits } from '@getvatly/sdk';
import type { Vatly } from '@getvatly/fluent';

export async function reversalSummary(vatly: Vatly, orderId: string) {
  const order = vatly.order(orderId);
  const model = await order.model();
  return {
    totalMinor: toMinorUnits(model.total),
    reversedMinor: await order.reversedSubtotal(),
    refundableMinor: await order.refundableSubtotal(),
    fullyReversed: await order.isFullyReversed(),
    partiallyReversed: await order.isPartiallyReversed(),
  };
}
```

Serialize bigints explicitly (for example, as strings) before returning JSON.
`isReversed()` includes partial reversals. These predicates read the live API
snapshot, not the optional local lists. A paid order remains paid after a reversal;
Fluent does not invent a refunded order status.

`order.refunds()` and `order.chargebacks()` read your wired reversal repositories.
They return an empty list if the respective driver is absent, not a remote API
query. To create a refund or list remote reversals, use the SDK through
`vatly.api.orders` and `vatly.api.refunds`; use [webhooks](/packages/fluent-js/webhooks) to persist
resulting changes. Reconcile API state before retrying any ambiguous refund request.

For fields and refund rules, see [Orders](https://docs.vatly.com/api-reference/orders),
[Order Refunds](https://docs.vatly.com/api-reference/refunds), and
[Chargebacks](https://docs.vatly.com/api-reference/chargebacks) in the API reference.
