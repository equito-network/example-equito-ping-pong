import { useCallback } from "react";
import { parseEventLogs } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { pingPongAbi } from "@/lib/abi/ping-pong.abi";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { config } from "@/lib/wagmi";
import { generateHash } from "@equito-sdk/viem";
import { routerAbi } from "@equito-sdk/evm";
import { useEquito } from "@/components/providers/equito-provider";
import { usePingPongFee } from "./use-ping-pong-fee";
import { usePing } from "@/components/providers/ping-provider";

export const useSendPing = () => {
  const { from, to } = useEquito();
  const { address } = useAccount();
  const { pingPongFee } = usePingPongFee();
  const { ping } = usePing();

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
    if (pingPongFee === undefined) {
      throw new Error("Fee not found");
    }
    if (ping === undefined) {
      throw new Error("Ping message not found");
    }

    try {
      const hash = await writeContractAsync({
        address: from.chain.pingPongContract,
        abi: pingPongAbi,
        functionName: "sendPing",
        value: pingPongFee,
        chainId: from.chain.definition.id,
        args: [BigInt(to.chain.chainSelector), ping],
      });

      const { logs, blockNumber } = await waitForTransactionReceipt(config, {
        hash,
        chainId: from.chain.definition.id,
      });

      const equitoMessage = parseEventLogs({ abi: routerAbi, logs }).flatMap(
        ({ eventName, args }) =>
          eventName === "MessageSendRequested"
            ? [
                {
                  message: args.message,
                  messageData: args.messageData,
                },
              ]
            : []
      )[0];

      if (!equitoMessage) {
        throw new Error("MessageSendRequested event not found");
      }

      return {
        ...equitoMessage,
        messageHash: generateHash(equitoMessage.message),
        blockNumber,
      };
    } catch (error) {
      console.log({ error });
      throw new Error("Send ping failed");
    }
  }, [address, from.chain, to.chain, pingPongFee, writeContractAsync]);

  return {
    isPending,
    isConfirming,
    isSuccess,
    isError,
    execute,
    reset,
  };
};
