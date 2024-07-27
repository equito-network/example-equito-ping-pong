import { useCallback } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { pingPongAbi } from "@/lib/abi/ping-pong.abi";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useSwitchChain,
} from "wagmi";
import { config } from "@/lib/wagmi";
import { useEquito } from "@/components/providers/equito-provider";
import { usePingFee } from "./use-ping-fee";
import { usePingPong } from "@/components/providers/ping-pong-provider";

export const useSendPing = () => {
  const { from, to } = useEquito();
  const { address } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { fee } = usePingFee({ equito: from });
  const { ping } = usePingPong();

  const {
    data: hash,
    writeContractAsync,
    isPending,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
    chainId: from.chain?.definition.id,
    query: {
      enabled: !!hash && from.chain?.definition.id !== undefined,
    },
  });

  const execute = useCallback(async () => {
    if (!address) throw new Error("No address found, please connect a wallet");
    if (!from.chain) throw new Error("No from chain found");
    if (!to.chain) throw new Error("No to chain found");
    if (fee === undefined) {
      throw new Error("Fee not found");
    }
    if (ping === undefined) {
      throw new Error("Ping message not found");
    }

    try {
      // make sure we are on the from chain
      await switchChainAsync({ chainId: from.chain.definition.id });

      const hash = await writeContractAsync({
        address: from.chain.pingPongContract,
        abi: pingPongAbi,
        functionName: "sendPing",
        value: fee,
        chainId: from.chain.definition.id,
        args: [BigInt(to.chain.chainSelector), ping],
      });

      return await waitForTransactionReceipt(config, {
        hash,
        chainId: from.chain.definition.id,
      });
    } catch (error) {
      console.log({ error });
      throw new Error("Send ping failed");
    }
  }, [
    address,
    from.chain,
    to.chain,
    fee,
    ping,
    switchChainAsync,
    writeContractAsync,
  ]);

  return {
    isPending,
    isConfirming,
    isSuccess,
    isError,
    execute,
    reset,
  };
};
