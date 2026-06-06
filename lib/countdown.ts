/** Competition: Saturday June 6 at 10:00 AM in the user's local timezone. */
export function getCountdownTarget(): Date {
  return new Date(2026, 5, 6, 10, 0, 0, 0);
}

export interface CountdownParts {
  totalMs: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function getCountdownParts(target: Date, now = new Date()): CountdownParts {
  const totalMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(totalMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalMs,
    hours,
    minutes,
    seconds,
    isComplete: totalMs <= 0,
  };
}

export function padTwo(n: number): string {
  return n.toString().padStart(2, "0");
}
