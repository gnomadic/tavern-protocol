'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  arbitrum,
  base,
  localhost,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'TAVERN PROTOCOL',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    ...wallets,
    // {
    //   groupName: 'Other',
    //   wallets: [argentWallet, trustWallet, ledgerWallet],
    // },
  ],
  chains: [
    // mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    sepolia,
    
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [localhost] : []),
  ],
  transports: {
    
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    [localhost.id]: http(),
  },
  ssr: true,
});


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
