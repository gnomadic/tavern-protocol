import { Deployment } from './Domain';

export const Deployments: { [key: string]: Deployment } = {
  // ethereum: {
  //   gameFactory: '0xe38092416635F9a3a63Ad27984C622918173EBab',
  //   entityFactory: ''
  //   d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
  //   moduleRegistry: '0x7ae76743D7C9224a082465F1e79CFceBeA3dC9D1',
  //   displayName: 'playmint',
  //   currency: 'eth',
  //   chain: 'ethereum',
  // },
  // polygon: {
  //   gameFactory: '0xe38092416635F9a3a63Ad27984C622918173EBab',
  //   entityFactory: ''
  //   d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
  //   moduleRegistry: '0x7ae76743D7C9224a082465F1e79CFceBeA3dC9D1',
  //   displayName: 'playmint',
  //   currency: 'matic',
  //   chain: 'polygon',
  // },
  sepolia: {
    gameFactory: '0xb3E0588e56D3A6ad733EDcd5821bA8C31AEe71f1',
    entityFactory: '0x0802d5bb5d5Bf7f2388A1d364D78A55Aa9829709',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    moduleRegistry: '0x7762e19848B5248F41B83B2f0ce7DdDb404F2A0e',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'sepolia',
    chainId: "11155111",
  },
  playmint: {
    gameFactory: '0x0',
    entityFactory: '0x0',
    d7: '0x0',
    moduleRegistry: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: '( -disconnected-  Connect your wallet! )',
    chainId: "1",
  },
};



