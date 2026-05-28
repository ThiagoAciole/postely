import type { ButtonHTMLAttributes } from "react";
import { Button as ShadcnButton } from "../ui/button";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const mappedVariant =
    variant === "primary" ? "default" : variant === "danger" ? "destructive" : "outline";

  return (
    <ShadcnButton
      className={className}
      variant={mappedVariant}
      {...props}
    />
  );
}
