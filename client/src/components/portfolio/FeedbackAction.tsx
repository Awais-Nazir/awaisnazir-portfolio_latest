import React, { type AnchorHTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type FeedbackActionProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function FeedbackAction({ children, className, onPointerDown, onPointerEnter, onPointerLeave, onPointerUp, ...props }: FeedbackActionProps) {
  const [feedback, setFeedback] = useState<"idle" | "hover" | "pressed">("idle");

  return (
    <a
      {...props}
      className={cn("whatsapp-cta", className)}
      data-feedback={feedback}
      onPointerEnter={(event) => {
        setFeedback("hover");
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setFeedback("idle");
        onPointerLeave?.(event);
      }}
      onPointerDown={(event) => {
        setFeedback("pressed");
        onPointerDown?.(event);
      }}
      onPointerUp={(event) => {
        setFeedback("hover");
        onPointerUp?.(event);
      }}
    >
      {children}
    </a>
  );
}
