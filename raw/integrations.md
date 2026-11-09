# Integrations

> Use Vatly as merchant of record in AI-built apps. Connect Lovable or Bolt to hosted checkout, subscriptions, and verified webhooks.

Vatly works with apps built using AI app builders through its existing API and JavaScript packages. Vatly is the merchant of record: the legal seller that handles payments, tax, and compliance for your software or digital products. Your app creates a hosted checkout and uses verified webhooks to deliver the purchase.

These are custom API integrations, not native Lovable or Bolt connectors. No Vatly-side platform changes are required.

## Choose your builder

<table>
<thead>
  <tr>
    <th>
      Builder
    </th>
    
    <th>
      Start here
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Lovable
    </td>
    
    <td>
      <a href="/integrations/lovable">
        Lovable payments with Vatly
      </a>
      
      : TanStack Start server functions, older React + Vite apps, and Lovable Cloud or Supabase secrets.
    </td>
  </tr>
  
  <tr>
    <td>
      Bolt.new
    </td>
    
    <td>
      <a href="/integrations/bolt">
        Bolt payments with Vatly
      </a>
      
      : Bolt Cloud server functions, database secrets, and existing Supabase projects.
    </td>
  </tr>
</tbody>
</table>

The builder pages explain where the code runs and include prompts to paste into the agent. The shared recipe below defines the checkout and webhook contract for either builder, or another app with a server-side JavaScript runtime.

## Prepare your Vatly account

