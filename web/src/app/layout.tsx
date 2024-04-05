import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Head from 'next/head';
import Header from '@/components/Header';
import { Analytics } from '@vercel/analytics/react';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PLAYMINT',
  description: 'Play for communities',
};

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// })

// const { chains, publicClient } = configureChains(
//   [
//     sepolia,
//     // base
//   ],
//   [publicProvider()]
//   // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   projectId: "721890c665370dab6a3af12a2b0c7ca9",
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

// const config = getDefaultConfig({
//   appName: 'My RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// });

// const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {/* <Header/> */}
      {/* <NavigationHeader /> */}
      {/* <MobileNavigationHeader /> */}
      {/* <main className="flex-grow px-4 py-8">{Component(pageProps)}</main> */}

      {/* <Head>
        <title>My page title</title>
      </Head> */}
      {/* <div className="flex flex-col min-h-screen"> */}

      <body className={inter.className}>
        <Providers>
          <Header />

          {children}
          <Analytics />
        </Providers>
      </body>
      {/* </div> */}

      {/* <Footer /> */}
      {/* <Analytics /> */}
    </html>
  );
}
