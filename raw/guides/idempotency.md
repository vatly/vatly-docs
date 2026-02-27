# Idempotency

> Learn how to use idempotency keys to safely retry API requests without creating duplicate resources.

## What is idempotency?

Idempotency is a property of an API endpoint that ensures multiple identical requests will have the same effect as a single request. This is particularly important when dealing with network issues, timeouts, or when you need to retry failed requests.

For example, if you're creating a checkout and the request fails due to a network error, you can safely retry the request without worrying about creating duplicate checkouts.

## Using idempotency keys

To make an idempotent request, include a unique `Idempotency-Key` header with your request:

<code-group>

```bash [cURL]
curl -X POST https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Idempotency-Key: 123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [{"id": "plan_abc123"}],
    "redirectUrlSuccess": "https://example.com/success",
    "redirectUrlCanceled": "https://example.com/canceled"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$checkout = $vatly->checkouts->create([
    'products' => [
        ['id' => 'plan_abc123'],
    ],
    'redirectUrlSuccess' => 'https://example.com/success',
    'redirectUrlCanceled' => 'https://example.com/canceled',
], [
    'idempotencyKey' => '123e4567-e89b-12d3-a456-426614174000',
]);
```

</code-group>

<note>

The idempotency key must be a unique string up to 64 characters. We recommend using a UUID v4 to ensure uniqueness.

</note>

## How it works

1. When you make a request with an idempotency key, our API stores the key along with the response.
2. If you retry the request with the same key:

  - If the original request succeeded, we'll return the stored response
  - If the original request failed or is still processing, we'll process the request normally
3. After 24 hours, idempotency keys expire and are removed from our system.

## Best practices

Here are some tips for using idempotency effectively:

1. **Generate unique keys**: Use UUIDs or another method to generate unique keys for each request.
2. **Store keys**: Keep track of idempotency keys alongside your request data.
3. **Set retry policies**: Configure your HTTP client to automatically retry failed requests with the same idempotency key.
4. **Handle errors**: Check error responses to determine if you should retry with the same key.

## Example retry implementation

Here's an example of how to implement automatic retries with idempotency:

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

function createCheckoutWithRetry($vatly, $data) {
    $idempotencyKey = \Ramsey\Uuid\Uuid::uuid4()->toString();
    $maxRetries = 3;
    $attempt = 0;

    while ($attempt < $maxRetries) {
        try {
            return $vatly->checkouts->create($data, [
                'idempotencyKey' => $idempotencyKey,
            ]);
        } catch (\Vatly\Exception\ApiException $e) {
            $attempt++;

            // Only retry on network errors or server errors (5xx)
            if ($e->getCode() < 500 || $attempt >= $maxRetries) {
                throw $e;
            }

            // Wait before retrying (with exponential backoff)
            sleep(pow(2, $attempt));
        }
    }
}
```

## Supported endpoints

The following endpoints support idempotency:

- All `POST` requests
- All `PATCH` requests

<note>

`GET` and `DELETE` requests are naturally idempotent and don't require an idempotency key.

</note>

## Error handling

If you receive an error response, check the status code to determine if you should retry the request:

- `409 Conflict`: The request conflicts with another request using the same idempotency key. This usually means the key was already used for a different request.
- `4xx` errors: Client errors (like validation errors) should not be retried with the same data.
- `5xx` errors: Server errors can be safely retried with the same idempotency key.

## Rate limits

Idempotency keys count towards your rate limits only when they result in a new request being processed. Retries that return a stored response don't count towards your limits.
