import { Address, Deployment } from './Domain';
import { Decoration } from './Domain';

export const Deployments: { [key: string]: Deployment } = {
  ethereum: {
    chainellationAddress: '0x9De065d2c8D68b7395eBE85A14377FD86a92E454',
    decoAddress: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'ethereum',
  },
  polygon: {
    chainellationAddress: '0xbcE1b660Ee52F5b378b7A8f0e01A3dd4EC5c590A',
    decoAddress: '0xf7dC791b5219e134B28E4ce10A55E61b6f44b33b',
    displayName: 'playmint',
    currency: 'matic',
    chain: 'polygon',
  },
  // optimism: {
  //   address: "0xc484794314F2Ba4e98357343F2342B47d645c6Ed",
  //   contractInterface: ChainellationABI,
  //   displayName: "opellation",
  //   currency: "eth",
  // },
  sepolia: {
    chainellationAddress: '0x4618A9aE90811bB705D8d28D2017393977A1846A',
    decoAddress: '0x1CD9235af08caDfefdD7284B745174321CdD5cB9',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'sepolia',
  },

  chainellation: {
    chainellationAddress: '0x0',
    decoAddress: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'none',
  },
};

export const FreeDecorations: { [key: string]: Address[] } = {
  sepolia: [
    // name: "empty_silhouette",
    '0x84fA18301a7B6Dd3AB574Bf37e4588Cd291f6A47',
    // name: "empty_skymath",
    '0x6Bb7350F71f3387F4c26B9aE0e13060578060aBF',
    // name: "empty_deco",
    '0xE02Fb79c9450a4Bd635a42b618CC7615eD78fcf7',

    // name: "mountainLine",
    '0xa7b902D005B53437127a0699d587C623DebFc9C1',
    // name: "waves",
    '0x963cF99215a723DE6f01DE0f0D54A3Af8b7fEF51',
    // name: "skyCircle",
    '0x7B60a4f676F1Bf7A997C497c6368b2FDc41C0c17',
  ],
};
