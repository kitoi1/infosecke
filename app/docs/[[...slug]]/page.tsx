// app/docs/[[...slug]]/page.tsx
import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { useMDXComponents } from "@/components/mdx-components";
import type { Metadata } from "next";
import rehypePrettyCode from "rehype-pretty-code";

interface DocPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params; // Await the promise
  const resolvedSlug = slug?.join("/") || "index";

  try {
    const source = readFileSync(
      path.join(process.cwd(), "content/docs", `${resolvedSlug}.mdx`),
      "utf-8"
    );
    const { data } = matter(source);
    return {
      title: `${data.title || "Documentation"} | InfoSecKe`,
      description: data.description || "InfoSecKe documentation",
    };
  } catch {
    return {
      title: "Documentation | InfoSecKe",
    };
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params; // Await the promise
  const resolvedSlug = slug?.join("/") || "index";
  const components = useMDXComponents({});

  try {
    const source = readFileSync(
      path.join(process.cwd(), "content/docs", `${resolvedSlug}.mdx`),
      "utf-8"
    );
    const { content } = matter(source);

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-dark" }],
                ],
              },
            }}
          />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
