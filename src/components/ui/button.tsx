import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-11 px-4",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--action-fill)] !text-white hover:opacity-95",
        secondary:
          "bg-[var(--surface-subtle)] text-[var(--text-heading)] border border-[var(--border-subtle)] hover:bg-[var(--surface-card)]",
        outline:
          "border border-[var(--border-subtle)] bg-transparent text-[var(--text-heading)] hover:bg-[var(--surface-subtle)]",
        ghost: "hover:bg-[var(--surface-subtle)] text-[var(--text-heading)]",
        link: "text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline min-h-0 px-0",
        destructive:
          "bg-[var(--color-error)] text-white hover:opacity-95",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-[var(--radius-control)] px-3",
        lg: "h-12 rounded-[var(--radius-control)] px-6 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
