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
  <div class="w-full h-full flex flex-col justify-between" style="background: linear-gradient(145deg, #0a0f1e 0%, #0d1117 40%, #0f1729 100%);">
    <!-- Blue glow effect top-right -->
    <svg
      class="absolute right-0 top-0 opacity-30"
      width="629"
      height="593"
      viewBox="0 0 629 593"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f)">
        <path
          d="M628.5 -578L639.334 -94.4223L806.598 -548.281L659.827 -87.387L965.396 -462.344L676.925 -74.0787L1087.69 -329.501L688.776 -55.9396L1160.22 -164.149L694.095 -34.9354L1175.13 15.7948L692.306 -13.3422L1130.8 190.83L683.602 6.50012L1032.04 341.989L668.927 22.4412L889.557 452.891L649.872 32.7537L718.78 511.519L628.5 36.32L538.22 511.519L607.128 32.7537L367.443 452.891L588.073 22.4412L224.955 341.989L573.398 6.50012L126.198 190.83L564.694 -13.3422L81.8734 15.7948L562.905 -34.9354L96.7839 -164.149L568.224 -55.9396L169.314 -329.501L580.075 -74.0787L291.604 -462.344L597.173 -87.387L450.402 -548.281L617.666 -94.4223L628.5 -578Z"
          fill="#326bff"
        />
      </g>
      <defs>
        <filter
          id="filter0_f"
          x="0.873535"
          y="-659"
          width="1255.25"
          height="1251.52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40.5" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>

    <!-- Top accent bar -->
    <div style="height: 5px; background: linear-gradient(90deg, #326bff 0%, #5e8dff 100%);" />

    <div class="flex-1 flex flex-col justify-center pl-[80px] pr-[80px]">
      <!-- Vatly logo -->
      <div class="flex items-center gap-4 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 134 53" fill="white">
          <path d="M11.099 40.76 0 11.596h8.458l6.401 18.191 6.344-18.191h8.464L18.563 40.743zM60.214 40.76h-4.943l-1.143-4a24 24 0 0 1-2.246 1.783 16.4 16.4 0 0 1-2.492 1.44 15.4 15.4 0 0 1-2.686.971c-.912.233-1.849.35-2.79.349a16 16 0 0 1-5.783-1.034 13.7 13.7 0 0 1-4.738-3.007 14.1 14.1 0 0 1-3.2-4.835 17 17 0 0 1-1.143-6.503 16.2 16.2 0 0 1 1.143-6.253 14.9 14.9 0 0 1 3.2-4.886 14.4 14.4 0 0 1 4.738-3.172 14.9 14.9 0 0 1 5.784-1.143c.946.002 1.889.12 2.806.354.93.238 1.833.568 2.697.983.87.416 1.702.908 2.486 1.47a20 20 0 0 1 2.224 1.822l1.143-3.457h4.955zM51.322 25.9a7.8 7.8 0 0 0-.572-2.96 8.6 8.6 0 0 0-1.6-2.509 7.9 7.9 0 0 0-2.355-1.766 6.4 6.4 0 0 0-2.857-.668 7.9 7.9 0 0 0-2.858.52 6.5 6.5 0 0 0-2.337 1.52 7.2 7.2 0 0 0-1.595 2.492 10.35 10.35 0 0 0 0 6.784c.345.93.878 1.777 1.566 2.491a6.5 6.5 0 0 0 2.338 1.52 7.9 7.9 0 0 0 2.857.52 6.4 6.4 0 0 0 2.858-.668 7.9 7.9 0 0 0 2.354-1.772 8.5 8.5 0 0 0 1.618-2.508 7.7 7.7 0 0 0 .583-2.972zM80.177 40.76a12.7 12.7 0 0 1-5.064-1.006 13.15 13.15 0 0 1-6.955-6.972 12.7 12.7 0 0 1-1.023-5.064V19.06h-3.617v-7.43h3.617V0h7.43v11.653H85.84v7.43H74.542v8.635a5.578 5.578 0 0 0 3.435 5.178 5.4 5.4 0 0 0 2.2.452h5.64v7.43zM97.471 40.76h-7.487V0h7.487zM106.684 51.87v-7.487l7.612.052a6.2 6.2 0 0 0 2.098-.354 7 7 0 0 0 1.863-.978 7.3 7.3 0 0 0 1.514-1.486 8.2 8.2 0 0 0 1.063-1.863c-.817.343-1.069.657-1.909 1.006a10 10 0 0 1-3.132.543 13.5 13.5 0 0 1-5.063-.949 12.3 12.3 0 0 1-6.955-6.99 14.9 14.9 0 0 1-1.023-5.646V11.596h7.43v16.122a7.4 7.4 0 0 0 .45 2.71c.266.72.679 1.378 1.212 1.93a4.9 4.9 0 0 0 1.783 1.144 6.3 6.3 0 0 0 2.19.383c.754 0 1.498-.184 2.165-.537a6 6 0 0 0 1.783-1.4c.511-.584.917-1.25 1.2-1.972.29-.728.438-1.504.435-2.286V11.596h7.487v25.49a14.7 14.7 0 0 1-1.195 5.771 15.1 15.1 0 0 1-3.2 4.71 15.3 15.3 0 0 1-4.727 3.189 14.4 14.4 0 0 1-5.772 1.143z"/>
        </svg>
        <div style="width: 1px; height: 28px; background: #2a3555; margin: 0 4px;" />
        <span style="color: #64748b; font-size: 22px; font-weight: 500; font-family: 'Poppins', sans-serif;">Developer Docs</span>
      </div>

      <!-- Headline / breadcrumb -->
      <p
        v-if="headline"
        style="color: #5e8dff; font-size: 22px; font-weight: 600; font-family: 'Poppins', sans-serif; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;"
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
    <div style="padding: 24px 80px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b;">
      <span style="color: #475569; font-size: 20px; font-family: 'Poppins', sans-serif;">docs.vatly.com</span>
      <span style="color: #326bff; font-size: 18px; font-family: 'Poppins', sans-serif; font-weight: 500;">Merchant of Record for European SaaS</span>
    </div>
  </div>
</template>
