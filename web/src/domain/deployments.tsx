import { Deployment } from './Domain';

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
  sepolia: {
    chainellationAddress: '0x4618A9aE90811bB705D8d28D2017393977A1846A',
    decoAddress: '0x1CD9235af08caDfefdD7284B745174321CdD5cB9',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'sepolia',
  },

  playmint: {
    chainellationAddress: '0x0',
    decoAddress: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'none',
  },
};


