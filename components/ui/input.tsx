import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-sm  px-3 py-2 text-base file:border-1 text-primary-100  file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:bg-slate-100 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-ring-1 focus-visible:ring-offset-0 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
