# Refunds

> Refunds allow you to return money to your customers for orders.

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
        refund_...
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
        refund
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
      The refund status (see <a href="#refund-statuses">
        Refund statuses
      </a>
      
      ).
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
      ID of the customer who receives the refund.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        originalOrderId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The ID of the order being refunded.
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
      The credit note order ID, <code>
        null
      </code>
      
       until the refund is processed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        total
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Total amount including taxes.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subtotal
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Subtotal amount before taxes.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        taxSummary
      </code>
    </td>
    
    <td>
      <code>
        TaxSummaryCollection
      </code>
    </td>
    
    <td>
      Tax breakdown by rate.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lines
      </code>
    </td>
    
    <td>
      <code>
        array
      </code>
    </td>
    
    <td>
      The refund lines. Use <code>
        $refund->lines()
      </code>
      
       for a collection of <code>
        RefundLine
      </code>
      
       objects.
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
        links
      </code>
    </td>
    
    <td>
      <code>
        RefundLinks
      </code>
    </td>
    
    <td>
      Links to this refund, the original order, the credit note order (<code>
        null
      </code>
      
       until there is one) and <code>
        customerInvoice
      </code>
      
      , the customer-portal page of the refund's credit note (<code>
        null
      </code>
      
       until the refund is processed). The <code>
        customerInvoice
      </code>
      
       URL is signed and expires after 72 hours (the customer then sees a page to request a new link).
    </td>
  </tr>
</tbody>
</table>

---

## Create a partial refund

`POST /v1/orders/:orderId/refunds`

Refund part of an order, line by line.

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
        items
      </code>
    </td>
    
    <td>
      <code>
        array
      </code>
    </td>
    
    <td>
      The order lines to refund. See <a href="#refund-items">
        Refund items
      </a>
      
       below.
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
        array
      </code>
    </td>
    
    <td>
      Your custom metadata.
    </td>
  </tr>
</tbody>
</table>

### Refund items

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
      Required
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
        itemId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      The ID of the order line to refund.
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
        array
      </code>
    </td>
    
    <td>
      Yes
    </td>
    
    <td>
      Amount to refund for this line before taxes: <code>
        ['value' => '10.00', 'currency' => 'EUR']
      </code>
      
      . Cannot exceed what is left to refund for the line.
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
      No
    </td>
    
    <td>
      Custom description for this refund line.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        descriptionAdditionalLine
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Additional description line.
    </td>
  </tr>
</tbody>
</table>

```php
$refund = $vatly->orderRefunds->createForOrderId('order_abc123', [
    'items' => [
        [
            'itemId' => 'order_item_abc123',
            'amount' => ['value' => '10.00', 'currency' => 'EUR'],
            'description' => 'Partial refund',
        ],
    ],
]);

echo $refund->id;
echo $refund->status;
```

---

## Create a full refund

`POST /v1/orders/:orderId/refunds/full`

Refund everything that can still be refunded on an order.

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
        array
      </code>
    </td>
    
    <td>
      Your custom metadata.
    </td>
  </tr>
</tbody>
</table>

```php
$refund = $vatly->orderRefunds->createFullRefundForOrderId('order_abc123', []);

// Or from an order you already fetched
$refund = $order->fullRefund([]);
```

---

## Retrieve a refund

`GET /v1/refunds/:id`

Retrieve a refund by its ID.

```php
$refund = $vatly->refunds->get('refund_abc123');

echo $refund->status;
echo $refund->total->value . ' ' . $refund->total->currency;
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
        startingAfter
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      A cursor for pagination: return the page after this refund ID.
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
      A cursor for pagination: return the page before this refund ID.
    </td>
  </tr>
  
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
</tbody>
</table>

```php
$refunds = $vatly->refunds->page();

foreach ($refunds as $refund) {
    echo $refund->id . ': ' . $refund->status;
}

// Pass the cursors and limit in order: startingAfter, endingBefore, limit
$refunds = $vatly->refunds->page('refund_last_id', null, 25);

// One order's refunds (GET /v1/orders/:orderId/refunds)
$refunds = $vatly->orderRefunds->pageForOrderId('order_abc123');
```

---

## Cancel a refund

`DELETE /v1/orders/:orderId/refunds/:refundId`

Cancel a refund that has not been processed yet. Once it is `processing`, cancellation is no longer possible.

```php
$vatly->orderRefunds->cancelRefundForOrderId('order_abc123', 'refund_abc123');

// Or from a refund you already fetched
$refund->cancel();
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
      Refund is ready to be sent to the bank
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        queued
      </code>
    </td>
    
    <td>
      Refund is queued due to a lack of balance
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        processing
      </code>
    </td>
    
    <td>
      Refund is being processed (cancellation is no longer possible)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refunded
      </code>
    </td>
    
    <td>
      Refund has been processed successfully
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        failed
      </code>
    </td>
    
    <td>
      Refund failed after processing
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

The Refund object has no status helper methods. Compare `$refund->status` against the `Vatly\API\Types\RefundStatus` constants:

```php
use Vatly\API\Types\RefundStatus;

if ($refund->status === RefundStatus::REFUNDED) {
    // The money is on its way back to the customer
}
```
