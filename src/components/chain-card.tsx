import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChainSelect from "./chain-select";

import { ChainDirection } from "@/components/providers/equito-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePing } from "@/components/providers/ping-provider";

type ChainCardProps = {
  mode: ChainDirection;
};

export const ChainCard = ({ mode }: ChainCardProps) => {
  const cardTitle = `${mode === "from" ? "Source" : "Destination"} Chain`;
  const { ping, setPing } = usePing();

  const pingMessage = mode === "from" ? ping : "Waiting for ping...";
  const onInput = mode === "from" ? setPing : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col gap-4">
              <ChainSelect mode={mode} />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="ping">Ping Message</Label>
              <Input
                id="ping"
                value={pingMessage}
                placeholder="Hi from Equito!"
                onChange={({ target: { value } }) => onInput?.(value)}
                readOnly={mode === "to"}
                disabled={mode === "to"}
                variant={mode === "to" ? "readonly" : "default"}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
