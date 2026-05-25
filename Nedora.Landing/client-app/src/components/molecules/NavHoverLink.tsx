type NavHoverLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "nav" | "cta" | "mobile";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const variants = {
  nav: "px-3.5 py-1.5 text-sm",
  cta: "bg-neutral-200 px-4 py-2 text-sm",
  mobile: "min-w-[10.5rem] bg-white px-8 py-3 text-sm shadow-[0_0.25rem_1rem_0_rgb(0_0_0/0.08)]",
} as const;

export function NavHoverLink({
  href,
  children,
  variant = "nav",
  className = "",
  onClick,
}: NavHoverLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold ${variants[variant]} ${className}`}
    >
      <span
        className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-300 ease-out group-hover:scale-y-100"
        aria-hidden
      />
      <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </a>
  );
}
