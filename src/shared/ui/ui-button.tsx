import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type UiButtonVariant = "primary" | "secondary" | "outlined";
export type UiButtonProps = {
  variant: UiButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function UiButton({ className, variant, disabled, ...props }: UiButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        className,
        "px-4 h-10 rounded cursor-pointer flex gap-2 items-center justify-center",
        {
          primary:
            clsx("text-white bg-teal-500 disabled:opacity-50 shadow shadow-teal-500/30",
              disabled ? "cursor-not-allowed" : "hover:bg-teal-600"),
          secondary:
            clsx("text-white bg-rose-500 disabled:opacity-50 shadow shadow-rose-500/30",
              disabled ? "cursor-not-allowed" : "hover:bg-rose-600"),
          outlined:
            clsx("border border-slate-300 disabled:opacity-50",
              disabled ? "cursor-not-allowed" : "hover:border-slate-500"),
        }[variant],
      )}
    />
  );
}
