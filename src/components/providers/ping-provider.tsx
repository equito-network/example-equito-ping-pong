import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";

type PingState = {
  ping?: string;
  setPing: Dispatch<SetStateAction<string | undefined>>;
  resetPing: VoidFunction;
};

type PingContext = PingState | undefined;

const pingContext = createContext<PingContext>(undefined);

export const PingProvider = ({ children }: PropsWithChildren<object>) => {
  const [ping, setPing] = useState<PingState["ping"]>();

  const value = useMemo(
    () => ({
      ping,
      setPing,
      resetPing: () => setPing(undefined),
    }),
    [ping, setPing]
  );

  return <pingContext.Provider value={value}>{children}</pingContext.Provider>;
};

export const usePing = () => {
  const context = useContext(pingContext);

  if (!context) {
    throw new Error("usePing must be used within a PingProvider");
  }

  return context;
};
