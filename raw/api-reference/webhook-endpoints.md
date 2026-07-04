# Webhook Endpoints

> Register and manage the endpoints Vatly delivers webhook events to — create, list, update, and delete them programmatically.

## The Webhook Endpoint API Resource

A webhook endpoint is the URL Vatly `POST`s event deliveries to. Each delivery is signed with the secret you set (see the `Vatly-Signature` header in the [Webhooks guide](/guides/webhooks#verifying-signatures)).

There is **at most one endpoint per mode** — one for test and one for live — and the mode is determined by the API token you use. Managing endpoints from the API is useful for provisioning from CI / infrastructure-as-code, or pointing an ephemeral preview environment at its own public URL.

<note>

The signing **secret is write-only**: you supply it on creation (and may rotate it via update), but it is never returned in any response. Store the value you send — the API will not give it back.

</note>

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
      Unique identifier for the webhook endpoint (starts with <code>
        webhook_
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
        boolean
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
      When this endpoint was created (ISO 8601 format).
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
      
      .
    </td>
  </tr>
</tbody>
</table>

---

## List webhook endpoints

`GET /v1/webhook-endpoints`

Returns the webhook endpoints for the authenticated merchant, filtered by the testmode determined from the API token. Because there is at most one endpoint per mode, this returns at most one endpoint. The signing secret is never included.

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
      The number of endpoints to return (default: 10, max: 100).
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
      A cursor for use in pagination. Returns results after this endpoint ID.
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
      A cursor for use in pagination. Returns results before this endpoint ID.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -G https://api.vatly.com/v1/webhook-endpoints \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$endpoints = $vatly->webhookEndpoints->page();
```

```json [Response]
{
  "data": [
    {
      "id": "webhook_QdEpFhdSrG4Y3DnfsdqsH",
      "resource": "webhook_endpoint",
      "testmode": false,
      "url": "https://merchant.example/webhooks/vatly",
      "createdAt": "2024-01-15T10:30:00Z",
      "links": {
        "self": {
          "href": "https://api.vatly.com/v1/webhook-endpoints/webhook_QdEpFhdSrG4Y3DnfsdqsH",
          "type": "application/json"
        }
      }
    }
  ],
  "count": 1,
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/webhook-endpoints",
      "type": "application/json"
    },
    "next": null,
    "prev": null
  }
}
```

</code-group>

---

## Register a webhook endpoint

`POST /v1/webhook-endpoints`

Registers a webhook endpoint for the mode determined by the API token.

You supply the signing `secret`; it is write-only and never returned, so keep the value you send — you use it to verify the `Vatly-Signature` HMAC on deliveries.

Vatly sends a `webhook.setup` verification ping to the URL and validates its SSL certificate; if either fails the request is rejected with `422`. There is at most one endpoint per mode — registering a second one when the token's mode already has an endpoint returns `422`; update or delete the existing one instead.

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
      The HTTPS URL deliveries are POSTed to. Must be publicly reachable and present a valid SSL certificate. <code>
        localhost
      </code>
      
       and loopback addresses are not allowed.
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
      Signing secret for this endpoint (at least 10 characters), used to compute the <code>
        Vatly-Signature
      </code>
      
       HMAC on every delivery. You choose it (e.g. pinned from an environment variable). Write-only — the API never returns it.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/webhook-endpoints \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://merchant.example/webhooks/vatly",
    "secret": "whsec_3f9a1c7e2d4f7b9c5a2c1d5b7e9f3a8d"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$endpoint = $vatly->webhookEndpoints->create([
  'url' => 'https://merchant.example/webhooks/vatly',
  'secret' => 'whsec_3f9a1c7e2d4f7b9c5a2c1d5b7e9f3a8d',
]);
```

```json [Response]
{
  "id": "webhook_QdEpFhdSrG4Y3DnfsdqsH",
  "resource": "webhook_endpoint",
  "testmode": false,
  "url": "https://merchant.example/webhooks/vatly",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/webhook-endpoints/webhook_QdEpFhdSrG4Y3DnfsdqsH",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Get a webhook endpoint

`GET /v1/webhook-endpoints/:id`

Retrieves a webhook endpoint by ID. The signing secret is never included.

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
        webhookEndpointId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the webhook endpoint.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl https://api.vatly.com/v1/webhook-endpoints/webhook_QdEpFhdSrG4Y3DnfsdqsH \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$endpoint = $vatly->webhookEndpoints->get('webhook_QdEpFhdSrG4Y3DnfsdqsH');
```

```json [Response]
{
  "id": "webhook_QdEpFhdSrG4Y3DnfsdqsH",
  "resource": "webhook_endpoint",
  "testmode": false,
  "url": "https://merchant.example/webhooks/vatly",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/webhook-endpoints/webhook_QdEpFhdSrG4Y3DnfsdqsH",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Update a webhook endpoint

`PATCH /v1/webhook-endpoints/:id`

Updates a webhook endpoint's `url`, its signing `secret`, or both. A new URL is revalidated for reachability and a valid SSL certificate just like on creation. The secret is write-only and is never returned. Sending an empty body is a no-op that returns the current endpoint.

Repointing the URL is the supported way to follow an ephemeral environment whose public URL changes between runs, without rotating the signing secret.

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
      New HTTPS delivery URL. Revalidated for reachability and SSL the same way as on creation.
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
      New signing secret (at least 10 characters). Write-only — keep the value, as the API never returns it.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X PATCH https://api.vatly.com/v1/webhook-endpoints/webhook_QdEpFhdSrG4Y3DnfsdqsH \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://merchant.example/webhooks/vatly-v2"}'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$endpoint = $vatly->webhookEndpoints->update('webhook_QdEpFhdSrG4Y3DnfsdqsH', [
  'url' => 'https://merchant.example/webhooks/vatly-v2',
]);
```

```json [Response]
{
  "id": "webhook_QdEpFhdSrG4Y3DnfsdqsH",
  "resource": "webhook_endpoint",
  "testmode": false,
  "url": "https://merchant.example/webhooks/vatly-v2",
  "createdAt": "2024-01-15T10:30:00Z",
  "links": {
    "self": {
      "href": "https://api.vatly.com/v1/webhook-endpoints/webhook_QdEpFhdSrG4Y3DnfsdqsH",
      "type": "application/json"
    }
  }
}
```

</code-group>

---

## Delete a webhook endpoint

`DELETE /v1/webhook-endpoints/:id`

Deletes a webhook endpoint. Vatly stops sending deliveries to it immediately. To receive events again, register a new endpoint.

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
        webhookEndpointId
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      The unique identifier of the webhook endpoint.
    </td>
  </tr>
</tbody>
</table>

<code-group sync="api">

```bash [cURL]
curl -X DELETE https://api.vatly.com/v1/webhook-endpoints/webhook_QdEpFhdSrG4Y3DnfsdqsH \
  -H "Authorization: Bearer live_your_api_key_here"
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$vatly->webhookEndpoints->delete('webhook_QdEpFhdSrG4Y3DnfsdqsH');
```

</code-group>

Returns `204 No Content` on success.
