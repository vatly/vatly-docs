<script setup lang="ts">
const { area, areas, sidebar } = useDocumentationNavigation()
</script>

<template>
  <div>
    <p class="mb-5 text-sm font-semibold text-highlighted">
      {{ areas.find(item => item.active)?.label }}
    </p>
    <DocsNavigation :navigation="sidebar" />
    <div v-if="area === 'api'" class="mt-6 border-t border-default pt-4">
      <UButton
        to="/openapi.yaml"
        download
        label="OpenAPI specification"
        icon="i-lucide-download"
        variant="link"
        class="px-0 text-xs"
      />
    </div>
  </div>
</template>
