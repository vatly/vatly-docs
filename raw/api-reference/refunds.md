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
        ref_
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
        string
      </code>
      
       <code>
        null
      </code>
    </td>
    
    <td>
      ID of the credit note order created for this refund. Only present after the refund is processed.
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
      ID of the merchant.
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
        Money
      </code>
    </td>
    
    <td>
      Total tax amount being refunded.
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
        rli_
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
        Money
      </code>
    </td>
    
    <td>
      Tax amount being refunded.
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

<code-group sync="lang">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/orders/ord_abc123/refunds \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "itemId": "oli_abc123",
        "amount": {
          "value": "15.00",
          "currency": "EUR"
        },
        "description": "Partial refund for service issue"
      }
    ]
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refund = $vatly->orders->refunds('ord_abc123')->create([
    'items' => [
        [
            'itemId' => 'oli_abc123',
            'amount' => [
                'value' => '15.00',
                'currency' => 'EUR',
            ],
            'description' => 'Partial refund for service issue',
        ],
    ],
]);
```

```json [Response]
{
  "id": "ref_abc123def456",
  "resource": "refund",
  "orderId": null,
  "merchantId": "mer_abc123",
  "customerId": "cus_xyz789",
  "testmode": false,
  "status": "pending",
  "originalOrderId": "ord_abc123",
  "total": {
    "value": "18.15",
    "currency": "EUR"
  },
  "subtotal": {
    "value": "15.00",
    "currency": "EUR"
  },
  "taxSummary": {
    "value": "3.15",
    "currency": "EUR"
  },
  "lines": [
    {
      "id": "rli_abc123",
      "resource": "refundline",
      "description": "Partial refund for service issue",
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
      "taxes": {
        "value": "3.15",
        "currency": "EUR"
      }
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/refunds/ref_abc123def456",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/ord_abc123",
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

<code-group sync="lang">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/orders/ord_abc123/refunds/full \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refund = $vatly->orders->refunds('ord_abc123')->full();
```

```json [Response]
{
  "id": "ref_xyz789abc123",
  "resource": "refund",
  "orderId": null,
  "merchantId": "mer_abc123",
  "customerId": "cus_xyz789",
  "testmode": false,
  "status": "pending",
  "originalOrderId": "ord_abc123",
  "total": {
    "value": "120.99",
    "currency": "EUR"
  },
  "subtotal": {
    "value": "100.00",
    "currency": "EUR"
  },
  "taxSummary": {
    "value": "20.99",
    "currency": "EUR"
  },
  "lines": [
    {
      "id": "rli_full123",
      "resource": "refundline",
      "description": "Pro Monthly Subscription (Full Refund)",
      "quantity": 1,
      "basePrice": {
        "value": "100.00",
        "currency": "EUR"
      },
      "total": {
        "value": "120.99",
        "currency": "EUR"
      },
      "subtotal": {
        "value": "100.00",
        "currency": "EUR"
      },
      "taxes": {
        "value": "20.99",
        "currency": "EUR"
      }
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/refunds/ref_xyz789abc123",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/ord_abc123",
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

<code-group sync="lang">

```bash [cURL]
curl https://api.vatly.com/v1/orders/ord_abc123/refunds \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refunds = $vatly->orders->refunds('ord_abc123')->page();
```

```json [Response]
{
  "data": [
    {
      "id": "ref_abc123def456",
      "resource": "refund",
      "orderId": "ord_credit123",
      "merchantId": "mer_abc123",
      "customerId": "cus_xyz789",
      "testmode": false,
      "status": "completed",
      "originalOrderId": "ord_abc123",
      "total": {
        "value": "18.15",
        "currency": "EUR"
      },
      "subtotal": {
        "value": "15.00",
        "currency": "EUR"
      },
      "taxSummary": {
        "value": "3.15",
        "currency": "EUR"
      },
      "lines": [
        {
          "id": "rli_abc123",
          "resource": "refundline",
          "description": "Partial refund for service issue",
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
          "taxes": {
            "value": "3.15",
            "currency": "EUR"
          }
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/refunds/ref_abc123def456",
          "type": "application/json"
        },
        "originalOrder": {
          "href": "https://api.vatly.com/v1/orders/ord_abc123",
          "type": "application/json"
        },
        "order": {
          "href": "https://api.vatly.com/v1/orders/ord_credit123",
          "type": "application/json"
        }
      }
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/orders/ord_abc123/refunds?limit=10",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  },
  "count": 1
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

<code-group sync="lang">

```bash [cURL]
curl https://api.vatly.com/v1/orders/ord_abc123/refunds/ref_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$refund = $vatly->orders->refunds('ord_abc123')->get('ref_abc123def456');
```

```json [Response]
{
  "id": "ref_abc123def456",
  "resource": "refund",
  "orderId": "ord_credit123",
  "merchantId": "mer_abc123",
  "customerId": "cus_xyz789",
  "testmode": false,
  "status": "completed",
  "originalOrderId": "ord_abc123",
  "total": {
    "value": "18.15",
    "currency": "EUR"
  },
  "subtotal": {
    "value": "15.00",
    "currency": "EUR"
  },
  "taxSummary": {
    "value": "3.15",
    "currency": "EUR"
  },
  "lines": [
    {
      "id": "rli_abc123",
      "resource": "refundline",
      "description": "Partial refund for service issue",
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
      "taxes": {
        "value": "3.15",
        "currency": "EUR"
      }
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/refunds/ref_abc123def456",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/ord_abc123",
      "type": "application/json"
    },
    "order": {
      "href": "https://api.vatly.com/v1/orders/ord_credit123",
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

<code-group sync="lang">

```bash [cURL]
curl -X DELETE https://api.vatly.com/v1/orders/ord_abc123/refunds/ref_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->orders->refunds('ord_abc123')->cancel('ref_abc123def456');
```

</code-group>

Returns `204 No Content` on success.
