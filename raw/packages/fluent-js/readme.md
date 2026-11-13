# JavaScript Fluent

> Create checkouts and manage billing with @getvatly/fluent on your server.

> **Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

Create checkouts and manage billing with `@getvatly/fluent` on your server.
Vatly is the European Merchant of Record for AI, software and digital products.
Install the tested alpha pair:

```sh
npm install --save-exact @getvatly/sdk@0.3.0-alpha.4 @getvatly/fluent@0.1.0-alpha.2
```

## Start a subscription

Use a customer and plan from the key's storefront and mode. Check that the
signed-in user owns the customer before calling this function:

```ts
import { VatlyClient } from '@getvatly/sdk';
import { Vatly } from '@getvatly/fluent';

export async function startSubscription(apiKey: string, customerId: string, planId: string) {
  const vatly = new Vatly({
    api: new VatlyClient({ apiKey }),
    redirectUrlSuccess: 'https://app.example.com/billing/return',
    redirectUrlCanceled: 'https://app.example.com/billing/canceled',
  });
  const checkout = await vatly.subscribe({ vatlyId: customerId })
    .toPlan(planId)
    .withQuantity(1)
    .create();
  return checkout.getUrl(); // Redirect the customer's browser to this URL.
}
```

Redirect to the returned URL. Use [webhooks](/packages/fluent-js/webhooks) to confirm payment,
not the return page.

For one-off purchases, use [`checkoutBuilder`](/packages/fluent-js/checkouts#one-off-or-mixed-purchases).

## Guides

<table>
<thead>
  <tr>
    <th>
      Task
    </th>
    
    <th>
      Guide
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Set keys, redirects, and error handling
    </td>
    
    <td>
      <a href="/packages/fluent-js/configuration">
        Configuration
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Connect your database
    </td>
    
    <td>
      <a href="/packages/fluent-js/coreconcepts">
        Core concepts and storage
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Link customers to your users
    </td>
    
    <td>
      <a href="/packages/fluent-js/customers">
        Customers and bindings
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Sell products or start subscriptions
    </td>
    
    <td>
      <a href="/packages/fluent-js/checkouts">
        Checkouts
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Swap, cancel, resume, or update billing
    </td>
    
    <td>
      <a href="/packages/fluent-js/subscriptions">
        Subscriptions
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Open invoice history and billing controls
    </td>
    
    <td>
      <a href="/packages/fluent-js/customerportal">
        Customer portal
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Verify and process events
    </td>
    
    <td>
      <a href="/packages/fluent-js/webhooks">
        Webhooks
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Read invoices, lines, and reversals
    </td>
    
    <td>
      <a href="/packages/fluent-js/orders">
        Orders
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      Test your integration
    </td>
    
    <td>
      <a href="/packages/fluent-js/testing">
        Testing
      </a>
    </td>
  </tr>
</tbody>
</table>

For field details, see the [API reference](https://docs.vatly.com/api-reference).
The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.
