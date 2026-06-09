import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-label-md font-label-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-container text-on-primary hover:opacity-90 shadow-sm",
        secondary: "bg-secondary-container text-on-secondary-container hover:opacity-90",
        outline: "border border-outline-variant bg-surface-container-lowest hover:bg-surface-container",
        ghost: "hover:bg-surface-container text-on-surface-variant hover:text-on-surface",
        danger: "bg-error text-on-error hover:opacity-90",
      },
      size: {
        default: "h-9 px-3 py-2",
        sm: "h-8 px-2 py-1 text-label-sm",
        lg: "h-10 px-4 py-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
