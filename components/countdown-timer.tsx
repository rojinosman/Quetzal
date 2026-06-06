"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  getCountdownParts,
  getCountdownTarget,
  padTwo,
} from "@/lib/countdown";
import { useCountdownUI } from "@/components/countdown-provider";
import { cn } from "@/lib/utils";

function useCountdownTick() {
  const target = React.useMemo(() => getCountdownTarget(), []);
  const [parts, setParts] = React.useState(() => getCountdownParts(target));

  React.useEffect(() => {
    const tick = () => setParts(getCountdownParts(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return parts;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function DigitHalf({
  digit,
  textClass,
  half,
}: {
  digit: string;
  textClass: string;
  half: "top" | "bottom";
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <span
        className={cn(textClass, "absolute left-1/2 whitespace-nowrap")}
        style={{
          top: half === "top" ? "100%" : "0%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {digit}
      </span>
    </div>
  );
}

function FlipDigit({
  digit,
  large,
}: {
  digit: string;
  large: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [shown, setShown] = React.useState(digit);
  const [flipping, setFlipping] = React.useState(false);
  const [flipFrom, setFlipFrom] = React.useState(digit);
  const [flipTo, setFlipTo] = React.useState(digit);
  const [bottomRevealed, setBottomRevealed] = React.useState(false);
  const targetDigitRef = React.useRef(digit);

  targetDigitRef.current = digit;

  React.useLayoutEffect(() => {
    if (digit === shown) return;

    if (reducedMotion) {
      setShown(digit);
      setFlipping(false);
      setBottomRevealed(false);
      return;
    }

    if (flipping) return;

    setFlipFrom(shown);
    setFlipTo(digit);
    setBottomRevealed(false);
    setFlipping(true);
  }, [digit, shown, flipping, reducedMotion]);

  React.useEffect(() => {
    if (!flipping) return;

    const id = window.setTimeout(() => {
      setBottomRevealed(true);
    }, 250);

    return () => window.clearTimeout(id);
  }, [flipping, flipFrom, flipTo]);

  const handleFlipEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return;
    if (event.animationName !== "flip-down") return;

    const latest = targetDigitRef.current;

    if (latest !== flipTo) {
      setFlipFrom(flipTo);
      setFlipTo(latest);
      setBottomRevealed(false);
      return;
    }

    setShown(latest);
    setBottomRevealed(false);
    setFlipping(false);
  };

  const bottomDigit = flipping
    ? bottomRevealed
      ? flipTo
      : flipFrom
    : shown;

  const textClass = cn(
    "font-bold leading-none tabular-nums text-white",
    large
      ? "text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
      : "text-xl sm:text-3xl"
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-zinc-700 bg-black",
        large
          ? "h-24 w-[4.5rem] shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:h-32 sm:w-24 md:h-40 md:w-28 lg:h-48 lg:w-32"
          : "h-11 w-[1.85rem] shadow-md sm:h-[3.25rem] sm:w-11"
      )}
      style={{ perspective: "600px" }}
    >
      <div className="absolute inset-x-0 top-0 z-[1] h-1/2 overflow-hidden rounded-t-md bg-zinc-950">
        <DigitHalf
          digit={flipping ? flipTo : shown}
          half="top"
          textClass={textClass}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 overflow-hidden rounded-b-md bg-black">
        <DigitHalf digit={bottomDigit} half="bottom" textClass={textClass} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {flipping && (
        <div
          key={`${flipFrom}-${flipTo}`}
          className="flip-down absolute inset-x-0 top-0 z-[15] h-1/2"
          style={{ transformOrigin: "bottom center" }}
          onAnimationEnd={handleFlipEnd}
        >
          <div className="flip-face-front absolute inset-0 overflow-hidden rounded-t-md bg-zinc-950">
            <DigitHalf digit={flipFrom} half="top" textClass={textClass} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "absolute left-0 right-0 top-1/2 z-20 -translate-y-1/2 bg-zinc-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]",
          large ? "h-[3px]" : "h-px"
        )}
      />

      <div
        className={cn(
          "absolute left-0 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-zinc-500 shadow-sm",
          large ? "h-3 w-1.5" : "h-2 w-1"
        )}
      />
      <div
        className={cn(
          "absolute right-0 top-1/2 z-30 translate-x-1/2 -translate-y-1/2 rounded-sm bg-zinc-500 shadow-sm",
          large ? "h-3 w-1.5" : "h-2 w-1"
        )}
      />
    </div>
  );
}

function FlipPair({
  value,
  large,
  id,
}: {
  value: string;
  large: boolean;
  id: string;
}) {
  const digits = value.padStart(2, "0").split("");

  return (
    <div className={cn("flex", large ? "gap-2 sm:gap-3" : "gap-1 sm:gap-1.5")}>
      {digits.map((digit, index) => (
        <FlipDigit key={`${id}-${index}`} digit={digit} large={large} />
      ))}
    </div>
  );
}

function CountdownDigits({
  size,
  parts,
}: {
  size: "large" | "small";
  parts: ReturnType<typeof getCountdownParts>;
}) {
  const large = size === "large";
  const unitClass =
    "mt-4 text-xs font-medium tracking-[0.2em] text-white uppercase md:mt-5 md:text-sm";

  const segments = [
    { value: padTwo(parts.hours), label: "Hours", id: "hours" },
    { value: padTwo(parts.minutes), label: "Minutes", id: "minutes" },
    { value: padTwo(parts.seconds), label: "Seconds", id: "seconds" },
  ];

  if (parts.isComplete) {
    return (
      <div className={cn("flex items-center", large ? "gap-3 sm:gap-4" : "gap-2")}>
        <FlipPair value="00" large={large} id="complete-h" />
        {!large && <span className="pb-1 text-xl font-bold text-white/35">:</span>}
        <FlipPair value="00" large={large} id="complete-m" />
        {!large && <span className="pb-1 text-xl font-bold text-white/35">:</span>}
        <FlipPair value="00" large={large} id="complete-s" />
      </div>
    );
  }

  if (!large) {
    return (
      <div className="font-sans flex shrink-0 items-center gap-1 sm:gap-2.5">
        {segments.map((segment, index) => (
          <React.Fragment key={segment.label}>
            {index > 0 && (
              <span className="pb-0.5 text-lg font-bold text-white/35 sm:text-2xl">
                :
              </span>
            )}
            <FlipPair value={segment.value} large={large} id={segment.id} />
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="font-sans flex flex-wrap items-end justify-center gap-4 sm:gap-6 md:gap-8">
      {segments.map((segment) => (
        <div key={segment.label} className="flex flex-col items-center">
          <FlipPair value={segment.value} large={large} id={segment.id} />
          <span className={unitClass}>{segment.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CountdownTimer() {
  const { dismissed, dismiss, miniBarVisible } = useCountdownUI();
  const parts = useCountdownTick();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || parts.isComplete) {
    return null;
  }

  if (!dismissed) {
    return (
      <div className="fixed inset-0 z-[100]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-4 right-4 z-[102] rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close countdown"
        >
          <X className="size-6" />
        </button>
        <div className="relative z-[101] flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
          <p className="mb-8 text-base font-medium tracking-[0.25em] text-primary uppercase md:mb-12 md:text-lg">
            Countdown to Competition
          </p>
          <div className="w-full max-w-[100vw] origin-center scale-[0.82] sm:scale-100">
            <CountdownDigits size="large" parts={parts} />
          </div>
        </div>
      </div>
    );
  }

  if (!miniBarVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] border-b border-white/10 bg-black/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center px-3 sm:h-[4.75rem] sm:px-6">
        <span className="hidden w-[5.5rem] shrink-0 text-xs font-medium tracking-[0.22em] text-primary uppercase sm:block">
          Competition
        </span>
        <div className="flex min-w-0 flex-1 justify-center">
          <CountdownDigits size="small" parts={parts} />
        </div>
        <span className="hidden w-[5.5rem] shrink-0 sm:block" aria-hidden />
      </div>
    </div>
  );
}
