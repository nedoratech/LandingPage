import { type ReactNode } from "react";

type Level = 1 | 2 | 3;

const styles: Record<Level, string> = {
  1: "text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl",
  2: "text-3xl font-bold tracking-normal sm:text-4xl",
  3: "text-2xl font-bold tracking-normal",
};

export function Heading({
  level,
  children,
  className = "",
  id,
}: {
  level: Level;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={`${styles[level]} ${className}`}>
      {children}
    </Tag>
  );
}
