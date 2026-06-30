import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { ContentMeta } from "@/types/content";

type CreateContentMetadataOptions = {
  canonicalPath?: string;
};

export function createContentMetadata(
  content: ContentMeta,
  options: CreateContentMetadataOptions = {},
): Metadata {
  const title = content.seo?.title ?? content.title;
  const description = content.seo?.description ?? content.description;
  const canonicalPath = options.canonicalPath ?? content.url;
  const canonicalUrl = new URL(canonicalPath, siteConfig.url).toString();
  const image = content.image
    ? new URL(content.image, siteConfig.url).toString()
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      publishedTime: content.publishedAt.toISOString(),
      modifiedTime: content.updatedAt?.toISOString(),
      tags: content.tags,
      ...(image ? { images: [{ url: image, alt: title }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function createPageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
