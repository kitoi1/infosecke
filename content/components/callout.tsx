// content/components/callout.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Adjust this import if your cn utility is elsewhere

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  className?: string;
}

const styles: Record<string, string> = {
  info: "border-blue-500/30 bg-blue-500/5 text-blue-200",
  warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-200",
  error: "border-red-500/30 bg-red-500/5 text-red-200",
  success: "border-green-500/30 bg-green-500/5 text-green-200",
};

const icons: Record<string, string> = {
  info: "ℹ️",
  warning: "⚠️",
  error: "❌",
  success: "✅",
};

export function Callout({
  children,
  type = "info",
  title,
  className,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "border rounded-lg p-4 my-6 text-sm",
        styles[type],
        className,
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex-shrink-0" aria-hidden="true">
          {icons[type]}
        </span>
        <div className="min-w-0">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="prose-p:my-1 prose-a:text-inherit prose-code:text-inherit">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
