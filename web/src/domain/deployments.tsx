import { Deployment } from './Domain';

export const Deployments: { [key: string]: Deployment } = {
  ethereum: {
    gameFactory: '0x3eF20038Cca34663DEb65e6F42065C04385616b9',
    decoAddress: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'ethereum',
  },
  polygon: {
    gameFactory: '0x3eF20038Cca34663DEb65e6F42065C04385616b9',
    decoAddress: '0xf7dC791b5219e134B28E4ce10A55E61b6f44b33b',
    displayName: 'playmint',
    currency: 'matic',
    chain: 'polygon',
  },
  sepolia: {
    gameFactory: '0x3eF20038Cca34663DEb65e6F42065C04385616b9',
    decoAddress: '0x1CD9235af08caDfefdD7284B745174321CdD5cB9',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'sepolia',
  },
  playmint: {
    gameFactory: '0x3eF20038Cca34663DEb65e6F42065C04385616b9',
    decoAddress: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'none',
  },
};


