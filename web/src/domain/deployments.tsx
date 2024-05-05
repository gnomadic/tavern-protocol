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
    gameFactory: '0xF1498bD8E4ce417863F554262e47e95FB10C36B5',
    entityFactory: '0x14f3D011e4482db72547fb8EA2513Ae90052223c',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    moduleRegistry: '0x53F0c6e6dC4eaDb79436d66666B323a00a3c5D97',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'sepolia',
    chainId: "11155111",
    scan:"https://sepolia.etherscan.io/address/"
  },

  localhost: {
    gameFactory: '0xA15BB66138824a1c7167f5E85b957d04Dd34E468',
    entityFactory: '0xeD1DB453C3156Ff3155a97AD217b3087D5Dc5f6E',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    moduleRegistry: '0x8ce361602B935680E8DeC218b820ff5056BeB7af',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'local',
    chainId: "1337",
    scan:""
  },
  tavern: {
    gameFactory: '0x0',
    entityFactory: '0x0',
    d7: '0x0',
    moduleRegistry: '0x0',
    displayName: 'Tavern',
    currency: 'eth',
    chain: '( -disconnected-  Connect your wallet! )',
    chainId: "1",
    scan:""
  },
};



