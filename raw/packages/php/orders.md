# Orders

> Orders are created automatically when a checkout completes successfully or when a subscription renews.

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
        order_...
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
        order
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
      The customer ID, or <code>
        null
      </code>
      
       for orders with no associated customer.
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
      The order status (see <a href="#order-statuses">
        Order statuses
      </a>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cancellationReason
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      Why the order was canceled: <code>
        payment_failure
      </code>
      
       when payment recovery for this unpaid order was exhausted. <code>
        null
      </code>
      
       unless the status is <code>
        canceled
      </code>
      
      , and <code>
        null
      </code>
      
       for orders canceled before this field existed.
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
        reversedSubtotal
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Amount of the captured payment returned to the customer, before taxes, via refund or chargeback (settled).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refundableSubtotal
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Remaining amount that can still be refunded, before taxes.
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
      The order lines. Use <code>
        $order->lines()
      </code>
      
       for a collection of <code>
        OrderLine
      </code>
      
       objects.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customerDetails
      </code>
    </td>
    
    <td>
      <code>
        Address
      </code>
    </td>
    
    <td>
      Customer billing details.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        paymentMethod
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      The payment method used, for example <code>
        ideal
      </code>
      
       or <code>
        creditcard
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        invoiceNumber
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      The invoice number, assigned after payment.
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
        OrderLinks
      </code>
    </td>
    
    <td>
      Links to this order, the customer (<code>
        null
      </code>
      
       for orders with no associated customer) and the customer invoice. The <code>
        customerInvoice
      </code>
      
       URL is signed and expires after 72 hours (the customer then sees a page to request a new link).
    </td>
  </tr>
</tbody>
</table>

### Order line properties

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
      Unique identifier for the order line.
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
      Line description.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        quantity
      </code>
    </td>
    
    <td>
      <code>
        int
      </code>
    </td>
    
    <td>
      Quantity. On a subscription line this is the quantity of one subscription, not a count of subscriptions.
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
      Price per unit before taxes.
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
      Line total including taxes.
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
      Line subtotal before taxes.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        taxes
      </code>
    </td>
    
    <td>
      <code>
        TaxSummaryCollection
      </code>
    </td>
    
    <td>
      Tax breakdown for this line.
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
        string | null
      </code>
    </td>
    
    <td>
      The linked resource type: <code>
        subscription_plan
      </code>
      
       on an initial subscription signup line, <code>
        subscription
      </code>
      
       on a renewal or immediate-update line, <code>
        one_off_product
      </code>
      
       for a one-off product. <code>
        null
      </code>
      
       when the line has no product link.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        productId
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      The linked resource's ID: a plan ID for <code>
        subscription_plan
      </code>
      
      , a subscription ID for <code>
        subscription
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        relatedResources
      </code>
    </td>
    
    <td>
      <code>
        OrderLineRelatedResources | null
      </code>
    </td>
    
    <td>
      Additional relationships for this line. <code>
        null
      </code>
      
       on historical lines and on lines unrelated to a subscription.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        relatedResources->subscriptionId
      </code>
    </td>
    
    <td>
      <code>
        string | null
      </code>
    </td>
    
    <td>
      The subscription this line belongs to, on signup, renewal and immediate-update lines alike. <code>
        null
      </code>
      
       on a signup line while the subscription is not available yet; retrieve the order again later to read it.
    </td>
  </tr>
</tbody>
</table>

To find the subscription a paid checkout created, follow the checkout's `orderId` and read the lines' `relatedResources`:

```php
$order = $vatly->orders->get($checkout->orderId);

foreach ($order->lines() as $line) {
    $subscriptionId = $line->relatedResources?->subscriptionId;
}
```

A subscription ID alone does not mean the subscription is active. Check the subscription's status before granting access.

---

## Retrieve an order

`GET /v1/orders/:id`

Retrieve an order by its ID.

```php
$order = $vatly->orders->get('order_abc123');

echo $order->status;
echo $order->total->value . ' ' . $order->total->currency;

if ($order->isPaid()) {
    echo 'Invoice: ' . $order->invoiceNumber;
}

if ($order->isCanceled()) {
    echo 'Canceled because: ' . ($order->cancellationReason ?? 'unknown');
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
        startingAfter
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      A cursor for pagination: return the page after this order ID.
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
      A cursor for pagination: return the page before this order ID.
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
      The number of orders to return (default: 10, max: 100).
    </td>
  </tr>
</tbody>
</table>

```php
$orders = $vatly->orders->page();

foreach ($orders as $order) {
    echo $order->id . ': ' . $order->total->value . ' ' . $order->total->currency;
}

// Pass the cursors and limit in order: startingAfter, endingBefore, limit
$orders = $vatly->orders->page('order_abc123', null, 25);
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
        created
      </code>
    </td>
    
    <td>
      Order has just been created
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        pending
      </code>
    </td>
    
    <td>
      Payment is being processed
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
        canceled
      </code>
    </td>
    
    <td>
      Order has been canceled
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        expired
      </code>
    </td>
    
    <td>
      Order has expired
    </td>
  </tr>
</tbody>
</table>

A failed payment does not change the order to a status of its own. You receive the `order.payment_failed` webhook while Vatly tries to recover the payment. If recovery is exhausted, the order is `canceled` with `cancellationReason: payment_failure`, and you receive `order.canceled`.

---

## Helper methods

The Order object provides convenient helper methods.

```php
$order->isCreated();   // true if status is 'created'
$order->isPending();   // true if status is 'pending'
$order->isPaid();      // true if status is 'paid'
$order->isCanceled();  // true if status is 'canceled'
$order->isExpired();   // true if status is 'expired'

$order->isReversed();          // true if any of the payment was returned to the customer
$order->isPartiallyReversed(); // true if some, but not all, of the payment was returned
$order->isFullyReversed();     // true if the full payment was returned
```
