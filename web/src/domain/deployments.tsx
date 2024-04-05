import { Deployment } from './Domain';

export const Deployments: { [key: string]: Deployment } = {
  ethereum: {
    gameFactory: '0x041f3E2B096DE1070fB06Cc0023539324655bDBd',
    d20: '0x86a18411F90eD0958088D8Fc398564e101719dF0',
    moduleRegistry: '0x7ae76743D7C9224a082465F1e79CFceBeA3dC9D1',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'ethereum',
  },
  polygon: {
    gameFactory: '0x041f3E2B096DE1070fB06Cc0023539324655bDBd',
    d20: '0x86a18411F90eD0958088D8Fc398564e101719dF0',
    moduleRegistry: '0x7ae76743D7C9224a082465F1e79CFceBeA3dC9D1',
    displayName: 'playmint',
    currency: 'matic',
    chain: 'polygon',
  },
  sepolia: {
    gameFactory: '0x041f3E2B096DE1070fB06Cc0023539324655bDBd',
    d20: '0x86a18411F90eD0958088D8Fc398564e101719dF0',
    moduleRegistry: '0x7ae76743D7C9224a082465F1e79CFceBeA3dC9D1',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'sepolia',
  },
  playmint: {
    gameFactory: '0x041f3E2B096DE1070fB06Cc0023539324655bDBd',
    d20: '0x86a18411F90eD0958088D8Fc398564e101719dF0',
    moduleRegistry: '0x7ae76743D7C9224a082465F1e79CFceBeA3dC9D1',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'disconnected',
  },
};


