import {
  contentCategories,
  contentCategorySlugs,
  type ContentCategorySlug,
} from "@/config/content";

export function isContentCategory(
  value: string,
): value is ContentCategorySlug {
  return value in contentCategories;
}

export function getContentUrl(
  category: ContentCategorySlug,
  slug: string,
): string {
  return `${contentCategories[category].href}/${slug}`;
}

export function getContentFilePath(
  category: ContentCategorySlug,
  slug: string,
): string {
  return `${category}/${slug}.mdx`;
}

export { contentCategorySlugs };
