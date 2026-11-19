# Merchant-of-Record invoicing: implementation notes

> How the plugin makes Vatly the single source of truth for invoices on FluentCart orders, and the FluentCart integration points it relies on.

How the plugin makes Vatly the single source of truth for invoices on FluentCart
orders, and the FluentCart integration points it relies on. This is reference
material for maintainers; end users only need the [README](https://github.com/vatly/vatly-fluentcart-wp/blob/main/README.md).

## The problem

Vatly is the Merchant of Record, so the legally valid VAT invoice (and, for
refunds, the credit note) is the one **Vatly** issues. FluentCart also generates
its own receipt/invoice. Left alone, a customer paying via Vatly would receive
**two competing invoices** for one purchase.

The plugin therefore (a) surfaces Vatly's invoice and (b) suppresses
FluentCart's own invoicing, but only for orders paid via the Vatly gateway
(`payment_method === 'vatly'`). Every guard callback is a strict no-op for
non-Vatly orders. The guard lives in `src/Support/MoRInvoiceGuard.php`.

## Hooks used (verified against FluentCart free v1.3.28)

The guard wires only hooks confirmed to exist **and fire** in FluentCart free
1.3.28. Each wired hook carries a `// verified: …` file:line comment in the
source.

<table>
<thead>
  <tr>
    <th>
      Intent
    </th>
    
    <th>
      FluentCart hook
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Suppress FluentCart's competing customer receipt/invoice email (and its PDF attachment)
    </td>
    
    <td>
      <code>
        fluent_cart/should_send_email_notification
      </code>
      
       (filter, <code>
        EmailNotificationMailer::mailEmailsOfEvent
      </code>
      
      )
    </td>
    
    <td>
      Returns <code>
        false
      </code>
      
       for the <code>
        order_paid_customer
      </code>
      
       notification (event <code>
        order_paid
      </code>
      
      , subject "Purchase Receipt #<binding value="order.invoice_no">
        
      </binding>
      
      ") on Vatly orders: the only customer mail that doubles as FluentCart's invoice and the only one that can attach FluentCart's PDF receipt. No email ⇒ no competing invoice and no attached PDF (covers Pro too). All other notifications (refunds, shipping, subscription, and every admin copy) pass through untouched.
    </td>
  </tr>
  
  <tr>
    <td>
      Surface the Vatly invoice link on the customer receipt page
    </td>
    
    <td>
      <code>
        fluent_cart/receipt/thank_you/after_order_items
      </code>
      
       (action, <code>
        ThankYouRender
      </code>
      
      )
    </td>
    
    <td>
      Auto-renders the Vatly invoice button (reusing the shortcode renderer) beneath the order items for Vatly orders.
    </td>
  </tr>
</tbody>
</table>

## Why some surfaces aren't hooked

- **FluentCart Pro PDF receipt** (`fluent_cart/pdf/generate_receipt`) only fires
under Pro + FluentPDF (`OrderService::canGenerateReceiptPdf()` +
`defined('FLUENT_PDF')`), so it never runs on free. Suppressing the receipt
*email* already drops its PDF attachment on Pro, so no separate handler is
needed.
- **Refund PDF / refund URL**: FluentCart free exposes no hook to redirect a
refund PDF, and there is no free refund-PDF surface to gate.
- **Admin billing-detail edits**: FluentCart free fires no action or filter
around `CustomerAddressResource::update` or the admin
`CustomerController::updateAddress`, so an admin edit of an order's/customer's
billing address cannot be blocked or mirrored.

These FluentCart-side artifacts remain FluentCart-local and **non-authoritative**;
Vatly's invoice and credit note are the legal record of account. For
subscriptions, point staff to the Vatly customer portal
(`SubscriptionService::updateBillingUrl()`) when billing details must change; a
FluentCart-local edit never reaches Vatly's already-issued invoice.

> Earlier revisions referenced several FluentCart hook names that don't exist in
> core; those have been removed. If you extend the guard, confirm any new hook
> actually fires in the FluentCart version you target before relying on it.
