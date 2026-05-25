import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO, BRAND_LOGO_WHITE } from "@/lib/constants";

type LogoProps = {
  /** Tailwind height class; width follows aspect ratio */
  className?: string;
  priority?: boolean;
  variant?: "default" | "white";
};

export function Logo({
  className = "h-8 w-auto",
  priority = false,
  variant = "default",
}: LogoProps) {
  const brand = variant === "white" ? BRAND_LOGO_WHITE : BRAND_LOGO;

  return (
    <Link href="/" className="inline-flex items-center" aria-label="Nedora home">
      <Image
        src={brand.src}
        alt="Nedora"
        width={brand.width}
        height={brand.height}
        priority={priority}
        className={className}
      />
    </Link>
  );
}
