# Configure Fluent

> Keep the SDK client open for your application or worker lifespan.

Keep the SDK client open for your application or worker lifespan. Fluent reuses
it; the caller remains responsible for closing it. See [installation](/packages/fluent-python/readme).

## Add your storage driver

The `driver` below is your implementation of the [storage contracts](/packages/fluent-python/coreconcepts).
Use one scope per tenant, storefront and test/live mode. Django users can use
`vatly-django` instead of implementing this adapter.

```python
from vatly import AsyncVatlyClient
from vatly_fluent import Vatly, Wiring


def example(api: AsyncVatlyClient, driver):
    return Vatly(
        Wiring(
            api=api,
            redirect_url_success="https://app.example.com/billing/success",
            redirect_url_canceled="https://app.example.com/billing/canceled",
            webhook_secret="replace-with-your-endpoint-secret",
            checkouts=driver.checkouts,
            bindings=driver.bindings,
            orders=driver.orders,
            subscriptions=driver.subscriptions,
            refunds=driver.refunds,
            chargebacks=driver.chargebacks,
            webhook_calls=driver,
            events=driver,
        )
    )
```

Load the endpoint secret from your secret manager rather than a source-code literal.
The sample value is only a placeholder.

<table>
<thead>
  <tr>
    <th>
      Wiring field
    </th>
    
    <th>
      Required for
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        api
      </code>
      
      , both redirect URLs
    </td>
    
    <td>
      Hosted checkout creation
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkouts
      </code>
    </td>
    
    <td>
      <code>
        .for_entity(...)
      </code>
      
       and resource ownership links
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        bindings
      </code>
    </td>
    
    <td>
      Customer-to-host identity mapping
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        orders
      </code>
      
      , <code>
        subscriptions
      </code>
    </td>
    
    <td>
      Local signed snapshots and lifecycle helpers
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refunds
      </code>
      
      , <code>
        chargebacks
      </code>
    </td>
    
    <td>
      Optional local reversal records
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhook_secret
      </code>
      
      , <code>
        webhook_calls
      </code>
      
      , <code>
        events
      </code>
    </td>
    
    <td>
      Verified, transactional delivery and outbox
    </td>
  </tr>
</tbody>
</table>

Missing wiring fails when its feature is used. API-only checkout creation does not
require repositories. A customer email in a profile does not create a remote customer.

## Retry the same business operation

```python
from vatly import RequestOptions
from vatly_fluent import Vatly


async def example(vatly: Vatly):
    return (
        await vatly.checkout_builder()
        .with_items(
            [
                {"id": "one_off_product_example", "quantity": 1},
            ]
        )
        .create(options=RequestOptions(idempotency_key="purchase:42", timeout=10))
    )
```

Persist that key before calling. Reuse it after a network or local-save failure;
do not generate a second purchase key on retry. SDK errors propagate unchanged.
Live/test keys share a host; `.in_testmode()` checks the key, not switches it.

[API reference](https://docs.vatly.com/api-reference)
