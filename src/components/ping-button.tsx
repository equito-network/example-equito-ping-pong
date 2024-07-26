import { ProgressLoader } from "@/components/ui/progress-loader";
import { Button } from "@/components/ui/button";
import { useEquito } from "@/components/providers/equito-provider";
import { usePing } from "@/components/providers/ping-provider";
import { useAccount } from "wagmi";
import { ReactNode } from "react";

export const PingButton = () => {
  const { from, to } = useEquito();
  const { ping } = usePing();

  // move those to usePing hook, that handles the entire process
  type PingStatus = "isInit" | "isSendingPing";
  const status: PingStatus = "isInit";

  const { address } = useAccount();
  const isDisabled = !from.chain || !to.chain || ping === undefined || !address;

  const sfn: Record<PingStatus, ReactNode> = {
    isInit: <Button disabled={isDisabled}>Send Ping</Button>,
    isSendingPing: (
      <>
        <ProgressLoader dir="from" />
        <p className="text-muted-foreground">Sending ping...</p>
      </>
    ),
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-64">
      {sfn[status]}
    </div>
  );
};
