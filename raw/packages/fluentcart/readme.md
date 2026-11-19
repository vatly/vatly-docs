# FluentCart

> Accept payments through Vatly in FluentCart, the WordPress e-commerce plugin.

Accept payments through Vatly in FluentCart, the WordPress e-commerce plugin.
Vatly is the European Merchant of Record for AI, software and digital products.
This plugin registers Vatly as a FluentCart payment gateway and builds on PHP Fluent and the PHP SDK.

<warning>

**Unreleased.** No release of this plugin has been published yet, and its payment
confirmation flow has not been verified against current FluentCart versions.
Use it only in Vatly test mode, and do not take live payments with it yet.
Expect breaking changes before the first alpha release.

</warning>

## What it does

- **Merchant-of-Record checkout** for one-off products and subscriptions, including free trials carried over from FluentCart.
- **Official Vatly invoices** on the FluentCart receipt and as shortcodes. FluentCart's own competing receipt email is suppressed for Vatly orders, so customers never receive two invoices for one purchase.
- **Refunds routed through Vatly**, so Vatly issues the credit note and its VAT, and the result is recorded on the FluentCart order.
- **Per-record test and live mode**, frozen at checkout, so refunds always use the API key that matches the original order.

## Requirements

- WordPress 6.2 or newer
- PHP 8.1 or newer
- [FluentCart](https://fluentcart.com) installed and active
- A [Vatly](https://vatly.com) account with test-mode API credentials

## Installation

There is no release zip yet. Build the plugin from source:

```bash
git clone https://github.com/vatly/vatly-fluentcart-wp.git
cd vatly-fluentcart-wp
bin/build-release.sh
```

The script produces `build/vatly-for-fluentcart.zip` with a namespace-scoped copy of its dependencies (it needs PHP, Composer, curl and zip).
In WordPress, go to **Plugins → Add New → Upload Plugin**, choose the zip, and activate it.

For development, run `composer install` in the clone instead, then place or symlink the directory in `wp-content/plugins/`.

## Setup

1. **Add your API credentials.** Go to **FluentCart → Settings → Payment Methods → Vatly**, choose **Test** mode, and paste the test **API key** and **Webhook secret** from the **Developers** section of your Vatly dashboard.
2. **Register the webhook in Vatly.** Under **Developers** in the Vatly dashboard, add a webhook endpoint pointing at:```text
https://your-site.com/wp-admin/admin-ajax.php?action=fluent_cart_vatly_webhook
```

<br />

Use the webhook secret you entered above. Vatly's `order.paid` webhook stamps the official invoice onto each order.
3. **Map your products to Vatly.** Edit a FluentCart product and fill in the **Vatly mapping** box with the IDs from **Manage Products** in your Vatly dashboard:
  - **Vatly product ID**: the `one_off_product_…` ID, for one-time products.
  - **Vatly plan ID**: the `subscription_plan_…` ID, for subscription products.<br />

A checkout fails with a clear error when the product it sells has no matching Vatly ID.

## Invoices

Vatly issues the legally valid VAT invoice and, for refunds, the credit note. When a Vatly `order.paid` webhook arrives, the plugin stores the Vatly invoice URL on the FluentCart order and the credit-note URL on refunds. Show the invoice anywhere FluentCart accepts shortcodes:

<table>
<thead>
  <tr>
    <th>
      Shortcode
    </th>
    
    <th>
      Output
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        [vatly_invoice_link]
      </code>
    </td>
    
    <td>
      A plain "Download official Vatly invoice" link.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        [vatly_invoice_button]
      </code>
    </td>
    
    <td>
      The same link, styled as a button.
    </td>
  </tr>
</tbody>
</table>

Both accept an optional `order_id`, for example `[vatly_invoice_link order_id="123"]`; otherwise they use FluentCart's current order. They render nothing for orders without a Vatly invoice, so they are safe in templates shared with other gateways. The invoice button also appears automatically on the FluentCart receipt page.

For the FluentCart hooks the invoicing relies on, see [Merchant-of-Record invoicing](/packages/fluentcart/merchant-of-record).

## Refunds

Refunds issued from the FluentCart admin go through Vatly, then are recorded on the FluentCart transaction.

- **Full refunds** are supported.
- **Partial refunds on single-item orders** are refunded against the order's line.
- **Partial refunds on multi-item orders** are not supported from FluentCart. Issue a full refund, or refund a specific line from the Vatly dashboard.

Vatly refunds are asynchronous: the FluentCart refund starts with Vatly's initial status, usually `pending`, and moves to `refunded` once Vatly confirms it.

Each FluentCart transaction keeps the mode (test or live) it had at checkout. Refunds use the API key for that record's mode, not the gateway's current setting.

## Development

```bash
composer install
composer test:unit          # PHPUnit unit suite
composer test:integration   # integration suite (see docker/ for a WordPress + FluentCart environment)
composer analyse            # PHPStan
composer phpcs              # WordPress coding standards
```

The source and issue tracker are on [GitHub](https://github.com/vatly/vatly-fluentcart-wp).
