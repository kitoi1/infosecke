import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;

  return function Heading({
    id,
    className,
    children,
    ...props
  }: React.ComponentProps<typeof Tag>) {
    return (
      <Tag
        id={id}
        className={cn(
          "scroll-mt-24 font-heading tracking-tight text-foreground",
          level === 1 && "text-4xl font-bold lg:text-5xl",
          level === 2 && "mt-12 text-3xl font-semibold lg:text-4xl",
          level === 3 && "mt-8 text-2xl font-semibold",
          level === 4 && "mt-6 text-xl font-semibold",
          level === 5 && "mt-4 text-lg font-semibold",
          level === 6 && "mt-4 text-base font-semibold",
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  };
}

function MdxLink({
  href,
  className,
  children,
  ...props
}: React.ComponentProps<"a">) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={cn("font-medium text-primary underline-offset-4 hover:underline", className)}>
        {children}
      </Link>
    );
  }

  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      className={cn("font-medium text-primary underline-offset-4 hover:underline", className)}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-8 text-muted-foreground [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  a: MdxLink,
  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-6 ml-6 list-disc space-y-2 text-muted-foreground", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-6 ml-6 list-decimal space-y-2 text-muted-foreground", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 border-l-2 border-primary/40 pl-6 italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-10 border-border", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <div className="my-8 w-full overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead className={cn("border-b border-border", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "px-4 py-3 text-left font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("px-4 py-3 text-muted-foreground", className)} {...props} />
  ),
  tr: ({ className, ...props }) => (
    <tr className={cn("border-b border-border/60", className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-sm",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => {
    const isCodeBlock = className?.includes("language-");

    if (isCodeBlock) {
      return <code className={className} {...props} />;
    }

    return (
      <code
        className={cn(
          "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground",
          className,
        )}
        {...props}
      />
    );
  },
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}

export default useMDXComponents;
