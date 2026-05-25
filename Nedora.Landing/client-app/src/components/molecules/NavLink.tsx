export function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`text-base text-neutral-800 transition-colors hover:text-black ${className}`}
    >
      {children}
    </a>
  );
}
