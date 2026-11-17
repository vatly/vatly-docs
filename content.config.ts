import { defineCollection, defineContentConfig } from '@nuxt/content'

// Docus excludes index.md from its docs collection when index.vue is custom.
// Keep the homepage's visible content and raw Markdown in one authored source.
export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md',
    }),
  },
})
