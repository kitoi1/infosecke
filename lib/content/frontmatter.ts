import { z } from "zod";

export const contentFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

export type ContentFrontmatter = z.infer<typeof contentFrontmatterSchema>;

export function pickFrontmatter(
  source: ContentFrontmatter,
): ContentFrontmatter {
  return {
    title: source.title,
    description: source.description,
    publishedAt: source.publishedAt,
    updatedAt: source.updatedAt,
    author: source.author,
    tags: source.tags,
    featured: source.featured,
    draft: source.draft,
    image: source.image,
    seo: source.seo,
  };
}

export function parseContentFrontmatter(
  data: unknown,
  filePath: string,
): ContentFrontmatter {
  const result = contentFrontmatterSchema.safeParse(data);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new Error(`Invalid frontmatter in ${filePath}: ${issues}`);
  }

  return result.data;
}
