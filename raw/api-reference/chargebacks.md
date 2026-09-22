# Chargebacks

> On this page, we'll dive into the different chargeback endpoints you can use to query chargebacks programmatically.

## The chargeback model

The chargeback model contains all the information about payment disputes, including the disputed amount, settlement amount, reason, and related order information.

Chargebacks are created automatically when a payment provider initiates a dispute. They are read-only resources.

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
      Unique identifier for the chargeback (starts with <code>
        chargeback_
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
      The resource type. Always <code>
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
      ID of the customer the chargeback was raised against.
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
      Whether this chargeback is in test mode.
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
      The current status of the chargeback dispute. Can be <code>
        pending
      </code>
      
      , <code>
        accepted
      </code>
      
      , <code>
        rejected
      </code>
      
      , <code>
        evidence_submitted
      </code>
      
      , <code>
        won
      </code>
      
      , or <code>
        lost
      </code>
      
      .
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
      Amount of the chargeback. A Money object with <code>
        value
      </code>
      
       (decimal string) and <code>
        currency
      </code>
      
       (ISO 4217 code).
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
      Amount that was deducted from the merchant's settlement. May differ from <code>
        amount
      </code>
      
       due to currency conversion or fees.
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
      Total chargeback amount including taxes.
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
      Chargeback subtotal before taxes.
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
        array
      </code>
    </td>
    
    <td>
      Tax breakdown by rate for the chargeback. Array of objects with <code>
        taxRate
      </code>
      
       (<code>
        name
      </code>
      
      , <code>
        percentage
      </code>
      
      , <code>
        taxablePercentage
      </code>
      
      ) and <code>
        amount
      </code>
      
       (Money).
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
      Reason code or description for the chargeback. Common reasons include <code>
        fraud
      </code>
      
      , <code>
        product_not_received
      </code>
      
      , <code>
        product_unacceptable
      </code>
      
      , <code>
        duplicate
      </code>
      
      , or <code>
        subscription_canceled
      </code>
      
      .
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
      ID of the original order that was charged back (starts with <code>
        order_
      </code>
      
      ).
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
      ID of the credit note order created for this chargeback (starts with <code>
        order_
      </code>
      
      ). Always present; <code>
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
      When this chargeback was created (ISO 8601 format).
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
        object
      </code>
    </td>
    
    <td>
      HATEOAS links to related resources. Contains <code>
        self
      </code>
      
      , <code>
        originalOrder
      </code>
      
      , and optionally <code>
        order
      </code>
      
       (the credit note).
    </td>
  </tr>
</tbody>
</table>

---

## List all chargebacks

`GET /v1/chargebacks`

This endpoint allows you to retrieve a paginated list of all chargebacks across all orders.

### Optional parameters

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
      A cursor for use in pagination. Returns results after this chargeback ID.
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
      A cursor for use in pagination. Returns results before this chargeback ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/chargebacks \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$chargebacks = $vatly->chargebacks->page();
```

```json [Response]
{
  "data": [
    {
      "id": "chargeback_Mn6xBtPvKw2RjTgYcZaE",
      "resource": "chargeback",
      "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
      "testmode": false,
      "status": "lost",
      "amount": {
        "value": "35.09",
        "currency": "EUR"
      },
      "settlementAmount": {
        "value": "35.09",
        "currency": "EUR"
      },
      "total": {
        "value": "35.09",
        "currency": "EUR"
      },
      "subtotal": {
        "value": "29.00",
        "currency": "EUR"
      },
      "taxSummary": [
        {
          "taxRate": {
            "name": "VAT",
            "percentage": 21,
            "taxablePercentage": 100
          },
          "amount": {
            "value": "6.09",
            "currency": "EUR"
          }
        }
      ],
      "reason": "fraud",
      "originalOrderId": "order_Fp2kQrSvWm8NjLhYbUcP",
      "orderId": "order_Rk5pQrSvWm8NjLhYbUcP",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/chargebacks/chargeback_Mn6xBtPvKw2RjTgYcZaE",
          "type": "application/json"
        },
        "originalOrder": {
          "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
          "type": "application/json"
        },
        "order": {
          "href": "https://api.vatly.com/v1/orders/order_Rk5pQrSvWm8NjLhYbUcP",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/chargebacks",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Get a chargeback

`GET /v1/chargebacks/:chargebackId`

This endpoint allows you to retrieve a specific chargeback by its ID.

### Parameters

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
        chargebackId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the chargeback.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/chargebacks/chargeback_Mn6xBtPvKw2RjTgYcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$chargeback = $vatly->chargebacks->get('chargeback_Mn6xBtPvKw2RjTgYcZaE');
```

```json [Response]
{
  "id": "chargeback_Mn6xBtPvKw2RjTgYcZaE",
  "resource": "chargeback",
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
  "testmode": false,
  "status": "lost",
  "amount": {
    "value": "35.09",
    "currency": "EUR"
  },
  "settlementAmount": {
    "value": "35.09",
    "currency": "EUR"
  },
  "total": {
    "value": "35.09",
    "currency": "EUR"
  },
  "subtotal": {
    "value": "29.00",
    "currency": "EUR"
  },
  "taxSummary": [
    {
      "taxRate": {
        "name": "VAT",
        "percentage": 21,
        "taxablePercentage": 100
      },
      "amount": {
        "value": "6.09",
        "currency": "EUR"
      }
    }
  ],
  "reason": "fraud",
  "originalOrderId": "order_Fp2kQrSvWm8NjLhYbUcP",
  "orderId": "order_Rk5pQrSvWm8NjLhYbUcP",
  "createdAt": "2024-01-25T16:45:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/chargebacks/chargeback_Mn6xBtPvKw2RjTgYcZaE",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
      "type": "application/json"
    },
    "order": {
      "href": "https://api.vatly.com/v1/orders/order_Rk5pQrSvWm8NjLhYbUcP",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## List order chargebacks

`GET /v1/orders/:orderId/chargebacks`

This endpoint allows you to retrieve a paginated list of chargebacks for a specific order.

### Parameters

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
      The unique identifier of the order.
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
      A cursor for use in pagination. Returns results after this chargeback ID.
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
      A cursor for use in pagination. Returns results before this chargeback ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/chargebacks \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$chargebacks = $vatly->orders->chargebacks('order_Fp2kQrSvWm8NjLhYbUcP')->page();
```

```json [Response]
{
  "data": [
    {
      "id": "chargeback_Fp2kQrSvWm8NjLhYbUcP",
      "resource": "chargeback",
      "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
      "testmode": false,
      "status": "lost",
      "amount": {
        "value": "35.09",
        "currency": "EUR"
      },
      "settlementAmount": {
        "value": "35.09",
        "currency": "EUR"
      },
      "total": {
        "value": "35.09",
        "currency": "EUR"
      },
      "subtotal": {
        "value": "29.00",
        "currency": "EUR"
      },
      "taxSummary": [
        {
          "taxRate": {
            "name": "VAT",
            "percentage": 21,
            "taxablePercentage": 100
          },
          "amount": {
            "value": "6.09",
            "currency": "EUR"
          }
        }
      ],
      "reason": "product_not_received",
      "originalOrderId": "order_Fp2kQrSvWm8NjLhYbUcP",
      "orderId": "order_Rk5pQrSvWm8NjLhYbUcP",
      "createdAt": "2024-01-25T16:45:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/chargebacks/chargeback_Fp2kQrSvWm8NjLhYbUcP",
          "type": "application/json"
        },
        "originalOrder": {
          "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
          "type": "application/json"
        },
        "order": {
          "href": "https://api.vatly.com/v1/orders/order_Rk5pQrSvWm8NjLhYbUcP",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/chargebacks",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Get an order chargeback

`GET /v1/orders/:orderId/chargebacks/:chargebackId`

This endpoint allows you to retrieve a specific chargeback within an order context.

### Parameters

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
      The unique identifier of the order.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        chargebackId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the chargeback.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/chargebacks/chargeback_Mn6xBtPvKw2RjTgYcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$chargeback = $vatly->orders->chargebacks('order_Fp2kQrSvWm8NjLhYbUcP')->get('chargeback_Mn6xBtPvKw2RjTgYcZaE');
```

```json [Response]
{
  "id": "chargeback_Mn6xBtPvKw2RjTgYcZaE",
  "resource": "chargeback",
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
  "testmode": false,
  "status": "lost",
  "amount": {
    "value": "35.09",
    "currency": "EUR"
  },
  "settlementAmount": {
    "value": "35.09",
    "currency": "EUR"
  },
  "total": {
    "value": "35.09",
    "currency": "EUR"
  },
  "subtotal": {
    "value": "29.00",
    "currency": "EUR"
  },
  "taxSummary": [
    {
      "taxRate": {
        "name": "VAT",
        "percentage": 21,
        "taxablePercentage": 100
      },
      "amount": {
        "value": "6.09",
        "currency": "EUR"
      }
    }
  ],
  "reason": "fraud",
  "originalOrderId": "order_Fp2kQrSvWm8NjLhYbUcP",
  "orderId": "order_Rk5pQrSvWm8NjLhYbUcP",
  "createdAt": "2024-01-25T16:45:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/chargebacks/chargeback_Mn6xBtPvKw2RjTgYcZaE",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
      "type": "application/json"
    },
    "order": {
      "href": "https://api.vatly.com/v1/orders/order_Rk5pQrSvWm8NjLhYbUcP",
      "type": "application/json"
    }
  }
}
```

</code-group>
