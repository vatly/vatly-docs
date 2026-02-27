# Refunds

Refunds allow you to return money to your customers for orders.

## The Refund Resource

Below you'll find all properties for the Vatly Refund resource.

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
      Unique identifier for the refund (<code>
        ref_...
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
        completed
      </code>
      
      , <code>
        failed
      </code>
      
      , or <code>
        canceled
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
        string
      </code>
    </td>
    
    <td>
      The order ID being refunded.
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
      Refund amount in cents.
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
        reason
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
      Whether this is a test refund.
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

## Create a refund

`POST /v1/refunds`

Create a refund for an order.

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
        orderId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The ID of the order to refund.
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
        amount
      </code>
    </td>
    
    <td>
      <code>
        integer
      </code>
    </td>
    
    <td>
      Partial refund amount in cents (omit for full refund).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        reason
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Reason for the refund.
    </td>
  </tr>
</tbody>
</table>

```php
// Full refund
$refund = $vatly->refunds->create([
    'orderId' => 'ord_abc123',
    'reason' => 'Customer requested refund',
]);

// Partial refund
$refund = $vatly->refunds->create([
    'orderId' => 'ord_abc123',
    'amount' => 1000,  // Refund €10.00
]);

echo $refund->id;
echo $refund->status;
```

---

## Retrieve a refund

`GET /v1/refunds/:id`

Retrieve a refund by its ID.

```php
$refund = $vatly->refunds->get('ref_abc123');

echo $refund->status;
echo $refund->amount / 100 . ' ' . $refund->currency;
```

---

## List all refunds

`GET /v1/refunds`

Retrieve a paginated list of all refunds.

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
      The number of refunds to return (default: 10, max: 100).
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
</tbody>
</table>

```php
$refunds = $vatly->refunds->list();

foreach ($refunds as $refund) {
    echo $refund->id . ': ' . $refund->status;
}
```

---

## Refund statuses

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
      Refund is being processed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        completed
      </code>
    </td>
    
    <td>
      Refund completed successfully
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        failed
      </code>
    </td>
    
    <td>
      Refund failed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        canceled
      </code>
    </td>
    
    <td>
      Refund was canceled
    </td>
  </tr>
</tbody>
</table>

---

## Helper methods

The Refund object provides convenient helper methods.

```php
$refund->isPending();     // true if status is 'pending'
$refund->isCompleted();   // true if status is 'completed'
$refund->isFailed();      // true if status is 'failed'
$refund->isCanceled();    // true if status is 'canceled'
```
