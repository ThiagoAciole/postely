import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Avatar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ui-avatar", className)} {...props} />;
}

export function AvatarImage({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={cn("ui-avatar-image", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ui-avatar-fallback", className)} {...props} />;
}
