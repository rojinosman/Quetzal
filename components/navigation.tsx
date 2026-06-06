"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCountdownUI } from "@/components/countdown-provider";

export function Navigation() {
  const pathname = usePathname();
  const { miniBarVisible } = useCountdownUI();

  const links = [
    { href: "/", label: "Home" },
    { href: "/team", label: "Team" },
    { href: "/gallery", label: "Gallery" },
    { href: "/design-day", label: "Design Day" },
  ];

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-[top]",
        miniBarVisible ? "top-[4.5rem] sm:top-[4.75rem]" : "top-0"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/Quetzal-logo.png"
            alt="Quetzal"
            width={164}
            height={164}
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
