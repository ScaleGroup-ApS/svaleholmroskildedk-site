// ─────────────────────────────────────────────────────────────────────────────
// SEO Helpers
// Generates meta tags, Open Graph, JSON-LD structured data, and canonical URLs.
// ─────────────────────────────────────────────────────────────────────────────

import type { WpPage, WpPost, WpSiteInfo } from "./wp-types";
import { SITE_NAME, SITE_URL, LOCALE, DEFAULT_OG_IMAGE, abs } from "./site";

// React Router's meta descriptors are loosely typed (title / name+content /
// property+content / tagName+attrs), so use a permissive shape here.
type MetaDescriptor = Record<string, unknown>;

interface SeoOptions {
  title: string;
  description?: string;
  url?: string;
  siteName?: string;
  siteUrl?: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  canonical?: string;
}

/**
 * Generate a complete set of meta tags for React Router's `meta` export.
 */
export function buildMeta(opts: SeoOptions): MetaDescriptor[] {
  const meta: MetaDescriptor[] = [
    { title: opts.title },
  ];

  if (opts.description) {
    meta.push({ name: "description", content: opts.description });
  }

  // Canonical URL (rendered as <link rel="canonical">)
  if (opts.canonical) {
    meta.push({ tagName: "link", rel: "canonical", href: opts.canonical });
  }

  // Open Graph
  meta.push({ property: "og:title", content: opts.title });
  meta.push({ property: "og:type", content: opts.type ?? "website" });
  if (opts.description) {
    meta.push({ property: "og:description", content: opts.description });
  }
  if (opts.url) {
    meta.push({ property: "og:url", content: opts.url });
  }
  meta.push({ property: "og:site_name", content: opts.siteName ?? SITE_NAME });
  meta.push({ property: "og:locale", content: opts.locale ?? LOCALE });

  if (opts.image) {
    meta.push({ property: "og:image", content: opts.image });
    meta.push({ property: "og:image:width", content: "1200" });
    meta.push({ property: "og:image:height", content: "630" });
    if (opts.imageAlt) {
      meta.push({ property: "og:image:alt", content: opts.imageAlt });
    }
  }

  // Twitter Card
  meta.push({ name: "twitter:card", content: opts.image ? "summary_large_image" : "summary" });
  meta.push({ name: "twitter:title", content: opts.title });
  if (opts.description) {
    meta.push({ name: "twitter:description", content: opts.description });
  }
  if (opts.image) {
    meta.push({ name: "twitter:image", content: opts.image });
  }

  // Article dates
  if (opts.type === "article") {
    if (opts.publishedTime) {
      meta.push({ property: "article:published_time", content: opts.publishedTime });
    }
    if (opts.modifiedTime) {
      meta.push({ property: "article:modified_time", content: opts.modifiedTime });
    }
  }

  // Robots
  if (opts.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return meta;
}

/**
 * Convenience wrapper for the site's static routes — builds a full, consistent
 * meta set (title, description, canonical, absolute OG/Twitter) from a page
 * path. `path` is site-relative ("" = home, "/kontakt", …).
 */
export function pageMeta(opts: {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
}): MetaDescriptor[] {
  const url = `${SITE_URL}${opts.path}`;
  const image = abs(opts.image ?? DEFAULT_OG_IMAGE);
  return buildMeta({
    title: opts.title,
    description: opts.description,
    canonical: url,
    url,
    image,
    imageAlt: opts.imageAlt,
    noindex: opts.noindex,
  });
}

/**
 * Generate JSON-LD structured data for a page.
 */
export function buildPageJsonLd(opts: {
  page: WpPage | WpPost;
  siteInfo?: WpSiteInfo | null;
  siteUrl: string;
  type?: "WebPage" | "Article" | "BlogPosting";
}) {
  const { page, siteInfo, siteUrl, type = "WebPage" } = opts;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name: stripHtml(page.title.rendered),
    headline: stripHtml(page.title.rendered),
    url: `${siteUrl}/${page.slug}`,
    datePublished: page.date_gmt,
    dateModified: page.modified_gmt,
  };

  if (page.excerpt?.rendered) {
    jsonLd.description = stripHtml(page.excerpt.rendered);
  }

  // Featured image
  const media = page._embedded?.["wp:featuredmedia"]?.[0];
  if (media) {
    jsonLd.image = {
      "@type": "ImageObject",
      url: media.source_url,
      width: media.media_details?.width,
      height: media.media_details?.height,
    };
  }

  if (siteInfo) {
    jsonLd.publisher = {
      "@type": "Organization",
      name: siteInfo.name,
      url: siteUrl,
    };
  }

  // BreadcrumbList
  jsonLd.mainEntity = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: stripHtml(page.title.rendered),
        item: `${siteUrl}/${page.slug}`,
      },
    ],
  };

  return jsonLd;
}

/**
 * Generate WebSite JSON-LD (for the homepage).
 */
export function buildWebsiteJsonLd(siteInfo: WpSiteInfo | null, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteInfo?.name ?? "Website",
    description: siteInfo?.description ?? "",
    url: siteUrl,
  };
}

/**
 * Extract the featured image URL from a WP page/post with _embed.
 */
export function getFeaturedImageUrl(page: WpPage | WpPost): string | undefined {
  return page._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
}

/** Strip HTML tags from a string (for use in meta descriptions). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}
