import type { ContentNavigationItem } from '@nuxt/content'

// These pages keep their public URLs even though their navigation now belongs
// to the API reference or package area rather than the Guides sidebar.
const apiFundamentals = ['authentication', 'pagination', 'errors', 'idempotency']

export function useDocumentationNavigation() {
  const route = useRoute()
  const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

  const area = computed(() => {
    if (route.path.startsWith('/packages') || route.path === '/guides/sdks') return 'packages'
    if (route.path.startsWith('/api-reference') || apiFundamentals.some(slug => route.path === `/guides/${slug}`)) return 'api'
    return 'guides'
  })

  const areas = computed(() => [
    { label: 'Guides', to: '/', active: area.value === 'guides' },
    { label: 'SDKs & Packages', to: '/packages', active: area.value === 'packages' },
    { label: 'API Reference', to: '/api-reference/customers', active: area.value === 'api' },
  ])

  const sidebar = computed<ContentNavigationItem[]>(() => {
    const nav = navigation?.value || []
    const pages = new Map<string, ContentNavigationItem>()
    function collect(items: ContentNavigationItem[]) {
      for (const item of items) {
        pages.set(item.path, item)
        if (item.children) collect(item.children)
      }
    }
    collect(nav)
    const page = (path: string, title?: string): ContentNavigationItem => ({
      ...pages.get(path), path, title: title || pages.get(path)!.title,
      children: undefined,
    })
    const group = (title: string, path: string, children: ContentNavigationItem[]): ContentNavigationItem => ({ title, path, children })

    if (area.value === 'packages') {
      return [
        page('/packages', 'Overview'),
        page('/guides/sdks', 'Choosing a package'),
        ...(nav.find(item => item.path === '/packages')?.children || []).filter(item => item.children?.length),
      ]
    }
    if (area.value === 'api') {
      return [
        group('Fundamentals', '/api-reference/fundamentals', apiFundamentals.map(slug => page(`/guides/${slug}`))),
        group('Resources', '/api-reference/resources', (nav.find(item => item.path === '/api-reference')?.children || [])
          .filter(item => !['webhook-endpoints', 'webhook-events', 'test-helpers'].some(slug => item.path === `/api-reference/${slug}`))),
        group('Webhooks & testing', '/api-reference/webhooks-and-testing', [
          page('/api-reference/webhook-endpoints', 'Webhook endpoints'),
          page('/api-reference/webhook-events', 'Webhook events'),
          page('/api-reference/test-helpers', 'Test helpers'),
        ]),
      ]
    }
    return [
      page('/', 'Overview'),
      group('Start building', '/guides/start-building', [
        page('/guides/quickstart'),
        page('/introduction'),
        page('/guides/build-your-own-integration', 'Build an integration'),
      ]),
      group('Integrations', '/integrations', [
        page('/integrations', 'All integrations'),
        page('/integrations/lovable', 'Lovable'),
        page('/integrations/bolt', 'Bolt'),
      ]),
      group('Migrations', '/guides/migrations', [
        page('/guides/migrate-from-lemon-squeezy', 'From Lemon Squeezy'),
      ]),
      group('Billing & operations', '/guides/billing-and-operations', [
        page('/guides/selling-workflow'),
        page('/guides/webhooks'),
        page('/guides/testing'),
        page('/guides/payouts', 'Payouts & settlement'),
        page('/guides/customer-emails', 'Customer emails'),
      ]),
    ]
  })

  return { area, areas, sidebar }
}
