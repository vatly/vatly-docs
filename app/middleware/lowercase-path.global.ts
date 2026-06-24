/**
 * Canonicalise request paths to lowercase.
 *
 * Every content route is lowercase (the docs sync lowercases source filenames),
 * so a path containing uppercase only ever comes from a hand-typed or external
 * link. The sidebar's active-item match — and `queryCollection().path()` — are
 * case-sensitive, so a mixed-case path would otherwise render (via the
 * github-pages SPA fallback) with the wrong page or with nothing highlighted in
 * the nav. Redirecting to the lowercase form makes the whole site behave
 * case-insensitively in one place.
 *
 * Only the path is lowercased; query and hash are preserved (they can be
 * case-sensitive). The guard avoids a redirect loop on already-lowercase paths.
 */
export default defineNuxtRouteMiddleware((to) => {
  const lowerPath = to.path.toLowerCase()

  if (lowerPath !== to.path) {
    return navigateTo(
      { path: lowerPath, query: to.query, hash: to.hash },
      { redirectCode: 301, replace: true },
    )
  }
})
