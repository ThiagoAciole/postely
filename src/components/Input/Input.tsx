import type { InputHTMLAttributes } from "react";
import { Input as ShadcnInput } from "../ui/input";
import "./style.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, ...props }: Props) {
  return (
    <label className="input-field">
      <span>{label}</span>
      <ShadcnInput id={id} {...props} />
    </label>
  );
}
