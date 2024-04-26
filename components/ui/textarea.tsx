import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-sm  px-3 py-2 text-base file:border-1 file:font-medium placeholder:text-muted-foreground focus-visible:bg-slate-100 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-ring-1 focus-visible:ring-offset-0 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
