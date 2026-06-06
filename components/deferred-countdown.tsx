"use client";

import dynamic from "next/dynamic";

const CountdownTimer = dynamic(
  () =>
    import("@/components/countdown-timer").then((mod) => mod.CountdownTimer),
  { ssr: false }
);

export function DeferredCountdown() {
  return <CountdownTimer />;
}
