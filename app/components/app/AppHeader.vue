<script setup lang="ts">
// Overrides the docus theme's `AppHeader` (node_modules/docus/app/components/app/AppHeader.vue).
// Identical to the upstream component except for the `links` computed below:
// instead of always linking the top-right GitHub icon to the core docs repo
// (`appConfig.github.url`), it links to the repository that owns the page being
// viewed. Package reference pages are synced from their SDK repos, so this points
// contributors at the real source. See `useSourceRepoUrl()`.

const appConfig = useAppConfig()
const site = useSiteConfig()

const { isEnabled: isAssistantEnabled } = useAssistant()
const { localePath, isEnabled, locales } = useDocusI18n()

const source = useSourceRepo()

const links = computed(() => source.value.repoUrl
  ? [
      {
        'icon': 'i-simple-icons-github',
        'to': source.value.repoUrl,
        'target': '_blank',
        'aria-label': 'GitHub',
      },
    ]
  : [])
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="localePath('/')"
    :title="appConfig.header?.title || site.name"
  >
    <AppHeaderCenter />

    <template #title>
      <AppHeaderLogo class="h-6 w-auto shrink-0" />
    </template>

    <template #right>
      <AppHeaderCTA />

      <template v-if="isAssistantEnabled">
        <AssistantChat />
      </template>

      <template v-if="isEnabled && locales.length > 1">
        <ClientOnly>
          <LanguageSelect />

          <template #fallback>
            <div class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          </template>
        </ClientOnly>

        <USeparator
          orientation="vertical"
          class="h-8"
        />
      </template>

      <UContentSearchButton class="lg:hidden" />

      <ClientOnly>
        <UColorModeButton />

        <template #fallback>
          <div class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        </template>
      </ClientOnly>

      <template v-if="links?.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #toggle="{ open, toggle }">
      <IconMenuToggle
        :open="open"
        class="lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <AppHeaderBody />
    </template>
  </UHeader>
</template>
