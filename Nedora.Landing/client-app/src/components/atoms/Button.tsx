import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outlineInverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:bg-neutral-800 border border-black focus-visible:outline-black",
  secondary:
    "bg-white text-black hover:bg-neutral-50 border border-black focus-visible:outline-black",
  ghost:
    "bg-transparent text-black hover:bg-neutral-100 border border-transparent focus-visible:outline-black",
  inverse:
    "bg-white text-black hover:bg-neutral-100 border border-white focus-visible:outline-white",
  outlineInverse:
    "bg-white/10 text-white hover:bg-white/20 border border-white/80 backdrop-blur-sm focus-visible:outline-white",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
};

export function Button({
  variant = "primary",
  className = "",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-normal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
