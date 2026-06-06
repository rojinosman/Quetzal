/** Next calendar day at 10:00 AM in the user's local timezone. */
export function getCountdownTarget(): Date {
  const target = new Date();
  target.setDate(target.getDate() + 1);
  target.setHours(10, 0, 0, 0);
  return target;
}

export interface CountdownParts {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function getCountdownParts(target: Date, now = new Date()): CountdownParts {
  const totalMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(totalMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isComplete: totalMs <= 0,
  };
}

export function padTwo(n: number): string {
  return n.toString().padStart(2, "0");
}
