# FluentCart

> Sell from your FluentCart store with Vatly as the Merchant of Record, so you don't have to handle VAT yourself.

Sell from your FluentCart store with Vatly as the Merchant of Record, so you don't have to handle VAT yourself.
Vatly is the European Merchant of Record for AI, software and digital products: it is the legal seller on every sale, charges the right VAT or sales tax for each customer's country, issues the invoice and credit notes, and carries the compliance burden.
This plugin adds Vatly as a payment gateway to [FluentCart](https://fluentcart.com), the WordPress e-commerce plugin.

<warning>

**Alpha.** The plugin works end to end with Vatly test mode on FluentCart 2.3, but it
can still change in ways that need you to update your setup. Try it in Vatly test mode
before you take live payments with it.

</warning>

## What you get

- **Checkout for one-off products and subscriptions**, including free trials carried over from FluentCart, so the first charge lands after the trial.
- **One official invoice per purchase.** Vatly's invoice is shown on the FluentCart receipt and available as shortcodes. FluentCart's own competing receipt email is suppressed for Vatly orders, so customers never receive two invoices for one purchase.
- **Refunds routed through Vatly**, so Vatly issues the credit note and its VAT, and the result is recorded on the FluentCart order.
- **FluentCart keeps working as before.** The plugin fires FluentCart's own events for every payment and subscription change, including renewals, failed payments, refunds, cancellations and chargebacks, so other plugins that listen to FluentCart keep working.
- **Test and live mode per record.** Each order keeps the mode it had at checkout, so a refund always uses the API key that matches the original order.

## Requirements

- WordPress 6.2 or newer
- PHP 8.1 or newer
- [FluentCart](https://fluentcart.com) 2.3 or newer, installed and active
- A [Vatly](https://vatly.com) account with API credentials

## Quick start

### 1. Install the plugin

Download the zip from the [latest release](https://github.com/vatly/vatly-fluentcart-wp/releases/latest), then in WordPress go to **Plugins → Add New → Upload Plugin**, choose the zip, and activate it. The zip includes the plugin's dependencies, so you don't need Composer.

If your site manages its plugins with Composer, such as a Bedrock site with `composer/installers`, require the plugin from Packagist instead. Its dependencies are alpha releases, so allow alpha packages first:

```bash
composer config minimum-stability alpha
composer config prefer-stable true
composer require vatly/vatly-fluentcart
```

The plugin installs as `vatly-for-fluentcart` in your plugins directory, the same name the zip uses. Its dependencies load through your site's Composer autoloader, which Bedrock includes. Then activate the plugin in WordPress.

### 2. Connect Vatly

1. **Add your API credentials.** Go to **FluentCart → Settings → Payment Methods → Vatly**, choose **Test** mode, and paste the test **API key** and **Webhook secret** from the **Developers** section of your Vatly dashboard.
2. **Register the webhook in Vatly.** Under **Developers** in the Vatly dashboard, add a webhook endpoint pointing at:```text
https://your-site.com/wp-admin/admin-ajax.php?action=fluent_cart_vatly_webhook
```

<br />

Use the webhook secret you entered above. Vatly's `order.paid` webhook stamps the official invoice onto each order. Until a webhook secret is saved for the current mode, the endpoint answers `503` and processes nothing; Vatly retries the delivery once it is saved.

### 3. Map your products

Edit a FluentCart product and fill in the **Vatly mapping** box with the IDs from **Manage Products** in your Vatly dashboard:

- **Vatly product ID**: the `one_off_product_…` ID, for one-time products.
- **Vatly plan ID**: the `subscription_plan_…` ID, for subscription products.

A checkout fails with a clear error when the product it sells has no matching Vatly ID.

### 4. Test, then go live

Place a test order in Vatly test mode and check that the Vatly invoice appears on the receipt. When it works, switch the gateway to **Live** and enter your live API key and webhook secret.

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

## Data the plugin stores

For your records of processing and for access and deletion requests:

- **Settings:** your Vatly API keys and webhook secrets, encrypted, in FluentCart's settings.
- **Customer links:** the table `{prefix}vatly_customer_bindings` maps each Vatly customer ID to its FluentCart customer ID. It holds no names or contact details.
- **Webhook log:** the table `{prefix}vatly_webhook_calls` keeps each webhook Vatly sends, for debugging. Personal fields (customer name, email, address, tax ID, payment method details) are redacted before it is stored, so they read `[redacted]`; the event's IDs, statuses, amounts, tax and order lines are kept. Entries are deleted after 30 days. Change that with the `vatly_fluentcart_webhook_log_retention_days` filter, for example `add_filter('vatly_fluentcart_webhook_log_retention_days', fn () => 7);`.

Orders, subscriptions and transactions are FluentCart's own records. Deleting the plugin removes both tables, its settings and its scheduled jobs, and leaves those records in place.

## Building from source

To build the zip yourself, run `bin/build-release.sh` in a clone of the repository. It produces `build/vatly-for-fluentcart.zip` with a namespace-scoped copy of the dependencies, and needs PHP, Composer, curl and zip.

For development, run `composer install` in the clone instead, then place or symlink the directory in `wp-content/plugins/`.

## Development

```bash
composer install
composer test:unit          # PHPUnit unit suite
composer test:integration   # integration suite (see docker/ for a WordPress + FluentCart environment)
composer analyse            # PHPStan
composer phpcs              # WordPress coding standards
```

The source and issue tracker are on [GitHub](https://github.com/vatly/vatly-fluentcart-wp).
