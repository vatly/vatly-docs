# Vatly Docs Migration - Docus

## Task
1. **Verify all docs against the OpenAPI spec** at `/Users/sandervanhooft/vatlify/docs/openapi/`
   - Compare each API reference page against the corresponding OpenAPI path YAML
   - Ensure all endpoints, parameters, request/response schemas, and examples match
   - Flag any missing endpoints or incorrect documentation
   - Check: customers, checkouts, subscriptions, subscription-plans, orders, refunds, global-refunds (called "Order Refunds" in OpenAPI?), chargebacks, one-off-products

2. **Fix any discrepancies** - update the markdown docs to match the OpenAPI spec exactly

3. **Apply Vatly branding** to the Docus site:
   - Title: "Vatly Docs" (not "docus-starter")
   - Logo: Use `/Users/sandervanhooft/evy/brand-assets/vatly/vatly-wordmark.svg` (white version for dark, blue for light)
   - Also available: `/Users/sandervanhooft/evy/brand-assets/vatly/vatly-logo-square-400x400-white-on-blue.png`
   - Colors:
     - Primary/Blue: #326bff
     - Black: #161616
     - White: #ffffff
   - Font: Poppins (Light 300, Medium 500, Bold 700)
   - Both light AND dark mode must look correct

4. **Copy logo files** into the Docus `public/` directory

## Brand Guidelines
- Dark backgrounds: white logo
- Light backgrounds: blue (#326bff) logo
- Logo SVG viewBox: 0 0 134 53

## OpenAPI Spec Location
- Main spec: `/Users/sandervanhooft/vatlify/docs/openapi/openapi.yaml`
- Bundled: `/Users/sandervanhooft/vatlify/docs/openapi/dist/openapi.bundled.yaml`
- Path files: `/Users/sandervanhooft/vatlify/docs/openapi/paths/*.yaml`
- Schema files: `/Users/sandervanhooft/vatlify/docs/openapi/components/schemas/*.yaml`

## Docus Config
- `nuxt.config.ts` for site config (title, description, colors, etc.)
- `app/` for theme customization
- `content/` for markdown docs
- `public/` for static assets

## When done
Run: openclaw system event --text "Done: Vatly docs verified against OpenAPI spec and branded" --mode now
