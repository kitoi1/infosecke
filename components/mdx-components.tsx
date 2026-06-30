// components/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { Steps, Step } from "@/components/docs/Steps";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default elements
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mt-8 mb-3 text-foreground">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground leading-7 mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground">
        {children}
      </ol>
    ),
    code: ({ children, className }) => {
      const language = className?.replace("language-", "");
      if (language) {
        return <CodeBlock language={language}>{children}</CodeBlock>;
      }
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono">
          {children}
        </code>
      );
    },
    pre: ({ children }) => <>{children}</>,
    // Custom components
    Callout,
    Steps,
    Step,
    Image: (props) => (
      <Image
        className="rounded-lg border border-border my-6"
        {...props}
        alt={props.alt || ""}
      />
    ),
    ...components,
  };
}
