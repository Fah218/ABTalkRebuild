import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    return (
      <div ref={ref} className={cn("progress-bar-container", className)} {...props}>
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
