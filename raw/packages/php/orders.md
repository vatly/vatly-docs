# Orders

> Vatly PHP SDK - Orders

Orders are created automatically when a checkout completes successfully or when a subscription renews.

## The Order Resource

Below you'll find all properties for the Vatly Order resource.

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
      Unique identifier for the order (<code>
        ord_...
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
      The status: <code>
        pending
      </code>
      
      , <code>
        paid
      </code>
      
      , or <code>
        failed
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
        string
      </code>
    </td>
    
    <td>
      The customer ID.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkoutId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      The checkout ID (for initial orders).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscriptionId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      The subscription ID (for recurring orders).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        amount
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      Total amount in cents.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        currency
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Three-letter ISO currency code.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        taxAmount
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      Tax amount in cents.
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
      Whether this is a test order.
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
        paidAt
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      When the order was paid (ISO 8601).
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

## Retrieve an order

`GET /v1/orders/:id`

Retrieve an order by its ID.

```php
$order = $vatly->orders->get('ord_abc123');

echo $order->status;
echo $order->amount / 100 . ' ' . $order->currency;

if ($order->isPaid()) {
    echo 'Paid at: ' . $order->paidAt;
}
```

---

## List all orders

`GET /v1/orders`

Retrieve a paginated list of all orders.

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
      The number of orders to return (default: 10, max: 100).
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
        customerId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Filter by customer ID.
    </td>
  </tr>
</tbody>
</table>

```php
$orders = $vatly->orders->list();

foreach ($orders as $order) {
    echo $order->id . ': ' . ($order->amount / 100) . ' ' . $order->currency;
}

// Filter by customer
$orders = $vatly->orders->list([
    'customerId' => 'cus_abc123',
]);
```

---

## Order statuses

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
        pending
      </code>
    </td>
    
    <td>
      Order is awaiting payment
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        paid
      </code>
    </td>
    
    <td>
      Payment successful
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
</tbody>
</table>

---

## Helper methods

The Order object provides convenient helper methods.

```php
$order->isPaid();      // true if status is 'paid'
$order->isPending();   // true if status is 'pending'
$order->isFailed();    // true if status is 'failed'
```
