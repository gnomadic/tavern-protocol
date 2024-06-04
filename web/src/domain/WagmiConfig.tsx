import { getDefaultConfig, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { localhost, sepolia } from "viem/chains";

const { wallets } = getDefaultWallets();


export const config = getDefaultConfig({
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