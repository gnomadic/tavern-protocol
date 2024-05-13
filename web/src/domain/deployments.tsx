import { Address } from 'viem';
import { Deployment } from './Domain';


export const RPS_GAME_ADDRESS: Address  = '0xa36F4B4C02D5f583C2747B468730B54D27F7a469';


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
    gameFactory: '0x234f98309176a8b1646d5C390a18809b8BE39c7F',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    componentRegistry: '0xA0100fb44e9D00D8677968eD71acEF8daa8fD484',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'sepolia',
    chainId: "11155111",
    scan:"https://sepolia.etherscan.io/address/"
  },

  localhost: {
    gameFactory: '0x234f98309176a8b1646d5C390a18809b8BE39c7F',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    componentRegistry: '0xA0100fb44e9D00D8677968eD71acEF8daa8fD484',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'local',
    chainId: "1337",
    scan:""
  },
  tavern: {
    gameFactory: '0x0',
    d7: '0x0',
    componentRegistry: '0x0',
    displayName: 'Tavern',
    currency: 'eth',
    chain: '( -disconnected-  Connect your wallet! )',
    chainId: "1",
    scan:""
  },
};



