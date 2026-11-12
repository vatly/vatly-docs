# Configuration

> Vatly Django - Configuration

Add `vatly_django` to INSTALLED_APPS and run migrations. Include its URLs under
your billing prefix. Use Django auth/session/CSRF middleware for browser endpoints.
Use HTTPS in production; configure your reverse proxy, allowed hosts and CSRF origins
as usual. Never disable CSRF for checkout/portal. Only webhook is exempt.

<table>
<thead>
  <tr>
    <th>
      Setting
    </th>
    
    <th>
      Contract
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      VATLY_API_KEY
    </td>
    
    <td>
      Required; falls back to environment. test_/live_ chooses mode
    </td>
  </tr>
  
  <tr>
    <td>
      VATLY_SCOPE
    </td>
    
    <td>
      Required stable tenant/storefront string (max 200 chars)
    </td>
  </tr>
  
  <tr>
    <td>
      VATLY_WEBHOOK_SECRET
    </td>
    
    <td>
      Required for webhooks; string or rotation list, never client-side
    </td>
  </tr>
  
  <tr>
    <td>
      VATLY_REDIRECT_URL_SUCCESS / CANCELED
    </td>
    
    <td>
      Required checkout HTTPS destinations
    </td>
  </tr>
  
  <tr>
    <td>
      VATLY_PORTAL_REDIRECT_URL
    </td>
    
    <td>
      Optional HTTPS returnUrl for hosted portal
    </td>
  </tr>
  
  <tr>
    <td>
      VATLY_CHECKOUTS
    </td>
    
    <td>
      Server allowlist: offer slug → products, optional locale/metadata/billingAddress
    </td>
  </tr>
  
  <tr>
    <td>
      VATLY_BILLABLE_RESOLVER
    </td>
    
    <td>
      Optional dotted callable(request) → authorized saved Django model; defaults to request.user
    </td>
  </tr>
  
  <tr>
    <td>
      VATLY_SCOPE_RESOLVER
    </td>
    
    <td>
      Optional dotted callable(request) → tenant/storefront string, also used on webhook routes
    </td>
  </tr>
</tbody>
</table>

For multi-tenant hosts, both resolvers must validate membership and select the
matching key and webhook secret through the deployment's settings strategy. Do not
trust query-string tenant IDs or webhook customerId to route ownership. The current
facade uses one API key/secret configuration per deployment; construct ORMDriver +
Fluent directly if you need a credential registry per tenant.

The abstract `vatly_django.mixins.BillableMixin` adds no columns; use it with a
custom user, team or organization model. Existing models need not inherit it:
`Billing(scope).checkout(model, offer, idempotency_key=uuid)` provides the same
behavior. Entity identities are model label + primary key (immutable across schema
renames unless you migrate billing references). The mixin's `billing()` can be
overridden to choose a trusted scope. Built-in views use explicit resolvers instead.

There is no automatic remote customer creation or email lookup. Call
`Billing.bind_customer(billable, authorized_customer_id)` from trusted provisioning
code to reuse a known customer. Binding uniqueness is enforced in both directions,
and does not assign entitlement ownership.
