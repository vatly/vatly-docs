# Test without real payments

> Vatly Python Fluent - Test without real payments

Use httpx's MockTransport with the real published SDK and Fluent. The following
example needs no API key or network connection and validates the outgoing cart.

```python
import json
import httpx
from vatly import AsyncVatlyClient
from vatly_fluent import Vatly, Wiring


async def example():
    def respond(request):
        assert request.method == "POST"
        assert request.url.path == "/v1/checkouts"
        assert json.loads(request.content)["products"] == [
            {"id": "one_off_product_example", "quantity": 2}
        ]
        return httpx.Response(
            200,
            json={
                "id": "checkout_example",
                "resource": "checkout",
                "testmode": True,
                "status": "created",
                "customerId": None,
                "orderId": None,
                "redirectUrlSuccess": "https://app.example.com/ok",
                "redirectUrlCanceled": "https://app.example.com/no",
                "billingAddress": None,
                "metadata": {},
                "locale": None,
                "createdAt": "2026-01-01T00:00:00Z",
                "expiresAt": None,
                "links": {
                    "self": {
                        "href": "https://api.vatly.com/v1/checkouts/checkout_example",
                        "type": "application/json",
                    },
                    "checkoutUrl": {
                        "href": "https://checkout.example.com/example",
                        "type": "text/html",
                    },
                },
            },
        )

    async with AsyncVatlyClient("test_" + "x" * 20, transport=httpx.MockTransport(respond)) as api:
        vatly = Vatly(Wiring(api, "https://app.example.com/ok", "https://app.example.com/no"))
        checkout = (
            await vatly.checkout_builder()
            .with_items(
                [
                    {"id": "one_off_product_example", "quantity": 2},
                ]
            )
            .create()
        )
        assert checkout.get_url() == "https://checkout.example.com/example"
        return checkout.id
```

For storage tests, exercise duplicate signed deliveries, rollback after a reaction
fails, conflicting checkout ownership and tenant/mode isolation. The source
repository's SQLite example demonstrates those contracts; production concurrency
needs your database's own integration tests.

<table>
<thead>
  <tr>
    <th>
      Test mode helper
    </th>
    
    <th>
      Remote effect
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        advance_renewal
      </code>
    </td>
    
    <td>
      Fast-forward a subscription renewal
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        force_renewal_paid
      </code>
      
      , <code>
        force_renewal_failed
      </code>
    </td>
    
    <td>
      Simulate renewal outcome
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        force_order_payment_paid
      </code>
      
      , <code>
        force_order_payment_failed
      </code>
    </td>
    
    <td>
      Simulate payment outcome
    </td>
  </tr>
</tbody>
</table>

These helpers live under `vatly.test_helpers()` and **mutate** the test account.
They are not mocks. Use only with an intentional test key; never call them in
ordinary unit tests or setup. The offline example above creates no Vatly data.

[API reference](https://docs.vatly.com/api-reference)
