# Refunds

> On this page, we'll dive into the global refund endpoints for managing refunds across your entire account.

## The refund model

The refund model contains all the information about refunds, including the refund lines, amounts, and tax information.

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
      Unique identifier for the refund (starts with <code>
        refund_
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
        refund
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
        string | null
      </code>
    </td>
    
    <td>
      ID of the credit note order created for this refund. Always present; <code>
        null
      </code>
      
       until the refund is processed.
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
      ID of the customer receiving the refund.
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
      Whether this refund is in test mode.
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
      The current status of the refund. Can be <code>
        pending
      </code>
      
      , <code>
        queued
      </code>
      
      , <code>
        processing
      </code>
      
      , <code>
        refunded
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
        originalOrderId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      ID of the original order being refunded.
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
      Total refund amount including taxes. A Money object with <code>
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
        subtotal
      </code>
    </td>
    
    <td>
      <code>
        Money
      </code>
    </td>
    
    <td>
      Refund subtotal before taxes.
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
      Tax breakdown by rate being refunded. Each entry contains a <code>
        taxRate
      </code>
      
       object (<code>
        name
      </code>
      
      , <code>
        percentage
      </code>
      
      , <code>
        taxablePercentage
      </code>
      
      ) and an <code>
        amount
      </code>
      
       Money object.
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
      Array of refund line items. Each line includes <code>
        id
      </code>
      
       (starts with <code>
        refund_item_
      </code>
      
      ), <code>
        resource
      </code>
      
      , <code>
        description
      </code>
      
      , <code>
        quantity
      </code>
      
      , <code>
        basePrice
      </code>
      
      , <code>
        total
      </code>
      
      , <code>
        subtotal
      </code>
      
      , and <code>
        taxes
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
      When this refund was created (ISO 8601 format).
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

## List all refunds

`GET /v1/refunds`

This endpoint allows you to retrieve a paginated list of all refunds across your account.

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
      A cursor for use in pagination. Returns results after this refund ID.
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
      A cursor for use in pagination. Returns results before this refund ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/refunds \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refunds = $vatly->refunds->page();
```

```json [Response]
{
  "data": [
    {
      "id": "refund_Xk9pQrSvWm4NjLhYbUcP",
      "resource": "refund",
      "orderId": "order_Bm7xNvPwKr3YjTgHcZaE",
      "customerId": "customer_Wt5mNvBxKw7YcZaEjLhR",
      "testmode": false,
      "createdAt": "2024-01-20T14:00:00Z",
      "status": "refunded",
      "originalOrderId": "order_Fp2kQrSvWm8NjLhYbUcP",
      "total": {
        "value": "18.15",
        "currency": "EUR"
      },
      "subtotal": {
        "value": "15.00",
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
            "value": "3.15",
            "currency": "EUR"
          }
        }
      ],
      "lines": [
        {
          "id": "refund_item_Mn6xBtPvKw2RjTgYcZaE",
          "resource": "refundline",
          "description": "Pro Monthly Subscription (Refund)",
          "quantity": 1,
          "basePrice": {
            "value": "15.00",
            "currency": "EUR"
          },
          "total": {
            "value": "18.15",
            "currency": "EUR"
          },
          "subtotal": {
            "value": "15.00",
            "currency": "EUR"
          },
          "taxes": [
            {
              "taxRate": {
                "name": "VAT",
                "percentage": 21,
                "taxablePercentage": 100
              },
              "amount": {
                "value": "3.15",
                "currency": "EUR"
              }
            }
          ]
        }
      ],
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/refunds/refund_Xk9pQrSvWm4NjLhYbUcP",
          "type": "application/json"
        },
        "originalOrder": {
          "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
          "type": "application/json"
        },
        "order": {
          "href": "https://api.vatly.com/v1/orders/order_Bm7xNvPwKr3YjTgHcZaE",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/refunds",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Get a refund

`GET /v1/refunds/:refundId`

This endpoint allows you to retrieve details of a specific refund.

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
        refundId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the refund.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/refunds/refund_Xk9pQrSvWm4NjLhYbUcP \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refund = $vatly->refunds->get('refund_Xk9pQrSvWm4NjLhYbUcP');
```

```json [Response]
{
  "id": "refund_Xk9pQrSvWm4NjLhYbUcP",
  "resource": "refund",
  "orderId": "order_Bm7xNvPwKr3YjTgHcZaE",
  "customerId": "customer_Wt5mNvBxKw7YcZaEjLhR",
  "testmode": false,
  "createdAt": "2024-01-20T14:00:00Z",
  "status": "refunded",
  "originalOrderId": "order_Fp2kQrSvWm8NjLhYbUcP",
  "total": {
    "value": "18.15",
    "currency": "EUR"
  },
  "subtotal": {
    "value": "15.00",
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
        "value": "3.15",
        "currency": "EUR"
      }
    }
  ],
  "lines": [
    {
      "id": "refund_item_Mn6xBtPvKw2RjTgYcZaE",
      "resource": "refundline",
      "description": "Pro Monthly Subscription (Refund)",
      "quantity": 1,
      "basePrice": {
        "value": "15.00",
        "currency": "EUR"
      },
      "total": {
        "value": "18.15",
        "currency": "EUR"
      },
      "subtotal": {
        "value": "15.00",
        "currency": "EUR"
      },
      "taxes": [
        {
          "taxRate": {
            "name": "VAT",
            "percentage": 21,
            "taxablePercentage": 100
          },
          "amount": {
            "value": "3.15",
            "currency": "EUR"
          }
        }
      ]
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/refunds/refund_Xk9pQrSvWm4NjLhYbUcP",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
      "type": "application/json"
    },
    "order": {
      "href": "https://api.vatly.com/v1/orders/order_Bm7xNvPwKr3YjTgHcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>
