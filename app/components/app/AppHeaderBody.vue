<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { subNavigationMode } = useSubNavigation()

const items = computed<ContentNavigationItem[]>(() => {
  const nav = navigation?.value || []
  if (!subNavigationMode.value) return nav
  return nav.map(({ children, ...item }) => ({
    ...item,
    path: children?.length ? getFirstPagePath({ ...item, children }) : item.path,
  }))
})
</script>

<template>
  <DocsNavigation :navigation="items" />
</template>
