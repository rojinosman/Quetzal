"use client";

import * as React from "react";

const DISMISS_STORAGE_KEY = "quetzal-countdown-dismissed";

type CountdownContextValue = {
  dismissed: boolean;
  dismiss: () => void;
  miniBarVisible: boolean;
};

const CountdownContext = React.createContext<CountdownContextValue>({
  dismissed: false,
  dismiss: () => {},
  miniBarVisible: false,
});

export function useCountdownUI() {
  return React.useContext(CountdownContext);
}

export function CountdownProvider({ children }: { children: React.ReactNode }) {
  const [dismissed, setDismissed] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_STORAGE_KEY) === "true");
    setHydrated(true);
  }, []);

  const dismiss = React.useCallback(() => {
    setDismissed(true);
    localStorage.setItem(DISMISS_STORAGE_KEY, "true");
  }, []);

  const miniBarVisible = hydrated && dismissed;

  return (
    <CountdownContext.Provider value={{ dismissed, dismiss, miniBarVisible }}>
      {children}
    </CountdownContext.Provider>
  );
}
