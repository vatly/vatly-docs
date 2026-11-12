# Install Vatly Django

> Vatly Django - Install Vatly Django

Start with a normal Django project, including its auth, sessions, messages and
CSRF configuration. Install the pinned alpha:

```bash
python -m pip install vatly-django==0.1.0a2
```

This also installs `vatly-api-python==0.1.0a2` and `vatly-fluent-python==0.1.0a2`.
Add the billing app to your existing `settings.py` app list:

```python
INSTALLED_APPS += ["vatly_django"]
```

Keep Django's generated authentication/session/CSRF middleware. If you use admin,
keep its standard template context processors and messages middleware too.

## Mount the billing URLs

Add this entry to your project URL configuration (preserve your other routes):

```python
from django.urls import include, path

urlpatterns = [path("billing/", include("vatly_django.urls"))]
```

<table>
<thead>
  <tr>
    <th>
      Route under <code>
        /billing/
      </code>
    </th>
    
    <th>
      Method
    </th>
    
    <th>
      Protection
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        checkout/<offer>/
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      Login, CSRF and server-owned offer
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        portal/
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      Login, CSRF and authorized customer binding
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        webhook/
      </code>
    </td>
    
    <td>
      POST
    </td>
    
    <td>
      Raw-body Vatly signature; CSRF-exempt
    </td>
  </tr>
</tbody>
</table>

Configure the required [settings](/packages/django/configuration), then create the tables:

```bash
python manage.py migrate
python manage.py check
```

No migration or setup command creates remote customers, products or webhook
endpoints. Use HTTPS and your deployment's normal host/CSRF settings in production.
PostgreSQL is recommended for concurrent workers; SQLite is suitable for local use.

[Add a checkout](/packages/django/checkout) · [API reference](https://docs.vatly.com/api-reference)
