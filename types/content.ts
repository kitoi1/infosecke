import type { ContentCategorySlug } from "@/config/content";
import type { ContentFrontmatter } from "@/lib/content/frontmatter";

export type ReadingTime = {
  text: string;
  minutes: number;
  words: number;
};

export type ContentMeta = ContentFrontmatter & {
  slug: string;
  category: ContentCategorySlug;
  readingTime: ReadingTime;
  url: string;
};

export type ContentDocument = ContentMeta & {
  body: string;
};

export type ContentSlug = {
  category: ContentCategorySlug;
  slug: string;
};
