import "@rainbow-me/rainbowkit/styles.css";
import { AppProvider } from "@/components/providers/app-provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChainCard } from "@/components/chain-card";
import { PingButton } from "./components/ping-button";

function App() {
  return (
    <AppProvider>
      <main className="h-screen w-full flex items-center justify-center antialiased bg-background">
        <div className="container flex flex-col w-full items-center gap-8">
          <div className="gap-4 flex flex-col items-center">
            <div className="flex justify-center items-center gap-2">
              <img src="/equito-logo.svg" alt="logo" className="size-12" />
              <div className="text-4xl tracking-tight font-bold">
                Equito Ping Pong Example
              </div>
            </div>
            <p className="text-muted-foreground">
              Cross-chain ping pong example using Equito SDK
            </p>
            <ConnectButton
              chainStatus={"none"}
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </div>
          <div className="flex gap-16 items-center">
            <ChainCard mode="from" />
            <PingButton />
            <ChainCard mode="to" />
          </div>
        </div>
      </main>
    </AppProvider>
  );
}

export default App;
