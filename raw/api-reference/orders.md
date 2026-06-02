# Orders

> On this page, we'll dive into the different order endpoints you can use to manage orders programmatically.

## The order model

The order model contains all the information about your orders, including the order details, customer information, line items, and tax information.

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
      Unique identifier for the order (starts with <code>
        order_
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
        string
      </code>
    </td>
    
    <td>
      ID of the customer who made this purchase.
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
      Whether this order is in test mode.
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
        object | null
      </code>
    </td>
    
    <td>
      Arbitrary key-value metadata for your application.
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
      Payment method used for this order (e.g., <code>
        ideal
      </code>
      
      , <code>
        creditcard
      </code>
      
      , <code>
        bancontact
      </code>
      
      , <code>
        paypal
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
      The current status of the order. Can be <code>
        created
      </code>
      
      , <code>
        pending
      </code>
      
      , <code>
        paid
      </code>
      
      , <code>
        canceled
      </code>
      
      , or <code>
        expired
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
      Invoice number for this order (assigned after payment).
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
      Total amount including taxes. A Money object with <code>
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
        array
      </code>
    </td>
    
    <td>
      Tax breakdown by rate. Each item contains a <code>
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
      Array of line items in this order. See OrderLine properties below.
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
        BillingDetails
      </code>
    </td>
    
    <td>
      Customer billing details (buyer). Includes <code>
        fullName
      </code>
      
      , <code>
        companyName
      </code>
      
      , <code>
        taxId
      </code>
      
      , <code>
        streetAndNumber
      </code>
      
      , <code>
        streetAdditional
      </code>
      
      , <code>
        city
      </code>
      
      , <code>
        region
      </code>
      
      , <code>
        postalCode
      </code>
      
      , <code>
        country
      </code>
      
      , and <code>
        email
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
      When this order was created (ISO 8601 format).
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
        customer
      </code>
      
      , and optionally <code>
        customerInvoice
      </code>
      
       links.
    </td>
  </tr>
</tbody>
</table>

### OrderLine Properties

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
      Unique identifier for this line item (starts with <code>
        order_item_
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
        orderline
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
      Description of the item.
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
      Number of units.
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
      Total price including taxes (basePrice x quantity + taxes).
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
      Subtotal before taxes (basePrice x quantity).
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
      Tax breakdown by rate for this line. Each item contains a <code>
        taxRate
      </code>
      
       object and an <code>
        amount
      </code>
      
       Money object.
    </td>
  </tr>
</tbody>
</table>

---

## List all orders

`GET /v1/orders`

This endpoint allows you to retrieve a paginated list of all your orders. By default, a maximum of ten orders are shown per page.

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
      The number of orders to return (default: 10, max: 100).
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
      A cursor for use in pagination. Returns results after this order ID.
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
      A cursor for use in pagination. Returns results before this order ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/orders \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$orders = $vatly->orders->page();
```

```json [Response]
{
  "data": [
    {
      "id": "order_Hn5xWqVfKm8RjTgYbUcP",
      "resource": "order",
      "customerId": "customer_Xk9pQrSvWm4NjLhYbUcP",
      "testmode": false,
      "metadata": {},
      "paymentMethod": "ideal",
      "status": "paid",
      "invoiceNumber": "INV-2024-0001",
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
          "id": "order_item_Mn6xBtPvKw2RjTgYcZaE",
          "resource": "orderline",
          "description": "Pro Monthly Subscription",
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
      "customerDetails": {
        "fullName": "John Doe",
        "companyName": "Acme Corp",
        "taxId": null,
        "streetAndNumber": "123 Main Street",
        "streetAdditional": null,
        "city": "Berlin",
        "region": null,
        "postalCode": "10115",
        "country": "DE",
        "email": "john@acme.com"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/orders/order_Hn5xWqVfKm8RjTgYbUcP",
          "type": "application/json"
        },
        "customer": {
          "href": "https://api.vatly.com/v1/customers/customer_Xk9pQrSvWm4NjLhYbUcP",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/orders",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Get an order

`GET /v1/orders/:orderId`

This endpoint allows you to retrieve a specific order by its ID.

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

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/orders/order_Hn5xWqVfKm8RjTgYbUcP \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$order = $vatly->orders->get('order_Hn5xWqVfKm8RjTgYbUcP');
```

```json [Response]
{
  "id": "order_Hn5xWqVfKm8RjTgYbUcP",
  "resource": "order",
  "customerId": "customer_Xk9pQrSvWm4NjLhYbUcP",
  "testmode": false,
  "metadata": {},
  "paymentMethod": "ideal",
  "status": "paid",
  "invoiceNumber": "INV-2024-0001",
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
      "id": "order_item_Jk4pQrSvWm8NjLhYbUcP",
      "resource": "orderline",
      "description": "Pro Monthly Subscription",
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
  "customerDetails": {
    "fullName": "John Doe",
    "companyName": "Acme Corp",
    "taxId": null,
    "streetAndNumber": "123 Main Street",
    "streetAdditional": null,
    "city": "Berlin",
    "region": null,
    "postalCode": "10115",
    "country": "DE",
    "email": "john@acme.com"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/orders/order_Hn5xWqVfKm8RjTgYbUcP",
      "type": "application/json"
    },
    "customer": {
      "href": "https://api.vatly.com/v1/customers/customer_Xk9pQrSvWm4NjLhYbUcP",
      "type": "application/json"
    },
    "customerInvoice": {
      "href": "https://vatly.com/invoices/order_Hn5xWqVfKm8RjTgYbUcP",
      "type": "text/html"
    }
  }
}
```

</code-group>

---

## Create invoice update link

`POST /v1/orders/:orderId/invoice-update-link`

Creates a signed link that customers can use to update the invoice details for this order — billing address, VAT number, and company name. The link is valid for a limited time (typically 24 hours).

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

<code-group sync="api">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/orders/order_Hn5xWqVfKm8RjTgYbUcP/invoice-update-link \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$link = $vatly->orders->createInvoiceUpdateLink('order_Hn5xWqVfKm8RjTgYbUcP');
```

```json [Response]
{
  "href": "https://vatly.com/invoices/order_Hn5xWqVfKm8RjTgYbUcP/edit?signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "text/html"
}
```

</code-group>
