import { Chain } from "@/lib/config/chains";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";

type ChainState = {
  chain?: Chain;
  setChain: Dispatch<SetStateAction<Chain | undefined>>;
};

export type ChainDirection = "from" | "to";

type EquitoContext =
  | {
      from: ChainState;
      to: ChainState;
      reset: VoidFunction;
    }
  | undefined;

const equitoContext = createContext<EquitoContext>(undefined);

export const EquitoProvider = ({ children }: PropsWithChildren<object>) => {
  const [fromChain, setFromChain] = useState<ChainState["chain"]>();
  const [toChain, setToChain] = useState<ChainState["chain"]>();

  const value = useMemo(
    () => ({
      from: {
        chain: fromChain,
        setChain: setFromChain,
      },
      to: {
        chain: toChain,
        setChain: setToChain,
      },
      reset: () => {
        setFromChain(undefined);
        setToChain(undefined);
      },
    }),
    [fromChain, toChain]
  );

  return (
    <equitoContext.Provider value={value}>{children}</equitoContext.Provider>
  );
};

export const useEquito = () => {
  const context = useContext(equitoContext);
  if (!context) {
    throw new Error("useEquitp must be used within a EquitoProvider");
  }

  return context;
};
