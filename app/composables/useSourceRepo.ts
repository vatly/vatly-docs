import { computed } from 'vue'
import { useAppConfig, useRoute } from '#imports'

interface PackageRepo {
  /** Route-path prefix for this package's pages. */
  prefix: string
  /** GitHub repo that owns the source markdown. */
  url: string
  /** Branch the docs are synced from. */
  branch: string
  /** Directory within the repo that holds the source markdown. */
  docsDir: string
  /**
   * Maps a page's slug (the last route segment) to its source markdown
   * filename in the repo. The sync pipeline lowercases the source basename
   * for the route, so this is the inverse of that — see
   * `scripts/transform-*-docs.mjs` (their `ORDER` maps list the source files).
   */
  files: Record<string, string>
}

/**
 * Package docs that are *not* authored in this repo but synced in from an
 * external package repository. Keep in sync with the repos pulled by
 * `.github/workflows/sync-sdk-docs.yml` and the file lists in
 * `scripts/transform-{sdk,laravel}-docs.mjs`.
 */
const PACKAGE_REPOS: PackageRepo[] = [
  {
    prefix: '/packages/php',
    url: 'https://github.com/Vatly/vatly-api-php',
    branch: 'main',
    docsDir: 'docs',
    files: {
      readme: 'README.md',
      customers: 'Customers.md',
      checkouts: 'Checkouts.md',
      subscriptions: 'Subscriptions.md',
      subscriptionplans: 'SubscriptionPlans.md',
      orders: 'Orders.md',
      refunds: 'Refunds.md',
      oneoffproducts: 'OneOffProducts.md',
      chargebacks: 'Chargebacks.md',
      webhooks: 'Webhooks.md',
    },
  },
  {
    prefix: '/packages/laravel',
    url: 'https://github.com/Vatly/vatly-laravel',
    branch: 'main',
    docsDir: 'docs',
    files: {
      readme: 'README.md',
      customers: 'Customers.md',
      checkouts: 'Checkouts.md',
      subscriptions: 'Subscriptions.md',
      orders: 'Orders.md',
      webhooks: 'Webhooks.md',
      configuration: 'Configuration.md',
    },
  },
]

export interface PageSource {
  /** Repo that owns the page being viewed — used by the header "GitHub" link. */
  repoUrl: string
  /** Target for the "Report an issue" link. */
  issuesUrl: string
  /**
   * Target for the "Edit this page" link on synced package pages, or `null`
   * for core pages so the caller falls back to the docus default content-path
   * edit link.
   */
  editUrl: string | null
}

/**
 * Resolve where the page currently being viewed actually lives, so the
 * "view source / contribute" affordances (header link, edit link, report link)
 * point at the right repository.
 *
 * Most pages live in the core `vatly-docs` repo (`appConfig.github`), but the
 * package reference pages are synced from their SDK repos — for those, the
 * links target the package repo (and the exact source file, for editing).
 * Reactive to the current route, so links update on client-side navigation.
 */
export function useSourceRepo() {
  const route = useRoute()
  const appConfig = useAppConfig()

  return computed<PageSource>(() => {
    const pkg = PACKAGE_REPOS.find(
      repo => route.path === repo.prefix || route.path.startsWith(`${repo.prefix}/`),
    )

    if (pkg) {
      const slug = route.path.replace(/\/$/, '').split('/').pop() || ''
      const file = pkg.files[slug]

      return {
        repoUrl: pkg.url,
        issuesUrl: `${pkg.url}/issues/new/choose`,
        // Deep-link to the exact source file when known, otherwise drop the
        // contributor in the repo's docs directory.
        editUrl: file
          ? `${pkg.url}/edit/${pkg.branch}/${pkg.docsDir}/${file}`
          : `${pkg.url}/tree/${pkg.branch}/${pkg.docsDir}`,
      }
    }

    // Core docs repo. Guard the same way the theme does — `github` can be `false`.
    const coreUrl = appConfig.github && appConfig.github.url ? appConfig.github.url : ''
    return {
      repoUrl: coreUrl,
      issuesUrl: coreUrl ? `${coreUrl}/issues/new/choose` : '',
      // null → caller uses the docus default (content-path) edit link.
      editUrl: null,
    }
  })
}
