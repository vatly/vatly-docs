<script setup lang="ts">
const { sidebarNavigation } = useSubNavigation()
</script>

<template>
  <DocsNavigation :navigation="sidebarNavigation" />
</template>
