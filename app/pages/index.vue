<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const { data: page } = await useAsyncData('guides-home', () => queryCollection('landing').path('/').first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' })

useSeo({
  title: page.value.seo?.title || page.value.title,
  description: page.value.description,
  type: 'website',
})
useHead({ titleTemplate: null })
useSeoMeta({ ogImageAlt: page.value.title, twitterImageAlt: page.value.title })
defineOgImage('Docs', {
  title: 'Vatly Docs',
  description: page.value.description?.replace(/\.$/, ''),
})
</script>

<template>
  <UPage class="guides-home">
    <UPageHeader :title="page?.title" :description="page?.description" />
    <UPageBody>
      <ContentRenderer v-if="page" :value="page" />
    </UPageBody>
  </UPage>
</template>

<style scoped>
.guides-home :deep(h2) {
  margin: 2rem 0 1rem;
  padding: 0;
  border: 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

.guides-home :deep(h3) {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}

.guides-home :deep(.guides-start) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--ui-border);
  border-radius: 0.5rem;
  background: var(--ui-bg-elevated);
}

.guides-home :deep(.guides-start h2) {
  margin: 0 0 0.5rem;
}

.guides-home :deep(.guides-start p) {
  margin: 0;
}

.guides-home :deep(.guides-primary) {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  padding: 0.625rem 1rem;
  border-radius: 0.375rem;
  background: var(--ui-primary);
  color: var(--ui-bg);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
}

.guides-home :deep(.guides-paths),
.guides-home :deep(.guides-basics) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.guides-home :deep(.guides-paths > div) {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--ui-border);
}

.guides-home :deep(.guides-paths p),
.guides-home :deep(.guides-basics p) {
  font-size: 0.875rem;
  color: var(--ui-text-muted);
}

.guides-home :deep(.guides-basics) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.guides-home :deep(.guides-basics p) {
  margin: 0.5rem 0;
}

.guides-home :deep(.guides-crosslinks) {
  margin: 2rem 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--ui-border);
  font-size: 0.875rem;
  color: var(--ui-text-muted);
}

.guides-home :deep(a:focus-visible) {
  outline: 2px solid var(--ui-primary);
  outline-offset: 4px;
}

@media (max-width: 767px) {
  .guides-home :deep(.guides-start) {
    flex-direction: column;
    align-items: flex-start;
  }

  .guides-home :deep(.guides-paths),
  .guides-home :deep(.guides-basics) {
    grid-template-columns: 1fr;
  }
}
</style>
