import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import {
  CONTENT_DIR,
  contentCategorySlugs,
  type ContentCategorySlug,
} from "@/config/content";
import type {
  ContentDocument,
  ContentMeta,
  ContentSlug,
} from "@/types/content";

import {
  parseContentFrontmatter,
  pickFrontmatter,
} from "./frontmatter";
import { getContentFilePath, getContentUrl, isContentCategory } from "./paths";

const contentRoot = path.join(process.cwd(), CONTENT_DIR);

function assertContentRootExists(): void {
  if (!fs.existsSync(contentRoot)) {
    throw new Error(`Content directory not found: ${contentRoot}`);
  }
}

function readMdxFile(relativePath: string): string {
  const absolutePath = path.join(contentRoot, relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Content file not found: ${relativePath}`);
  }

  return fs.readFileSync(absolutePath, "utf8");
}

function listMdxFilesInCategory(category: ContentCategorySlug): string[] {
  const categoryDir = path.join(contentRoot, category);

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  return fs
    .readdirSync(categoryDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function shouldIncludeDraft(isDraft: boolean): boolean {
  return process.env.NODE_ENV !== "production" || !isDraft;
}

function toContentMeta(document: ContentDocument): ContentMeta {
  return {
    slug: document.slug,
    category: document.category,
    readingTime: document.readingTime,
    url: document.url,
    ...pickFrontmatter(document),
  };
}

function parseContentFile(
  category: ContentCategorySlug,
  slug: string,
): ContentDocument {
  const relativePath = getContentFilePath(category, slug);
  const source = readMdxFile(relativePath);
  const { data, content } = matter(source);
  const frontmatter = parseContentFrontmatter(data, relativePath);
  const stats = readingTime(content);

  return {
    ...pickFrontmatter(frontmatter),
    slug,
    category,
    url: getContentUrl(category, slug),
    readingTime: {
      text: stats.text,
      minutes: Math.ceil(stats.minutes),
      words: stats.words,
    },
    body: content,
  };
}

export function getAllContentSlugs(): ContentSlug[] {
  assertContentRootExists();

  return contentCategorySlugs.flatMap((category) =>
    listMdxFilesInCategory(category).map((slug) => ({ category, slug })),
  );
}

export function getAllContentMeta(): ContentMeta[] {
  assertContentRootExists();

  return getAllContentSlugs()
    .map(({ category, slug }) => parseContentFile(category, slug))
    .filter((document) => shouldIncludeDraft(document.draft))
    .map(toContentMeta)
    .sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
    );
}

export function getContentMetaByCategory(
  category: ContentCategorySlug,
): ContentMeta[] {
  return getAllContentMeta().filter((meta) => meta.category === category);
}

export function getContentMeta(
  category: ContentCategorySlug,
  slug: string,
): ContentMeta {
  const document = getContentDocument(category, slug);

  if (!shouldIncludeDraft(document.draft)) {
    throw new Error(`Content not found: ${category}/${slug}`);
  }

  return toContentMeta(document);
}

export function getContentDocument(
  category: ContentCategorySlug,
  slug: string,
): ContentDocument {
  if (!isContentCategory(category)) {
    throw new Error(`Invalid content category: ${category}`);
  }

  return parseContentFile(category, slug);
}

export function contentExists(
  category: ContentCategorySlug,
  slug: string,
): boolean {
  const relativePath = getContentFilePath(category, slug);
  return fs.existsSync(path.join(contentRoot, relativePath));
}

export function getFeaturedContent(limit = 3): ContentMeta[] {
  return getAllContentMeta()
    .filter((meta) => meta.featured)
    .slice(0, limit);
}

export function getRelatedContent(
  meta: ContentMeta,
  limit = 3,
): ContentMeta[] {
  const tagSet = new Set(meta.tags);

  return getAllContentMeta()
    .filter(
      (candidate) =>
        candidate.slug !== meta.slug &&
        candidate.category === meta.category &&
        candidate.tags.some((tag) => tagSet.has(tag)),
    )
    .slice(0, limit);
}

export function getAdjacentContent(meta: ContentMeta): {
  previous: ContentMeta | null;
  next: ContentMeta | null;
} {
  const categoryContent = getContentMetaByCategory(meta.category);
  const index = categoryContent.findIndex(
    (candidate) => candidate.slug === meta.slug,
  );

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: categoryContent[index + 1] ?? null,
    next: categoryContent[index - 1] ?? null,
  };
}
