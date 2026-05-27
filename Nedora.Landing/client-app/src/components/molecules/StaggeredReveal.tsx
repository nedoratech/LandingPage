"use client";

import {
  createContext,
  useContext,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useStaggeredSlideUpInView } from "@/hooks/useStaggeredSlideUpInView";

type StaggeredRevealContextValue = {
  getItemClassName: () => string;
  getItemStyle: (index: number) => CSSProperties;
};

const StaggeredRevealContext =
  createContext<StaggeredRevealContextValue | null>(null);

type StaggeredRevealProps = {
  as?: "div" | "ul" | "ol";
  className?: string;
  staggerMs?: number;
  children: ReactNode;
};

export function StaggeredReveal({
  as = "div",
  className = "",
  staggerMs,
  children,
}: StaggeredRevealProps) {
  const { ref, getItemClassName, getItemStyle } =
    useStaggeredSlideUpInView(staggerMs);

  const value = { getItemClassName, getItemStyle };

  if (as === "ul") {
    return (
      <StaggeredRevealContext.Provider value={value}>
        <ul
          ref={ref as unknown as React.RefObject<HTMLUListElement>}
          className={className}
        >
          {children}
        </ul>
      </StaggeredRevealContext.Provider>
    );
  }

  if (as === "ol") {
    return (
      <StaggeredRevealContext.Provider value={value}>
        <ol
          ref={ref as unknown as React.RefObject<HTMLOListElement>}
          className={className}
        >
          {children}
        </ol>
      </StaggeredRevealContext.Provider>
    );
  }

  return (
    <StaggeredRevealContext.Provider value={value}>
      <div ref={ref as unknown as React.RefObject<HTMLDivElement>} className={className}>
        {children}
      </div>
    </StaggeredRevealContext.Provider>
  );
}

type StaggeredRevealItemProps = {
  as?: "div" | "li";
  index: number;
  className?: string;
  children: ReactNode;
};

export function StaggeredRevealItem({
  as = "div",
  index,
  className = "",
  children,
}: StaggeredRevealItemProps) {
  const ctx = useContext(StaggeredRevealContext);
  if (!ctx) {
    throw new Error("StaggeredRevealItem must be used within StaggeredReveal");
  }

  const itemClassName = [ctx.getItemClassName(), className]
    .filter(Boolean)
    .join(" ");
  const style = ctx.getItemStyle(index);

  if (as === "li") {
    return (
      <li className={itemClassName} style={style}>
        {children}
      </li>
    );
  }

  return (
    <div className={itemClassName} style={style}>
      {children}
    </div>
  );
}
