<script setup lang="ts">
import type { ContentNavigationLink } from '@nuxt/ui'

const props = defineProps<{
  navigation?: ContentNavigationLink[]
}>()

const route = useRoute()
const contentNavVariants = useUIConfig('contentNavigation')

function packageNavigation(items: ContentNavigationLink[]): ContentNavigationLink[] {
  return items.map((item) => {
    if (!item.children?.length) {
      if (item.path === '/packages') return { ...item, title: 'Overview' }
      return item
    }

    const isPackage = item.path.startsWith('/packages/')
    return {
      ...item,
      // Preserve the theme's expanded section headings, but let readers toggle
      // individual packages. The existing accordion owns keyboard/ARIA behavior.
      disabled: !isPackage,
      defaultOpen: !isPackage || route.path === item.path || route.path.startsWith(`${item.path}/`),
      ui: { ...item.ui, linkTrailing: isPackage ? 'inline-flex' : 'hidden' },
      children: packageNavigation(item.children),
    }
  })
}

const items = computed(() => packageNavigation(props.navigation || []))
</script>

<template>
  <UContentNavigation
    :key="route.path"
    :navigation="items"
    :highlight="contentNavVariants.highlight ?? true"
    :highlight-color="contentNavVariants.highlightColor"
    :variant="contentNavVariants.variant ?? 'link'"
    :color="contentNavVariants.color"
  />
</template>
