"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "h-4 w-4 shrink-0 rounded border border-outline-variant bg-surface-container-lowest accent-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
