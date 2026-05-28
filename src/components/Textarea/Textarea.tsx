import type { TextareaHTMLAttributes } from "react";
import { Textarea as ShadcnTextarea } from "../ui/textarea";
import "./style.css";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ label, id, ...props }: Props) {
  return (
    <label className="textarea-field">
      <span>{label}</span>
      <ShadcnTextarea id={id} {...props} />
    </label>
  );
}
