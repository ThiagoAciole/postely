import type { InputHTMLAttributes } from "react";
import "./style.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, ...props }: Props) {
  return (
    <label className="input-field">
      <span>{label}</span>
      <input id={id} className="input-control" {...props} />
    </label>
  );
}
