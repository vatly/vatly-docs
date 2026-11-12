#!/usr/bin/env bash
set -euo pipefail

# All source checkouts are snapshots of their current default branch. A dispatch
# is only a wake-up signal, never a selector for which packages to regenerate.
node scripts/transform-sdk-docs.mjs tmp/sdk-repo/docs content/3.packages/1.php
node scripts/transform-js-docs.mjs tmp/fluent-php-repo/docs content/3.packages/2.fluent-php vatly/vatly-fluent-php 'Vatly PHP Fluent'
node scripts/transform-laravel-docs.mjs tmp/laravel-repo/docs content/3.packages/3.laravel
node scripts/transform-js-docs.mjs tmp/js-repo/docs content/3.packages/4.javascript vatly/vatly-api-js
node scripts/transform-js-docs.mjs tmp/fluent-js-repo/docs content/3.packages/5.fluent-js vatly/vatly-fluent-js
node scripts/transform-js-docs.mjs tmp/python-repo/docs content/3.packages/6.python vatly/vatly-api-python 'Vatly Python SDK'
node scripts/transform-js-docs.mjs tmp/fluent-python-repo/docs content/3.packages/7.fluent-python vatly/vatly-fluent-python 'Vatly Python Fluent'
node scripts/transform-js-docs.mjs tmp/django-repo/docs content/3.packages/8.django vatly/vatly-django 'Vatly Django'
if [[ "${SYNC_BETTER_AUTH_DOCS:-}" == true ]]; then
  node scripts/transform-js-docs.mjs tmp/better-auth-repo/docs content/3.packages/9.better-auth vatly/vatly-better-auth-js
fi
node scripts/generate-sitemap.mjs
