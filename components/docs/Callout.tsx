// components/docs/Callout.tsx
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
  title?: string;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
};

const styles = {
  info: "border-blue-500/20 bg-blue-500/5 text-blue-400",
  warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
  error: "border-red-500/20 bg-red-500/5 text-red-400",
  success: "border-green-500/20 bg-green-500/5 text-green-400",
};

export function Callout({ children, type = "info", title }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={cn("border rounded-lg p-4 my-4", styles[type])}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
