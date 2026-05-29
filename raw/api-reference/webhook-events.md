# Webhook Events

> Inspect individual webhook events and retrieve the full payload that was delivered by Vatly.

## The webhook event model

Webhook events let you inspect the exact payload Vatly generated for a domain event.

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
      Unique identifier for the webhook event (starts with <code>
        webhook_event_
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
        webhook_event
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        eventName
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The event name, such as <code>
        order.paid
      </code>
      
       or <code>
        refund.completed
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        entityType
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The resource type the event refers to, such as <code>
        order
      </code>
      
      , <code>
        refund
      </code>
      
      , <code>
        chargeback
      </code>
      
      , <code>
        subscription
      </code>
      
      , or <code>
        checkout
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        entityId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The ID of the related resource.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      The full resource payload as it existed when the event occurred.
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
      HATEOAS links. Contains <code>
        self
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

---

## Get a webhook event

`GET /v1/webhook-events/:eventId`

This endpoint returns the full webhook event payload for a specific event ID.

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
        eventId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the webhook event.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/webhook-events/webhook_event_Qk8pRtSvWm2NjLhYcZaE \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$event = $vatly->webhookEvents->get('webhook_event_Qk8pRtSvWm2NjLhYcZaE');
```

```json [Response]
{
  "id": "webhook_event_Qk8pRtSvWm2NjLhYcZaE",
  "resource": "webhook_event",
  "eventName": "order.paid",
  "entityType": "order",
  "entityId": "order_Hn5xWqVfKm8RjTgYbUcP",
  "object": {
    "id": "order_Hn5xWqVfKm8RjTgYbUcP",
    "resource": "order",
    "testmode": false,
    "status": "paid",
    "total": {
      "value": "29.99",
      "currency": "EUR"
    },
    "subtotal": {
      "value": "24.79",
      "currency": "EUR"
    }
  },
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/webhook-events/webhook_event_Qk8pRtSvWm2NjLhYcZaE",
      "type": "application/json"
    }
  }
}
```

</code-group>
