import { Address } from 'viem';
import { Deployment } from './Domain';


// export const RPS_GAME_ADDRESS: Address  = '0xa36F4B4C02D5f583C2747B468730B54D27F7a469';
export const RPS_GAME_ADDRESS: Address = '0xc19Bc969cfc40DfF49605AedefC69a74c5Aef69E'

export const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';



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
    gameFactory: '0x99c93C94f7f5E874AE523af2BDc1Eb2eAab12925',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    componentRegistry: '0xA81c6104a1A67CA26AB9EFA619497E01787c8FD1',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'sepolia',
    chainId: "11155111",
    scan:"https://sepolia.etherscan.io/address/",
    rpsGame: '0x5a8e6d11C3E7E99b11Ef69F9333116b6734c2a28',
    rpsComponent: '0xA31036d21DEee669Ece4c82C9C5B17F165E8Ce39',
    queueComponent: '0x1F5DB26A7B7637F232c68Ca5c61499f22751042F',
    resultComponent: '0xaC009e22F95C314Ac29F3E394E7737cB17e42ae6',
  },

  localhost: {
    gameFactory: '0x8ce361602B935680E8DeC218b820ff5056BeB7af',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    componentRegistry: '0xe1Aa25618fA0c7A1CFDab5d6B456af611873b629',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'local',
    chainId: "31337",
    scan:"",
    rpsGame: '0xc19Bc969cfc40DfF49605AedefC69a74c5Aef69E',
    rpsComponent: '0xf7Cd8fa9b94DB2Aa972023b379c7f72c65E4De9D',
    queueComponent: '0x0C8E79F3534B00D9a3D4a856B665Bf4eBC22f2ba',
    resultComponent: '0x82C6D3ed4cD33d8EC1E51d0B5Cc1d822Eaa0c3dC',
  },
  tavern: {
    gameFactory: '0x0',
    d7: '0x0',
    componentRegistry: '0x0',
    displayName: 'Tavern',
    currency: 'eth',
    chain: '( -disconnected-  Connect your wallet! )',
    chainId: "0",
    scan:"",
    rpsGame: '0x0',
    rpsComponent: '0x75f71BaBB609b14aaF5c672D4606e5F55B69FC66',
    queueComponent: '0xF31e5B19d061c9a105AB70b929bC6cb895061AeD',
    resultComponent: '0x0',

  },
};



