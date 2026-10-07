# Payouts & Settlement

> How and when your share of each payment reaches your Mollie account, and where to follow it in the dashboard.

## How you get paid

Vatly settles each payment to your connected Mollie account after a 7-day hold by default. Your share is the sale price excluding the customer's tax, minus Vatly's fee. Where VAT applies to your supply to Vatly, it is settled along with it.

In your Mollie account, you can configure payouts to your own bank account or another one. Mollie's payout schedule and payout fees apply from there.

<note>

You need a connected Mollie account to receive live payments. Connect it during onboarding in the Vatly dashboard.

</note>

## The hold period

The hold starts when a payment is paid. Each payment is settled on its own, so a payment made today is settled about a week from now, regardless of when your other payments were made.

The hold gives room to handle refunds, chargebacks and risk checks before money moves to your account. Vatly can apply a longer hold where risk checks require it.

## Follow your settlements in the dashboard

Open **Settlements** in the Vatly dashboard. Payments are grouped into monthly settlement periods. Each period shows its **Payout release status**:

<table>
<thead>
  <tr>
    <th>
      Line
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Released to your account
    </td>
    
    <td>
      Already settled to your Mollie account.
    </td>
  </tr>
  
  <tr>
    <td>
      Scheduled for release
    </td>
    
    <td>
      Still in its hold period. The next release date is shown alongside.
    </td>
  </tr>
  
  <tr>
    <td>
      Held for settlement
    </td>
    
    <td>
      Could not be released with the payment itself, so it is handled through the period's settlement instead.
    </td>
  </tr>
  
  <tr>
    <td>
      Charged back before release
    </td>
    
    <td>
      Charged back before its hold ended, so it was not released.
    </td>
  </tr>
</tbody>
</table>

## Test mode

Test-mode payments are settled after a much shorter hold, so you can follow the full flow while you build. No real money moves in test mode.
