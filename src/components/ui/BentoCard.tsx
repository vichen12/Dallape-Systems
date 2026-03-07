import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  className?: string;
  children: ReactNode;
  title?: string;
  description?: string;
}

export function BentoCard({
  className,
  children,
  title,
  description,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10",
        className
      )}
    >
      {children}
      {title && (
        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      )}
      {description && (
        <p className="mt-2 text-sm text-white/60">{description}</p>
      )}
    </div>
  );
}
