<script setup lang="ts">
// Overrides the docus theme's `AppHeader` (node_modules/docus/app/components/app/AppHeader.vue).
// Adds the three documentation areas and links the GitHub icon to the source
// repository of the current page. The mobile menu shares the desktop sidebar.

const appConfig = useAppConfig()
const site = useSiteConfig()

const { isEnabled: isAssistantEnabled } = useAssistant()
const { localePath, isEnabled, locales } = useDocusI18n()

const source = useSourceRepo()
const { areas } = useDocumentationNavigation()
const menuOpen = ref(false)

function closeMenuOnLink(event: MouseEvent) {
  if ((event.target as Element).closest('a[href]')) menuOpen.value = false
}

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
    v-model:open="menuOpen"
    :ui="{ center: 'flex-1 justify-start' }"
    :to="localePath('/')"
    :title="appConfig.header?.title || site.name"
    :menu="{ title: 'Documentation navigation', description: 'Choose an area or a page.' }"
  >
    <UNavigationMenu
      :items="areas"
      aria-label="Documentation areas"
      variant="link"
      highlight
      class="hidden lg:flex"
    />

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

      <UContentSearchButton
        :collapsed="false"
        variant="soft"
        class="hidden lg:flex lg:w-44 xl:w-56"
      />
      <UContentSearchButton class="lg:hidden min-h-11 min-w-11" />

      <ClientOnly>
        <UColorModeButton class="min-h-11 min-w-11 lg:min-h-8 lg:min-w-8" />

        <template #fallback>
          <div class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        </template>
      </ClientOnly>

      <template v-if="links?.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
          class="min-h-11 min-w-11 lg:min-h-8 lg:min-w-8"
        />
      </template>
    </template>

    <template #toggle="{ open, toggle }">
      <IconMenuToggle
        :open="open"
        :aria-label="open ? 'Close navigation' : 'Open navigation'"
        :aria-expanded="open"
        aria-controls="documentation-menu"
        class="lg:hidden min-h-11 min-w-11"
        @click="toggle"
      />
    </template>

    <template #body>
      <AppHeaderBody @click="closeMenuOnLink" />
    </template>
  </UHeader>
</template>
