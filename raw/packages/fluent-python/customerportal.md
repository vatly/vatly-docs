# Customer portal

> Vatly Python Fluent - Customer portal

After authorizing the customer ID, call
`await vatly.customer(id).portal_session({"returnUrl": "https://app.example.com/billing"})`
using the production API's request fields. An empty `{}` body is also supported.
Redirect to `session.url`. It is short-lived/single-use; never log it or use it as
a permanent account URL. Errors propagate from the SDK without wrapping.

Do not accept arbitrary Vatly customer IDs from the browser. Look up the customer's
binding for the authenticated billable and tenant/storefront/mode first.
For subscription invoice-address updates, `subscription(local).update_billing()`
returns a hosted URL with success/cancellation redirects.
