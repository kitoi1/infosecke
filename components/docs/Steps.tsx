// components/docs/Steps.tsx
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn("my-6 ml-4 border-l-2 border-border pl-6 space-y-8", className)}>
      {children}
    </div>
  );
}

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="relative">
      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}
