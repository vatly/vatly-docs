export default defineNuxtConfig({
  extends: ['docus'],

  // Static sitemap.xml in public/ folder - no module needed

  site: {
    // og:site_name and the JSON-LD publisher name. Page titles keep their
    // "- Vatly Docs" suffix via app.config `seo.titleTemplate`.
    name: 'Vatly',
    url: 'https://docs.vatly.com',
  },

  app: {
    baseURL: process.env.GITHUB_PAGES ? '/vatly-docs/' : '/',
    head: {
      titleTemplate: '%s - Vatly Docs',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.bunny.net',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.bunny.net/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        },
      ],
      meta: [
        { property: 'og:image', content: 'https://docs.vatly.com/og-image.jpg' },
        { property: 'og:image:width', content: '2400' },
        { property: 'og:image:height', content: '1120' },
        { property: 'og:image:alt', content: 'Vatly' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://docs.vatly.com/og-image.jpg' },
      ],
      script: [
        {
          src: 'https://cdn.usefathom.com/script.js',
          'data-site': 'OBXOIZSZ',
          defer: true,
        },
      ],
      style: [
        {
          children: `
            :root {
              --font-sans: 'Poppins', ui-sans-serif, system-ui, sans-serif;

              /* Vatly neutrals, from resources/css/app.css. Referenced by
                 overrides.css so the code-block treatment stops hardcoding
                 a palette. */
              --vatly-gray-200: #e4e4e7;
              --vatly-gray-800: #26272b;
            }
            :root, :host, .light {
              --ui-primary: #326bff;
            }
            .dark {
              --ui-primary: #5993ff;
            }
            body {
              font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;
            }
          `,
        },
      ],
    },
  },

  css: ['~/assets/css/overrides.css'],

  mcp: {
    enabled: false,
  },

  llms: {
    // nuxt-llms emits /llms.txt and /llms-full.txt only when it has a domain.
    // Docus infers the site URL from host env vars (Vercel, Netlify, and the
    // like), none of which the GitHub Pages build sets, so set it here or the
    // files are skipped at prerender.
    domain: 'https://docs.vatly.com',
    title: 'Vatly Docs',
    description: 'Sell software and digital products worldwide. Vatly is the legal seller; payments, tax and compliance are handled.',
    full: {
      title: 'Vatly Docs',
      description: 'Sell software and digital products worldwide. Vatly is the legal seller; payments, tax and compliance are handled.',
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'diff', 'json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'php', 'python', 'ruby'],
        },
      },
    },
  },

  // Section folders have no page of their own, but breadcrumbs link to them.
  // GitHub Pages can't send redirects, so these prerender to meta-refresh pages.
  routeRules: {
    '/guides': { redirect: { to: '/guides/quickstart', statusCode: 301 } },
    '/api-reference': { redirect: { to: '/api-reference/customers', statusCode: 301 } },
    '/packages/php': { redirect: { to: '/packages/php/readme', statusCode: 301 } },
    '/packages/laravel': { redirect: { to: '/packages/laravel/readme', statusCode: 301 } },
    '/packages/javascript': { redirect: { to: '/packages/javascript/readme', statusCode: 301 } },
    '/packages/fluent-js': { redirect: { to: '/packages/fluent-js/readme', statusCode: 301 } },
    '/packages/fluent-php': { redirect: { to: '/packages/fluent-php/webhook-flow', statusCode: 301 } },
    '/packages/python': { redirect: { to: '/packages/python/readme', statusCode: 301 } },
    '/packages/fluent-python': { redirect: { to: '/packages/fluent-python/readme', statusCode: 301 } },
    '/packages/django': { redirect: { to: '/packages/django/readme', statusCode: 301 } },
  },

  nitro: {
    preset: 'github-pages',
    prerender: {
      routes: ['/guides', '/api-reference', '/packages/php', '/packages/fluent-php', '/packages/laravel', '/packages/javascript', '/packages/fluent-js', '/packages/python', '/packages/fluent-python', '/packages/django'],
    },
  },

  compatibilityDate: '2025-01-01',
})
