# Event flow

> Choose the event that matches your task.

Choose the event that matches your task. To listen for a paid order, implement your event dispatcher and register it in `Wiring`. This small adapter forwards typed events to an application callback:

```php
use Vatly\Fluent\Contracts\EventDispatcherInterface;

final class BillingEvents implements EventDispatcherInterface
{
    public function __construct(private Closure $listener) {}

    public function dispatch(object $event): void
    {
        ($this->listener)($event);
    }
}
```

In production, let that callback write outbox jobs on the same transaction as your repositories. It receives the typed event after the built-in reactions have run. Follow [Webhooks](/packages/fluent-php/webhooks) for verification, deduplication, and the transaction boundary.

## Events that save records

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Built-in persistence
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        order.paid
      </code>
    </td>
    
    <td>
      Find by Vatly ID; store a new order or update the existing one. New store data includes lines.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.payment_failed
      </code>
    </td>
    
    <td>
      Store or update the order with the payload's status, usually <code>
        pending
      </code>
      
       during recovery. It does not invent a <code>
        failed
      </code>
      
       order status.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.canceled
      </code>
    </td>
    
    <td>
      Update an existing order's status and cancellation reason; skip if missing.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.started
      </code>
    </td>
    
    <td>
      Store a new subscription or update an existing one.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.updated
      </code>
    </td>
    
    <td>
      Update an existing subscription's plan, name, and quantity for an immediate change.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.billing_updated
      </code>
    </td>
    
    <td>
      Update an existing subscription's mandate summary.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.resumed
      </code>
    </td>
    
    <td>
      Clear the end date on an existing subscription.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_immediately
      </code>
      
      , <code>
        subscription.canceled_with_grace_period
      </code>
    </td>
    
    <td>
      Update the existing subscription's confirmed end date and reason.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_for_nonpayment
      </code>
    </td>
    
    <td>
      End the existing subscription after recovery is exhausted, with reason <code>
        payment_failure
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.cancellation_grace_period_completed
      </code>
    </td>
    
    <td>
      Stamp the actual end date on an existing subscription.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.completed
      </code>
      
      , <code>
        refund.failed
      </code>
      
      , <code>
        refund.canceled
      </code>
    </td>
    
    <td>
      Store or update only when a refund repository is wired.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.chargeback_received
      </code>
      
      , <code>
        order.chargeback_reversed
      </code>
    </td>
    
    <td>
      Store or update only when a chargeback repository is wired. The order stays <code>
        paid
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

Order and subscription creation resolve `hostCustomerId` through your binding repository. It can be `null`. The store DTOs carry `testmode`; persist it. Order, refund, and chargeback store DTOs also carry totals, currency, and tax details.

All entity stores can return `null` for an unroutable record. Successful new paid-order and subscription stores dispatch `OrderWasCreatedFromWebhook` and `SubscriptionWasCreatedFromWebhook`. Updates do not dispatch those local-created events. This distinction is not a concurrency lock: enforce unique IDs and transactions in storage.

Partial updates use `null` for no change. Persist cancellation reasons if your host needs them. Subscription resume uses `clearEndsAt: true`; honor it in your writer.

## Events your app handles

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Useful for
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        subscription.update_scheduled
      </code>
    </td>
    
    <td>
      Showing a pending next-cycle change from the typed <code>
        scheduledUpdate
      </code>
      
      . No current local plan change.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.paid
      </code>
    </td>
    
    <td>
      Checkout analytics or handoff. Use <code>
        order.paid
      </code>
      
       for full order persistence.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.failed
      </code>
      
      , <code>
        checkout.canceled
      </code>
      
      , <code>
        checkout.expired
      </code>
    </td>
    
    <td>
      Retry and abandoned-cart flows.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhook.setup
      </code>
    </td>
    
    <td>
      Endpoint setup verification; acknowledge with 2xx.
    </td>
  </tr>
  
  <tr>
    <td>
      Product update, approval, rejection, archive, and unarchive events
    </td>
    
    <td>
      Catalog notifications; no built-in storage.
    </td>
  </tr>
  
  <tr>
    <td>
      Unknown event names
    </td>
    
    <td>
      <code>
        UnsupportedWebhookReceived
      </code>
      
      , so you can observe new events without inventing a handler.
    </td>
  </tr>
</tbody>
</table>

Refund and chargeback events still dispatch when their optional repositories are absent. Checkout events do not create local orders or bindings on their own. Anonymous checkout events may have no customer ID yet.

## Money and snapshots

Typed event classes are owned by `vatly-api-php` in `Vatly\API\Webhooks\Events`. Money-bearing events use `Money`, not integer amounts. For paid orders and refunds, read currency from `total->currency`; use `total->toCents()` for local integer cents. Chargeback amounts are nullable at the event contract level and retain a separate currency field.

Fluent builds events from the signed resource snapshot without a follow-up GET. Its reactions flatten money to integer cents in persistence DTOs. They do not save subscription prices or build entitlement policy for you. Reversal totals are read live through the [order handle](/packages/fluent-php/orders), not synthesized into order statuses.

See [Host tables](/packages/fluent-php/host-owns-its-tables) for routing initial payments and renewals, and the [API reference](https://docs.vatly.com/api-reference) for complete payload fields.
