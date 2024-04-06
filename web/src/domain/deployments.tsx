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
    gameFactory: '0x3C877EB267aE2bd6C4abDB800Dc964dE7AfBDAA1',
    entityFactory: '0x7BE47086f9768753B01820C7F7dbF4EFDD95612B',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    moduleRegistry: '0xfcdEd07C69CA94BC03349aD6Ad4809976390B4d0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'sepolia',
  },
  playmint: {
    gameFactory: '0x0',
    entityFactory: '0x0',
    d7: '0x0',
    moduleRegistry: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'disconnected',
  },
};



