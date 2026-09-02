# Idempotency

> Learn how to use idempotency keys to safely retry API requests without creating duplicate resources.

## What is idempotency?

Idempotency is a property of an API endpoint that ensures multiple identical requests will have the same effect as a single request. This is particularly important when dealing with network issues, timeouts, or when you need to retry failed requests.

For example, if you're creating a checkout and the request fails due to a network error, you can safely retry the request without worrying about creating duplicate checkouts.

## Using idempotency keys

To make an idempotent request, include a unique `Idempotency-Key` header with your request:

<code-group sync="client">

```bash [cURL]
curl -X POST https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer live_your_api_key_here" \
  -H "Idempotency-Key: 123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [{"id": "subscription_plan_Bm7xNvPwKr3YjTgHcZaE"}],
    "redirectUrlSuccess": "https://example.com/success",
    "redirectUrlCanceled": "https://example.com/canceled"
  }'
```

```php [PHP]
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

$checkout = $vatly->checkouts->create([
    'products' => [
        ['id' => 'subscription_plan_Bm7xNvPwKr3YjTgHcZaE'],
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

1. When you make a request with an idempotency key, our API records the **first** response keyed by that request and returns it verbatim on any later request with the same key.
2. A replayed response carries an `Idempotent-Replayed: true` header so you can tell it apart from a freshly processed request.
3. **The first HTTP response is final for that key.** This includes a rendered `4xx` or `5xx` response, once request processing has started. Retry the exact request with the same key to retrieve that stored response. Only use a fresh key for corrected parameters after you have reconciled whether the original mutation took effect.
4. After 24 hours, idempotency keys expire and become reusable as a fresh idempotency boundary.

## What binds an idempotency key

A key is bound to the exact shape of the first request. The following are **contract-significant** — replaying the same key with a different value returns `409 Conflict` **without executing the operation again**:

- The HTTP method
- The public endpoint and its concrete path
- The query string
- The request body
- The normalized `Content-Type` media type
- The normalized, ordered `Content-Encoding`

When you hit a mismatch `409`, either retry with the original parameters or generate a new key.

**Scope is per public route URI template.** The same key value used against a different endpoint is treated as a new key. Internal route-name or controller refactors on our side do not change replay identity — only the public route matters.

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

All mutating requests accept an optional `Idempotency-Key` header:

- All `POST` requests
- All `PATCH` requests
- All `PUT` requests
- All `DELETE` requests

<note>

An `Idempotency-Key` sent on a `GET` or `HEAD` request is ignored — those methods don't mutate state.

</note>

## Error handling

If you receive an error response, check the status code to determine if you should retry the request:

- `4xx` errors: Client errors (like validation errors) should not be retried with the same data.
- `5xx` errors: Server errors can be safely retried with the same idempotency key.

### Understanding `409 Conflict`

A `409` shares one HTTP status across several distinct cases. The `message` distinguishes them, and idempotency cases also set `details.idempotency_outcome`:

- **Replay mismatch**: the `Idempotency-Key` was reused with different request parameters (see [What binds an idempotency key](#what-binds-an-idempotency-key)). Retry with the original parameters or generate a new key.
- **details.idempotency_outcome = in_progress** — **retryable.** Another caller is still processing this exact request. Wait the number of seconds in the `Retry-After` header, then resend the exact same request and key.
- **details.idempotency_outcome = unknown** — **not retryable.** The mutation may have completed, but its response could not be recorded and cannot be replayed safely. Read and reconcile the affected resource state before taking any further mutating action. Never automatically retry — with either the same key or a fresh one.
- **Concurrent write**: two writers modified the same resource at the same version. Reload the latest state and retry; the conflict resolves itself unless contention is sustained.

<note>

`Retry-After` is present only for the `in_progress` case. It tells you how many seconds to wait before resending the exact request and key.

</note>

## Rate limits

**Exact replays still consume rate-limit budget.** API and per-merchant write throttles run *before* the idempotency lookup, so an otherwise valid replay can return `429 Too Many Requests` instead of the stored response. When this happens, wait for the interval in the `Retry-After` header, then resend the exact same request and key.
