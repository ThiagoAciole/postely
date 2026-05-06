import type { ButtonHTMLAttributes } from "react";
import "./style.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props} />;
}
