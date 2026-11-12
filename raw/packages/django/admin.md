# Inspect billing in admin

> When django.contrib.admin and vatly_django are installed, billing models register automatically.

When `django.contrib.admin` and `vatly_django` are installed, billing models register
automatically. No separate `admin.py` setup is needed. Mount Django's standard admin:

```python
from django.contrib import admin
from django.urls import path

urlpatterns = [path("admin/", admin.site.urls)]
```

Keep your other project URL patterns. Grant model **view** permissions to the staff
who need them; do not give every support user superuser access.

<table>
<thead>
  <tr>
    <th>
      Records
    </th>
    
    <th>
      Useful for
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Billing resources
    </td>
    
    <td>
      Find Vatly IDs, entities, full snapshots and lifecycle expiry
    </td>
  </tr>
  
  <tr>
    <td>
      Webhook calls
    </td>
    
    <td>
      Inspect signed event IDs and processing completion
    </td>
  </tr>
  
  <tr>
    <td>
      Outbox
    </td>
    
    <td>
      Inspect queued and delivered events
    </td>
  </tr>
  
  <tr>
    <td>
      Checkouts/attempts/links
    </td>
    
    <td>
      Diagnose ownership or idempotency failures
    </td>
  </tr>
  
  <tr>
    <td>
      Customer bindings/scopes
    </td>
    
    <td>
      Inspect identity and tenant/mode separation
    </td>
  </tr>
</tbody>
</table>

All billing admin registrations disable add/change/delete, even for superusers.
Use hosted billing or authorized API actions to mutate subscriptions; editing a
local snapshot would not change Vatly. Signed envelopes can contain personal data,
so restrict access and apply your retention policy.

[Webhook storage](/packages/django/webhooks) · [API reference](https://docs.vatly.com/api-reference)
