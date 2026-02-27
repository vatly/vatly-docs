# Chargebacks

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
        chb_...
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
        merchantId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The merchant ID.
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
        amount
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      Chargeback amount (<code>
        value
      </code>
      
       and <code>
        currency
      </code>
      
      ).
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
        object
      </code>
    </td>
    
    <td>
      Amount deducted from settlement (may differ from <code>
        amount
      </code>
      
      ).
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
        string|null
      </code>
    </td>
    
    <td>
      The credit note order ID (after processing).
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

## Retrieve a chargeback

`GET /v1/chargebacks/:id`

Retrieve a chargeback by its ID.

```php
$chargeback = $vatly->chargebacks->get('chb_abc123');

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
$chargebacks = $vatly->chargebacks->list();

foreach ($chargebacks as $chargeback) {
    echo $chargeback->id . ': ' . $chargeback->reason;
}
```
