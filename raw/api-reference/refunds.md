# Order Refunds

> On this page, we'll dive into the different order refund endpoints you can use to manage refunds programmatically.

## The refund model

The refund model contains all the information about order refunds, including the refund lines, amounts, and tax information.

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
      ID of the credit note order created for this refund. Only present after the refund is processed.
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
      Tax breakdown by rate being refunded. Array of objects with <code>
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
        lines
      </code>
    </td>
    
    <td>
      <code>
        array
      </code>
    </td>
    
    <td>
      Array of refund line items. See RefundLine properties below.
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

#### Status values

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
      Refund is ready to be sent to the bank.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        queued
      </code>
    </td>
    
    <td>
      Refund is queued due to a lack of balance.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        processing
      </code>
    </td>
    
    <td>
      Refund is being processed (cancellation no longer possible).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refunded
      </code>
    </td>
    
    <td>
      Refund has been processed successfully.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        failed
      </code>
    </td>
    
    <td>
      Refund has failed after processing.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        canceled
      </code>
    </td>
    
    <td>
      Refund was canceled.
    </td>
  </tr>
</tbody>
</table>

### RefundLine Properties

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
      Unique identifier for this refund line (starts with <code>
        refund_item_
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
        refundline
      </code>
      
      .
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
      Description of the refunded item.
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
        integer
      </code>
    </td>
    
    <td>
      Number of units being refunded.
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
      Refund amount per unit before taxes.
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
      Total refund amount including taxes.
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
        taxes
      </code>
    </td>
    
    <td>
      <code>
        array
      </code>
    </td>
    
    <td>
      Tax breakdown by rate being refunded. Array of objects with <code>
        taxRate
      </code>
      
       and <code>
        amount
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

---

## Create a refund

`POST /v1/orders/:orderId/refunds`

This endpoint allows you to create a partial refund for a specific order. You specify which order line items to refund and the amount for each.

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
</tbody>
</table>

### Request body

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
      <strong>
        (Required)
      </strong>
      
       Array of items to refund. Each item has: <code>
        itemId
      </code>
      
       (string, required) - ID of the order line item, <code>
        amount
      </code>
      
       (Money, required) - amount to refund before taxes, <code>
        description
      </code>
      
       (string, optional) - custom description, <code>
        descriptionAdditionalLine
      </code>
      
       (string, optional) - additional description line.
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
        object
      </code>
    </td>
    
    <td>
      Arbitrary key-value metadata for your application.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/refunds \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "itemId": "order_item_Jk4pQrSvWm8NjLhYbUcP",
        "amount": {
          "value": "15.00",
          "currency": "EUR"
        },
        "description": "50% refund for service issue"
      }
    ]
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refund = $vatly->orders->refunds('order_Fp2kQrSvWm8NjLhYbUcP')->create([
    'items' => [
        [
            'itemId' => 'order_item_Jk4pQrSvWm8NjLhYbUcP',
            'amount' => [
                'value' => '15.00',
                'currency' => 'EUR',
            ],
            'description' => '50% refund for service issue',
        ],
    ],
]);
```

```json [Response]
{
  "id": "refund_Mn6xBtPvKw2RjTgYcZaE",
  "resource": "refund",
  "orderId": null,
  "customerId": "customer_Lp3mNvBxKw7RjTgYcZaE",
  "testmode": false,
  "status": "pending",
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
      "id": "refund_item_Tk7mNvBxKw2RjTgYcZaE",
      "resource": "refundline",
      "description": "50% refund for service issue",
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
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/refunds/refund_Mn6xBtPvKw2RjTgYcZaE",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
      "type": "application/json"
    },
    "order": null
  }
}
```

</code-group>

---

## Create a full refund

`POST /v1/orders/:orderId/refunds/full`

This endpoint allows you to create a full refund for a specific order. This will refund the entire remaining amount of the order.

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
</tbody>
</table>

### Request body (optional)

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
        object
      </code>
    </td>
    
    <td>
      Arbitrary key-value metadata for your application.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/refunds/full \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refund = $vatly->orders->refunds('order_Fp2kQrSvWm8NjLhYbUcP')->full();
```

