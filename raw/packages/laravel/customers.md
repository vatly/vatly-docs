# Customers

Every billable model can be linked to a Vatly customer. The customer is created automatically when needed, or you can create one explicitly.

## Creating a customer

```php
// Create a Vatly customer for this user
$user->createAsVatlyCustomer();

// Create with extra data
$user->createAsVatlyCustomer([
    'locale' => 'nl_NL',
    'metadata' => ['internal_id' => $user->id],
]);
```

## Checking customer status

```php
// Check if the user has a Vatly customer ID
$user->hasVatlyId(); // bool

// Get the Vatly customer ID
$user->vatlyId(); // string|null
```

## Retrieving customer data

```php
// Get the full customer object from the Vatly API
$customer = $user->asVatlyCustomer();
```

## How it works

The `vatly_id` column on your billable model stores the Vatly customer identifier. When you call `createAsVatlyCustomer()`, it:

1. Sends a `POST` request to the Vatly API to create a customer
2. Stores the returned customer ID in the `vatly_id` column
3. Returns the customer response

If the user already has a `vatly_id`, calling `createAsVatlyCustomer()` will throw a `CustomerAlreadyCreatedException`.
