import { cache } from "react";

import type {
  ContentDocument,
  ContentMeta,
  ContentSlug,
} from "@/types/content";

import {
  contentExists,
  getAdjacentContent,
  getAllContentMeta,
  getAllContentSlugs,
  getContentDocument,
  getContentMeta,
  getContentMetaByCategory,
  getFeaturedContent,
  getRelatedContent,
} from "./reader";

export type { ContentFrontmatter } from "./frontmatter";
export {
  getContentUrl,
  isContentCategory,
  contentCategorySlugs,
} from "./paths";

export const getCachedAllContentMeta = cache(getAllContentMeta);
export const getCachedAllContentSlugs = cache(getAllContentSlugs);
export const getCachedContentMeta = cache(getContentMeta);
export const getCachedContentDocument = cache(getContentDocument);
export const getCachedContentMetaByCategory = cache(getContentMetaByCategory);
export const getCachedFeaturedContent = cache(getFeaturedContent);
export const getCachedRelatedContent = cache(getRelatedContent);
export const getCachedAdjacentContent = cache(getAdjacentContent);

export {
  contentExists,
  getAdjacentContent,
  getAllContentMeta,
  getAllContentSlugs,
  getContentDocument,
  getContentMeta,
  getContentMetaByCategory,
  getFeaturedContent,
  getRelatedContent,
};

export type { ContentDocument, ContentMeta, ContentSlug };
