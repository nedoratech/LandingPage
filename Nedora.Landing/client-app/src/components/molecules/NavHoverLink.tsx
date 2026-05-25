"use client";

import { useState } from "react";

type NavHoverLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "nav" | "cta" | "mobile";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

type FillState = "idle" | "enter" | "exit";

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
  const [fillState, setFillState] = useState<FillState>("idle");

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setFillState("enter")}
      onMouseLeave={() => setFillState("exit")}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold ${variants[variant]} ${className}`}
    >
      <span
        className={`hover-fill-bg absolute inset-0 bg-black ${
          fillState === "enter"
            ? "hover-fill-bg--enter"
            : fillState === "exit"
              ? "hover-fill-bg--exit"
              : ""
        }`}
        aria-hidden
        onAnimationEnd={() => {
          if (fillState === "exit") setFillState("idle");
        }}
      />
      <span
        className={`hover-fill-text relative z-10 ${
          fillState === "enter" ? "text-white" : "text-black"
        }`}
      >
        {children}
      </span>
    </a>
  );
}
