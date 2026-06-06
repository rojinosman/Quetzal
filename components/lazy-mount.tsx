"use client";

import * as React from "react";

type LazyMountProps = {
  children: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
  placeholder?: React.ReactNode;
};

export function LazyMount({
  children,
  rootMargin = "240px 0px",
  minHeight,
  placeholder = null,
}: LazyMountProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={minHeight ? { minHeight } : undefined}>
      {visible ? children : placeholder}
    </div>
  );
}

export function SectionPlaceholder({ minHeight = "24rem" }: { minHeight?: string }) {
  return (
    <div
      className="animate-pulse rounded-2xl border border-border/50 bg-card/30"
      style={{ minHeight }}
      aria-hidden
    />
  );
}
