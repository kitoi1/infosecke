// components/docs/CodeBlock.tsx
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (typeof children === "string") {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group mb-6">
      {filename && (
        <div className="bg-muted/50 px-4 py-2 rounded-t-lg border border-b-0 border-border text-sm text-muted-foreground font-mono">
          {filename}
        </div>
      )}
      <div className="relative">
        <pre
          className={cn(
            "bg-muted/50 border border-border p-4 overflow-x-auto rounded-lg",
            filename && "rounded-t-none"
          )}
        >
          <code className={`language-${language || "text"} text-sm`}>
            {children}
          </code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-md bg-background/50 hover:bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
