# Checkouts

> Vatly JavaScript packages - Checkouts

Checkouts create hosted payment pages for your customers. When a checkout completes successfully, an Order is created.

> **Authoritative field reference.** This page covers the common cases. The complete, canonical request/response schema lives in the [OpenAPI spec](https://docs.vatly.com/openapi.yaml) (see the `Checkout`, `CheckoutProduct`, and `Money` schemas). When in doubt about what a field is named or whether it exists, trust the spec, not an example.

## The Checkout resource

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
      Unique identifier for the checkout (<code>
        checkout_…
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
      Always <code>
        checkout
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
      <code>
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
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      The customer this checkout is for, if known.
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
      Order ID, available after successful payment.
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
      Where the customer returns on success.
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
      Where the customer returns on cancel.
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
      Your custom key/value metadata.
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
      Expiration timestamp (ISO 8601).
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
      Creation timestamp (ISO 8601).
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
      Whether this is a test checkout.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        links.checkoutUrl
      </code>
    </td>
    
    <td>
      <code>
        Link
      </code>
    </td>
    
    <td>
      The hosted page to send the customer to.
    </td>
  </tr>
</tbody>
</table>

## Create a checkout

`POST /v1/checkouts`

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
      Product items to sell. Each item is <code>
        { id, quantity }
      </code>
      
      , where <code>
        id
      </code>
      
       is a <code>
        subscription_plan_…
      </code>
      
       or <code>
        one_off_product_…
      </code>
      
       id.
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
      Success redirect URL.
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
      Cancel redirect URL.
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
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Attach the checkout to an existing customer.
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
        object
      </code>
    </td>
    
    <td>
      Custom metadata echoed back on the checkout and resulting order.
    </td>
  </tr>
</tbody>
</table>

```ts
const checkout = await vatly.checkouts.create({
  redirectUrlSuccess: "https://yourapp.com/success",
  redirectUrlCanceled: "https://yourapp.com/canceled",
  products: [{ id: "subscription_plan_abc123", quantity: 1 }],
  customerId: "customer_abc123",
  metadata: { signupId: "su_42" },
});

// Send the customer here:
redirect(checkout.links.checkoutUrl.href);
```

## Retrieve a checkout

`GET /v1/checkouts/{checkoutId}`

```ts
const checkout = await vatly.checkouts.get("checkout_abc123");
```

## List checkouts

`GET /v1/checkouts`

```ts
const page = await vatly.checkouts.list({ limit: 25 });

for await (const checkout of vatly.checkouts.listAll()) {
  // ...
}
```
