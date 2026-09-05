<script lang="ts" setup>
// Vatly-branded per-page OG image template for nuxt-og-image v6 (takumi renderer).
// Copied over docus's own app/components/OgImage/Docs.takumi.vue by the
// `postinstall` script in package.json so the docs theme renders Vatly branding.
// Keep this takumi-safe: utility classes / CSS gradients only (takumi does not
// render SVG <filter>), and coerce props to strings so no prop shape can break
// the render. title/description are passed by docus's [...slug].vue via
// defineOgImage('Docs', ...); headline is the page's section breadcrumb.
const { title, description, headline } = defineProps<{ title?: string, description?: string, headline?: string }>()

const safeTitle = String(title || 'Vatly Docs').slice(0, 60)
const safeDescription = String(description || '').slice(0, 200)
const safeHeadline = String(headline || '')
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between bg-[#0a0f1e] px-[80px] py-[64px]">
    <!-- Vatly blue radial glow, top-right: wide soft layer -->
    <div class="absolute top-0 right-0 w-[720px] h-[720px] bg-[radial-gradient(circle_at_top_right,rgba(50,107,255,0.28)_0%,rgba(50,107,255,0.08)_42%,transparent_72%)]" />
    <!-- tight bright core -->
    <div class="absolute top-0 right-0 w-[360px] h-[360px] bg-[radial-gradient(circle_at_top_right,rgba(89,147,255,0.38)_0%,rgba(89,147,255,0.10)_38%,transparent_66%)]" />
    <!-- top accent bar -->
    <div class="absolute top-0 left-0 w-full h-[6px] bg-[#326bff]" />

    <!-- Brand row: Vatly wordmark + "Developer Docs" -->
    <div class="flex items-center">
      <svg
        width="118"
        height="47"
        viewBox="0 0 134 53"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.099 40.76 0 11.596h8.458l6.401 18.191 6.344-18.191h8.464L18.563 40.743zM60.214 40.76h-4.943l-1.143-4a24 24 0 0 1-2.246 1.783 16.4 16.4 0 0 1-2.492 1.44 15.4 15.4 0 0 1-2.686.971c-.912.233-1.849.35-2.79.349a16 16 0 0 1-5.783-1.034 13.7 13.7 0 0 1-4.738-3.007 14.1 14.1 0 0 1-3.2-4.835 17 17 0 0 1-1.143-6.503 16.2 16.2 0 0 1 1.143-6.253 14.9 14.9 0 0 1 3.2-4.886 14.4 14.4 0 0 1 4.738-3.172 14.9 14.9 0 0 1 5.784-1.143c.946.002 1.889.12 2.806.354.93.238 1.833.568 2.697.983.87.416 1.702.908 2.486 1.47a20 20 0 0 1 2.224 1.822l1.143-3.457h4.955zM51.322 25.9a7.8 7.8 0 0 0-.572-2.96 8.6 8.6 0 0 0-1.6-2.509 7.9 7.9 0 0 0-2.355-1.766 6.4 6.4 0 0 0-2.857-.668 7.9 7.9 0 0 0-2.858.52 6.5 6.5 0 0 0-2.337 1.52 7.2 7.2 0 0 0-1.595 2.492 10.35 10.35 0 0 0 0 6.784c.345.93.878 1.777 1.566 2.491a6.5 6.5 0 0 0 2.338 1.52 7.9 7.9 0 0 0 2.857.52 6.4 6.4 0 0 0 2.858-.668 7.9 7.9 0 0 0 2.354-1.772 8.5 8.5 0 0 0 1.618-2.508 7.7 7.7 0 0 0 .583-2.972zM80.177 40.76a12.7 12.7 0 0 1-5.064-1.006 13.15 13.15 0 0 1-6.955-6.972 12.7 12.7 0 0 1-1.023-5.064V19.06h-3.617v-7.43h3.617V0h7.43v11.653H85.84v7.43H74.542v8.635a5.578 5.578 0 0 0 3.435 5.178 5.4 5.4 0 0 0 2.2.452h5.64v7.43zM97.471 40.76h-7.487V0h7.487zM106.684 51.87v-7.487l7.612.052a6.2 6.2 0 0 0 2.098-.354 7 7 0 0 0 1.863-.978 7.3 7.3 0 0 0 1.514-1.486 8.2 8.2 0 0 0 1.063-1.863c-.817.343-1.069.657-1.909 1.006a10 10 0 0 1-3.132.543 13.5 13.5 0 0 1-5.063-.949 12.3 12.3 0 0 1-6.955-6.99 14.9 14.9 0 0 1-1.023-5.646V11.596h7.43v16.122a7.4 7.4 0 0 0 .45 2.71c.266.72.679 1.378 1.212 1.93a4.9 4.9 0 0 0 1.783 1.144 6.3 6.3 0 0 0 2.19.383c.754 0 1.498-.184 2.165-.537a6 6 0 0 0 1.783-1.4c.511-.584.917-1.25 1.2-1.972.29-.728.438-1.504.435-2.286V11.596h7.487v25.49a14.7 14.7 0 0 1-1.195 5.771 15.1 15.1 0 0 1-3.2 4.71 15.3 15.3 0 0 1-4.727 3.189 14.4 14.4 0 0 1-5.772 1.143z" />
      </svg>
      <div class="w-[1px] h-[28px] bg-[#2a3555] mx-[18px]" />
      <span class="text-[#64748b] text-[22px] font-medium">Developer Docs</span>
    </div>

    <!-- Center: headline / title / description -->
    <div class="flex-1 flex flex-col justify-center">
      <p
        v-if="safeHeadline"
        class="uppercase text-[22px] font-bold m-0 mb-[18px] tracking-[0.06em] text-[#5993ff]"
      >
        {{ safeHeadline }}
      </p>
      <h1
        v-if="safeTitle"
        class="m-0 mb-[20px] text-[64px] font-bold text-white leading-[1.08] w-full max-w-[920px] wrap-break-word"
      >
        {{ safeTitle }}
      </h1>
      <p
        v-if="safeDescription"
        class="m-0 text-[28px] text-[#94a3b8] leading-[1.4] w-full max-w-[840px] wrap-break-word"
      >
        {{ safeDescription }}
      </p>
    </div>

    <!-- Footer: domain + positioning -->
    <div class="flex items-center justify-between">
      <span class="text-[#475569] text-[20px]">docs.vatly.com</span>
      <span class="text-[#326bff] text-[18px] font-medium">Merchant of Record for European SaaS</span>
    </div>
  </div>
</template>
