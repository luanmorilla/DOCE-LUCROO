import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: Props) {
  const classes = {
    primary:
      "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-200 hover:opacity-95",
    secondary: "bg-pink-50 text-pink-700 hover:bg-pink-100",
    ghost: "bg-white text-neutral-700 border border-pink-100 hover:bg-pink-50",
    danger: "bg-red-50 text-red-700 hover:bg-red-100"
  };

  return (
    <button
      type={type}
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        classes[variant],
        className
      )}
    />
  );
}
