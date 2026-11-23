# Paid Memberships Pro

> Sell Paid Memberships Pro (PMPro) memberships through Vatly.

Sell Paid Memberships Pro (PMPro) memberships through Vatly. Vatly is the European Merchant of Record for AI, software and digital products: it is the legal seller on every sale and handles payments, tax and compliance.
This plugin adds Vatly as a payment gateway to PMPro.

<warning>

**Alpha.** The plugin can still change in ways that need you to update your setup. Try it in Vatly test mode before you take live payments with it.

</warning>

## What it does

- **Hosted checkout.** Members pay at Vatly's hosted checkout (cards, PayPal, iDEAL, Apple Pay, SEPA).
- **VAT handled for you.** Vatly collects VAT per country, applies the right rate on every renewal, and issues compliant invoices as the seller. You no longer need the `pmpro-vat-tax` add-on or `pmpro_tax` filter snippets.
- **Membership sync.** Webhooks keep PMPro in step: levels are assigned on payment, changed when a member switches plan, and revoked on cancellation.
- **PMPro keeps the rest.** Membership levels, content gating, member dashboards and discount codes work as before.

## Requirements

- WordPress 6.5 or newer
- PHP 8.1 or newer
- [Paid Memberships Pro](https://wordpress.org/plugins/paid-memberships-pro/) 3.x, installed and active
- A [Vatly](https://vatly.com) account

## Installation

The plugin is not on WordPress.org or Packagist. Install it from GitHub:

1. Download the zip from the [latest release](https://github.com/vatly/vatly-pmpro/releases/latest). It includes the plugin's dependencies, so you don't need Composer.
2. In WordPress, go to **Plugins → Add New → Upload Plugin**, choose the zip, and activate it.

## Setup

1. **Add your credentials.** Go to **Memberships → Settings → Payments** and open the **Vatly** gateway. Enter your **Live API key**, **Test API key** and **Webhook signing secret** from the **Developers** section of your Vatly dashboard, and save.
2. **Register the webhook in Vatly.** The settings screen shows your webhook URL:```text
https://your-site.com/wp-json/vatly/v1/webhook
```

<br />

Paste it into your Vatly dashboard under **Developers → Webhooks**, using the signing secret you entered above.
3. **Map each membership level to a Vatly plan.** Edit each membership level you want billed through Vatly and paste the matching plan ID from **Manage Products** in your Vatly dashboard into the **Vatly plan ID** field.

Members pay the price of the Vatly plan, not the PMPro level price, so set both to the same amount. Selling to consumers? Create the plan as tax-inclusive, so buyers pay exactly the price you show and the VAT comes out of it. Tax-exclusive plans add VAT at checkout, so show those prices as "excl. VAT".

## Webhooks

Webhooks are refused until a webhook signing secret is saved. Until then the endpoint answers `503` and processes nothing; Vatly retries the delivery once the secret is saved. The endpoint is only registered while Paid Memberships Pro is active.

## Saved keys and secrets

The API keys and webhook signing secret are stored encrypted, keyed from your WordPress salts or a `VATLY_PMPRO_ENCRYPTION_KEY` constant in `wp-config.php`. The settings screen never shows saved values:

- Leave a field blank to keep its saved value.
- Tick **Remove saved value** to delete it.

If the WordPress salts or the encryption key change, enter the API keys and webhook secret again.

## Invoices and credit notes

Vatly issues the VAT invoice and, for refunds, the credit note. Links to them appear on the checkout confirmation page, on the member's order (invoice) page, and on the admin order screen. The links are fetched fresh from Vatly when shown and never stored.

A completed refund marks the PMPro order as refunded and keeps the membership.

## Cancellations

Cancelling a membership in WordPress cancels the subscription at Vatly, so renewals stop being charged.

## Support

The source and issue tracker are on [GitHub](https://github.com/vatly/vatly-pmpro).
