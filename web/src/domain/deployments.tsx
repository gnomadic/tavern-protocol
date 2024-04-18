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
    gameFactory: '0x63b901Fb66A4c8D8E3427db83EDD25D47A0e95b9',
    entityFactory: '0xbF5902E76Ff9b20b178FDa24650773aa6d85b0fA',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    moduleRegistry: '0xc8EE58aB22Ab9965f7E245209AA89cF283AFe1B2',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'sepolia',
    chainId: "11155111",
  },

  localhost: {
    gameFactory: '0xA15BB66138824a1c7167f5E85b957d04Dd34E468',
    entityFactory: '0xeD1DB453C3156Ff3155a97AD217b3087D5Dc5f6E',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    moduleRegistry: '0x8ce361602B935680E8DeC218b820ff5056BeB7af',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'local',
    chainId: "1337",
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



