# Orders and reversals

> Vatly Python Fluent - Orders and reversals

`vatly.order(id).model()` lazily fetches one complete Order. `sync()` refreshes;
`lines()` shares the cached model; `invoice_url()` reads the invoice link.
`reversed_subtotal()`/`refundable_subtotal()` return exact `Decimal` currency-unit
amounts. `is_reversed`, `is_fully_reversed` and `is_partially_reversed` derive from
both totals. Do not use float arithmetic for money.

`refunds()` and `chargebacks()` read optional local repositories or return an empty
list. To mutate refunds or read any unsupported operation, use `vatly.api.orders`
and `vatly.api.refunds` directly. Signed reversal snapshots preserve taxes,
metadata, original-order references and mode. Their ownership follows the original
order's host checkout link; `entityType=order` does not make a chargeback an Order.
