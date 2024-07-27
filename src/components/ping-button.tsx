import { ProgressLoader } from "@/components/ui/progress-loader";
import { Button } from "@/components/ui/button";
import { useEquito } from "@/components/providers/equito-provider";
import {
  PingStatus,
  usePingPong,
} from "@/components/providers/ping-pong-provider";
import { useAccount } from "wagmi";
import { ReactNode } from "react";
import { toast } from "sonner";
import { useExecutePing } from "@/hooks/use-execute-ping";

export const PingButton = () => {
  const { from, to } = useEquito();
  const { ping, status } = usePingPong();
  const { execute, isPending } = useExecutePing();

  const { address } = useAccount();
  const isDisabled =
    !from.chain || !to.chain || ping === undefined || !address || isPending;

  const onClick = () => {
    toast.promise(execute(), {
      loading: "Executing Transaction...",
      success: "Transaction Failed",
      error: "Transaction Failed",
    });
  };

  const sfn: Record<PingStatus, ReactNode> = {
    isIdle: (
      <Button disabled={isDisabled} onClick={onClick}>
        Send Ping & Receive Pong
      </Button>
    ),
    isSendingPing: (
      <>
        <ProgressLoader dir="from" />
        <p className="text-muted-foreground text-sm">Sending ping...</p>
      </>
    ),
    isApprovingSentPing: (
      <>
        <ProgressLoader dir="from" />
        <p className="text-muted-foreground text-sm">
          Approving sent ping message...
        </p>
      </>
    ),
    isDeliveringPingAndSendingPong: (
      <>
        <ProgressLoader dir="from" />
        <p className="text-muted-foreground text-sm">
          Delivery sent ping and sending pong...
        </p>
      </>
    ),
    isApprovingSentPong: (
      <>
        <ProgressLoader dir="to" />
        <p className="text-muted-foreground text-sm">
          Approving sent pong message...
        </p>
      </>
    ),
    isDeliveringPong: (
      <>
        <ProgressLoader dir="to" />
        <p className="text-muted-foreground text-sm">Delivering pong...</p>
      </>
    ),
    isSuccess: (
      <>
        <p className="text-green-500 text-sm">Ping Pong Successfull!</p>
        <Button disabled={isDisabled} onClick={onClick}>
          Send Ping & Receive Pong
        </Button>
      </>
    ),
    isError: (
      <>
        <p className="text-destructive text-sm">Ping Pong Error</p>
        <Button disabled={isDisabled} onClick={onClick}>
          Retry
        </Button>
      </>
    ),
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-64">
      {sfn[status]}
    </div>
  );
};
