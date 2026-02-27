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
      ID of the original order that was charged back.
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
      ID of the credit note order created for this chargeback. Only present after the chargeback is processed.
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

<code-group>

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
      "id": "chargeback_abc123def456",
      "resource": "chargeback",
      "merchantId": "mer_abc123",
      "testmode": false,
      "amount": {
        "value": "99.99",
        "currency": "EUR"
      },
      "settlementAmount": {
        "value": "114.99",
        "currency": "EUR"
      },
      "reason": "fraud",
      "originalOrderId": "ord_original123",
      "orderId": "ord_chargeback123",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/chargebacks/chargeback_abc123def456",
          "type": "application/json"
        },
        "originalOrder": {
          "href": "https://api.vatly.com/v1/orders/ord_original123",
          "type": "application/json"
        },
        "order": {
          "href": "https://api.vatly.com/v1/orders/ord_chargeback123",
          "type": "application/json"
        }
      }
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/chargebacks?limit=10",
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

<code-group>

```bash [cURL]
curl https://api.vatly.com/v1/chargebacks/chargeback_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$chargeback = $vatly->chargebacks->get('chargeback_abc123def456');
```

```json [Response]
{
  "id": "chargeback_abc123def456",
  "resource": "chargeback",
  "merchantId": "mer_abc123",
  "testmode": false,
  "amount": {
    "value": "99.99",
    "currency": "EUR"
  },
  "settlementAmount": {
    "value": "114.99",
    "currency": "EUR"
  },
  "reason": "fraud",
  "originalOrderId": "ord_original123",
  "orderId": "ord_chargeback123",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/chargebacks/chargeback_abc123def456",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/ord_original123",
      "type": "application/json"
    },
    "order": {
      "href": "https://api.vatly.com/v1/orders/ord_chargeback123",
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

<code-group>

```bash [cURL]
curl -G https://api.vatly.com/v1/orders/ord_original123/chargebacks \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$chargebacks = $vatly->orders->chargebacks('ord_original123')->page();
```

```json [Response]
{
  "data": [
    {
      "id": "chargeback_abc123def456",
      "resource": "chargeback",
      "merchantId": "mer_abc123",
      "testmode": false,
      "amount": {
        "value": "99.99",
        "currency": "EUR"
      },
      "settlementAmount": {
        "value": "114.99",
        "currency": "EUR"
      },
      "reason": "fraud",
      "originalOrderId": "ord_original123",
      "orderId": "ord_chargeback123",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/chargebacks/chargeback_abc123def456",
          "type": "application/json"
        },
        "originalOrder": {
          "href": "https://api.vatly.com/v1/orders/ord_original123",
          "type": "application/json"
        },
        "order": {
          "href": "https://api.vatly.com/v1/orders/ord_chargeback123",
          "type": "application/json"
        }
      }
    }
  ],
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/orders/ord_original123/chargebacks?limit=10",
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

<code-group>

```bash [cURL]
curl https://api.vatly.com/v1/orders/ord_original123/chargebacks/chargeback_abc123def456 \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$chargeback = $vatly->orders->chargebacks('ord_original123')->get('chargeback_abc123def456');
```

```json [Response]
{
  "id": "chargeback_abc123def456",
  "resource": "chargeback",
  "merchantId": "mer_abc123",
  "testmode": false,
  "amount": {
    "value": "99.99",
    "currency": "EUR"
  },
  "settlementAmount": {
    "value": "114.99",
    "currency": "EUR"
  },
  "reason": "fraud",
  "originalOrderId": "ord_original123",
  "orderId": "ord_chargeback123",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/chargebacks/chargeback_abc123def456",
      "type": "application/json"
    },
    "originalOrder": {
      "href": "https://api.vatly.com/v1/orders/ord_original123",
      "type": "application/json"
    },
    "order": {
      "href": "https://api.vatly.com/v1/orders/ord_chargeback123",
      "type": "application/json"
    }
  }
}
```

</code-group>
