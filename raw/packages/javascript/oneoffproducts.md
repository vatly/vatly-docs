# One-Off Products

> Vatly JavaScript packages - One-Off Products

One-off products are single-purchase items (no recurring billing). They can be
created, updated, archived, and unarchived through the API.

For all fields and options, see the [One-off Products API reference](https://docs.vatly.com/api-reference/one-off-products). The [OpenAPI spec](https://docs.vatly.com/openapi.yaml) is also available for tooling.

## The One-Off Product resource

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
      Unique identifier (<code>
        one_off_product_…
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
        one_off_product
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        name
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Display name.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Optional description.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        basePrice
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Price, e.g. <code>
        { value: "49.00", currency: "EUR" }
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
        active
      </code>
      
      , <code>
        pending
      </code>
      
      , or <code>
        rejected
      </code>
      
      . Archive state is separate in <code>
        archivedAt
      </code>
      
      .
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
      Whether this is a test product.
    </td>
  </tr>
</tbody>
</table>

## Retrieve a one-off product

`GET /v1/one-off-products/{oneOffProductId}`

```ts
const product = await vatly.oneOffProducts.get("one_off_product_abc123");
```

## List one-off products

`GET /v1/one-off-products`

```ts
const page = await vatly.oneOffProducts.list({ limit: 25 });

for await (const product of vatly.oneOffProducts.listAll()) {
  // ...
}
```

To sell a one-off product, pass its `id` in a [checkout](/packages/javascript/checkouts)'s `products`.

## Create, update and archive

```ts
const product = await vatly.oneOffProducts.create({
  name: "Premium License", description: "Lifetime access", productType: "saas",
  basePrice: { value: "99.00", currency: "EUR" }, taxBehavior: "exclusive",
});
await vatly.oneOffProducts.update(product.id, { name: "Premium License v2" });
await vatly.oneOffProducts.archive(product.id); // 204: no return value
const restored = await vatly.oneOffProducts.unarchive(product.id);
const all = await vatly.oneOffProducts.list({ includeArchived: true });
```

`productType` is `saas` or `ebook`. Creation and updates may require approval;
inspect `status`, `pendingUpdates`, and `updateStatus` rather than assuming the
requested values are already live. `taxBehavior` is immutable after creation.
