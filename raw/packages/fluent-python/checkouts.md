# Create hosted checkouts

> Vatly Python Fluent - Create hosted checkouts

Build a cart, then call `create()` to make the API request. The result is a full
SDK Checkout with Fluent's `get_url()` convenience. Pass the configured
`vatly` from [Configuration](/packages/fluent-python/configuration) to these functions.

## Sell a one-off or mixed cart

```python
from vatly import RequestOptions
from vatly_fluent import CustomerProfile, EntityRef, Vatly


async def example(vatly: Vatly):
    checkout = (
        await vatly.checkout_builder(CustomerProfile(vatly_id="customer_example"))
        .with_items(
            [
                {"id": "one_off_product_example", "quantity": 2},
                {"id": "subscription_plan_example", "quantity": 1},
            ]
        )
        .with_metadata({"purchaseId": "42"})
        .for_entity(EntityRef("team", "42"))
        .create(options=RequestOptions(idempotency_key="purchase:42"))
    )
    return checkout.id, checkout.get_url()
```

The customer and entity must already be authorized. Omit the profile for a guest
checkout. `.for_entity()` needs the checkout-record driver.

## Start a subscription with a trial

```python
from vatly import RequestOptions
from vatly_fluent import Vatly


async def example(vatly: Vatly):
    return (
        await vatly.subscribe()
        .to_plan("subscription_plan_example")
        .with_quantity(3)
        .with_trial_days(14)
        .in_testmode()
        .create(options=RequestOptions(idempotency_key="trial:42"))
    )
```

`subscribe().create()` creates a **checkout**, not an immediate subscription.
Use the general builder for mixed carts. Reusing a subscription builder replaces
its plan item rather than appending another.

<table>
<thead>
  <tr>
    <th>
      Builder method
    </th>
    
    <th>
      Purpose
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        with_items
      </code>
    </td>
    
    <td>
      Append detached cart items
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        to_plan
      </code>
      
      , <code>
        with_quantity
      </code>
    </td>
    
    <td>
      Select one plan and a positive integer quantity
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_trial_days
      </code>
      
      , <code>
        with_trial_ends_at
      </code>
    </td>
    
    <td>
      Trial length or aware deadline, rounded up to whole days
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_redirect_url_success
      </code>
      
      , <code>
        with_redirect_url_canceled
      </code>
    </td>
    
    <td>
      Override default redirects
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_locale
      </code>
      
      , <code>
        with_metadata
      </code>
      
      , <code>
        with_billing_address
      </code>
    </td>
    
    <td>
      Add checkout details
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        payload
      </code>
    </td>
    
    <td>
      Inspect a detached wire-format dictionary without a request
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        in_testmode
      </code>
      
      , <code>
        in_live_mode
      </code>
    </td>
    
    <td>
      Assert the existing key's mode
    </td>
  </tr>
</tbody>
</table>

Store the purchase key before the API call and reuse it after ambiguous failures,
including a local-save failure after remote success. The redirect does not prove
payment; use [webhooks](/packages/fluent-python/webhooks). Read lines through `checkout.order_id`'s Order.

[Checkout API reference](https://docs.vatly.com/api-reference/checkouts)
