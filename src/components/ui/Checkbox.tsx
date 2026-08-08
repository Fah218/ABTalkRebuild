import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <div className={cn("checkbox-wrapper", className)} style={{ position: "relative", display: "inline-block", width: "20px", height: "20px" }}>
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className="sr-only"
          {...props}
        />
        <div 
          className="checkbox-custom"
          style={{
            width: "100%",
            height: "100%",
            border: `1px solid ${checked ? "var(--brand-primary)" : "var(--border-color)"}`,
            borderRadius: "4px",
            backgroundColor: checked ? "var(--brand-primary)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s"
          }}
        >
          {checked && <Check size={14} color="#fff" strokeWidth={3} />}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
