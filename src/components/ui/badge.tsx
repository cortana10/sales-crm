import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-label-sm font-label-sm transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-container/10 text-primary-container",
        secondary: "bg-secondary-container/30 text-on-secondary-container",
        tertiary: "bg-tertiary-container/20 text-tertiary-container",
        outline: "border border-outline text-on-surface-variant",
        success: "bg-primary-fixed-dim/30 text-primary",
        warning: "bg-secondary-fixed-dim/30 text-secondary",
        error: "bg-error-container/50 text-on-error-container",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
