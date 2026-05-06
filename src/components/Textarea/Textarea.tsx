import type { TextareaHTMLAttributes } from "react";
import "./style.css";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ label, id, ...props }: Props) {
  return (
    <label className="textarea-field">
      <span>{label}</span>
      <textarea id={id} className="textarea-control" {...props} />
    </label>
  );
}
