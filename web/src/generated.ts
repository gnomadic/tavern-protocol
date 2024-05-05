import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ComponentRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const componentRegistryAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getModuleCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'startAt', internalType: 'uint8', type: 'uint8' }],
    name: 'getModules',
    outputs: [
      {
        name: 'result',
        internalType: 'struct ComponentSummary[10]',
        type: 'tuple[10]',
        components: [
          { name: 'component', internalType: 'address', type: 'address' },
          { name: 'functions', internalType: 'string[]', type: 'string[]' },
          { name: 'abis', internalType: 'string[]', type: 'string[]' },
          { name: 'required', internalType: 'string[]', type: 'string[]' },
          { name: 'displayName', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'register',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'unRegister',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'module',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ModeleUnregistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'module',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ModuleRegistered',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// D7
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const d7Abi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'NotCompatibleWithSpotMints' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'SequentialMintExceedsLimit' },
  { type: 'error', inputs: [], name: 'SequentialUpToTooSmall' },
  { type: 'error', inputs: [], name: 'SpotMintTokenIdTooSmall' },
  { type: 'error', inputs: [], name: 'TokenAlreadyExists' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Game
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gameAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'component', internalType: 'address', type: 'address' }],
    name: 'addComponent',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'availableEntityData',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'components',
    outputs: [
      { name: '', internalType: 'contract IComponent', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'entityName', internalType: 'string', type: 'string' }],
    name: 'createEntity',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      {
        name: 'funcs',
        internalType: 'struct AddressKey[]',
        type: 'tuple[]',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'createFlow',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'description',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'displayName',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'entities',
    outputs: [{ name: '', internalType: 'contract IEntity', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entityFactory',
    outputs: [
      { name: '', internalType: 'contract IEntityFactory', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      {
        name: 'params',
        internalType: 'struct FlowParams',
        type: 'tuple',
        components: [
          {
            name: 'addresses',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'uints',
            internalType: 'struct UintKey[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'strings',
            internalType: 'struct StringKey[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    name: 'executeFlow',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'flowNames',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'flows',
    outputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'functionLookup',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gameUrl',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'key', internalType: 'string', type: 'string' }],
    name: 'getEntity',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getFlows',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getSummary',
    outputs: [
      {
        name: '',
        internalType: 'struct GameSummary',
        type: 'tuple',
        components: [
          { name: 'game', internalType: 'address', type: 'address' },
          { name: 'gm', internalType: 'address', type: 'address' },
          { name: 'displayName', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'gameUrl', internalType: 'string', type: 'string' },
          {
            name: 'availableFunctions',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'availableData',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          { name: 'flows', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'getSupportedFunctions',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gm',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_gm', internalType: 'address', type: 'address' },
      { name: '_displayName', internalType: 'string', type: 'string' },
      { name: '_entityFactory', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'supportedFunctions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_description', internalType: 'string', type: 'string' }],
    name: 'updateDescription',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_gameUrl', internalType: 'string', type: 'string' }],
    name: 'updateGameUrl',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'validateIsModule',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  { type: 'error', inputs: [], name: 'FlowAlreadyExists' },
  { type: 'error', inputs: [], name: 'FlowDoesNotExist' },
  {
    type: 'error',
    inputs: [
      { name: 'component', internalType: 'address', type: 'address' },
      { name: 'functionKey', internalType: 'string', type: 'string' },
    ],
    name: 'FlowExecutionError',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyGM' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GameFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gameFactoryAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_gm', internalType: 'address', type: 'address' },
      { name: 'displayName', internalType: 'string', type: 'string' },
    ],
    name: 'createGame',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entityFactory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gameContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'games',
    outputs: [{ name: '', internalType: 'contract Game', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getGameCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'startAt', internalType: 'uint8', type: 'uint8' }],
    name: 'getGames',
    outputs: [
      {
        name: 'result',
        internalType: 'struct GameSummary[10]',
        type: 'tuple[10]',
        components: [
          { name: 'game', internalType: 'address', type: 'address' },
          { name: 'gm', internalType: 'address', type: 'address' },
          { name: 'displayName', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'gameUrl', internalType: 'string', type: 'string' },
          {
            name: 'availableFunctions',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'availableData',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          { name: 'flows', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_gameContract', internalType: 'address', type: 'address' },
      { name: '_entityFactory', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gm', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'game',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GameCreated',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IComponent
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iComponentAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getSummary',
    outputs: [
      {
        name: '',
        internalType: 'struct ComponentSummary',
        type: 'tuple',
        components: [
          { name: 'component', internalType: 'address', type: 'address' },
          { name: 'functions', internalType: 'string[]', type: 'string[]' },
          { name: 'abis', internalType: 'string[]', type: 'string[]' },
          { name: 'required', internalType: 'string[]', type: 'string[]' },
          { name: 'displayName', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'game', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IGame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iGameAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    name: 'createEntity',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      {
        name: 'funcs',
        internalType: 'struct AddressKey[]',
        type: 'tuple[]',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'createFlow',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'key', internalType: 'string', type: 'string' }],
    name: 'getEntity',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_gm', internalType: 'address', type: 'address' },
      { name: 'displayName', internalType: 'string', type: 'string' },
      { name: 'entityFactory', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'validateIsModule',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link componentRegistryAbi}__
 */
export const useReadComponentRegistry = /*#__PURE__*/ createUseReadContract({
  abi: componentRegistryAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link componentRegistryAbi}__ and `functionName` set to `"getModuleCount"`
 */
export const useReadComponentRegistryGetModuleCount =
  /*#__PURE__*/ createUseReadContract({
    abi: componentRegistryAbi,
    functionName: 'getModuleCount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link componentRegistryAbi}__ and `functionName` set to `"getModules"`
 */
export const useReadComponentRegistryGetModules =
  /*#__PURE__*/ createUseReadContract({
    abi: componentRegistryAbi,
    functionName: 'getModules',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link componentRegistryAbi}__
 */
export const useWriteComponentRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: componentRegistryAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link componentRegistryAbi}__ and `functionName` set to `"register"`
 */
export const useWriteComponentRegistryRegister =
  /*#__PURE__*/ createUseWriteContract({
    abi: componentRegistryAbi,
    functionName: 'register',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link componentRegistryAbi}__ and `functionName` set to `"unRegister"`
 */
export const useWriteComponentRegistryUnRegister =
  /*#__PURE__*/ createUseWriteContract({
    abi: componentRegistryAbi,
    functionName: 'unRegister',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link componentRegistryAbi}__
 */
export const useSimulateComponentRegistry =
  /*#__PURE__*/ createUseSimulateContract({ abi: componentRegistryAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link componentRegistryAbi}__ and `functionName` set to `"register"`
 */
export const useSimulateComponentRegistryRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: componentRegistryAbi,
    functionName: 'register',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link componentRegistryAbi}__ and `functionName` set to `"unRegister"`
 */
export const useSimulateComponentRegistryUnRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: componentRegistryAbi,
    functionName: 'unRegister',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link componentRegistryAbi}__
 */
export const useWatchComponentRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: componentRegistryAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link componentRegistryAbi}__ and `eventName` set to `"ModeleUnregistered"`
 */
export const useWatchComponentRegistryModeleUnregisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: componentRegistryAbi,
    eventName: 'ModeleUnregistered',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link componentRegistryAbi}__ and `eventName` set to `"ModuleRegistered"`
 */
export const useWatchComponentRegistryModuleRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: componentRegistryAbi,
    eventName: 'ModuleRegistered',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__
 */
export const useReadD7 = /*#__PURE__*/ createUseReadContract({ abi: d7Abi });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadD7BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadD7GetApproved = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'getApproved',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadD7IsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'isApprovedForAll',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"name"`
 */
export const useReadD7Name = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadD7OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'ownerOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadD7SupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'supportsInterface',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadD7Symbol = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadD7TokenUri = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'tokenURI',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadD7TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: d7Abi,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link d7Abi}__
 */
export const useWriteD7 = /*#__PURE__*/ createUseWriteContract({ abi: d7Abi });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteD7Approve = /*#__PURE__*/ createUseWriteContract({
  abi: d7Abi,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteD7Mint = /*#__PURE__*/ createUseWriteContract({
  abi: d7Abi,
  functionName: 'mint',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteD7SafeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: d7Abi,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteD7SetApprovalForAll = /*#__PURE__*/ createUseWriteContract(
  { abi: d7Abi, functionName: 'setApprovalForAll' }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteD7TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: d7Abi,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link d7Abi}__
 */
export const useSimulateD7 = /*#__PURE__*/ createUseSimulateContract({
  abi: d7Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateD7Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: d7Abi,
  functionName: 'approve',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateD7Mint = /*#__PURE__*/ createUseSimulateContract({
  abi: d7Abi,
  functionName: 'mint',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateD7SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: d7Abi,
    functionName: 'safeTransferFrom',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateD7SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: d7Abi,
    functionName: 'setApprovalForAll',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link d7Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateD7TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: d7Abi,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link d7Abi}__
 */
export const useWatchD7Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: d7Abi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link d7Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchD7ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: d7Abi,
    eventName: 'Approval',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link d7Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchD7ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: d7Abi,
    eventName: 'ApprovalForAll',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link d7Abi}__ and `eventName` set to `"ConsecutiveTransfer"`
 */
export const useWatchD7ConsecutiveTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: d7Abi,
    eventName: 'ConsecutiveTransfer',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link d7Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchD7TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: d7Abi,
    eventName: 'Transfer',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__
 */
export const useReadGame = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"availableEntityData"`
 */
export const useReadGameAvailableEntityData =
  /*#__PURE__*/ createUseReadContract({
    abi: gameAbi,
    functionName: 'availableEntityData',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"components"`
 */
export const useReadGameComponents = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'components',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"description"`
 */
export const useReadGameDescription = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'description',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"displayName"`
 */
export const useReadGameDisplayName = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'displayName',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"entities"`
 */
export const useReadGameEntities = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'entities',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"entityFactory"`
 */
export const useReadGameEntityFactory = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'entityFactory',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"flowNames"`
 */
export const useReadGameFlowNames = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'flowNames',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"flows"`
 */
export const useReadGameFlows = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'flows',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"functionLookup"`
 */
export const useReadGameFunctionLookup = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'functionLookup',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"gameUrl"`
 */
export const useReadGameGameUrl = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'gameUrl',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getEntity"`
 */
export const useReadGameGetEntity = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'getEntity',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getFlows"`
 */
export const useReadGameGetFlows = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'getFlows',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getSummary"`
 */
export const useReadGameGetSummary = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'getSummary',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getSupportedFunctions"`
 */
export const useReadGameGetSupportedFunctions =
  /*#__PURE__*/ createUseReadContract({
    abi: gameAbi,
    functionName: 'getSupportedFunctions',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"gm"`
 */
export const useReadGameGm = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'gm',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"supportedFunctions"`
 */
export const useReadGameSupportedFunctions =
  /*#__PURE__*/ createUseReadContract({
    abi: gameAbi,
    functionName: 'supportedFunctions',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"validateIsModule"`
 */
export const useReadGameValidateIsModule = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'validateIsModule',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__
 */
export const useWriteGame = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"addComponent"`
 */
export const useWriteGameAddComponent = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  functionName: 'addComponent',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createEntity"`
 */
export const useWriteGameCreateEntity = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  functionName: 'createEntity',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createFlow"`
 */
export const useWriteGameCreateFlow = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  functionName: 'createFlow',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"executeFlow"`
 */
export const useWriteGameExecuteFlow = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  functionName: 'executeFlow',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteGameInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  functionName: 'initialize',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"updateDescription"`
 */
export const useWriteGameUpdateDescription =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameAbi,
    functionName: 'updateDescription',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"updateGameUrl"`
 */
export const useWriteGameUpdateGameUrl = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  functionName: 'updateGameUrl',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__
 */
export const useSimulateGame = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"addComponent"`
 */
export const useSimulateGameAddComponent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'addComponent',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createEntity"`
 */
export const useSimulateGameCreateEntity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'createEntity',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createFlow"`
 */
export const useSimulateGameCreateFlow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'createFlow',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"executeFlow"`
 */
export const useSimulateGameExecuteFlow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'executeFlow',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateGameInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"updateDescription"`
 */
export const useSimulateGameUpdateDescription =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'updateDescription',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"updateGameUrl"`
 */
export const useSimulateGameUpdateGameUrl =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'updateGameUrl',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__
 */
export const useWatchGameEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gameAbi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchGameInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gameAbi,
    eventName: 'Initialized',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameFactoryAbi}__
 */
export const useReadGameFactory = /*#__PURE__*/ createUseReadContract({
  abi: gameFactoryAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"entityFactory"`
 */
export const useReadGameFactoryEntityFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: gameFactoryAbi,
    functionName: 'entityFactory',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"gameContract"`
 */
export const useReadGameFactoryGameContract =
  /*#__PURE__*/ createUseReadContract({
    abi: gameFactoryAbi,
    functionName: 'gameContract',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"games"`
 */
export const useReadGameFactoryGames = /*#__PURE__*/ createUseReadContract({
  abi: gameFactoryAbi,
  functionName: 'games',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"getGameCount"`
 */
export const useReadGameFactoryGetGameCount =
  /*#__PURE__*/ createUseReadContract({
    abi: gameFactoryAbi,
    functionName: 'getGameCount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"getGames"`
 */
export const useReadGameFactoryGetGames = /*#__PURE__*/ createUseReadContract({
  abi: gameFactoryAbi,
  functionName: 'getGames',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameFactoryAbi}__
 */
export const useWriteGameFactory = /*#__PURE__*/ createUseWriteContract({
  abi: gameFactoryAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"createGame"`
 */
export const useWriteGameFactoryCreateGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameFactoryAbi,
    functionName: 'createGame',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteGameFactoryInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameFactoryAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameFactoryAbi}__
 */
export const useSimulateGameFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: gameFactoryAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"createGame"`
 */
export const useSimulateGameFactoryCreateGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameFactoryAbi,
    functionName: 'createGame',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameFactoryAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateGameFactoryInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameFactoryAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameFactoryAbi}__
 */
export const useWatchGameFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: gameFactoryAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameFactoryAbi}__ and `eventName` set to `"GameCreated"`
 */
export const useWatchGameFactoryGameCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gameFactoryAbi,
    eventName: 'GameCreated',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iComponentAbi}__
 */
export const useReadIComponent = /*#__PURE__*/ createUseReadContract({
  abi: iComponentAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iComponentAbi}__ and `functionName` set to `"getSummary"`
 */
export const useReadIComponentGetSummary = /*#__PURE__*/ createUseReadContract({
  abi: iComponentAbi,
  functionName: 'getSummary',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iComponentAbi}__
 */
export const useWriteIComponent = /*#__PURE__*/ createUseWriteContract({
  abi: iComponentAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iComponentAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIComponentInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: iComponentAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iComponentAbi}__
 */
export const useSimulateIComponent = /*#__PURE__*/ createUseSimulateContract({
  abi: iComponentAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iComponentAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIComponentInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iComponentAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iGameAbi}__
 */
export const useReadIGame = /*#__PURE__*/ createUseReadContract({
  abi: iGameAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iGameAbi}__ and `functionName` set to `"getEntity"`
 */
export const useReadIGameGetEntity = /*#__PURE__*/ createUseReadContract({
  abi: iGameAbi,
  functionName: 'getEntity',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iGameAbi}__ and `functionName` set to `"validateIsModule"`
 */
export const useReadIGameValidateIsModule = /*#__PURE__*/ createUseReadContract(
  { abi: iGameAbi, functionName: 'validateIsModule' }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iGameAbi}__
 */
export const useWriteIGame = /*#__PURE__*/ createUseWriteContract({
  abi: iGameAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iGameAbi}__ and `functionName` set to `"createEntity"`
 */
export const useWriteIGameCreateEntity = /*#__PURE__*/ createUseWriteContract({
  abi: iGameAbi,
  functionName: 'createEntity',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iGameAbi}__ and `functionName` set to `"createFlow"`
 */
export const useWriteIGameCreateFlow = /*#__PURE__*/ createUseWriteContract({
  abi: iGameAbi,
  functionName: 'createFlow',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iGameAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIGameInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: iGameAbi,
  functionName: 'initialize',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iGameAbi}__
 */
export const useSimulateIGame = /*#__PURE__*/ createUseSimulateContract({
  abi: iGameAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iGameAbi}__ and `functionName` set to `"createEntity"`
 */
export const useSimulateIGameCreateEntity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iGameAbi,
    functionName: 'createEntity',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iGameAbi}__ and `functionName` set to `"createFlow"`
 */
export const useSimulateIGameCreateFlow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iGameAbi,
    functionName: 'createFlow',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iGameAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIGameInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iGameAbi,
    functionName: 'initialize',
  });
