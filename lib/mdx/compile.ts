import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";

import type { ContentCategorySlug } from "@/config/content";
import { getContentDocument } from "@/lib/content/reader";
import { pickFrontmatter, type ContentFrontmatter } from "@/lib/content/frontmatter";
import { mdxComponents } from "@/mdx-components";

import { mdxSerializeOptions } from "./options";

export type CompiledContent = {
  content: ReactElement;
  frontmatter: ContentFrontmatter;
};

export async function compileContent(
  category: ContentCategorySlug,
  slug: string,
): Promise<CompiledContent> {
  const document = getContentDocument(category, slug);

  const { content } = await compileMDX({
    source: document.body,
    options: mdxSerializeOptions,
    components: mdxComponents,
  });

  return {
    content,
    frontmatter: pickFrontmatter(document),
  };
}
