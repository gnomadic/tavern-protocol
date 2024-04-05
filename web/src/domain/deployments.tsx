import { Deployment } from './Domain';

export const Deployments: { [key: string]: Deployment } = {
  ethereum: {
    gameFactory: '0xd6f7BEe9Ae01FA1415562375c79D20521FcD8F2C',
    d20: '0x86a18411F90eD0958088D8Fc398564e101719dF0',
    moduleRegistry: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'ethereum',
  },
  polygon: {
    gameFactory: '0xd6f7BEe9Ae01FA1415562375c79D20521FcD8F2C',
    d20: '0x86a18411F90eD0958088D8Fc398564e101719dF0',
    moduleRegistry: '0x0',
    displayName: 'playmint',
    currency: 'matic',
    chain: 'polygon',
  },
  sepolia: {
    gameFactory: '0xd6f7BEe9Ae01FA1415562375c79D20521FcD8F2C',
    d20: '0x86a18411F90eD0958088D8Fc398564e101719dF0',
    moduleRegistry: '0x6A28A455c2579c80C1C4bd47Eb230554974E42BB',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'sepolia',
  },
  playmint: {
    gameFactory: '0xd6f7BEe9Ae01FA1415562375c79D20521FcD8F2C',
    d20: '0x86a18411F90eD0958088D8Fc398564e101719dF0',
    moduleRegistry: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    chain: 'disconnected',
  },
};


