import { Address } from 'viem';
import { Deployment } from './Domain';


// export const RPS_GAME_ADDRESS: Address  = '0xa36F4B4C02D5f583C2747B468730B54D27F7a469';
export const RPS_GAME_ADDRESS: Address = '0xc19Bc969cfc40DfF49605AedefC69a74c5Aef69E'

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
    gameFactory: '0x4de99C29a829A057FAba4377943dbe6F807A3a2C',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    componentRegistry: '0x82BBf2C98ba76dA156fa1da1Ae34654acf2A621d',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'sepolia',
    chainId: "11155111",
    scan:"https://sepolia.etherscan.io/address/",
    rpsGame: '0x114D2D3848907a6a4472Bcc1839Fd0CFEA5d1aCA'
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
  },
  tavern: {
    gameFactory: '0x0',
    d7: '0x0',
    componentRegistry: '0x0',
    displayName: 'Tavern',
    currency: 'eth',
    chain: '( -disconnected-  Connect your wallet! )',
    chainId: "1",
    scan:"",
    rpsGame: '0x0',
  },
};



