// content/components/code-block.tsx
import type { ReactNode } from "react";
import { getHighlighter } from "shiki";

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

async function highlightCode(code: string, language: string) {
  const highlighter = await getHighlighter({
    themes: ["github-dark"],
    langs: [language || "text"],
  });

  return highlighter.codeToHtml(code, {
    lang: language || "text",
    theme: "github-dark",
  });
}

export async function CodeBlock({
  children,
  language = "text",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const code = typeof children === "string" ? children.trim() : "";
  const html = await highlightCode(code, language);

  return (
    <div className="group relative my-6 rounded-lg border border-border bg-muted/20 overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground font-mono">
          <span>{filename}</span>
          <span className="text-xs uppercase text-muted-foreground/60">
            {language}
          </span>
        </div>
      )}

      <div className="relative">
        <div
          className={`p-4 overflow-x-auto ${
            showLineNumbers ? "pl-12" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <CopyButton code={code} />
      </div>
    </div>
  );
}

/* ---------- Client‑side copy button ---------- */
import { useState } from "react";
import { Check, Copy } from "lucide-react";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-md bg-background/70 hover:bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity"
      aria-label="Copy code to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}
