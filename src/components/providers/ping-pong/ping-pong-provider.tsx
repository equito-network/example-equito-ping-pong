import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import { usePingPongFee } from "./use-ping-pong-fee";
import { useEquito } from "../equito/equito-provider";

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
  pingMessage?: string;
  setPingMessage: Dispatch<SetStateAction<string | undefined>>;
  pongMessage?: string;
  setPongMessage: Dispatch<SetStateAction<string | undefined>>;
  status: PingStatus;
  setStatus: Dispatch<SetStateAction<PingStatus>>;
  pingFee: ReturnType<typeof usePingPongFee>;
  pongFee: ReturnType<typeof usePingPongFee>;
};

type PingContext = PingPongState | undefined;

const pingContext = createContext<PingContext>(undefined);

export const PingPongProvider = ({ children }: PropsWithChildren<object>) => {
  const [pingMessage, setPingMessage] =
    useState<PingPongState["pingMessage"]>();
  const [pongMessage, setPongMessage] =
    useState<PingPongState["pingMessage"]>();
  const [status, setStatus] = useState<PingPongState["status"]>("isIdle");

  const { from, to } = useEquito();
  const pongFee = usePingPongFee({ equito: to });
  const pingFee = usePingPongFee({ equito: from });

  const value = useMemo(
    () => ({
      pingMessage,
      setPingMessage,
      pongMessage,
      setPongMessage,
      status,
      setStatus,
      pingFee,
      pongFee,
    }),
    [pingMessage, pingFee, pongMessage, pongFee, status]
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
