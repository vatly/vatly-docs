# Chargebacks

> Vatly PHP SDK - Chargebacks

Chargebacks occur when a customer disputes a payment with their bank. Vatly notifies you via webhooks when chargebacks happen.

## The Chargeback Resource

Below you'll find all properties for the Vatly Chargeback resource.

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
      Unique identifier for the chargeback (<code>
        chargeback_...
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
        chargeback
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
      ID of the customer who disputed the payment.
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
      Whether this is a test chargeback.
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
      The dispute status (see <a href="#chargeback-statuses">
        Chargeback statuses
      </a>
      
      ).
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
        Money
      </code>
    </td>
    
    <td>
      Amount of the chargeback.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        settlementAmount
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Amount deducted from settlement (may differ from <code>
        amount
      </code>
      
       due to currency conversion or fees).
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
        reason
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Reason code for the dispute (e.g. <code>
        fraud
      </code>
      
      , <code>
        product_not_received
      </code>
      
      , <code>
        duplicate
      </code>
      
      ).
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
      The ID of the original order that was disputed.
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
      
       until the chargeback is processed.
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
        ChargebackLinks
      </code>
    </td>
    
    <td>
      Links to this chargeback, the original order, the credit note order (<code>
        null
      </code>
      
       until there is one) and <code>
        customerInvoice
      </code>
      
      , the customer-portal page of the chargeback's credit note (<code>
        null
      </code>
      
       until the chargeback is lost). The <code>
        customerInvoice
      </code>
      
       URL is signed and expires after 72 hours (the customer then sees a page to request a new link).
    </td>
  </tr>
</tbody>
</table>

---

## Retrieve a chargeback

`GET /v1/chargebacks/:id`

Retrieve a chargeback by its ID.

```php
$chargeback = $vatly->chargebacks->get('chargeback_abc123');

echo $chargeback->reason;
echo $chargeback->amount->value . ' ' . $chargeback->amount->currency;
echo $chargeback->originalOrderId;
```

---

## List all chargebacks

`GET /v1/chargebacks`

Retrieve a paginated list of all chargebacks.

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
      A cursor for pagination: return the page after this chargeback ID.
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
      A cursor for pagination: return the page before this chargeback ID.
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
      The number of chargebacks to return (default: 10, max: 100).
    </td>
  </tr>
</tbody>
</table>

```php
$chargebacks = $vatly->chargebacks->page();

foreach ($chargebacks as $chargeback) {
    echo $chargeback->id . ': ' . $chargeback->reason;
}

// Pass the cursors and limit in order: startingAfter, endingBefore, limit
$chargebacks = $vatly->chargebacks->page('chargeback_last_id', null, 25);
```

---

## Chargeback statuses

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
      Dispute received, awaiting action
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        requires_amount_review
      </code>
    </td>
    
    <td>
      The disputed amount exceeds the original order, so completion is held pending review
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        accepted
      </code>
    </td>
    
    <td>
      The dispute was accepted
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        rejected
      </code>
    </td>
    
    <td>
      The dispute was rejected
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        evidence_submitted
      </code>
    </td>
    
    <td>
      Evidence submitted, awaiting a decision
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        won
      </code>
    </td>
    
    <td>
      Dispute resolved in the merchant's favor
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lost
      </code>
    </td>
    
    <td>
      Dispute resolved in the customer's favor
    </td>
  </tr>
</tbody>
</table>
