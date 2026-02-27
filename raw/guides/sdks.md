# Vatly SDKs

> Vatly offers official SDKs to make integrating the API into your application quick and easy.

## PHP SDK

The official PHP SDK is the primary way to interact with the Vatly API from your PHP application.

### Installation

```bash
composer require vatly/vatly-api-php
```

### Quick example

```php
$vatly = new \Vatly\API\VatlyApiClient();
$vatly->setApiKey('live_your_api_key_here');

// Create a checkout
$checkout = $vatly->checkouts->create([
    'products' => [
        ['id' => 'plan_abc123', 'quantity' => 1],
    ],
    'redirectUrlSuccess' => 'https://example.com/success',
    'redirectUrlCanceled' => 'https://example.com/canceled',
]);

// Redirect to the hosted checkout page
header('Location: ' . $checkout->links->checkoutUrl->href, true, 303);
```

### Resources

The PHP SDK provides convenient access to all Vatly API resources:

<table>
<thead>
  <tr>
    <th>
      Resource
    </th>
    
    <th>
      Usage
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Customers
    </td>
    
    <td>
      <code>
        $vatly->customers->page()
      </code>
      
      , <code>
        ->create()
      </code>
      
      , <code>
        ->get()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Checkouts
    </td>
    
    <td>
      <code>
        $vatly->checkouts->page()
      </code>
      
      , <code>
        ->create()
      </code>
      
      , <code>
        ->get()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Subscriptions
    </td>
    
    <td>
      <code>
        $vatly->subscriptions->page()
      </code>
      
      , <code>
        ->get()
      </code>
      
      , <code>
        ->update()
      </code>
      
      , <code>
        ->cancel()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Subscription Plans
    </td>
    
    <td>
      <code>
        $vatly->subscriptionPlans->page()
      </code>
      
      , <code>
        ->get()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Orders
    </td>
    
    <td>
      <code>
        $vatly->orders->page()
      </code>
      
      , <code>
        ->get()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Refunds
    </td>
    
    <td>
      <code>
        $vatly->refunds->page()
      </code>
      
      , <code>
        ->get()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Order Refunds
    </td>
    
    <td>
      <code>
        $vatly->orders->refunds($orderId)->create()
      </code>
      
      , <code>
        ->page()
      </code>
      
      , <code>
        ->get()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Chargebacks
    </td>
    
    <td>
      <code>
        $vatly->chargebacks->page()
      </code>
      
      , <code>
        ->get()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      One-off Products
    </td>
    
    <td>
      <code>
        $vatly->oneOffProducts->page()
      </code>
      
      , <code>
        ->get()
      </code>
    </td>
  </tr>
</tbody>
</table>

---

## Other languages

Support for additional languages is planned:

<table>
<thead>
  <tr>
    <th>
      Language
    </th>
    
    <th>
      Status
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      PHP
    </td>
    
    <td>
      Available
    </td>
  </tr>
  
  <tr>
    <td>
      JavaScript / Node.js
    </td>
    
    <td>
      Coming soon
    </td>
  </tr>
  
  <tr>
    <td>
      Python
    </td>
    
    <td>
      Coming soon
    </td>
  </tr>
  
  <tr>
    <td>
      Ruby
    </td>
    
    <td>
      Coming soon
    </td>
  </tr>
</tbody>
</table>

In the meantime, you can use the [REST API directly](/guides/authentication) with any HTTP client in any language.
