import type { Metadata } from 'next';
import { Outfit, Signika } from 'next/font/google';
import './globals.css';

import Head from 'next/head';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const signika = Signika({
  subsets: ['latin'], weight: "400", variable: '--font-signika',
});

const outfit = Outfit({
  subsets: ['latin'], weight: "500", variable: '--font-outfit',

})

export const metadata: Metadata = {
  title: 'Tavern',
  description: 'Build community by gaming and hanging out',
  openGraph: {
    title: 'Tavern',
    description: 'Build community by gaming and hanging out',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <title>TAVERN</title>
      </Head>

      {/* <Header/> */}
      {/* <NavigationHeader /> */}
      {/* <MobileNavigationHeader /> */}
      {/* <main className="flex-grow px-4 py-8">{Component(pageProps)}</main> */}

      {/* <Head>
        <title>My page title</title>
      </Head> */}
      {/* <div className="flex flex-col min-h-screen"> */}

      <body className={`${signika.variable} ${outfit.variable} font-sans bg-black text-white`}>
        <Providers>
          {/* <Header /> */}
          <Navbar />

          {children}
          <ToastContainer position='bottom-right' />
          <Footer />
          <Analytics />
        </Providers>
      </body>
      {/* </div> */}

      {/* <Footer /> */}
      {/* <Analytics /> */}
    </html>
  );
}
