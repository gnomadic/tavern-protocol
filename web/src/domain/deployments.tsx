import { Address, http } from 'viem';
import { Deployment } from './Domain';
import { baseSepolia, localhost, sepolia } from 'viem/chains';



// export const RPS_GAME_ADDRESS: Address  = '0xa36F4B4C02D5f583C2747B468730B54D27F7a469';
// export const RPS_GAME_ADDRESS: Address = '0xc19Bc969cfc40DfF49605AedefC69a74c5Aef69E'

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
  basesepolia: {
    displayName: 'Tavern',
    currency: 'base sep eth',
    chain: 'base sepolia',
    chainId: "84532",
    scan:"https://sepolia.basescan.org/address/",
    gameFactory: '0x8282e3B55fE1FFa8Adea74a09D10F3A0A01805b0',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    componentRegistry: '0x0cDEF405Bf53D05c2a5f2e61667A54b87Ba4cf39',
    rpsGame: '0x9862Ce61484B357c3B2127b94BE5E4be0C40b060',
    rpsComponent: '0xE270F7F36E6717775A0DA8EDfd93F0ebDB136387',
    queueComponent: '0x18D00F440750e151b58ca43462c065C445F4978d',
    resultComponent: '0xE515F5807f5936fd9Cbd9b4512Ced60b9D7c9167',
    viemChain: baseSepolia,
    viemTransport: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
  },
  // sepolia: {
  //   gameFactory: '0x14360E6054A666B18d49bF3B4fFeE7D63319770e',
  //   d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
  //   componentRegistry: '0xD47ACDB3B7a7bb9C4a2be1FF9803bca103cd65d9',
  //   displayName: 'Tavern',
  //   currency: 'eth',
  //   chain: 'sepolia',
  //   chainId: "11155111",
  //   scan:"https://sepolia.etherscan.io/address/",
  //   rpsGame: '0x5a8e6d11C3E7E99b11Ef69F9333116b6734c2a28',
  //   rpsComponent: '0xcfF5fdBAD245183728972Ffd3036d0f6bD2cFb4F',
  //   queueComponent: '0xe8D49Ea4e2457b2B3c112650b1dA05eCdF2BD3E2',
  //   resultComponent: '0x44C8c71086EBa3a2AEb61f2CA635Ff64EC143bcE',
  //   viemChain: sepolia,
  //   viemTransport: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)

  // },

  localhost: {
    gameFactory: '0x8ce361602B935680E8DeC218b820ff5056BeB7af',
    d7: '0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A',
    componentRegistry: '0xe1Aa25618fA0c7A1CFDab5d6B456af611873b629',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'localhost',
    chainId: "31337",
    scan:"",
    rpsGame: '0xc19Bc969cfc40DfF49605AedefC69a74c5Aef69E',
    rpsComponent: '0xf7Cd8fa9b94DB2Aa972023b379c7f72c65E4De9D',
    queueComponent: '0x0C8E79F3534B00D9a3D4a856B665Bf4eBC22f2ba',
    resultComponent: '0x82C6D3ed4cD33d8EC1E51d0B5Cc1d822Eaa0c3dC',
    viemChain: localhost,
    viemTransport: http()

  },
  tavern: {
    gameFactory: '0x0',
    d7: '0x0',
    componentRegistry: '0x0',
    displayName: 'Tavern',
    currency: 'eth',
    chain: 'tavern',
    chainId: "0",
    scan:"",
    rpsGame: '0x0',
    rpsComponent: '0x75f71BaBB609b14aaF5c672D4606e5F55B69FC66',
    queueComponent: '0xF31e5B19d061c9a105AB70b929bC6cb895061AeD',
    resultComponent: '0x0',
    viemChain: baseSepolia,
    viemTransport: http()


  },
};



