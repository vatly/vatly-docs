# One-Off Products

> Vatly PHP SDK - One-Off Products

One-off products are single-purchase items (not recurring subscriptions). Create them in the Vatly dashboard or through the API, then use them in checkouts. Live products are reviewed and approved by Vatly before they can be added to checkouts.

## The One-Off Product Resource

Below you'll find all properties for the Vatly One-Off Product resource.

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
      Unique identifier for the product (<code>
        one_off_product_...
      </code>
      
      ).
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
      Display name of the product.
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
      Description of the product.
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
      The price as a <code>
        Money
      </code>
      
       object — read <code>
        ->value
      </code>
      
       (decimal string) and <code>
        ->currency
      </code>
      
       (ISO 4217 code).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        taxBehavior
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Whether <code>
        basePrice
      </code>
      
       is tax-<code>
        exclusive
      </code>
      
       (B2B; tax added at checkout) or tax-<code>
        inclusive
      </code>
      
       (B2C; price already includes tax). Immutable after creation. See <code>
        Vatly\API\Types\TaxBehavior
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        productType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Tax classification: <code>
        saas
      </code>
      
       or <code>
        ebook
      </code>
      
      .
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
        bool
      </code>
    </td>
    
    <td>
      Whether this is a test product.
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
      The status: <code>
        active
      </code>
      
       (purchasable), <code>
        pending
      </code>
      
       (awaiting approval), or <code>
        rejected
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        archivedAt
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      When the product was archived (ISO 8601), or <code>
        null
      </code>
      
       while it is on sale. Use <code>
        $product->isArchived()
      </code>
      
       for a boolean.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        pendingUpdates
      </code>
    </td>
    
    <td>
      <code>
        object | null
      </code>
    </td>
    
    <td>
      The changes that will take effect once a submitted update is approved, or <code>
        null
      </code>
      
       when there is none. Only the fields that differ from the live product are present.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        updateStatus
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Lifecycle of a pending update: <code>
        pending
      </code>
      
      , <code>
        reviewing
      </code>
      
      , or <code>
        null
      </code>
      
      . See <code>
        Vatly\API\Types\UpdateStatus
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
</tbody>
</table>

---

## Create a product

`POST /v1/one-off-products`

Create a one-off product. A product created with a `live_` token starts in
`pending` status and must be approved by Vatly before it can be added to
checkouts; a product created with a `test_` token is auto-approved (`active`) so
you can trial checkout immediately.

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
        name
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Display name (3–255 characters).
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
        string
      </code>
    </td>
    
    <td>
      Detailed description of the product.
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
        array
      </code>
    </td>
    
    <td>
      Price as <code>
        ['value' => '299.00', 'currency' => 'EUR']
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        productType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Tax classification: <code>
        saas
      </code>
      
       or <code>
        ebook
      </code>
      
      .
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
        taxBehavior
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        exclusive
      </code>
      
       (default) or <code>
        inclusive
      </code>
      
      . Immutable after creation.
    </td>
  </tr>
</tbody>
</table>

```php
$product = $vatly->oneOffProducts->create([
    'name' => 'Premium License',
    'description' => 'Lifetime access to all premium features',
    'basePrice' => ['value' => '299.00', 'currency' => 'EUR'],
    'productType' => 'saas',
    'taxBehavior' => 'exclusive', // optional; defaults to 'exclusive'
]);

echo $product->id;      // one_off_product_...
echo $product->status;  // 'pending' (live) or 'active' (test)
```

---

## Update a product

`PATCH /v1/one-off-products/:id`

Submit an update to a live product. Each request is the **complete set of
changes** relative to the current live product and must contain at least one
field. In live mode the change is held as a pending update and reviewed by Vatly
before it takes effect (`updateStatus` moves `pending` → `reviewing` → applied);
in test mode it is approved automatically. A request that nets to no change
clears any pending update; while an update is being reviewed, further requests
return `409`.

The returned product carries `pendingUpdates` and `updateStatus`.

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
        name
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      New display name (3–255 characters).
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
        string
      </code>
    </td>
    
    <td>
      New description.
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
        array
      </code>
    </td>
    
    <td>
      New price as <code>
        ['value' => '349.00', 'currency' => 'EUR']
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        productType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        saas
      </code>
      
       or <code>
        ebook
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

```php
$product = $vatly->oneOffProducts->update('one_off_product_abc123', [
    'name' => 'Premium License v2',
    'basePrice' => ['value' => '349.00', 'currency' => 'EUR'],
]);

echo $product->updateStatus;                 // 'pending'
echo $product->pendingUpdates->basePrice->value; // '349.00'
```

---

## Archive a product

`POST /v1/one-off-products/:id/archive`

Take a product out of your sellable catalogue. It is hidden from list calls
(unless `includeArchived=true`) and refused by new checkouts; existing orders and
refunds are untouched. Nothing is deleted — the product remains readable by id,
now carrying a non-null `archivedAt`. The call returns no content.

```php
$vatly->oneOffProducts->archive('one_off_product_abc123');

// or, on a resource you already hold:
$product->archive();
```

---

## Unarchive a product

`DELETE /v1/one-off-products/:id/archive`

Put an archived product back on sale. It reappears in listings and can be added
to checkouts again. Returns the product, now on sale (`archivedAt` is `null`).

```php
$product = $vatly->oneOffProducts->unarchive('one_off_product_abc123');

echo $product->isArchived() ? 'archived' : 'on sale'; // on sale
```

---

## Retrieve a product

`GET /v1/one-off-products/:id`

Retrieve a one-off product by its ID.

```php
$product = $vatly->oneOffProducts->get('one_off_product_abc123');

echo $product->name;
echo $product->basePrice->value . ' ' . $product->basePrice->currency;
```

---

## List all products

`GET /v1/one-off-products`

Retrieve a paginated list of all one-off products.

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
      The number of products to return (default: 10, max: 100).
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
      A cursor for pagination.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        includeArchived
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Include archived products in the list. Archived products are hidden by default; pass <code>
        true
      </code>
      
       to see them (tell them apart by the non-null <code>
        archivedAt
      </code>
      
      ).
    </td>
  </tr>
</tbody>
</table>

```php
$products = $vatly->oneOffProducts->page();

foreach ($products as $product) {
    echo $product->name . ': ' . $product->basePrice->value . ' ' . $product->basePrice->currency;
}

// Include archived products in the listing:
$all = $vatly->oneOffProducts->page(null, null, null, ['includeArchived' => true]);
```
