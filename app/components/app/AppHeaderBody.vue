<script setup lang="ts">
const { areas } = useDocumentationNavigation()
</script>

<template>
  <div id="documentation-menu" class="docs-mobile-navigation">
    <nav aria-label="Documentation areas" class="mb-6 grid gap-1 border-b border-default pb-5">
      <UButton
        v-for="item in areas"
        :key="item.to"
        :to="item.to"
        :active="item.active"
        :label="item.label"
        :variant="item.active ? 'soft' : 'ghost'"
        :color="item.active ? 'primary' : 'neutral'"
        :aria-current="item.active ? 'page' : undefined"
        size="lg"
        class="min-h-11 justify-start"
      />
    </nav>
    <DocsAsideLeftBody />
  </div>
</template>

<style scoped>
.docs-mobile-navigation :deep(a),
.docs-mobile-navigation :deep(button) {
  min-height: 44px;
}

.docs-mobile-navigation :deep([data-slot='linkTitle']) {
  white-space: normal;
}
</style>
