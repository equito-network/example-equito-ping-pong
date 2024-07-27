import { useMutation } from "@tanstack/react-query";
import { getBlock } from "@wagmi/core";
import { useEquito } from "@/components/providers/equito-provider";
import { useSendPing } from "./use-send-ping";
import { config } from "@/lib/wagmi";
import { useApprove } from "./use-approve";
import { useDeliver } from "./use-deliver";
import { decodeAbiParameters, parseAbiParameters, parseEventLogs } from "viem";
import { routerAbi } from "@equito-sdk/evm";
import { generateHash } from "@equito-sdk/viem";
import { usePingFee } from "./use-ping-fee";
import { usePingPong } from "@/components/providers/ping-pong-provider";

export const useExecutePing = () => {
  const { from, to } = useEquito();
  const approve = useApprove();
  const { setPong, setStatus } = usePingPong();
  const sendPing = useSendPing();

  const { fee: toFee } = usePingFee({ equito: to });
  const fromDeliver = useDeliver({
    equito: from,
    fee: toFee,
  });

  const { fee: fromFee } = usePingFee({ equito: from });
  const toDeliver = useDeliver({
    equito: to,
    fee: fromFee,
  });

  const {
    mutateAsync: execute,
    isError,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        setPong(undefined);

        if (!from.chain) {
          throw new Error("No from chain found");
        }

        if (!to.chain) {
          throw new Error("No to chain found");
        }

        // start from 'from' chain
        setStatus("isSendingPing");
        const sendPingReceipt = await sendPing.execute();

        const sentPingMessage = parseEventLogs({
          abi: routerAbi,
          logs: sendPingReceipt.logs,
        }).flatMap(({ eventName, args }) =>
          eventName === "MessageSendRequested" ? [args] : []
        )[0];

        if (!sentPingMessage) {
          throw new Error("MessageSendRequested event not found");
        }

        const { timestamp: sentPingTimestamp } = await getBlock(config, {
          chainId: from.chain.definition.id,
          blockNumber: sendPingReceipt.blockNumber,
        });

        setStatus("isApprovingSentPing");
        const { proof: sentPingProof } = await approve.execute({
          messageHash: generateHash(sentPingMessage.message),
          fromTimestamp: Number(sentPingTimestamp) * 1000,
          chainSelector: from.chain.chainSelector,
        });

        // switch to 'to' chain
        setStatus("isDeliveringPingAndSendingPong");
        const receivePingAndSendPongReceipt = await toDeliver.execute(
          sentPingProof,
          sentPingMessage.message,
          sentPingMessage.messageData
        );

        const sentPongMessage = parseEventLogs({
          abi: routerAbi,
          logs: receivePingAndSendPongReceipt.logs,
        }).flatMap(({ eventName, args }) =>
          eventName === "MessageSendRequested" ? [args] : []
        )[0];

        if (!sentPongMessage) {
          throw new Error("MessageSendRequested event not found");
        }

        const [, pong] = decodeAbiParameters(
          parseAbiParameters("string, string"),
          sentPingMessage.messageData
        );

        setPong(pong);

        const { timestamp: sentPongTimestamp } = await getBlock(config, {
          chainId: to.chain.definition.id,
          blockNumber: receivePingAndSendPongReceipt.blockNumber,
        });

        setStatus("isApprovingSentPong");
        const { proof: sentPongProof } = await approve.execute({
          messageHash: generateHash(sentPongMessage.message),
          fromTimestamp: Number(sentPongTimestamp) * 1000,
          chainSelector: to.chain.chainSelector,
        });

        // back to 'from' chain
        setStatus("isDeliveringPong");
        await fromDeliver.execute(
          sentPongProof,
          sentPongMessage.message,
          sentPongMessage.messageData
        );
        setStatus("isSuccess");
      } catch (error) {
        setStatus("isError");
        throw error;
      }
    },
  });

  return {
    execute,
    isPending,
    isSuccess,
    isError,
    error,
    ops: { sendPing, approve },
  };
};
