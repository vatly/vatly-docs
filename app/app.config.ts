export default defineAppConfig({
  docus: {
    title: 'Vatly Docs',
    description: 'Vatly API Documentation',
    url: 'https://docs.vatly.com',
  },
  header: {
    title: 'Vatly',
    logo: {
      light: '/vatly-logo-blue.svg',
      dark: '/vatly-logo-white.svg',
      alt: 'Vatly',
    },
  },
  // Pin the core repo URL so its casing matches the package source repos
  // (`Vatly/...`) used in the header/edit/report links and the in-body source
  // links. Left unpinned it is auto-derived from the git remote as the
  // lowercased `vatly/vatly-docs`. `branch`/`owner`/`name` still come from the
  // theme's git detection via deep merge. GitHub resolves either casing.
  github: {
    url: 'https://github.com/Vatly/vatly-docs',
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc',
    },
  },
})
