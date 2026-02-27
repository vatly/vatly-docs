<script setup lang="ts">
useSeo({
  title: 'Vatly Developer Documentation',
  description: 'Learn everything about the Vatly API and start selling worldwide.',
  type: 'website',
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <div class="mb-6">
            <span class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
              Vatly API v1
            </span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl" style="font-family: 'Poppins', sans-serif;">
            Developer Documentation
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Sell digital products and subscriptions worldwide with Vatly. Built for European SaaS companies with hosted checkouts, subscription management, and full tax compliance.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-4">
            <NuxtLink
              to="/guides/quickstart"
              class="rounded-lg bg-[#326bff] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              Get Started
            </NuxtLink>
            <NuxtLink
              to="/api-reference/customers"
              class="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              API Reference →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature cards -->
    <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <NuxtLink
          v-for="feature in features"
          :key="feature.title"
          :to="feature.to"
          class="group relative rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-[#326bff] dark:hover:border-[#5e8dff] hover:shadow-md transition-all"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 text-[#326bff] dark:text-[#5e8dff]">
              <UIcon :name="feature.icon" class="h-5 w-5" />
            </div>
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">
              {{ feature.title }}
            </h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ feature.description }}
          </p>
        </NuxtLink>
      </div>
    </section>

    <!-- Getting started -->
    <section class="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Getting started
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Getting started with Vatly is easy!
        </p>
        <ol class="space-y-3 text-gray-600 dark:text-gray-400 list-decimal list-inside">
          <li>Create a new account at <NuxtLink to="https://my.vatly.com" class="text-[#326bff] dark:text-[#5e8dff] hover:underline" target="_blank">vatly.com</NuxtLink>.</li>
          <li>Grab your API keys from <strong class="text-gray-900 dark:text-white">Settings → API</strong>.</li>
          <li>Connect your Mollie account.</li>
          <li>Set up your products.</li>
          <li>Integrate Vatly in your SaaS using one of our <NuxtLink to="/guides/sdks" class="text-[#326bff] dark:text-[#5e8dff] hover:underline">SDKs</NuxtLink>.</li>
        </ol>
        <div class="mt-8 flex items-center gap-6">
          <NuxtLink
            to="/guides/quickstart"
            class="text-[#326bff] dark:text-[#5e8dff] font-medium hover:underline"
          >
            Read the quickstart guide →
          </NuxtLink>
          <a
            href="https://docs.vatly.com/openapi.yaml"
            download
            class="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            OpenAPI spec ↓
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
const features = [
  {
    title: 'Hosted Checkouts',
    icon: 'i-lucide-shopping-cart',
    to: '/api-reference/checkouts',
    description: 'Create hosted checkout sessions with one API call. Support for one-off products and subscription plans with automatic tax calculation.',
  },
  {
    title: 'Subscriptions',
    icon: 'i-lucide-refresh-cw',
    to: '/api-reference/subscriptions',
    description: 'Full subscription lifecycle management. Handle upgrades, downgrades, proration, trials, and cancellations.',
  },
  {
    title: 'Orders and Invoices',
    icon: 'i-lucide-receipt',
    to: '/api-reference/orders',
    description: 'Automatic EU VAT handling as a Merchant of Record. Invoices, tax calculation, and reporting handled for you.',
  },
  {
    title: 'Webhooks',
    icon: 'i-lucide-bell',
    to: '/guides/webhooks',
    description: 'Real-time event notifications for checkouts, orders, subscriptions, refunds, and chargebacks.',
  },
]
</script>
