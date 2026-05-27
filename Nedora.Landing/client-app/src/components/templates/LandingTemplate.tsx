import { type ReactNode } from "react";
import { InitialLoader } from "@/components/organisms/InitialLoader";

export function LandingTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <InitialLoader />
      {children}
    </div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-6 max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-normal text-black sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-7 text-neutral-600">{subtitle}</p>
      ) : null}
    </div>
  );
}
