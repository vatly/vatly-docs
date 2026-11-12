# Configuration and errors

> Vatly Python SDK - Configuration and errors

Use one client per application task or worker lifetime and close it with `with`
or `async with`. Both clients accept `VATLY_API_KEY` or an explicit server-side key.

```python
from vatly import RequestOptions, VatlyClient


def example():
    with VatlyClient(timeout=20, max_retries=2) as client:
        return client.customers.get("customer_example", options=RequestOptions(timeout=5))
```

<table>
<thead>
  <tr>
    <th>
      Option
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        api_key
      </code>
    </td>
    
    <td>
      Explicit key; otherwise read <code>
        VATLY_API_KEY
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        timeout
      </code>
    </td>
    
    <td>
      HTTP timeout in seconds; request options can override it
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        max_retries
      </code>
    </td>
    
    <td>
      Automatic retry budget for eligible failures
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base_url
      </code>
    </td>
    
    <td>
      HTTP(S) endpoint without query/fragment; use HTTPS for real credentials
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        RequestOptions.idempotency_key
      </code>
    </td>
    
    <td>
      Stable business key shared across caller retries
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        RequestOptions.headers
      </code>
    </td>
    
    <td>
      Additional request headers
    </td>
  </tr>
</tbody>
</table>

Retryable failures include connection/timeouts, rate limits and eligible server
errors. Mutations receive an automatic key for internal retries; persist your own
key when retrying across application calls. A timeout can leave the remote outcome
unknown. Never assume it means a purchase or refund did not happen.

## Handle a missing resource

```python
from vatly import VatlyClient, VatlyNotFoundError


def example(client: VatlyClient):
    try:
        return client.customers.get("customer_missing")
    except VatlyNotFoundError:
        return None
```

Catch `VatlyError` for all SDK errors. API errors expose status, body, method, URL
and request ID where supplied; connection and timeout errors retain their httpx
cause and request context. Avoid logging credentials or full response bodies,
which can contain personal data. Invalid resource responses raise `VatlyApiError`
rather than silently returning None.

[API reference](https://docs.vatly.com/api-reference) · [Pagination examples](/packages/python/customers)
