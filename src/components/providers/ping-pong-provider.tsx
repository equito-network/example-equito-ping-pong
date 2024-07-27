import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";

export type PingStatus =
  | "isIdle"
  | "isSuccess"
  | "isError"
  | "isSendingPing"
  | "isApprovingSentPing"
  | "isDeliveringPingAndSendingPong"
  | "isApprovingSentPong"
  | "isDeliveringPong";

type PingPongState = {
  ping?: string;
  setPing: Dispatch<SetStateAction<string | undefined>>;
  pong?: string;
  setPong: Dispatch<SetStateAction<string | undefined>>;
  status: PingStatus;
  setStatus: Dispatch<SetStateAction<PingStatus>>;
};

type PingContext = PingPongState | undefined;

const pingContext = createContext<PingContext>(undefined);

export const PingPongProvider = ({ children }: PropsWithChildren<object>) => {
  const [ping, setPing] = useState<PingPongState["ping"]>();
  const [pong, setPong] = useState<PingPongState["ping"]>();
  const [status, setStatus] = useState<PingPongState["status"]>("isIdle");

  const value = useMemo(
    () => ({
      ping,
      setPing,
      pong,
      setPong,
      status,
      setStatus,
    }),
    [ping, pong, status]
  );

  return <pingContext.Provider value={value}>{children}</pingContext.Provider>;
};

export const usePingPong = () => {
  const context = useContext(pingContext);

  if (!context) {
    throw new Error("usePingPong must be used within a PingPongProvider");
  }

  return context;
};
