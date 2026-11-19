import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] text-sm font-medium transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#142B3B] text-white hover:bg-[#1E3E54] shadow-sm active:scale-[0.98]",
        orange:
          "bg-[#E97835] text-white hover:bg-[#D46624] shadow-sm active:scale-[0.98]",
        secondary:
          "bg-[#F7F5EF] text-[#142B3B] border border-[#EAE6DB] hover:bg-[#EAE6DB]/70 active:scale-[0.98]",
        outline:
          "border border-[#142B3B]/20 bg-transparent text-[#142B3B] hover:bg-[#142B3B]/5 active:scale-[0.98]",
        outlineOrange:
          "border border-[#E97835] bg-transparent text-[#E97835] hover:bg-[#E97835]/10 active:scale-[0.98]",
        ghost:
          "hover:bg-[#142B3B]/5 text-[#142B3B]",
        link:
          "text-[#E97835] underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3.5 text-xs rounded-xl",
        lg: "h-12 px-7 text-base rounded-2xl",
        icon: "h-10 w-10 p-0 rounded-xl",
        iconSm: "h-8 w-8 p-0 rounded-lg",
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
