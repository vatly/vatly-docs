# Checkouts

> Vatly Python SDK - Checkouts

Create a hosted payment page and redirect your buyer to it. A checkout can contain
one-off products, subscription plans, or both. Use IDs from your own product catalog.
Examples accept the client from [setup](/packages/python/readme).

## Create a payment page

```python
from vatly import RequestOptions, VatlyClient
from vatly.models import CreateCheckoutRequest


def example(client: VatlyClient):
    checkout = client.checkouts.create(
        CreateCheckoutRequest(
            products=[{"id": "one_off_product_example", "quantity": 1}],
            redirect_url_success="https://app.example.com/billing/success",
            redirect_url_canceled="https://app.example.com/billing/canceled",
            customer_id="customer_example",
        ),
        options=RequestOptions(idempotency_key="purchase:order-42"),
    )
    return checkout.id, checkout.links.checkout_url.href
```

Persist the purchase key before calling Vatly and reuse it after a timeout. A new
key can create a second purchase. The raw SDK Checkout has no `get_url()` method;
that convenience belongs to Fluent.

<table>
<thead>
  <tr>
    <th>
      Input model field
    </th>
    
    <th>
      Wire key
    </th>
    
    <th>
      Required?
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        products
      </code>
    </td>
    
    <td>
      <code>
        products
      </code>
    </td>
    
    <td>
      Yes: items with <code>
        id
      </code>
      
      , positive <code>
        quantity
      </code>
      
      ; optional <code>
        trialDays
      </code>
      
       for plans
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirect_url_success
      </code>
    </td>
    
    <td>
      <code>
        redirectUrlSuccess
      </code>
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        redirect_url_canceled
      </code>
    </td>
    
    <td>
      <code>
        redirectUrlCanceled
      </code>
    </td>
    
    <td>
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customer_id
      </code>
    </td>
    
    <td>
      <code>
        customerId
      </code>
    </td>
    
    <td>
      No: an authorized existing customer
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        locale
      </code>
      
      , <code>
        metadata
      </code>
      
      , <code>
        billing_address
      </code>
    </td>
    
    <td>
      <code>
        locale
      </code>
      
      , <code>
        metadata
      </code>
      
      , <code>
        billingAddress
      </code>
    </td>
    
    <td>
      No
    </td>
  </tr>
</tbody>
</table>

Pydantic inputs accept Python names. Dictionary inputs use wire keys, including
`trialDays` inside product dictionaries. Omit `customer_id` for a guest checkout.

## Read a checkout or traverse pages

```python
from vatly import VatlyClient


def example(client: VatlyClient):
    checkout = client.checkouts.get("checkout_example")
    page = client.checkouts.list({"limit": 10})
    ids = [item.id for item in client.checkouts.list_all({"limit": 25})]
    return checkout.order_id, page.count, ids
```

<table>
<thead>
  <tr>
    <th>
      Response field
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
        id
      </code>
      
      , <code>
        status
      </code>
      
      , <code>
        testmode
      </code>
    </td>
    
    <td>
      Identifier, payment state and mode
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customer_id
      </code>
    </td>
    
    <td>
      Customer when assigned; may be None
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order_id
      </code>
    </td>
    
    <td>
      Read this Order for purchased lines; may be None before payment
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        links.checkout_url.href
      </code>
    </td>
    
    <td>
      Hosted checkout destination
    </td>
  </tr>
</tbody>
</table>

The success redirect is **not payment confirmation**. Use [signed webhooks](/packages/python/webhooks)
and your own ownership records. Checkout responses do not contain a products array.

[Checkout API reference](https://docs.vatly.com/api-reference/checkouts) · [All methods](/packages/python/api#checkouts)
