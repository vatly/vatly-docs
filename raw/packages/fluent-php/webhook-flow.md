# Webhook event flow

> Vatly PHP Fluent - Webhook event flow

This guide and the recipes in `docs/` sync to [Vatly Docs](https://docs.vatly.com/packages/fluent-php/webhook-flow) on pushes to `main`. The notifier uses the Actions secret `VATLY_DOCS_DISPATCH_TOKEN` with Contents: write access to `vatly/vatly-docs`.

A driver author shouldn't have to read several directories (the event DTOs and the `WebhookEventFactory` in `vatly-api-php`'s `Vatly\API\Webhooks\*`, plus fluent's `src/Webhooks/Reactions/` and `src/Contracts/`) to answer *"if I implement OrderWriter::store, which webhooks flow into it and with what data?"* This page is that single reference.

> **Where the event DTOs live:** the typed webhook events (`OrderPaid`, `OrderPaymentFailed`, `SubscriptionStarted`, …) are owned by **vatly-api-php** under `Vatly\API\Webhooks\Events\*` and consumed by fluent - fluent no longer ships its own `src/Events/` copies (only the driver-side `SubscriptionWasCreatedFromWebhook` / `OrderWasCreatedFromWebhook` / `NullEventDispatcher` remain in `Vatly\Fluent\Events\`). Their `taxSummary` field is a `Vatly\API\Types\TaxSummaryCollection` whose items expose `taxRate` (a `TaxSummaryRate`) + `amount` (a `Money`); call `$item->amount->toCents()` for integer cents. Order lines are `Vatly\API\Types\OrderLineData[]` (note: `Vatly\API\Types\`, not the old `Vatly\API\Data\`), and each line's `basePrice` / `total` / `subtotal` are likewise `Money`. The event construction - verify → parse → map - is owned by **vatly-api-php**: `Vatly\API\Webhooks\WebhookEventFactory` builds the typed events from the signed payload. Fluent owns the downstream orchestration (the reactions and `WebhookProcessor`, which records → reacts → dispatches) and consumes that factory.

> **Event money is Money, not int cents (api-php ≥ 0.1.0-alpha.18):** the `total` / `subtotal` fields on the money-bearing events are `Vatly\API\Types\Money` value objects (decimal-string `value` + `currency`), not raw integer cents. Read the currency off the Money (`$event->total->currency`) and flatten to integer cents with `$event->total->toCents()`. The **standalone currency field was removed** from `OrderPaid`, `OrderPaymentFailed`, `RefundCompleted`, `RefundFailed`, and `RefundCanceled` (their `total` / `subtotal` are non-null `Money`). The chargeback events `OrderChargebackReceived` / `OrderChargebackReversed` are the exception: their `total` / `subtotal` are typed **nullable** (`?Money`) at the api-php contract level and they **keep** a standalone `currency` string - though the fat chargeback payload populates the amounts in practice. Fluent's built-in reactions flatten `Money → int` at the persistence edge, so the driver-facing `Store*Data` / `Update*Data` DTOs still carry integer-cents `total` / `subtotal` and a `currency` string - drivers are unaffected.

The [README's "Webhook pipeline at a glance"](https://github.com/vatly/vatly-fluent-php/blob/main/README.md#webhook-pipeline-at-a-glance) table is the quick version; this one adds the **fields drivers care about** column so you know exactly what each `Store*Data` / event carries.

## How events are built (no API round-trip)

Vatly sends **fat, HMAC-signed** webhook deliveries: the payload's `object` is the full resource - byte-identical to the corresponding `GET /…/{id}` body (subtotal, the complete tax summary, lines, mandate). The HMAC signature (verified in `WebhookProcessor`) is the trust boundary, so the payload is the authoritative snapshot and there is **no follow-up API GET to "enrich"**. The mapping below is performed by api-php's `Vatly\API\Webhooks\WebhookEventFactory`:

- **order.paid, order.payment_failed, refund.*, order.chargeback_*, subscription.started, subscription.billing_updated, subscription.updated** - the matching api-php Resource (`Order` / `Refund` / `Chargeback` / `Subscription`) is hydrated in memory from `$webhook->object` (via `ResourceFactory::createResourceFromApiResult()`, the same path the API client uses to build a resource from a `GET` response), then mapped through the event's `fromApi*` constructor. Same enriched event - full tax breakdown, lines, mandate, dispute status - with zero network call.
- **order.canceled, checkout.*, subscription.cancellation_grace_period_completed, subscription.canceled_for_nonpayment, subscription.update_scheduled, webhook.setup** - built straight from the payload envelope; they carry no money/tax resource to hydrate. (`subscription.update_scheduled` exposes the envelope's `object.scheduledUpdate` as a typed `ScheduledSubscriptionUpdate`; `subscription.canceled_for_nonpayment` exposes `cancellationReason`.)

Because nothing depends on a live API call, a transient API error can never block a delivery, and all events (including `refund.*` and `order.chargeback_*`) are always supported regardless of which optional repositories are wired.

## Full matrix

<table>
<thead>
  <tr>
    <th>
      Vatly event
    </th>
    
    <th>
      Typed event
    </th>
    
    <th>
      Built-in reaction
    </th>
    
    <th>
      Repo method called
    </th>
    
    <th>
      Fields drivers care about
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
      <code>
        OrderPaid
      </code>
    </td>
    
    <td>
      <code>
        StoreOrderOnPaid
      </code>
    </td>
    
    <td>
      <code>
        OrderWriter::store(StoreOrderData)
      </code>
      
       if <code>
        findByVatlyId
      </code>
      
       is null (then dispatches <code>
        OrderWasCreatedFromWebhook
      </code>
      
      , skipped if store returns null), else <code>
        OrderWriter::update(…, UpdateOrderData)
      </code>
    </td>
    
    <td>
      <code>
        hostCustomerId
      </code>
      
       (pre-resolved via binding repo), <code>
        customerId
      </code>
      
      , <code>
        total
      </code>
      
      , <code>
        subtotal
      </code>
      
      , <code>
        currency
      </code>
      
      , <code>
        invoiceNumber
      </code>
      
      , <code>
        paymentMethod
      </code>
      
      , <code>
        taxSummary
      </code>
      
      , <code>
        metadata
      </code>
      
      , <code>
        lines
      </code>
      
      , <code>
        testmode
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.payment_failed
      </code>
    </td>
    
    <td>
      <code>
        OrderPaymentFailed
      </code>
    </td>
    
    <td>
      <code>
        StoreOrderOnPaymentFailed
      </code>
    </td>
    
    <td>
      <code>
        OrderWriter::store(StoreOrderData)
      </code>
      
       if new, else <code>
        OrderWriter::update(…, UpdateOrderData)
      </code>
    </td>
    
    <td>
      same as <code>
        order.paid
      </code>
      
       (sans <code>
        lines
      </code>
      
      ); persists whatever status the order in the signed payload carries (typically <code>
        pending
      </code>
      
       during dunning) - mirrors, never synthesises a <code>
        failed
      </code>
      
       status
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.canceled
      </code>
    </td>
    
    <td>
      <code>
        OrderCanceled
      </code>
    </td>
    
    <td>
      <code>
        CancelOrderOnCanceled
      </code>
    </td>
    
    <td>
      <code>
        OrderWriter::update(…, UpdateOrderData{status, cancellationReason})
      </code>
    </td>
    
    <td>
      <code>
        status
      </code>
      
       (== <code>
        canceled
      </code>
      
      ), plus <code>
        cancellationReason
      </code>
      
       (<code>
        payment_failure
      </code>
      
       or null) - find-or-skip, never creates
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        refund.completed
      </code>
      
       / <code>
        refund.failed
      </code>
      
       / <code>
        refund.canceled
      </code>
    </td>
    
    <td>
      <code>
        RefundCompleted
      </code>
      
       / <code>
        RefundFailed
      </code>
      
       / <code>
        RefundCanceled
      </code>
    </td>
    
    <td>
      <code>
        SyncRefundOnStatusChange
      </code>
      
       <em>
        (opt-in: needs <code>
          RefundRepositoryInterface
        </code>
        
        )
      </em>
    </td>
    
    <td>
      <code>
        RefundWriter::store(StoreRefundData)
      </code>
      
       if new, else <code>
        RefundWriter::update(…, UpdateRefundData)
      </code>
    </td>
    
    <td>
      <code>
        refundId
      </code>
      
      , <code>
        originalOrderId
      </code>
      
      , <code>
        customerId
      </code>
      
      , <code>
        hostCustomerId
      </code>
      
      , <code>
        status
      </code>
      
      , <code>
        total
      </code>
      
      , <code>
        subtotal
      </code>
      
      , <code>
        currency
      </code>
      
      , <code>
        taxSummary
      </code>
      
      , <code>
        testmode
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.started
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionStarted
      </code>
    </td>
    
    <td>
      <code>
        SyncSubscriptionOnStarted
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionWriter::store(StoreSubscriptionData)
      </code>
      
       then dispatches <code>
        SubscriptionWasCreatedFromWebhook
      </code>
      
       (skipped if store returns null)
    </td>
    
    <td>
      <code>
        hostCustomerId
      </code>
      
      , <code>
        customerId
      </code>
      
      , <code>
        planId
      </code>
      
      , <code>
        name
      </code>
      
      , <code>
        quantity
      </code>
      
      , <code>
        type
      </code>
      
      , <code>
        mandate
      </code>
      
      , <code>
        testmode
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.billing_updated
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionBillingUpdated
      </code>
    </td>
    
    <td>
      <code>
        SyncSubscriptionOnBillingUpdated
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionWriter::update(…, UpdateSubscriptionData{mandate})
      </code>
    </td>
    
    <td>
      <code>
        mandate
      </code>
      
       (card last-4 / masked IBAN) - find-or-skip
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.updated
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionUpdated
      </code>
    </td>
    
    <td>
      <code>
        SyncSubscriptionOnUpdated
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionWriter::update(…, UpdateSubscriptionData{planId, name, quantity})
      </code>
    </td>
    
    <td>
      immediate plan/price/interval/quantity change - <code>
        planId
      </code>
      
      , <code>
        name
      </code>
      
      , <code>
        quantity
      </code>
      
       (price is not persisted locally) - find-or-skip
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.update_scheduled
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionUpdateScheduled
      </code>
    </td>
    
    <td>
      - <em>
        (dispatched only)
      </em>
    </td>
    
    <td>
      none - change applies at the next cycle, current state unchanged
    </td>
    
    <td>
      typed <code>
        scheduledUpdate
      </code>
      
       (<code>
        ScheduledSubscriptionUpdate
      </code>
      
      : <code>
        subscriptionPlanId
      </code>
      
      , <code>
        name
      </code>
      
      , <code>
        description
      </code>
      
      , <code>
        basePrice
      </code>
      
      , <code>
        quantity
      </code>
      
      , <code>
        interval
      </code>
      
      , <code>
        intervalCount
      </code>
      
      , <code>
        effectiveAt
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.resumed
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionResumed
      </code>
    </td>
    
    <td>
      <code>
        ResumeSubscriptionOnResumed
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionWriter::update(…, UpdateSubscriptionData{endsAt: null})
      </code>
    </td>
    
    <td>
      clears <code>
        endsAt
      </code>
      
       - find-or-skip
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_immediately
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionCanceledImmediately
      </code>
    </td>
    
    <td>
      <code>
        CancelSubscriptionOnCanceled
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionWriter::update(…, UpdateSubscriptionData{endsAt, cancellationReason})
      </code>
    </td>
    
    <td>
      <code>
        endsAt
      </code>
      
       (== now), plus <code>
        cancellationReason
      </code>
      
       (<code>
        merchant_request
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_with_grace_period
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionCanceledWithGracePeriod
      </code>
    </td>
    
    <td>
      <code>
        CancelSubscriptionOnCanceled
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionWriter::update(…, UpdateSubscriptionData{endsAt, cancellationReason})
      </code>
    </td>
    
    <td>
      <code>
        endsAt
      </code>
      
       (future grace end), plus <code>
        cancellationReason
      </code>
      
       (<code>
        customer_request
      </code>
      
       / <code>
        merchant_request
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.canceled_for_nonpayment
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionCanceledForNonpayment
      </code>
    </td>
    
    <td>
      <code>
        CancelSubscriptionOnCanceled
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionWriter::update(…, UpdateSubscriptionData{endsAt, cancellationReason})
      </code>
    </td>
    
    <td>
      hard cancel after payment recovery is exhausted - <code>
        endsAt
      </code>
      
       (== now), plus <code>
        cancellationReason
      </code>
      
       (<code>
        payment_failure
      </code>
      
      ), persistable by the host
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        subscription.cancellation_grace_period_completed
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionCancellationGracePeriodCompleted
      </code>
    </td>
    
    <td>
      <code>
        EndSubscriptionOnGracePeriodCompleted
      </code>
    </td>
    
    <td>
      <code>
        SubscriptionWriter::update(…, UpdateSubscriptionData{endsAt})
      </code>
    </td>
    
    <td>
      <code>
        endsAt
      </code>
      
       (actual end; self-heals a missed/out-of-order cancel webhook)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        order.chargeback_received
      </code>
      
       / <code>
        order.chargeback_reversed
      </code>
    </td>
    
    <td>
      <code>
        OrderChargebackReceived
      </code>
      
       / <code>
        OrderChargebackReversed
      </code>
    </td>
    
    <td>
      <code>
        SyncChargebackOnStatusChange
      </code>
      
       <em>
        (opt-in: needs <code>
          ChargebackRepositoryInterface
        </code>
        
        )
      </em>
    </td>
    
    <td>
      <code>
        ChargebackWriter::store(StoreChargebackData)
      </code>
      
       if new, else <code>
        ChargebackWriter::update(…, UpdateChargebackData)
      </code>
    </td>
    
    <td>
      <code>
        chargebackId
      </code>
      
      , <code>
        originalOrderId
      </code>
      
      , <code>
        customerId
      </code>
      
      , <code>
        hostCustomerId
      </code>
      
      , <code>
        status
      </code>
      
      , <code>
        total
      </code>
      
      , <code>
        subtotal
      </code>
      
      , <code>
        currency
      </code>
      
      , <code>
        taxSummary
      </code>
      
      , <code>
        reason
      </code>
      
      , <code>
        testmode
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkout.paid
      </code>
      
       / <code>
        checkout.failed
      </code>
      
       / <code>
        checkout.canceled
      </code>
      
       / <code>
        checkout.expired
      </code>
    </td>
    
    <td>
      <code>
        CheckoutPaid
      </code>
      
       / <code>
        CheckoutFailed
      </code>
      
       / <code>
        CheckoutCanceled
      </code>
      
       / <code>
        CheckoutExpired
      </code>
    </td>
    
    <td>
      - <em>
        (dispatched only)
      </em>
    </td>
    
    <td>
      none - driver-handled
    </td>
    
    <td>
      <code>
        checkoutId
      </code>
      
      , <code>
        customerId
      </code>
      
       (nullable for anonymous), <code>
        orderId
      </code>
      
      , <code>
        status
      </code>
      
      , <code>
        metadata
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhook.setup
      </code>
    </td>
    
    <td>
      <code>
        WebhookSetupReceived
      </code>
    </td>
    
    <td>
      - <em>
        (dispatched only)
      </em>
    </td>
    
    <td>
      none - endpoint verification ping; acknowledge with <code>
        2xx
      </code>
    </td>
    
    <td>
      raw <code>
        WebhookReceived
      </code>
      
       envelope (<code>
        object
      </code>
      
       is the secret-free endpoint config)
    </td>
  </tr>
  
  <tr>
    <td>
      <em>
        (any unmapped event)
      </em>
    </td>
    
    <td>
      <code>
        UnsupportedWebhookReceived
      </code>
    </td>
    
    <td>
      -
    </td>
    
    <td>
      none
    </td>
    
    <td>
      raw <code>
        WebhookReceived
      </code>
      
       envelope
    </td>
  </tr>
</tbody>
</table>

## Reading the matrix

- **"store if new, else update"** - every entity reaction first calls `findByVatlyId()`. A null return routes to `store()`; a hit routes to `update()`. This is the idempotency hinge: once `store()` writes the Vatly id back, webhook re-deliveries safely hit `update()`. See the [host-owns-its-tables recipe](/packages/fluent-php/recipes/host-owns-its-tables).
- **"find-or-skip"** - the reaction only `update()`s an existing local record and never creates one (`order.canceled`, `subscription.billing_updated`, `subscription.updated`, `subscription.resumed`).
- **hostCustomerId** - resolved from your `CustomerBindingRepository` *before* the reaction calls your writer, so `store()` can fill the owner column directly. It's `null` for unattributed / anonymous-checkout rows; accept that.
- **cancellationReason is persistable** - when a cancellation ends the subscription, `CancelSubscriptionOnCanceled` passes the raw Vatly reason on `UpdateSubscriptionData` alongside `endsAt`; persist it if your host tracks *why* a subscription ended. All three cancel events carry one: `merchant_request` (`subscription.canceled_immediately`), `customer_request` / `merchant_request` (`subscription.canceled_with_grace_period`), and `payment_failure` (`subscription.canceled_for_nonpayment`). `null` means "no change" (don't overwrite a stored reason). `CancelOrderOnCanceled` does the same for orders on `UpdateOrderData`: `payment_failure` when payment recovery for the unpaid order was exhausted, otherwise `null`.
- **store may return null** - `OrderWriter`, `SubscriptionWriter`, `RefundWriter`, and `ChargebackWriter` `store()` may return `null` when the driver can't route the data. Built-in reactions tolerate it.
- **opt-in reactions** register only when their repository is wired into `Wiring`. Without it, the typed events still dispatch for you to handle yourself.
- **order reversal progress is not a webhook reaction.** Whether - and how much of - an order was returned to the customer (by refund *or* chargeback) is read from the live API Order via `OrderHandle::reversedSubtotal()` / `refundableSubtotal()` / `isReversed()` / `isPartiallyReversed()` / `isFullyReversed()`. The order's own `status` stays terminal `paid`; fluent never synthesizes a local refunded/chargeback status.
