# Checkouts

> Vatly JavaScript packages - Checkouts

Create a hosted payment page, then redirect the customer to `checkout.getUrl()`.
Use a customer already authorized for the caller. API-only builders need no local
storage, but creating/binding that customer and processing webhooks may need it.

## One-off or mixed purchases

```ts
import type { Vatly } from '@getvatly/fluent';

export async function buyProduct(
  vatly: Vatly, customerId: string, productId: string, purchaseId: string,
) {
  const checkout = await vatly.checkoutBuilder({ vatlyId: customerId })
    .withItems([{ id: productId, quantity: 2 }])
    .withMetadata({ purchaseId })
    .withLocale('en_US')
    .create({}, { idempotencyKey: `checkout:${purchaseId}` });
  return { id: checkout.id, url: checkout.getUrl() };
}
```

Configure success and cancellation redirect URLs on `Vatly` or override them
with `withRedirectUrlSuccess(url)` and `withRedirectUrlCanceled(url)`. Both are
required. Product IDs, plan IDs, customer IDs, and keys must share mode/storefront.
Use `withItems` for mixed carts; it appends the supplied items.

## Subscription checkout

```ts
import type { Vatly } from '@getvatly/fluent';

export async function startSubscription(
  vatly: Vatly, customerId: string, planId: string, purchaseId: string,
) {
  return vatly.subscribe({ vatlyId: customerId })
    .toPlan(planId)
    .withQuantity(3)
    .withTrialDays(14)
    .create({}, { idempotencyKey: `subscribe:${purchaseId}` });
}
```

`subscribe` returns a builder, not a subscription and not a network request.
`create()` creates a checkout; payment and subscription events arrive later.
`withTrialEndsAt(date)` is an alternative to days: it rounds up to whole days.
Quantity and trial days must be positive safe integers. Omit trial methods for
no trial. The subscription builder uses its single plan item; use the general
checkout builder rather than `withItems` on a subscription builder for mixed carts.

## Payloads, retries, and authorization

Builders are mutable, per-purchase objects. `payload(overrides?)` returns a detached
request snapshot without making a call. `create(overrides?, requestOptions?)` returns
the full SDK checkout with `getUrl()`. Direct `vatly.api.checkouts.create()` returns
a plain resource; read `links.checkoutUrl.href` there.

Each create is a new mutation unless you reuse a stable idempotency key for the
same purchase. Persist the purchase ID/key before calling the API. Reuse it after
network failures; generate a new one for a new purchase. Avoid user-supplied
unvalidated overrides for price, product, customer, or redirect fields.

`inTestmode()` and `inLiveMode()` assert that the SDK key matches the requested
mode; they do not change it. An email-only profile does not create a customer.
Use [customer bindings](/packages/fluent-js/customers) first, or omit the profile for an anonymous
checkout where supported by the API.

Persist your checkout ID for correlation. Grant access only after
[verified webhooks](/packages/fluent-js/webhooks), not because the user visits your success page.
For product and checkout fields, see the [Checkouts API reference](https://docs.vatly.com/api-reference/checkouts)
and [Subscription Plans](https://docs.vatly.com/api-reference/subscription-plans).
