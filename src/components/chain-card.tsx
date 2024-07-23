import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChainSelect from "./chain-select";
import { Button } from "@/components/ui/button";
import {
  ChainDirection,
  useEquito,
} from "@/components/providers/equito-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAccount } from "wagmi";

type ChainCardProps = {
  mode: ChainDirection;
};

export const ChainCard = ({ mode }: ChainCardProps) => {
  const cardTitle = `${mode === "from" ? "Source" : "Destination"} Chain`;
  const cardCta = mode === "from" ? "Send Ping" : "Receive Ping & Send Pong";
  const { address } = useAccount();
  const { chain } = useEquito()[mode];
  const isCtaDisabled = !chain || !address;

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
              <Input id="ping" placeholder="Hi from Equito..." />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button disabled={isCtaDisabled}>{cardCta}</Button>
      </CardFooter>
    </Card>
  );
};
