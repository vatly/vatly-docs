export default defineNuxtConfig({
  extends: ['docus'],

  site: {
    name: 'Vatly Docs',
    url: 'https://docs.vatly.com',
  },

  app: {
    head: {
      titleTemplate: '%s - Vatly Docs',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/vatly-logo-square.png',
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
})
