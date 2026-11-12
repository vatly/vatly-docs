# Customers

> Customers represent the end users who purchase products through Vatly.

Customers represent the end users who purchase products through Vatly.

For all fields and options, see the [Customers API reference](https://docs.vatly.com/api-reference/customers). The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.

## The Customer resource

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
      Unique identifier for the customer (<code>
        customer_…
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
        customer
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        email
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Customer's email address (ASCII / Punycode domain).
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
      Whether this is a test customer.
    </td>
  </tr>
</tbody>
</table>

## Create a customer

`POST /v1/customers`

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
        email
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The customer's email address.
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
      Custom key/value metadata.
    </td>
  </tr>
</tbody>
</table>

```ts
const customer = await vatly.customers.create({
  email: "ada@example.com",
  metadata: { plan: "pro" },
});
```

Unicode domains are accepted directly; Vatly lowercases the local part and
canonicalizes the domain to lowercase Punycode. Creating an already-known email
returns the existing customer unchanged. To encode a domain yourself, optionally use:

```ts
import { encodeEmail } from "@getvatly/sdk";

encodeEmail("user@bücher.de"); // → "user@xn--bcher-kva.de"
```

## Retrieve a customer

`GET /v1/customers/{customerId}`

```ts
const customer = await vatly.customers.get("customer_abc123");
```

## Update identity and open the hosted portal

```ts
await vatly.customers.update("customer_abc123", { name: "Ada", email: "ada@example.com" });
const session = await vatly.customers.createPortalSession("customer_abc123", {
  returnUrl: "https://yourapp.com/account",
});
// Redirect the customer's browser to session.url. It is short-lived and single-use.
```

Updates accept name/email, not billing addresses. Portal settings are optional;
`returnUrl` must be an absolute HTTPS URL without credentials, sent in the JSON
body (not query params), at most 2,048 UTF-8 bytes. Authenticate your own customer
before issuing a portal session, and never log or persist its credential URL.

## List customers

`GET /v1/customers`

```ts
const page = await vatly.customers.list({ limit: 25 });

for await (const customer of vatly.customers.listAll()) {
  // ...
}
```

## A customer's subscriptions

`GET /v1/customers/{customerId}/subscriptions`

```ts
// One page:
const page = await vatly.customers.listSubscriptions("customer_abc123", { limit: 10 });

// Every subscription:
for await (const sub of vatly.customers.listAllSubscriptions("customer_abc123")) {
  // ...
}

// A single nested subscription:
const sub = await vatly.customers.getSubscription("customer_abc123", "subscription_abc123");
```
