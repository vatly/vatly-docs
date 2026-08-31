# Checkouts

> On this page, we'll dive into the different checkout endpoints you can use to manage your checkouts programmatically.

## The Checkout API Resource

Below you'll find all properties for the Vatly Checkout API resource.

### Properties

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        id
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Unique identifier for the checkout (starts with <code>
        checkout_
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resource
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The resource type. Always <code>
        checkout
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orderId
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Unique identifier for the order created from this checkout. Only available when the checkout has been paid successfully.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The customer associated with this checkout. Only present once a customer has been associated — for an anonymous checkout this happens when the buyer completes payment.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        testmode
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether this checkout is in test mode.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirectUrlSuccess
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The URL to which the checkout should redirect the user after the checkout has been paid successfully. May contain the literal <code>
        {CHECKOUT_ID}
      </code>
      
       placeholder, which Vatly substitutes with this checkout's ID at creation time (e.g. <code>
        https://example.com/return?checkout_id={CHECKOUT_ID}
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirectUrlCanceled
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The URL to which the user should get redirected when the user cancels the checkout. Supports the same <code>
        {CHECKOUT_ID}
      </code>
      
       placeholder as <code>
        redirectUrlSuccess
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        metadata
      </code>
    </td>
    
    <td>
      <code>
        object | null
      </code>
    </td>
    
    <td>
      Arbitrary key-value metadata for your application. Up to 50 keys, with key names up to 40 characters and values up to 500 characters.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        locale
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      The language the hosted checkout was asked to present in, as sent on creation. <code>
        null
      </code>
      
       means none was specified and the checkout picks a language from the shopper's browser. One of <code>
        en
      </code>
      
      , <code>
        de
      </code>
      
      , <code>
        fr
      </code>
      
      , <code>
        nl
      </code>
      
      , <code>
        es
      </code>
      
      , <code>
        it
      </code>
      
      , <code>
        pt
      </code>
      
      , <code>
        pl
      </code>
      
      , or <code>
        null
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        status
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The status of the checkout. Can be <code>
        created
      </code>
      
      , <code>
        paid
      </code>
      
      , <code>
        canceled
      </code>
      
      , <code>
        failed
      </code>
      
      , or <code>
        expired
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        expiresAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When this checkout will expire (ISO 8601 format).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        createdAt
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The moment the checkout was created, in ISO 8601 format.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        links
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      HATEOAS links to related resources. Contains <code>
        checkoutUrl
      </code>
      
       (the hosted checkout page URL), <code>
        self
      </code>
      
      , and optionally <code>
        order
      </code>
      
       (after completion).
    </td>
  </tr>
</tbody>
</table>

---

## List all checkouts

`GET /v1/checkouts`

This endpoint allows you to retrieve a paginated list of all your checkouts. By default, a maximum of ten checkouts are shown per page.

### Optional attributes

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        limit
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      The number of checkouts to return (default: 10, max: 100).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        startingAfter
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      A cursor for use in pagination. Returns results after this checkout ID.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        endingBefore
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      A cursor for use in pagination. Returns results before this checkout ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$checkouts = $vatly->checkouts->page();
```

```json [Response]
{
  "data": [
    {
      "id": "checkout_QdEpFhdSrG4Y3DnfsdqsH",
      "resource": "checkout",
      "orderId": null,
      "testmode": false,
      "redirectUrlSuccess": "https://example.com/success",
      "redirectUrlCanceled": "https://example.com/canceled",
      "metadata": {},
      "locale": null,
      "status": "created",
      "expiresAt": "2024-01-16T10:30:00Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "checkoutUrl": {
          "href": "https://checkout.vatly.com/checkout_QdEpFhdSrG4Y3DnfsdqsH",
          "type": "text/html"
        },
        "self": {
          "href": "https://api.vatly.com/v1/checkouts/checkout_QdEpFhdSrG4Y3DnfsdqsH",
          "type": "application/json"
        },
        "order": null
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/checkouts",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Create a checkout

`POST /v1/checkouts`

This endpoint allows you to start a new hosted Vatly Checkout. Make sure you have at least one subscription plan or one-off product configured in your Vatly account.

Once paid, any subscription plan product assigned to the checkout will kick off a new subscription for that plan.

### Required attributes

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        products
      </code>
    </td>
    
    <td>
      <code>
        array
      </code>
    </td>
    
    <td>
      An array of product objects to include in this checkout. Each product can have: <code>
        id
      </code>
      
       (required, starts with <code>
        one_off_product_
      </code>
      
       or <code>
        subscription_plan_
      </code>
      
      ), <code>
        quantity
      </code>
      
       (optional, default: 1), <code>
        price
      </code>
      
       (optional, Money object), <code>
        trialDays
      </code>
      
       (optional, for subscription plans), <code>
        metadata
      </code>
      
       (optional).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirectUrlSuccess
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The URL to which the checkout should redirect the user after the checkout has been paid successfully. You may include the literal <code>
        {CHECKOUT_ID}
      </code>
      
       placeholder anywhere in the URL — Vatly substitutes it with this checkout's ID, so your return page can read the checkout ID without a server-side token store.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirectUrlCanceled
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The URL to which the user should get redirected when the user cancels the checkout. Supports the same <code>
        {CHECKOUT_ID}
      </code>
      
       placeholder.
    </td>
  </tr>
</tbody>
</table>

### Optional attributes

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        metadata
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      Arbitrary key-value metadata for your application.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The ID for an existing customer to associate with this checkout. If provided, the customer's email will be pre-filled. Must match the testmode of the API token.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        locale
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Language to present the hosted checkout in, including its validation and error messages. Send a bare language code (<code>
        de
      </code>
      
      ), a BCP 47 tag (<code>
        de-AT
      </code>
      
      ), or a POSIX / ISO 15897 locale (<code>
        de_DE
      </code>
      
      ) — all three fold to the language, so there are no region-specific variants. The language also carries through to the payment provider's own hosted page. Supported languages: <code>
        en
      </code>
      
      , <code>
        de
      </code>
      
      , <code>
        fr
      </code>
      
      , <code>
        nl
      </code>
      
      , <code>
        es
      </code>
      
      , <code>
        it
      </code>
      
      , <code>
        pt
      </code>
      
      , <code>
        pl
      </code>
      
      ; anything else is a <code>
        422
      </code>
      
       naming the supported set. Omit it (or send <code>
        null
      </code>
      
      ) to detect the language from the shopper's <code>
        Accept-Language
      </code>
      
       header, falling back to English. The response echoes back the folded language, not the string you sent.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {"id": "one_off_product_Vr8kQdFhSrG4Y3DnfsdqH", "quantity": 1},
      {"id": "subscription_plan_Rk5pQrSvWm8NjLhYbUcP", "trialDays": 14}
    ],
    "redirectUrlSuccess": "https://example.com/return?checkout_id={CHECKOUT_ID}",
    "redirectUrlCanceled": "https://example.com/canceled",
    "locale": "de"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$checkout = $vatly->checkouts->create([
  'products' => [
    ['id' => 'one_off_product_Vr8kQdFhSrG4Y3DnfsdqH', 'quantity' => 1],
    ['id' => 'subscription_plan_Rk5pQrSvWm8NjLhYbUcP', 'trialDays' => 14],
  ],
  'redirectUrlSuccess' => 'https://example.com/return?checkout_id={CHECKOUT_ID}',
  'redirectUrlCanceled' => 'https://example.com/canceled',
  'locale' => 'de',
]);

// Redirect the user to the checkout URL
header('Location: ' . $checkout->links->checkoutUrl->href, true, 303);
```

```json [Response]
{
  "id": "checkout_Bm7xNvPwKr3YjTgHcZaE",
  "resource": "checkout",
  "orderId": null,
  "testmode": false,
  "redirectUrlSuccess": "https://example.com/return?checkout_id=checkout_Bm7xNvPwKr3YjTgHcZaE",
  "redirectUrlCanceled": "https://example.com/canceled",
  "metadata": {},
  "locale": "de",
  "status": "created",
  "expiresAt": "2024-01-16T10:30:00Z",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "checkoutUrl": {
      "href": "https://checkout.vatly.com/checkout_Bm7xNvPwKr3YjTgHcZaE",
      "type": "text/html"
    },
    "self": {
      "href": "https://api.vatly.com/v1/checkouts/checkout_Bm7xNvPwKr3YjTgHcZaE",
      "type": "application/json"
    },
    "order": null
  }
}
```

</code-group>

### Custom pricing

Charge an amount that differs from the product's dashboard price by setting `price` on the item — a `Money` object (`value` is a decimal string, `currency` an ISO 4217 code). The `id` still references a product you created in the dashboard; products cannot be created on the fly via the API. Omit `price` to use the product's configured price.

For a **subscription plan**, a custom `price` is not a first-cycle discount — it becomes the subscription's recurring price and carries over to every renewal. This is how you give a cohort a permanent price (for example, a lower price for an early group of customers). If you'd prefer to track that cohort separately, create a dedicated subscription plan at the target price and check out against that instead — the recurring price is the same, but reporting stays cleaner.

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {
        "id": "one_off_product_Vr8kQdFhSrG4Y3DnfsdqH",
        "quantity": 2,
        "price": {"value": "49.99", "currency": "EUR"}
      }
    ],
    "redirectUrlSuccess": "https://example.com/success",
    "redirectUrlCanceled": "https://example.com/canceled"
  }'
```

```php [PHP]
$checkout = $vatly->checkouts->create([
  'products' => [
    [
      'id' => 'one_off_product_Vr8kQdFhSrG4Y3DnfsdqH',
      'quantity' => 2,
      'price' => ['value' => '49.99', 'currency' => 'EUR'],
    ],
  ],
  'redirectUrlSuccess' => 'https://example.com/success',
  'redirectUrlCanceled' => 'https://example.com/canceled',
]);
```

</code-group>

### VAT and reverse charge

As Merchant of Record, Vatly determines the applicable tax when the checkout is paid, based on the buyer's country and tax status — you don't calculate or configure rates yourself. For EU B2B, the buyer's VAT ID is validated against the EU's VIES registry as part of that determination: when a valid VAT ID is supplied and the buyer is in a different country from the supplier, the **reverse charge** applies (0% VAT) and the resulting order reflects it. Otherwise the buyer's country standard rate applies.

<note>

This describes **live mode**. In test mode VIES is not called and validity is simulated — see [Tax IDs and reverse charge in test mode](/guides/testing#tax-ids-and-reverse-charge-in-test-mode).

</note>

<tip>

The full request and response schema — every accepted field and its validation rules — is published in the [OpenAPI spec](https://docs.vatly.com/openapi.yaml). Point your code generator or AI assistant at it when an example leaves a field ambiguous.

</tip>

### Payment methods in test mode

A few payment methods work in live mode but cannot be completed in test mode, because the payment provider cannot settle them there. A test-mode checkout still lists them, greyed out and labelled as unavailable, so you can see they exist without being able to select one:

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      Test mode
    </th>
    
    <th>
      Reason
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        banktransfer
      </code>
    </td>
    
    <td>
      Not selectable
    </td>
    
    <td>
      The provider cannot settle bank transfers in test mode.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        paybybank
      </code>
    </td>
    
    <td>
      Not selectable
    </td>
    
    <td>
      The provider cannot settle Pay by Bank in test mode.
    </td>
  </tr>
</tbody>
</table>

Every other method behaves identically in both modes. Test a checkout with any selectable method — `creditcard` and `ideal` cover the one-off and mandate flows — and the resulting orders, invoices and webhooks are the same ones live mode produces.

---

## Retrieve a checkout

`GET /v1/checkouts/:id`

This endpoint allows you to retrieve a checkout by providing the checkout id. Refer to [the list](#the-checkout-api-resource) at the top of this page to see which properties are included with checkout objects.

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/checkouts/checkout_QdEpFhdSrG4Y3DnfsdqsH \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$checkout = $vatly->checkouts->get('checkout_QdEpFhdSrG4Y3DnfsdqsH');
```

```json [Response]
{
  "id": "checkout_QdEpFhdSrG4Y3DnfsdqsH",
  "resource": "checkout",
  "orderId": "order_Jk4pQrSvWm8NjLhYbUcP",
  "testmode": false,
  "redirectUrlSuccess": "https://example.com/success",
  "redirectUrlCanceled": "https://example.com/canceled",
  "metadata": {
    "campaign": "summer-sale"
  },
  "locale": null,
  "status": "paid",
  "expiresAt": "2024-01-16T10:30:00Z",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "checkoutUrl": {
      "href": "https://checkout.vatly.com/checkout_QdEpFhdSrG4Y3DnfsdqsH",
      "type": "text/html"
    },
    "self": {
      "href": "https://api.vatly.com/v1/checkouts/checkout_QdEpFhdSrG4Y3DnfsdqsH",
      "type": "application/json"
    },
    "order": {
      "href": "https://api.vatly.com/v1/orders/order_Jk4pQrSvWm8NjLhYbUcP",
      "type": "application/json"
    }
  }
}
```

</code-group>
