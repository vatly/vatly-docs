---
title: "Integrations"
description: "Use Vatly as merchant of record in AI-built apps. Connect Lovable or Bolt to hosted checkout, subscriptions, and verified webhooks."
---

Vatly works with apps built using AI app builders through its existing HTTP API and SDKs. Vatly is the merchant of record: the legal seller that handles payments, tax, and compliance for your software or digital products. Your app creates a hosted checkout and uses verified webhooks to deliver the purchase.

These are custom API integrations, not native Lovable or Bolt connectors. No Vatly-side platform changes are required.

## Choose your builder

| Builder | Start here |
| --- | --- |
| Lovable | [Lovable payments with Vatly](/integrations/lovable): TanStack Start server functions, older React + Vite apps, and Lovable Cloud or Supabase secrets. |
| Bolt.new | [Bolt payments with Vatly](/integrations/bolt): Bolt Cloud server functions, database secrets, and existing Supabase projects. |

The builder pages explain where the code runs and include prompts to paste into the agent. The shared recipe below applies to any server-side language: choose JavaScript, PHP, Python, or plain HTTP in the code tabs.

::note
Lovable and Bolt generate JavaScript/TypeScript apps and server code, so use the JavaScript examples in their managed backends. The PHP and Python examples are for a separately hosted backend or another app; you do not need JavaScript to use Vatly's API.
::

## Prepare your Vatly account

