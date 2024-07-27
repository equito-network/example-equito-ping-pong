import { useMutation } from "@tanstack/react-query";
import { Hex } from "viem";
import { getEquitoClient } from "@/lib/equito-client";
import { useState } from "react";
import { useEquito } from "@/components/providers/equito-provider";

const baseExplorerUrl = "https://explorer.equito.network/messages";

type ExecuteArgs = { messageHash: Hex; fromTimestamp: number };

export const useConfirm = () => {
  const {
    from: { chain },
  } = useEquito();

  const [txLink, setTxLink] = useState<string | undefined>();

  const { mutateAsync: execute, ...rest } = useMutation({
    mutationFn: async ({ messageHash, fromTimestamp }: ExecuteArgs) => {
      if (!chain) {
        throw new Error("No chain found");
      }

      const equitoClient = await getEquitoClient();

      try {
        const { proof, timestamp } = await equitoClient.getConfirmationTime({
          chainSelector: chain.chainSelector,
          messageHash,
          fromTimestamp,
          listenTimeout: 100,
        });

        setTxLink(`${baseExplorerUrl}?hash=${messageHash}`);

        return { proof, timestamp };
      } catch (error) {
        console.warn(
          "Error getting confirmation time for ",
          messageHash,
          "\n",
          error
        );

        let proof: Hex | undefined;
        do {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          proof = await equitoClient.getProof(messageHash, chain.chainSelector);
          if (!proof) {
            console.warn(`No proof found for ${messageHash} `);
          }
        } while (!proof);

        setTxLink(`${baseExplorerUrl}?hash=${messageHash}`);

        return { proof, timestamp: undefined };
      }
    },
  });

  return { txLink, execute, ...rest };
};
