"use client";

import * as React from "react";
import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wagmi";
import { Toaster } from "@/components/ui/sonner";
import { EquitoProvider } from "@/components/providers/equito-provider";
import { PingProvider } from "./ping-provider";

const queryClient = new QueryClient();

export const AppProvider = ({ children }: React.PropsWithChildren<object>) => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        theme={midnightTheme({
          accentColor: "#6f76f6",
          accentColorForeground: "white",
          borderRadius: "small",
        })}
      >
        <EquitoProvider>
          <PingProvider>
            {children}
            <Toaster />
          </PingProvider>
        </EquitoProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);