1. Create an account at [Vatly](https://my.vatly.com) and get a `test_` API key under **Developers » API keys**.
2. Create a product under **Manage Products**. Use a `one_off_product_…` ID for a single purchase or a `subscription_plan_…` ID for recurring access.
3. Keep the key and all product and customer IDs in the same storefront and mode.
4. Choose your app's success and canceled URLs. Keep these in server configuration, not in browser-supplied request data.

Test mode is available before going live. Live selling also requires Vatly approval, product review, and verification of your connected Mollie account. See [Going live](/introduction#going-live) and the [selling workflow](/guides/selling-workflow).

## Keep credentials on the server

Store `VATLY_API_KEY` in your backend's secret manager. Store a separate `VATLY_WEBHOOK_SECRET` there for the webhook endpoint. Never put either value in browser code, chat prompts, local storage, a committed file, or a frontend environment variable such as `VITE_*` or `NEXT_PUBLIC_*`.

The browser calls **your app's backend**; only that backend calls Vatly. Never import the Vatly client into a frontend component. Return only the checkout URL and any non-sensitive identifiers your UI needs, not API credentials or full customer records. Keep database service-role credentials server-side too.

<span id="create-a-checkout-with-the-javascript-sdk"></span>

## Create a checkout

Choose a client for your backend. The [JavaScript SDK](/packages/javascript/readme) (`@getvatly/sdk`), optional [fluent JavaScript package](/packages/fluent-js/readme) (`@getvatly/fluent`), [PHP SDK](/packages/php/readme) (`vatly/vatly-api-php`), and [Python SDK](https://github.com/vatly/vatly-api-python) (`vatly-sdk`) are **alpha**: releases may break compatibility, so pin exact versions or Git revisions and review upgrades. The Python SDK is **not yet published on PyPI**; install from its repository rather than running an unqualified `pip install vatly-sdk`.

::code-group{sync="integration-client"}

```bash [JavaScript]
npm install --save-exact @getvatly/sdk@0.3.0-alpha.2
```

```bash [PHP]
composer require vatly/vatly-api-php:0.1.0-alpha.32
```

```bash [Python]
# Alpha; not on PyPI. Pin the Git revision you have tested.
python -m pip install \
  "vatly-sdk @ git+https://github.com/vatly/vatly-api-python.git@4be4eaf30bd708707474eb5f3549ac4cb285fd7d"
```

```bash [HTTP/cURL]
# No SDK is required. Use an HTTP client on your server.
curl --version
```

::

JavaScript requires Node 20+ or a supported edge runtime with Fetch and Web Crypto; PHP requires PHP 8+ and the SDK's extensions; Python requires Python 3.10+. For a Deno Edge Function, use `npm:@getvatly/sdk@0.3.0-alpha.2` as the JavaScript import specifier.

These examples show server-only checkout logic, not an unauthenticated HTTP endpoint. Your route must authenticate the user and load their Vatly customer ID from a server-owned mapping first. Create that customer if needed through the [Customers API](/api-reference/customers), then save the association. Never trust a customer ID supplied by the browser.

::code-group{sync="integration-client"}

```ts [JavaScript]
import { VatlyClient } from '@getvatly/sdk';

export async function createCheckout(apiKey: string, customerId: string) {
  const vatly = new VatlyClient({ apiKey });
  const checkout = await vatly.checkouts.create({
    customerId,
    products: [{ id: 'subscription_plan_REPLACE_ME', quantity: 1 }],
    redirectUrlSuccess: 'https://app.example.com/billing/return',
    redirectUrlCanceled: 'https://app.example.com/billing/canceled',
  });
  return { checkoutUrl: checkout.links.checkoutUrl.href };
}
```

```php [PHP]
use Vatly\API\VatlyApiClient;

function createCheckout(string $apiKey, string $customerId): array
{
    $vatly = new VatlyApiClient();
    $vatly->setApiKey($apiKey);
    $checkout = $vatly->checkouts->create([
        'customerId' => $customerId,
        'products' => [['id' => 'subscription_plan_REPLACE_ME', 'quantity' => 1]],
        'redirectUrlSuccess' => 'https://app.example.com/billing/return',
        'redirectUrlCanceled' => 'https://app.example.com/billing/canceled',
    ]);
    return ['checkoutUrl' => $checkout->links->checkoutUrl->href];
}
```

```python [Python]
from vatly import VatlyClient
from vatly.models import CreateCheckoutRequest


def create_checkout(api_key: str, customer_id: str) -> dict[str, str]:
    with VatlyClient(api_key=api_key) as vatly:
        checkout = vatly.checkouts.create(
            CreateCheckoutRequest(
                customer_id=customer_id,
                products=[{"id": "subscription_plan_REPLACE_ME", "quantity": 1}],
                redirect_url_success="https://app.example.com/billing/return",
                redirect_url_canceled="https://app.example.com/billing/canceled",
            )
        )
        return {"checkoutUrl": checkout.links.checkout_url.href}
```

```bash [HTTP/cURL]
# Set VATLY_API_KEY from server secrets and CUSTOMER_ID from the authenticated
# user's server-owned mapping. Use one CHECKOUT_OPERATION_ID per purchase attempt;
# reuse it if you retry that same operation.
curl --fail-with-body https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer $VATLY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $CHECKOUT_OPERATION_ID" \
  --data "{
    \"customerId\": \"$CUSTOMER_ID\",
    \"products\": [{\"id\": \"subscription_plan_REPLACE_ME\", \"quantity\": 1}],
    \"redirectUrlSuccess\": \"https://app.example.com/billing/return\",
    \"redirectUrlCanceled\": \"https://app.example.com/billing/canceled\"
  }"
# The response's links.checkoutUrl.href is the hosted checkout URL.
```

::

Replace the product ID and URLs with your own server-controlled values. Load `VATLY_API_KEY` from your backend's private runtime environment or secret store. For example, use `process.env` on Node, `Deno.env.get` in a Supabase Edge Function, `getenv` in PHP, or `os.environ` in Python. Fail configuration checks if it is absent; never fall back to a browser value. In PHP, load Composer's `vendor/autoload.php` in your app's bootstrap before using the SDK.

Your authenticated route supplies the secret and the current user's customer ID to the checkout logic. If the UI offers several plans, accept an app-level plan name and map it to an allowed Vatly product ID on the server. Validate quantities, rate-limit checkout creation, and protect cookie-authenticated routes against CSRF. For cross-origin Edge Function calls, allow only your app's origins and handle CORS preflight.

The SDK examples return `{ checkoutUrl }` for your route to send to the browser. With HTTP, read `links.checkoutUrl.href` from the JSON response and return the same shape. The browser navigates to that URL. Vatly hosts the payment form; your app does not collect card details. A success redirect is **not proof of payment**. The return page should show a pending state until your backend confirms payment.

See [JavaScript checkouts](/packages/javascript/checkouts), [PHP checkouts](/packages/php/checkouts), [Python checkouts](https://github.com/vatly/vatly-api-python/blob/main/docs/Checkouts.md), and the [Checkouts API](/api-reference/checkouts) for the complete options. The optional [fluent JavaScript package](/packages/fluent-js/checkouts) provides a higher-level checkout builder.

## Verify webhooks before granting access

Deploy a public HTTPS webhook endpoint and register it in **Developers » Webhooks** in the [Vatly dashboard](https://my.vatly.com), or through the [Webhook Endpoints API](/api-reference/webhook-endpoints). Configure a signing secret and store the matching value as `VATLY_WEBHOOK_SECRET` in your backend. This is not your API key.

Vatly does not send your app's user session or Supabase JWT. Allow external requests to **this webhook endpoint only**, without disabling authentication on checkout creation or other routes. For Supabase Edge Functions, configure the webhook function to accept requests without JWT verification; Vatly signature verification replaces user authentication on that endpoint.

Verify each delivery at the start of your server handler. These SDK examples return a verified event; they are not complete fulfillment handlers. Supply `webhookSecret` / `webhook_secret` from the server's `VATLY_WEBHOOK_SECRET` secret. Never parse or re-serialize the body before verification.

::code-group{sync="integration-client"}

```ts [JavaScript]
import { constructWebhookEventFromRequest } from '@getvatly/sdk/webhooks';

export async function verifyDelivery(request: Request, webhookSecret: string) {
  // Pass the untouched Fetch Request, before request.json() or a body parser.
  return constructWebhookEventFromRequest(request, webhookSecret);
}
```

```php [PHP]
use Vatly\API\Webhooks\Webhook;

function verifyDelivery(string $rawBody, string $signatureHeader, string $webhookSecret)
{
    // Read $rawBody with file_get_contents('php://input') in your route.
    // Read $signatureHeader from $_SERVER['HTTP_VATLY_SIGNATURE'] ?? ''.
    return Webhook::parse($rawBody, $signatureHeader, $webhookSecret);
}
```

```python [Python]
from vatly.webhooks import construct_webhook_event


def verify_delivery(raw_body: bytes, signature_header: str, webhook_secret: str):
    # Obtain the untouched body bytes and Vatly-Signature header from your framework.
    return construct_webhook_event(raw_body, signature_header, webhook_secret)
```

```bash [HTTP/cURL]
# HTTP webhooks arrive at YOUR server. cURL does not implement a receiver or
# verify signatures. To test your receiver, replay an exact captured test delivery
# with its original signature while its timestamp is still within 300 seconds:
curl --fail-with-body https://app.example.com/webhooks/vatly \
  -H "Content-Type: application/json" \
  -H "Vatly-Signature: $VATLY_SIGNATURE" \
  --data-binary @vatly-event.json
```

::

The SDK helpers verify HMAC-SHA256 against the raw body and enforce a 300-second timestamp tolerance. Reject invalid signatures or malformed envelopes with `400` without changing data. JavaScript and Python report verification failures as `VatlyInvalidSignatureError`; PHP's `Webhook::parse` throws `InvalidSignatureException` for signature failures and `InvalidArgumentException` for malformed payloads. Handle those at your framework's route boundary. The JavaScript helper parses JSON but does not validate the envelope's runtime shape: validate its required fields against the [OpenAPI `WebhookDelivery` schema](https://docs.vatly.com/openapi.yaml) before using its ID or fulfilling a purchase. For Deno, import the JavaScript helper from `npm:@getvatly/sdk@0.3.0-alpha.2/webhooks`.

Without an SDK, implement the [signature verification contract](/guides/webhooks#verifying-signatures) in your server's language: parse `t` and `v1` from `Vatly-Signature`, reject timestamps more than 300 seconds from the current time, compute the hex HMAC-SHA256 of the timestamp, a literal `.`, and the exact raw body using your webhook secret, then compare with `v1` in constant time. Only decode the JSON after verification succeeds. The HTTP/cURL tab tests a receiver you have implemented; it does not replace these checks.

Verification is only the first part of the handler. Ask your agent to implement durable processing:

1. Verify every request, including `webhook.setup`. Acknowledge a verified setup event with `2xx` so endpoint registration succeeds.
2. Use the **verified `event.id`** as a unique database key. `Vatly-Event-Id` is useful for logs, but the header itself is not signed. Deliveries may repeat or arrive concurrently.
3. Store the event and its processing state durably before returning `2xx`. Either apply business changes and mark the event processed in one transaction, or use a durable inbox with a retrying worker. Return a non-`2xx` if storage fails. Acknowledge already-processed duplicates without repeating fulfillment.
4. Associate the signed resource's customer ID with your server-owned user mapping. For a one-off purchase, fulfill on `order.paid`. For subscriptions, handle `subscription.started`, renewals, and cancellation events according to your access policy. Reconcile current subscription state when delivery order could affect access; do not let a late event restore canceled access.
5. Keep unknown events for triage rather than silently discarding them. JavaScript and Python's typed helpers expose `event.known` before narrowing `event.object`; Python uses snake_case attributes such as `event.event_name`, while PHP uses `$event->eventName`. Plain HTTP uses the wire-format names. Do not expose webhook payloads or billing writes to browser clients; apply database access policies.

Subscribe explicitly to the events your app handles, including refunds and chargebacks where they affect access. The signed HTTP envelope uses top-level `eventName`, `entityId`, and `object` fields, **not a Stripe-style `data.object` wrapper**. See [JavaScript webhooks](/packages/javascript/webhooks), [PHP webhooks](/packages/php/webhooks), [Python webhooks](https://github.com/vatly/vatly-api-python/blob/main/docs/Webhooks.md), and the [webhook guide](/guides/webhooks) for event names and billing behavior.

## Test before publishing

- Use a `test_` key and test-mode products and customers throughout. Follow [Testing](/guides/testing), not another provider's test-card instructions.
- Confirm an unauthenticated caller cannot create a checkout and one user cannot buy for another user's Vatly customer.
- Check that no Vatly key appears in browser bundles, network requests, logs, or your repository.
- Complete a test checkout and confirm a verified event updates the right user's access. Visiting the success URL directly must not grant access.
- Send an unsigned, tampered, or stale webhook: it must be rejected without writes. Replay a valid event and send concurrent duplicates: fulfillment must happen once.
- Test cancellation, a failed payment, and a database failure during delivery. Confirm failed processing can retry and a verified `webhook.setup` succeeds.
- Before going live, configure live secrets, live product/customer mappings, and a live-mode webhook endpoint. Recheck the deployed HTTPS URL after changing hosts; a preview URL is not a permanent webhook address.

## Documentation for your agent

Give the builder these public sources instead of asking it to guess an integration:

- [JavaScript SDK](/packages/javascript/readme) and [operation reference](/packages/javascript/api)
- [Fluent JavaScript package](/packages/fluent-js/readme) for higher-level billing and storage bindings
- [PHP SDK](/packages/php/readme)
- [Python SDK and installation status](https://github.com/vatly/vatly-api-python) (alpha; not yet on PyPI)
- [API reference](https://docs.vatly.com/api-reference) and [OpenAPI specification](https://docs.vatly.com/openapi.yaml)
- [Agent-friendly documentation index](https://docs.vatly.com/llms.txt) and [full documentation](https://docs.vatly.com/llms-full.txt)