1. Create an account at [Vatly](https://my.vatly.com) and get a `test_` API key under **Developers » API keys**.
2. Create a product under **Manage Products**. Use a `one_off_product_…` ID for a single purchase or a `subscription_plan_…` ID for recurring access.
3. Keep the key and all product and customer IDs in the same storefront and mode.
4. Choose your app's success and canceled URLs. Keep these in server configuration, not in browser-supplied request data.

Test mode is available before going live. Live selling also requires Vatly approval, product review, and verification of your connected Mollie account. See [Going live](/introduction#going-live) and the [selling workflow](/guides/selling-workflow).

## Keep credentials on the server

Store `VATLY_API_KEY` in your backend's secret manager. Store a separate `VATLY_WEBHOOK_SECRET` there for the webhook endpoint. Never put either value in browser code, chat prompts, local storage, a committed file, or a frontend environment variable such as `VITE_*` or `NEXT_PUBLIC_*`.

The browser calls **your app's backend**; only that backend calls Vatly. Never import the Vatly client into a frontend component. Return only the checkout URL and any non-sensitive identifiers your UI needs, not API credentials or full customer records. Keep database service-role credentials server-side too.

## Create a checkout with the JavaScript SDK

Both [`@getvatly/sdk`](/packages/javascript/readme) and the optional [`@getvatly/fluent`](/packages/fluent-js/readme) are **alpha**. Releases may break compatibility. Pin exact versions and review upgrades. This recipe uses the published SDK alpha:

```bash
npm install --save-exact @getvatly/sdk@0.3.0-alpha.2
```

For a Deno Edge Function, use `npm:@getvatly/sdk@0.3.0-alpha.2` as the import specifier instead. The SDK uses platform Fetch and Web Crypto and supports Node 20+, Deno, and edge runtimes.

This is server-only checkout logic, not an unauthenticated HTTP endpoint. Your route must authenticate the user and load their Vatly customer ID from a server-owned mapping first. Create that customer if needed using the [Customers SDK](/packages/javascript/customers), then save the association. Never trust a customer ID supplied by the browser.

```ts
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

Replace the product ID and URLs with your own server-controlled values. Read the API key from the server runtime: for example, `process.env.VATLY_API_KEY` on Node or `Deno.env.get('VATLY_API_KEY')` in a Supabase Edge Function. Fail configuration checks if it is absent; never fall back to a browser value.

Your authenticated route calls this function with the secret and the current user's customer ID. If the UI offers several plans, accept an app-level plan name and map it to an allowed Vatly product ID on the server. Validate quantities, rate-limit checkout creation, and protect cookie-authenticated routes against CSRF. For cross-origin Edge Function calls, allow only your app's origins and handle CORS preflight.

After the backend returns `{ checkoutUrl }`, the browser navigates to that URL. Vatly hosts the payment form; your app does not collect card details. A success redirect is **not proof of payment**. The return page should show a pending state until your backend confirms payment.

See [SDK checkouts](/packages/javascript/checkouts), [fluent checkouts](/packages/fluent-js/checkouts), and the [Checkouts API](/api-reference/checkouts) for the complete options.

## Verify webhooks before granting access

Deploy a public HTTPS webhook endpoint and register it in **Developers » Webhooks** in the [Vatly dashboard](https://my.vatly.com), or through the [Webhook Endpoints API](/api-reference/webhook-endpoints). Configure a signing secret and store the matching value as `VATLY_WEBHOOK_SECRET` in your backend. This is not your API key.

Vatly does not send your app's user session or Supabase JWT. Allow external requests to **this webhook endpoint only**, without disabling authentication on checkout creation or other routes. For Supabase Edge Functions, configure the webhook function to accept requests without JWT verification; Vatly signature verification replaces user authentication on that endpoint.

Use the SDK's Fetch Request helper at the start of your server handler:

```ts
import { constructWebhookEventFromRequest } from '@getvatly/sdk/webhooks';

// Inside the webhook handler, before request.json() or any body parser:
const event = await constructWebhookEventFromRequest(request, webhookSecret);
// Only now use event.id, event.eventName, and event.object.
```

For Deno, import from `npm:@getvatly/sdk@0.3.0-alpha.2/webhooks`. Supply `webhookSecret` from the server's `VATLY_WEBHOOK_SECRET` secret. The helper reads the exact raw body and `Vatly-Signature` header, verifies HMAC-SHA256, and enforces a 300-second timestamp tolerance. Catch verification failures and return `400` without changing data. Do not parse or re-serialize the body before verification.

Verification is only the first part of the handler. Ask your agent to implement durable processing:

1. Verify every request, including `webhook.setup`. Acknowledge a verified setup event with `2xx` so endpoint registration succeeds.
2. Use the **verified event.id** as a unique database key. `Vatly-Event-Id` is useful for logs, but the header itself is not signed. Deliveries may repeat or arrive concurrently.
3. Store the event and its processing state durably before returning `2xx`. Either apply business changes and mark the event processed in one transaction, or use a durable inbox with a retrying worker. Return a non-`2xx` if storage fails. Acknowledge already-processed duplicates without repeating fulfillment.
4. Associate the signed resource's customer ID with your server-owned user mapping. For a one-off purchase, fulfill on `order.paid`. For subscriptions, handle `subscription.started`, renewals, and cancellation events according to your access policy. Reconcile current subscription state when delivery order could affect access; do not let a late event restore canceled access.
5. Keep unknown events for triage rather than silently discarding them. With the SDK's typed helper, check `event.known` before narrowing `event.object` by event name. Do not expose webhook payloads or billing writes to browser clients; apply database access policies.

Subscribe explicitly to the events your app handles, including refunds and chargebacks where they affect access. The signed event envelope uses top-level `eventName`, `entityId`, and `object` fields, **not a Stripe-style data.object wrapper**. See [JavaScript webhook handling](/packages/javascript/webhooks), [fluent webhooks](/packages/fluent-js/webhooks), and the [webhook guide](/guides/webhooks) for event names and billing behavior.

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
- [API reference](https://docs.vatly.com/api-reference) and [OpenAPI specification](https://docs.vatly.com/openapi.yaml)
- [Agent-friendly documentation index](https://docs.vatly.com/llms.txt) and [full documentation](https://docs.vatly.com/llms-full.txt)
