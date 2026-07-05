# Webhook Endpoints

> Vatly PHP SDK - Webhook Endpoints

A webhook endpoint is the HTTPS URL Vatly POSTs event deliveries to. You register
one from code (or infrastructure-as-code) instead of the dashboard. There is **at
most one endpoint per mode** — one for test and one for live, determined by the
API token.

The signing `secret` you provide is **write-only**: it is sent on create/update
but is never returned in any response. Store the value you send — you use it to
verify the `Vatly-Signature` HMAC on deliveries (see [Webhooks](/packages/php/webhooks)).

## The WebhookEndpoint Resource

Below you'll find all properties for the Vatly WebhookEndpoint resource.

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
      Unique identifier for the endpoint (<code>
        webhook_...
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
      Resource type, always <code>
        webhook_endpoint
      </code>
      
      .
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
      Whether this endpoint receives test-mode events.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        url
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The HTTPS URL deliveries are POSTed to.
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
        WebhookEndpointLinks
      </code>
    </td>
    
    <td>
      HATEOAS links (<code>
        self
      </code>
      
      ).
    </td>
  </tr>
</tbody>
</table>

> The signing `secret` is never present on the resource — it is write-only.

---

## Register a webhook endpoint

`POST /v1/webhook-endpoints`

Register the endpoint for the mode determined by the API token. Vatly sends a
`webhook.setup` verification ping to the URL and validates its SSL certificate;
if either fails the request is rejected. Registering a second endpoint for a mode
that already has one is rejected — update or delete the existing one instead.

### Required attributes

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
        url
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Publicly reachable HTTPS URL with a valid SSL certificate. <code>
        localhost
      </code>
      
      /loopback addresses are not allowed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        secret
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Signing secret (min 10 chars). Write-only — keep this value, the API never returns it.
    </td>
  </tr>
</tbody>
</table>

```php
$endpoint = $vatly->webhookEndpoints->create([
    'url' => 'https://merchant.example/webhooks/vatly',
    'secret' => getenv('VATLY_WEBHOOK_SECRET'), // min 10 chars, keep it — never returned
]);

echo $endpoint->id;  // webhook_...
echo $endpoint->url;
```

---

## Retrieve a webhook endpoint

`GET /v1/webhook-endpoints/:id`

Retrieve an endpoint by its ID. The signing secret is never included.

```php
$endpoint = $vatly->webhookEndpoints->get('webhook_QdEpFhdSrG4Y3DnfsdqsH');

echo $endpoint->url;
```

---

## List webhook endpoints

`GET /v1/webhook-endpoints`

List the endpoints for the token's mode. Because there is at most one endpoint
per mode, this returns at most one endpoint.

```php
$endpoints = $vatly->webhookEndpoints->page();

foreach ($endpoints as $endpoint) {
    echo $endpoint->url;
}
```

---

## Update a webhook endpoint

`PATCH /v1/webhook-endpoints/:id`

Repoint the endpoint (`url`), rotate the signing `secret`, or both. A new URL is
revalidated for reachability and SSL just like on creation. Sending an empty body
is a no-op that returns the current endpoint.

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
        url
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      New HTTPS delivery URL.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        secret
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      New signing secret (min 10 chars). Write-only — keep the value.
    </td>
  </tr>
</tbody>
</table>

```php
$endpoint = $vatly->webhookEndpoints->update('webhook_QdEpFhdSrG4Y3DnfsdqsH', [
    'url' => 'https://merchant.example/webhooks/vatly-v2',
]);
```

If you already have a `WebhookEndpoint` resource instance:

```php
$endpoint->update([
    'secret' => getenv('VATLY_WEBHOOK_SECRET_NEXT'),
]);
```

---

## Delete a webhook endpoint

`DELETE /v1/webhook-endpoints/:id`

Delete an endpoint. Vatly stops sending deliveries to it immediately. To receive
events again, register a new endpoint. Returns no content.

```php
$vatly->webhookEndpoints->delete('webhook_QdEpFhdSrG4Y3DnfsdqsH');

// Or, from a resource instance:
$endpoint->delete();
```