```json [Response]
{
  "id": "refund_Rk5pQrSvWm8NjLhYbUcP",
  "resource": "refund",
  "orderId": null,
  "customerId": "customer_Wt5mNvBxKw7YcZaEjLhR",
  "testmode": false,
  "status": "pending",
  "originalOrderId": "order_Fp2kQrSvWm8NjLhYbUcP",
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
  "lines": [
    {
      "id": "refund_item_Bm7xNvPwKr3YjTgHcZaE",
      "resource": "refundline",
      "description": "Pro Monthly Subscription (Full Refund)",
      "quantity": 1,
      "basePrice": {
        "value": "29.00",
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
      "taxes": [
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
      ]
    }
  ],
  "createdAt": "2024-01-21T09:00:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/refunds/refund_Rk5pQrSvWm8NjLhYbUcP",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
      "type": "application/json"
    },
    "order": null
  }
}
```

</code-group>

---

## List order refunds

`GET /v1/orders/:orderId/refunds`

This endpoint allows you to retrieve a list of all refunds for a specific order.

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
curl https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/refunds \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refunds = $vatly->orders->refunds('order_Fp2kQrSvWm8NjLhYbUcP')->page();
```

```json [Response]
{
  "data": [
    {
      "id": "refund_Bm7xNvPwKr3YjTgHcZaE",
      "resource": "refund",
      "orderId": null,
      "customerId": "customer_Wt5mNvBxKw7YcZaEjLhR",
      "testmode": false,
      "status": "pending",
      "originalOrderId": "order_Fp2kQrSvWm8NjLhYbUcP",
      "total": {
        "value": "12.10",
        "currency": "EUR"
      },
      "subtotal": {
        "value": "10.00",
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
            "value": "2.10",
            "currency": "EUR"
          }
        }
      ],
      "lines": [
        {
          "id": "refund_item_Jk4pQrSvWm8NjLhYbUcP",
          "resource": "refundline",
          "description": "Partial refund for service issue",
          "quantity": 1,
          "basePrice": {
            "value": "10.00",
            "currency": "EUR"
          },
          "total": {
            "value": "12.10",
            "currency": "EUR"
          },
          "subtotal": {
            "value": "10.00",
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
                "value": "2.10",
                "currency": "EUR"
              }
            }
          ]
        }
      ],
      "createdAt": "2024-01-20T14:00:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/refunds/refund_Bm7xNvPwKr3YjTgHcZaE",
          "type": "application/json"
        },
        "originalOrder": {
          "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP",
          "type": "application/json"
        },
        "order": null
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/refunds",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Get an order refund

`GET /v1/orders/:orderId/refunds/:refundId`

This endpoint allows you to retrieve details of a specific refund for a specific order.

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
curl https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/refunds/refund_Xk9pQrSvWm4NjLhYbUcP \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refund = $vatly->orders->refunds('order_Fp2kQrSvWm8NjLhYbUcP')->get('refund_Xk9pQrSvWm4NjLhYbUcP');
```

```json [Response]
{
  "id": "refund_Xk9pQrSvWm4NjLhYbUcP",
  "resource": "refund",
  "orderId": "order_Bm7xNvPwKr3YjTgHcZaE",
  "customerId": "customer_Wt5mNvBxKw7YcZaEjLhR",
  "testmode": false,
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
  "createdAt": "2024-01-20T14:00:00Z",
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

---

## Cancel an order refund

`DELETE /v1/orders/:orderId/refunds/:refundId`

This endpoint allows you to cancel a pending refund for a specific order. Only pending refunds can be cancelled.

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
        refundId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the refund to cancel.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="client">

```bash [cURL]
curl -X DELETE https://api.vatly.com/v1/orders/order_Fp2kQrSvWm8NjLhYbUcP/refunds/refund_Mn6xBtPvKw2RjTgYcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->orders->refunds('order_Fp2kQrSvWm8NjLhYbUcP')->cancel('refund_Mn6xBtPvKw2RjTgYcZaE');
```

</code-group>

Returns `204 No Content` on success.
