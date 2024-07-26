import { NATIVE_ADDRESS } from "@/lib/chains";
import { routerAbi } from "@equito-sdk/evm";
import { useReadContract } from "wagmi";
import { useRouter } from "./use-router";
import { useEquito } from "@/components/providers/equito-provider";

export const usePingPongFee = () => {
  const {
    from: { chain },
  } = useEquito();

  const { data: routerContractAddress, isLoading: isRouterContractLoading } =
    useRouter({
      chainSelector: chain?.chainSelector,
    });

  const { data: pingPongFee, isLoading: isEquitoFeeLoading } = useReadContract({
    address: routerContractAddress,
    abi: routerAbi,
    functionName: "getFee",
    args: [chain?.pingPongContract || NATIVE_ADDRESS],
    query: {
      enabled: !!chain && !!routerContractAddress,
    },
  });

  return {
    pingPongFee,
    isLoading: isRouterContractLoading || isEquitoFeeLoading,
  };
};
