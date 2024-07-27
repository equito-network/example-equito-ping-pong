import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChainSelect from "./chain-select";
import { ChainDirection } from "@/components/providers/equito-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePingPong } from "@/components/providers/ping-pong-provider";

type ChainCardProps = {
  mode: ChainDirection;
};

export const ChainCard = ({ mode }: ChainCardProps) => {
  const { ping, setPing, pong, status } = usePingPong();

  const onInput = mode === "from" ? setPing : undefined;
  const cardTitle = `${mode === "from" ? "Source" : "Destination"} Chain`;
  const value = mode === "from" ? ping : pong ? pong : "Waiting for ping...";
  const label = `${mode === "from" ? "Ping" : "Pong"} Message`;

  const isProcessing =
    status !== "isIdle" && status !== "isError" && status !== "isSuccess";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col gap-4">
              <ChainSelect mode={mode} disabled={isProcessing} />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="ping">{label}</Label>
              <Input
                id="ping"
                value={value}
                placeholder="Hi from Equito!"
                onChange={({ target: { value } }) => onInput?.(value)}
                readOnly={mode === "to" || isProcessing}
                disabled={mode === "to" || isProcessing}
                variant={mode === "to" ? "readonly" : "default"}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
