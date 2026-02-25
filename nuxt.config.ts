export default defineNuxtConfig({
  extends: ['docus'],

  site: {
    name: 'Vatly Docs',
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
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        },
      ],
      meta: [
        { property: 'og:image', content: 'https://docs.vatly.com/og-image.png' },
        { property: 'og:image:width', content: '400' },
        { property: 'og:image:height', content: '400' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: 'https://docs.vatly.com/og-image.png' },
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
            }
            :root, :host, .light {
              --ui-primary: #326bff;
            }
            .dark {
              --ui-primary: #5e8dff;
            }
            body {
              font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;
            }
          `,
        },
      ],
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

  nitro: {
    preset: 'github-pages',
  },

  compatibilityDate: '2025-01-01',
})
