<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{ title?: string, description?: string, headline?: string }>(), {
  title: 'title',
  description: 'description',
})

const title = computed(() => (props.title || '').slice(0, 60))
const description = computed(() => (props.description || '').slice(0, 200))
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between" style="background: linear-gradient(135deg, #1a1f36 0%, #0d1117 100%);">
    <!-- Top bar accent -->
    <div style="height: 6px; background: #326bff;" />

    <div class="flex-1 flex flex-col justify-center pl-[80px] pr-[80px]">
      <!-- Vatly logo text -->
      <div class="flex items-center gap-4 mb-6">
        <div style="width: 48px; height: 48px; background: #326bff; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 28px; font-weight: 700; font-family: 'Poppins', sans-serif;">V</span>
        </div>
        <span style="color: #64748b; font-size: 24px; font-weight: 500; font-family: 'Poppins', sans-serif;">docs.vatly.com</span>
      </div>

      <!-- Headline / breadcrumb -->
      <p
        v-if="headline"
        style="color: #326bff; font-size: 22px; font-weight: 600; font-family: 'Poppins', sans-serif; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;"
      >
        {{ headline }}
      </p>

      <!-- Title -->
      <h1
        v-if="title"
        style="color: white; font-size: 68px; font-weight: 700; font-family: 'Poppins', sans-serif; line-height: 1.1; margin: 0 0 16px 0;"
      >
        {{ title }}
      </h1>

      <!-- Description -->
      <p
        v-if="description"
        style="color: #94a3b8; font-size: 28px; font-family: 'Poppins', sans-serif; line-height: 1.4; max-width: 700px; margin: 0;"
      >
        {{ description }}
      </p>
    </div>

    <!-- Bottom bar -->
    <div style="padding: 24px 80px; display: flex; justify-content: space-between; align-items: center;">
      <span style="color: #475569; font-size: 20px; font-family: 'Poppins', sans-serif;">Vatly Developer Documentation</span>
      <span style="color: #475569; font-size: 20px; font-family: 'Poppins', sans-serif;">vatly.com</span>
    </div>
  </div>
</template>
