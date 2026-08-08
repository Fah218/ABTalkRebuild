import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div ref={ref} className={cn("badge", variant === "success" && "badge-success", className)} {...props} />
  )
);
Badge.displayName = "Badge";

export { Badge };
