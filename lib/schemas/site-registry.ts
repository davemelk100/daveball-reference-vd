/**
 * Site registry: defines the minimum files every music site must have.
 * Used by the site-completeness tests.
 */

/** Route page files every site must provide (relative to app/{siteId}/) */
export const REQUIRED_ROUTES = [
  "page.tsx",
  "albums/page.tsx",
  "albums/[id]/page.tsx",
  "members/page.tsx",
  "search/page.tsx",
] as const;

/** Component files every site must provide (relative to components/{siteId}/) */
export const REQUIRED_COMPONENTS = [
  "{siteId}-dashboard-content.tsx",
] as const;

/** Required site config fields checked at test time */
export const REQUIRED_CONFIG_FIELDS = [
  "id",
  "name",
  "shortName",
  "basePath",
  "navLabels",
  "seo",
  "searchPlaceholder",
  "logoSrc",
  "placeholderIconSrc",
] as const;
