# Chargebacks

Chargebacks occur when a customer disputes a payment with their bank. Vatly notifies you via webhooks when chargebacks happen.

## The Chargeback Resource

Below you'll find all properties for the Vatly Chargeback resource.

### Properties

| Name | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the chargeback (`chb_...`). |
| `status` | `string` | The status: `open`, `won`, or `lost`. |
| `orderId` | `string` | The disputed order ID. |
| `amount` | `integer` | Chargeback amount in cents. |
| `currency` | `string` | Three-letter ISO currency code. |
| `reason` | `string|null` | Reason provided by the bank. |
| `testmode` | `bool` | Whether this is a test chargeback. |
| `createdAt` | `string` | Creation timestamp (ISO 8601). |

---

## Retrieve a chargeback

`GET /v1/chargebacks/:id`



Retrieve a chargeback by its ID.




```php
$chargeback = $vatly->chargebacks->get('chb_abc123');

echo $chargeback->status;
echo $chargeback->amount / 100 . ' ' . $chargeback->currency;
echo $chargeback->reason;
```



---

## List all chargebacks

`GET /v1/chargebacks`



Retrieve a paginated list of all chargebacks.

### Optional attributes

| Name | Type | Description |
| --- | --- | --- |
| `limit` | `integer` | The number of chargebacks to return (default: 10, max: 100). |
| `startingAfter` | `string` | A cursor for pagination. |




```php
$chargebacks = $vatly->chargebacks->list();

foreach ($chargebacks as $chargeback) {
    echo $chargeback->id . ': ' . $chargeback->status;
}
```



---

## Chargeback statuses

| Status | Description |
|--------|-------------|
| `open` | Dispute is ongoing |
| `won` | You won the dispute |
| `lost` | You lost the dispute |

---

## Helper methods



The Chargeback object provides convenient helper methods.




```php
$chargeback->isOpen();  // true if status is 'open'
$chargeback->isWon();   // true if status is 'won'
$chargeback->isLost();  // true if status is 'lost'
```
