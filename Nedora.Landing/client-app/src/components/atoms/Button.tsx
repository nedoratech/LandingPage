import { type ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "inverse"
  | "outlineInverse"
  | "cta";

const variants: Record<Variant, string> = {
  primary:
    "rounded-md bg-black text-white hover:bg-neutral-800 border border-black focus-visible:outline-black",
  secondary:
    "rounded-md bg-white text-black hover:bg-neutral-50 border border-black focus-visible:outline-black",
  ghost:
    "rounded-md bg-transparent text-black hover:bg-neutral-100 border border-transparent focus-visible:outline-black",
  inverse:
    "rounded-md bg-white text-black hover:bg-neutral-100 border border-white focus-visible:outline-white",
  outlineInverse:
    "rounded-md bg-white/10 text-white hover:bg-white/20 border border-white/80 backdrop-blur-sm focus-visible:outline-white",
  cta:
    "rounded-full border border-primary-blue bg-primary-blue px-6 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:border-black hover:bg-black hover:text-white focus-visible:outline-primary-blue sm:px-8 sm:py-3 sm:text-base",
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
  const classes = `inline-flex cursor-pointer items-center justify-center px-5 py-2.5 text-base font-normal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`;

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
