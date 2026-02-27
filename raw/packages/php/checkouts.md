# Checkouts

Checkouts create hosted payment pages for your customers. When a checkout completes successfully, an Order is created.

## The Checkout Resource

Below you'll find all properties for the Vatly Checkout resource.

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
      Unique identifier for the checkout (<code>
        chk_...
      </code>
      
      ).
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
      The status of the checkout: <code>
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
        merchantId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Your merchant ID.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orderId
      </code>
    </td>
    
    <td>
      `string
    </td>
    
    <td>
      null`
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
      Whether this is a test checkout.
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
  
  <tr>
    <td>
      <code>
        metadata
      </code>
    </td>
    
    <td>
      <code>
        array
      </code>
    </td>
    
    <td>
      Your custom metadata.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        expiresAt
      </code>
    </td>
    
    <td>
      `string
    </td>
    
    <td>
      null`
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

## Create a checkout

`POST /v1/checkouts`

Create a new hosted checkout for your customer.

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
      An array of product objects with <code>
        id
      </code>
      
      , optional <code>
        quantity
      </code>
      
      , and optional <code>
        trialDays
      </code>
      
      .
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
      The URL to redirect after successful payment.
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
      The URL to redirect if the customer cancels.
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
      Existing customer ID to associate with this checkout.
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
        array
      </code>
    </td>
    
    <td>
      Your custom metadata to store with the checkout.
    </td>
  </tr>
</tbody>
</table>

```php
$checkout = $vatly->checkouts->create([
    'products' => [
        [
            'id' => 'plan_abc123',
            'quantity' => 1,
            'trialDays' => 14,
        ]
    ],
    'redirectUrlSuccess' => 'https://yourapp.com/success',
    'redirectUrlCanceled' => 'https://yourapp.com/canceled',
    'customerId' => 'cus_xyz789',
    'metadata' => [
        'user_id' => '12345',
    ],
]);

// Redirect to hosted checkout
$checkoutUrl = $checkout->getCheckoutUrl();
```

```json
{
  "id": "chk_abc123",
  "status": "created",
  "merchantId": "merchant_xyz",
  "orderId": null,
  "testmode": false,
  "redirectUrlSuccess": "https://yourapp.com/success",
  "redirectUrlCanceled": "https://yourapp.com/canceled",
  "metadata": {"user_id": "12345"},
  "createdAt": "2024-12-14T13:32:24.000Z",
  "_links": {
    "checkoutUrl": "https://pay.vatly.com/chk_abc123"
  }
}
```

---

## Retrieve a checkout

`GET /v1/checkouts/:id`

Retrieve a checkout by its ID.

```php
$checkout = $vatly->checkouts->get('chk_abc123');

echo $checkout->id;
echo $checkout->status;
echo $checkout->getCheckoutUrl();

if ($checkout->isPaid()) {
    $orderId = $checkout->orderId;
}
```

---

## List all checkouts

`GET /v1/checkouts`

Retrieve a paginated list of all your checkouts.

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
      A cursor for pagination. Returns results after this checkout ID.
    </td>
  </tr>
</tbody>
</table>

```php
// Get all checkouts (paginated)
$checkouts = $vatly->checkouts->list();

foreach ($checkouts as $checkout) {
    echo $checkout->id . ': ' . $checkout->status;
}

// Pagination
$checkouts = $vatly->checkouts->list([
    'limit' => 25,
    'startingAfter' => 'chk_last_id',
]);
```

---

## Checkout statuses

<table>
<thead>
  <tr>
    <th>
      Status
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
        created
      </code>
    </td>
    
    <td>
      Checkout is active, awaiting payment
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        paid
      </code>
    </td>
    
    <td>
      Payment successful, order created
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        canceled
      </code>
    </td>
    
    <td>
      Customer canceled the checkout
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        failed
      </code>
    </td>
    
    <td>
      Payment failed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        expired
      </code>
    </td>
    
    <td>
      Checkout expired without completion
    </td>
  </tr>
</tbody>
</table>

---

## Helper methods

The Checkout object provides convenient helper methods.

```php
$checkout->isPaid();         // true if status is 'paid'
$checkout->isCanceled();     // true if status is 'canceled'
$checkout->isExpired();      // true if status is 'expired'
$checkout->getCheckoutUrl(); // Hosted checkout page URL
$checkout->getOrderId();     // Order ID (null if not paid)
```
