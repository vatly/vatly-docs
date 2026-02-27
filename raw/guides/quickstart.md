# Quickstart

> This guide will get you all set up and ready to use the Vatly API. We’ll cover how to get started an API client and how to make your first API request.

<note>

Before you can make requests to the Vatly API, you will need to grab your
API key from your dashboard. You find it under [Settings » API](#).

</note>

## Choose your client

Before making your first API request, you need to pick which API client you will use. In addition to good ol' cURL HTTP requests, Vatly offers clients for JavaScript, Python, and PHP. In the following example, you can see how to install each client.

<code-group sync="lang">

```bash [cURL]
# cURL is most likely already installed on your machine
curl --version
```

```bash [PHP]
# Install the Vatly PHP SDK
composer require vatly/vatly-api-php
```

</code-group>

[Check out our list of first-party SDKs](/guides/sdks)

## Making your first API request

After picking your preferred client, you are ready to make your first call to the Vatly API. Below, you can see how to send a GET request to the Checkouts endpoint to get a list of all your checkouts. In the cURL example, results are limited to ten checkouts, the default page length for each client.

<code-group sync="lang">

```bash [cURL]
curl -G https://api.vatly.com/v1/checkouts \
  -H "Authorization: Bearer live_your_api_key_here" \
  -d limit=10
```

```php [PHP]
$vatly = new Vatly\Api\VatlyApiClient;
$vatly->setApiKey($key);

$vatly->checkouts->page();
```

</code-group>

[Read the docs for the Checkouts endpoint](/api-reference/checkouts)

## What's next?

Great, you're now set up with an API client and have made your first request to the API. Here are a few links that might be handy as you venture further into the Vatly API:

- [Grab your API key from the Vatly dashboard](#)
- [Check out the Checkouts endpoint](/api-reference/checkouts)
- [Learn about the different error messages in Vatly](/guides/errors)
