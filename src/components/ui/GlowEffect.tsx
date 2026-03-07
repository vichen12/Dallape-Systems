import { cn } from "@/lib/utils";

interface GlowEffectProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-32 h-32 blur-2xl",
  md: "w-64 h-64 blur-3xl",
  lg: "w-96 h-96 blur-[128px]",
};

export function GlowEffect({
  className,
  color = "bg-violet-500",
  size = "md",
}: GlowEffectProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full opacity-20",
        sizes[size],
        color,
        className
      )}
    />
  );
}
