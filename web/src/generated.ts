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
// DailyInteractionModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dailyInteractionModuleAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'abis',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'dailyInteraction',
    outputs: [],
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
    name: 'functions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
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
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'required',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotEnoughTimePassed' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DeployRPS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deployRpsAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'IS_SCRIPT',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'createFunctions',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'run',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: 'result', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
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
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
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
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'AllowanceOverflow' },
  { type: 'error', inputs: [], name: 'AllowanceUnderflow' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientBalance' },
  { type: 'error', inputs: [], name: 'InvalidPermit' },
  { type: 'error', inputs: [], name: 'PermitExpired' },
  { type: 'error', inputs: [], name: 'TotalSupplyOverflow' },
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
          { name: 'Address', internalType: 'address', type: 'address' },
          { name: 'Key', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'createGameFunction',
    outputs: [],
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
        internalType: 'struct GameFuncParams',
        type: 'tuple',
        components: [
          {
            name: 'addresses',
            internalType: 'struct GameFuncAddress[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'uints',
            internalType: 'struct GameFuncUint[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'strings',
            internalType: 'struct GameFuncString[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    name: 'executeGameFunction',
    outputs: [],
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
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'gameFunctionNames',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'gameFunctions',
    outputs: [
      { name: 'Address', internalType: 'address', type: 'address' },
      { name: 'Key', internalType: 'string', type: 'string' },
    ],
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
    name: 'getGameFunctions',
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
          {
            name: 'availableFunctions',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'Address', internalType: 'address', type: 'address' },
              { name: 'Key', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'availableData',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'Address', internalType: 'address', type: 'address' },
              { name: 'Key', internalType: 'string', type: 'string' },
            ],
          },
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
  { type: 'error', inputs: [], name: 'GameFunctionAlreadyExists' },
  { type: 'error', inputs: [], name: 'GameFunctionDoesNotExist' },
  {
    type: 'error',
    inputs: [
      { name: 'component', internalType: 'address', type: 'address' },
      { name: 'functionKey', internalType: 'string', type: 'string' },
    ],
    name: 'GameFunctionExecutionFailure',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GameEntity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gameEntityAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'address', type: 'address' },
    ],
    name: 'addPlayerAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addPlayerUint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'game',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAvailableKeys',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'string', type: 'string' },
    ],
    name: 'getPlayerAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'string', type: 'string' },
    ],
    name: 'getPlayerString',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'string', type: 'string' },
    ],
    name: 'getPlayerUint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_game', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'keys',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      {
        name: 'params',
        internalType: 'struct GameFuncParams',
        type: 'tuple',
        components: [
          {
            name: 'addresses',
            internalType: 'struct GameFuncAddress[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'uints',
            internalType: 'struct GameFuncUint[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'strings',
            internalType: 'struct GameFuncString[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    name: 'setPlayerParams',
    outputs: [],
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
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
          {
            name: 'availableFunctions',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'Address', internalType: 'address', type: 'address' },
              { name: 'Key', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'availableData',
            internalType: 'struct AddressKey[]',
            type: 'tuple[]',
            components: [
              { name: 'Address', internalType: 'address', type: 'address' },
              { name: 'Key', internalType: 'string', type: 'string' },
            ],
          },
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
// IGameFuncEntity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iGameFuncEntityAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'key', internalType: 'string', type: 'string' }],
    name: 'getGameFuncParams',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INumberEntity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iNumberEntityAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'key', internalType: 'string', type: 'string' }],
    name: 'getNumber',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MMONeighborInteractionModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mmoNeighborInteractionModuleAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'abis',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'game', internalType: 'contract IGame', type: 'address' },
      { name: 'player', internalType: 'address', type: 'address' },
    ],
    name: 'canPlayerCatch',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'game', internalType: 'contract IGame', type: 'address' },
      { name: 'player', internalType: 'address', type: 'address' },
    ],
    name: 'canPlayerThrow',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'catchBall',
    outputs: [],
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
    name: 'functions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'game', internalType: 'contract IGame', type: 'address' }],
    name: 'getBallCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'game', internalType: 'contract IGame', type: 'address' }],
    name: 'getBallHolderIndexes',
    outputs: [
      {
        name: '',
        internalType: 'struct CatchEntity.Position[]',
        type: 'tuple[]',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'player', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'game', internalType: 'contract IGame', type: 'address' }],
    name: 'getCatchableIndexes',
    outputs: [
      {
        name: '',
        internalType: 'struct CatchEntity.Position[]',
        type: 'tuple[]',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'player', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'game', internalType: 'contract IGame', type: 'address' }],
    name: 'getPlayerCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'game', internalType: 'contract IGame', type: 'address' },
      { name: 'player', internalType: 'address', type: 'address' },
    ],
    name: 'getPlayerIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
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
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'joinSession',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'required',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'throwBall',
    outputs: [],
  },
  { type: 'error', inputs: [], name: 'CannotInteract' },
  { type: 'error', inputs: [], name: 'CannotIntercept' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MMOSessionModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mmoSessionModuleAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'abis',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'functions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'game', internalType: 'contract IGame', type: 'address' }],
    name: 'getPlayerCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
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
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'joinGame',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'required',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Mock20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mock20Abi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: 'result', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
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
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
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
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'AllowanceOverflow' },
  { type: 'error', inputs: [], name: 'AllowanceUnderflow' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientBalance' },
  { type: 'error', inputs: [], name: 'InvalidPermit' },
  { type: 'error', inputs: [], name: 'PermitExpired' },
  { type: 'error', inputs: [], name: 'TotalSupplyOverflow' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// QueueSession
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const queueSessionAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'abis',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'functions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'game', internalType: 'contract IGame', type: 'address' }],
    name: 'getPlayerCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
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
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'joinGame',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'required',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setMatchOrWait',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// QueueSessionEntity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const queueSessionEntityAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'address', type: 'address' }],
    name: 'enqueue',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'game',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAvailableKeys',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getQueueSize',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_game', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'keys',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'nextPlayer',
    outputs: [{ name: 'data', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'players',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// QueueSessionTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const queueSessionTestAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'toClear',
        internalType: 'struct GameFuncParams',
        type: 'tuple',
        components: [
          {
            name: 'addresses',
            internalType: 'struct GameFuncAddress[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'uints',
            internalType: 'struct GameFuncUint[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'strings',
            internalType: 'struct GameFuncString[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    name: 'clearParams',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'createFunctions',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'deployTavern',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entityFactory',
    outputs: [
      { name: '', internalType: 'contract EntityFactory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [
      {
        name: 'excludedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [
      {
        name: 'excludedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [
      {
        name: 'excludedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [
      { name: '', internalType: 'contract GameFactory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'liveGame',
    outputs: [{ name: '', internalType: 'contract Game', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'loadModules',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registry',
    outputs: [
      { name: '', internalType: 'contract ComponentRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'setUp',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [
      {
        name: 'targetedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [
      {
        name: 'targetedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [
      {
        name: 'targetedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'test_first_join',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'test_second_join',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'logs',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reward1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reward1155Abi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'abis',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'functions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
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
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'required',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'sendReward',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'game', internalType: 'contract IGame', type: 'address' },
      { name: '_reward', internalType: 'address', type: 'address' },
    ],
    name: 'setReward',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reward1155Entity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reward1155EntityAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'game',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAvailableKeys',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_game', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'keys',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'sendReward',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_nft', internalType: 'address', type: 'address' }],
    name: 'setReward',
    outputs: [],
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reward20Entity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reward20EntityAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'game',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAvailableKeys',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_game', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'keys',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'sendReward',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'setReward',
    outputs: [],
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RewardERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rewardErc20Abi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'abis',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'functions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
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
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'required',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'reward',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'game', internalType: 'contract IGame', type: 'address' },
      { name: '_reward', internalType: 'address', type: 'address' },
    ],
    name: 'setReward',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RockPaperScissorEntity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rockPaperScissorEntityAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'actions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'game',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAvailableActions',
    outputs: [{ name: '', internalType: 'string[4]', type: 'string[4]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAvailableKeys',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'player', internalType: 'address', type: 'address' }],
    name: 'getPlayerAction',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_game', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'keys',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_actions', internalType: 'string[3]', type: 'string[3]' },
    ],
    name: 'setAvailableActions',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'actionIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setPlayerAction',
    outputs: [],
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RockPaperScissors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rockPaperScissorsAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'abis',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'functions',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
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
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'gameAddress', internalType: 'address', type: 'address' },
    ],
    name: 'oneOnOne',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'required',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  { type: 'error', inputs: [], name: 'NoActionYet' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RockPaperScissorsGame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rockPaperScissorsGameAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'toClear',
        internalType: 'struct GameFuncParams',
        type: 'tuple',
        components: [
          {
            name: 'addresses',
            internalType: 'struct GameFuncAddress[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'uints',
            internalType: 'struct GameFuncUint[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'strings',
            internalType: 'struct GameFuncString[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    name: 'clearParams',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'createFunctions',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'deployGame',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'deployTavern',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entityFactory',
    outputs: [
      { name: '', internalType: 'contract EntityFactory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [
      {
        name: 'excludedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [
      {
        name: 'excludedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [
      {
        name: 'excludedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [
      { name: '', internalType: 'contract GameFactory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'liveGame',
    outputs: [{ name: '', internalType: 'contract Game', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'loadModules',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registry',
    outputs: [
      { name: '', internalType: 'contract ComponentRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'setUp',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [
      {
        name: 'targetedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [
      {
        name: 'targetedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [
      {
        name: 'targetedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'test_first_join',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'test_second_lose',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'test_second_tie',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'test_second_win',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'logs',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SimpleMintable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const simpleMintableAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SimpleMintableERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const simpleMintableErc20Abi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TavernTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tavernTestAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'toClear',
        internalType: 'struct GameFuncParams',
        type: 'tuple',
        components: [
          {
            name: 'addresses',
            internalType: 'struct GameFuncAddress[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'uints',
            internalType: 'struct GameFuncUint[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'strings',
            internalType: 'struct GameFuncString[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    name: 'clearParams',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'createFunctions',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'deployTavern',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entityFactory',
    outputs: [
      { name: '', internalType: 'contract EntityFactory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [
      {
        name: 'excludedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [
      {
        name: 'excludedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [
      {
        name: 'excludedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [
      { name: '', internalType: 'contract GameFactory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'liveGame',
    outputs: [{ name: '', internalType: 'contract Game', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'loadModules',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registry',
    outputs: [
      { name: '', internalType: 'contract ComponentRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [
      {
        name: 'targetedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [
      {
        name: 'targetedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [
      {
        name: 'targetedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'logs',
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link componentRegistryAbi}__
 */
export const useWatchComponentRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: componentRegistryAbi });

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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__
 */
export const useReadDailyInteractionModule =
  /*#__PURE__*/ createUseReadContract({ abi: dailyInteractionModuleAbi });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"abis"`
 */
export const useReadDailyInteractionModuleAbis =
  /*#__PURE__*/ createUseReadContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'abis',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"displayName"`
 */
export const useReadDailyInteractionModuleDisplayName =
  /*#__PURE__*/ createUseReadContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'displayName',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"functions"`
 */
export const useReadDailyInteractionModuleFunctions =
  /*#__PURE__*/ createUseReadContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'functions',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"getSummary"`
 */
export const useReadDailyInteractionModuleGetSummary =
  /*#__PURE__*/ createUseReadContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'getSummary',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"required"`
 */
export const useReadDailyInteractionModuleRequired =
  /*#__PURE__*/ createUseReadContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'required',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__
 */
export const useWriteDailyInteractionModule =
  /*#__PURE__*/ createUseWriteContract({ abi: dailyInteractionModuleAbi });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"dailyInteraction"`
 */
export const useWriteDailyInteractionModuleDailyInteraction =
  /*#__PURE__*/ createUseWriteContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'dailyInteraction',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteDailyInteractionModuleInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__
 */
export const useSimulateDailyInteractionModule =
  /*#__PURE__*/ createUseSimulateContract({ abi: dailyInteractionModuleAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"dailyInteraction"`
 */
export const useSimulateDailyInteractionModuleDailyInteraction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'dailyInteraction',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateDailyInteractionModuleInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dailyInteractionModuleAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dailyInteractionModuleAbi}__
 */
export const useWatchDailyInteractionModuleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: dailyInteractionModuleAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dailyInteractionModuleAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchDailyInteractionModuleInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: dailyInteractionModuleAbi,
    eventName: 'Initialized',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deployRpsAbi}__
 */
export const useReadDeployRps = /*#__PURE__*/ createUseReadContract({
  abi: deployRpsAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deployRpsAbi}__ and `functionName` set to `"IS_SCRIPT"`
 */
export const useReadDeployRpsIsScript = /*#__PURE__*/ createUseReadContract({
  abi: deployRpsAbi,
  functionName: 'IS_SCRIPT',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link deployRpsAbi}__
 */
export const useWriteDeployRps = /*#__PURE__*/ createUseWriteContract({
  abi: deployRpsAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link deployRpsAbi}__ and `functionName` set to `"createFunctions"`
 */
export const useWriteDeployRpsCreateFunctions =
  /*#__PURE__*/ createUseWriteContract({
    abi: deployRpsAbi,
    functionName: 'createFunctions',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link deployRpsAbi}__ and `functionName` set to `"run"`
 */
export const useWriteDeployRpsRun = /*#__PURE__*/ createUseWriteContract({
  abi: deployRpsAbi,
  functionName: 'run',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link deployRpsAbi}__
 */
export const useSimulateDeployRps = /*#__PURE__*/ createUseSimulateContract({
  abi: deployRpsAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link deployRpsAbi}__ and `functionName` set to `"createFunctions"`
 */
export const useSimulateDeployRpsCreateFunctions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: deployRpsAbi,
    functionName: 'createFunctions',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link deployRpsAbi}__ and `functionName` set to `"run"`
 */
export const useSimulateDeployRpsRun = /*#__PURE__*/ createUseSimulateContract({
  abi: deployRpsAbi,
  functionName: 'run',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadErc20DomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'DOMAIN_SEPARATOR',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"nonces"`
 */
export const useReadErc20Nonces = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'nonces',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"permit"`
 */
export const useWriteErc20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'permit',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"permit"`
 */
export const useSimulateErc20Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'permit',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' }
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"functionLookup"`
 */
export const useReadGameFunctionLookup = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'functionLookup',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"gameFunctionNames"`
 */
export const useReadGameGameFunctionNames = /*#__PURE__*/ createUseReadContract(
  { abi: gameAbi, functionName: 'gameFunctionNames' }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"gameFunctions"`
 */
export const useReadGameGameFunctions = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'gameFunctions',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getEntity"`
 */
export const useReadGameGetEntity = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'getEntity',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getGameFunctions"`
 */
export const useReadGameGetGameFunctions = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  functionName: 'getGameFunctions',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createGameFunction"`
 */
export const useWriteGameCreateGameFunction =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameAbi,
    functionName: 'createGameFunction',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"executeGameFunction"`
 */
export const useWriteGameExecuteGameFunction =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameAbi,
    functionName: 'executeGameFunction',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteGameInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  functionName: 'initialize',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createGameFunction"`
 */
export const useSimulateGameCreateGameFunction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'createGameFunction',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"executeGameFunction"`
 */
export const useSimulateGameExecuteGameFunction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    functionName: 'executeGameFunction',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameEntityAbi}__
 */
export const useReadGameEntity = /*#__PURE__*/ createUseReadContract({
  abi: gameEntityAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"game"`
 */
export const useReadGameEntityGame = /*#__PURE__*/ createUseReadContract({
  abi: gameEntityAbi,
  functionName: 'game',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"getAvailableKeys"`
 */
export const useReadGameEntityGetAvailableKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: gameEntityAbi,
    functionName: 'getAvailableKeys',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"getPlayerAddress"`
 */
export const useReadGameEntityGetPlayerAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: gameEntityAbi,
    functionName: 'getPlayerAddress',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"getPlayerString"`
 */
export const useReadGameEntityGetPlayerString =
  /*#__PURE__*/ createUseReadContract({
    abi: gameEntityAbi,
    functionName: 'getPlayerString',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"getPlayerUint"`
 */
export const useReadGameEntityGetPlayerUint =
  /*#__PURE__*/ createUseReadContract({
    abi: gameEntityAbi,
    functionName: 'getPlayerUint',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"keys"`
 */
export const useReadGameEntityKeys = /*#__PURE__*/ createUseReadContract({
  abi: gameEntityAbi,
  functionName: 'keys',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameEntityAbi}__
 */
export const useWriteGameEntity = /*#__PURE__*/ createUseWriteContract({
  abi: gameEntityAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"addPlayerAddress"`
 */
export const useWriteGameEntityAddPlayerAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameEntityAbi,
    functionName: 'addPlayerAddress',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"addPlayerUint"`
 */
export const useWriteGameEntityAddPlayerUint =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameEntityAbi,
    functionName: 'addPlayerUint',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteGameEntityInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameEntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"setPlayerParams"`
 */
export const useWriteGameEntitySetPlayerParams =
  /*#__PURE__*/ createUseWriteContract({
    abi: gameEntityAbi,
    functionName: 'setPlayerParams',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameEntityAbi}__
 */
export const useSimulateGameEntity = /*#__PURE__*/ createUseSimulateContract({
  abi: gameEntityAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"addPlayerAddress"`
 */
export const useSimulateGameEntityAddPlayerAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameEntityAbi,
    functionName: 'addPlayerAddress',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"addPlayerUint"`
 */
export const useSimulateGameEntityAddPlayerUint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameEntityAbi,
    functionName: 'addPlayerUint',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateGameEntityInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameEntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameEntityAbi}__ and `functionName` set to `"setPlayerParams"`
 */
export const useSimulateGameEntitySetPlayerParams =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameEntityAbi,
    functionName: 'setPlayerParams',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameEntityAbi}__
 */
export const useWatchGameEntityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: gameEntityAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameEntityAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchGameEntityInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gameEntityAbi,
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iGameFuncEntityAbi}__
 */
export const useReadIGameFuncEntity = /*#__PURE__*/ createUseReadContract({
  abi: iGameFuncEntityAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iGameFuncEntityAbi}__ and `functionName` set to `"getGameFuncParams"`
 */
export const useReadIGameFuncEntityGetGameFuncParams =
  /*#__PURE__*/ createUseReadContract({
    abi: iGameFuncEntityAbi,
    functionName: 'getGameFuncParams',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNumberEntityAbi}__
 */
export const useReadINumberEntity = /*#__PURE__*/ createUseReadContract({
  abi: iNumberEntityAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNumberEntityAbi}__ and `functionName` set to `"getNumber"`
 */
export const useReadINumberEntityGetNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iNumberEntityAbi,
    functionName: 'getNumber',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__
 */
export const useReadMmoNeighborInteractionModule =
  /*#__PURE__*/ createUseReadContract({ abi: mmoNeighborInteractionModuleAbi });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"abis"`
 */
export const useReadMmoNeighborInteractionModuleAbis =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'abis',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"canPlayerCatch"`
 */
export const useReadMmoNeighborInteractionModuleCanPlayerCatch =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'canPlayerCatch',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"canPlayerThrow"`
 */
export const useReadMmoNeighborInteractionModuleCanPlayerThrow =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'canPlayerThrow',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"displayName"`
 */
export const useReadMmoNeighborInteractionModuleDisplayName =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'displayName',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"functions"`
 */
export const useReadMmoNeighborInteractionModuleFunctions =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'functions',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"getBallCount"`
 */
export const useReadMmoNeighborInteractionModuleGetBallCount =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'getBallCount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"getBallHolderIndexes"`
 */
export const useReadMmoNeighborInteractionModuleGetBallHolderIndexes =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'getBallHolderIndexes',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"getCatchableIndexes"`
 */
export const useReadMmoNeighborInteractionModuleGetCatchableIndexes =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'getCatchableIndexes',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"getPlayerCount"`
 */
export const useReadMmoNeighborInteractionModuleGetPlayerCount =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'getPlayerCount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"getPlayerIndex"`
 */
export const useReadMmoNeighborInteractionModuleGetPlayerIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'getPlayerIndex',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"getSummary"`
 */
export const useReadMmoNeighborInteractionModuleGetSummary =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'getSummary',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"required"`
 */
export const useReadMmoNeighborInteractionModuleRequired =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'required',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__
 */
export const useWriteMmoNeighborInteractionModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: mmoNeighborInteractionModuleAbi,
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"catchBall"`
 */
export const useWriteMmoNeighborInteractionModuleCatchBall =
  /*#__PURE__*/ createUseWriteContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'catchBall',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteMmoNeighborInteractionModuleInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"joinSession"`
 */
export const useWriteMmoNeighborInteractionModuleJoinSession =
  /*#__PURE__*/ createUseWriteContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'joinSession',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"throwBall"`
 */
export const useWriteMmoNeighborInteractionModuleThrowBall =
  /*#__PURE__*/ createUseWriteContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'throwBall',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__
 */
export const useSimulateMmoNeighborInteractionModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mmoNeighborInteractionModuleAbi,
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"catchBall"`
 */
export const useSimulateMmoNeighborInteractionModuleCatchBall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'catchBall',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateMmoNeighborInteractionModuleInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"joinSession"`
 */
export const useSimulateMmoNeighborInteractionModuleJoinSession =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'joinSession',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mmoNeighborInteractionModuleAbi}__ and `functionName` set to `"throwBall"`
 */
export const useSimulateMmoNeighborInteractionModuleThrowBall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mmoNeighborInteractionModuleAbi,
    functionName: 'throwBall',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__
 */
export const useReadMmoSessionModule = /*#__PURE__*/ createUseReadContract({
  abi: mmoSessionModuleAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"abis"`
 */
export const useReadMmoSessionModuleAbis = /*#__PURE__*/ createUseReadContract({
  abi: mmoSessionModuleAbi,
  functionName: 'abis',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"functions"`
 */
export const useReadMmoSessionModuleFunctions =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoSessionModuleAbi,
    functionName: 'functions',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"getPlayerCount"`
 */
export const useReadMmoSessionModuleGetPlayerCount =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoSessionModuleAbi,
    functionName: 'getPlayerCount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"getSummary"`
 */
export const useReadMmoSessionModuleGetSummary =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoSessionModuleAbi,
    functionName: 'getSummary',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"required"`
 */
export const useReadMmoSessionModuleRequired =
  /*#__PURE__*/ createUseReadContract({
    abi: mmoSessionModuleAbi,
    functionName: 'required',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__
 */
export const useWriteMmoSessionModule = /*#__PURE__*/ createUseWriteContract({
  abi: mmoSessionModuleAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteMmoSessionModuleInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: mmoSessionModuleAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"joinGame"`
 */
export const useWriteMmoSessionModuleJoinGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: mmoSessionModuleAbi,
    functionName: 'joinGame',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__
 */
export const useSimulateMmoSessionModule =
  /*#__PURE__*/ createUseSimulateContract({ abi: mmoSessionModuleAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateMmoSessionModuleInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mmoSessionModuleAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mmoSessionModuleAbi}__ and `functionName` set to `"joinGame"`
 */
export const useSimulateMmoSessionModuleJoinGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mmoSessionModuleAbi,
    functionName: 'joinGame',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__
 */
export const useReadMock20 = /*#__PURE__*/ createUseReadContract({
  abi: mock20Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadMock20DomainSeparator = /*#__PURE__*/ createUseReadContract(
  { abi: mock20Abi, functionName: 'DOMAIN_SEPARATOR' }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadMock20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: mock20Abi,
  functionName: 'allowance',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMock20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mock20Abi,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadMock20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: mock20Abi,
  functionName: 'decimals',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"name"`
 */
export const useReadMock20Name = /*#__PURE__*/ createUseReadContract({
  abi: mock20Abi,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"nonces"`
 */
export const useReadMock20Nonces = /*#__PURE__*/ createUseReadContract({
  abi: mock20Abi,
  functionName: 'nonces',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadMock20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: mock20Abi,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMock20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mock20Abi,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mock20Abi}__
 */
export const useWriteMock20 = /*#__PURE__*/ createUseWriteContract({
  abi: mock20Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteMock20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: mock20Abi,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteMock20Mint = /*#__PURE__*/ createUseWriteContract({
  abi: mock20Abi,
  functionName: 'mint',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"permit"`
 */
export const useWriteMock20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: mock20Abi,
  functionName: 'permit',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMock20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: mock20Abi,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMock20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: mock20Abi,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mock20Abi}__
 */
export const useSimulateMock20 = /*#__PURE__*/ createUseSimulateContract({
  abi: mock20Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMock20Approve = /*#__PURE__*/ createUseSimulateContract(
  { abi: mock20Abi, functionName: 'approve' }
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMock20Mint = /*#__PURE__*/ createUseSimulateContract({
  abi: mock20Abi,
  functionName: 'mint',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"permit"`
 */
export const useSimulateMock20Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: mock20Abi,
  functionName: 'permit',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMock20Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mock20Abi,
    functionName: 'transfer',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mock20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMock20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mock20Abi,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mock20Abi}__
 */
export const useWatchMock20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mock20Abi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mock20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMock20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mock20Abi,
    eventName: 'Approval',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mock20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMock20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mock20Abi,
    eventName: 'Transfer',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionAbi}__
 */
export const useReadQueueSession = /*#__PURE__*/ createUseReadContract({
  abi: queueSessionAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"abis"`
 */
export const useReadQueueSessionAbis = /*#__PURE__*/ createUseReadContract({
  abi: queueSessionAbi,
  functionName: 'abis',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"functions"`
 */
export const useReadQueueSessionFunctions = /*#__PURE__*/ createUseReadContract(
  { abi: queueSessionAbi, functionName: 'functions' }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"getPlayerCount"`
 */
export const useReadQueueSessionGetPlayerCount =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionAbi,
    functionName: 'getPlayerCount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"getSummary"`
 */
export const useReadQueueSessionGetSummary =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionAbi,
    functionName: 'getSummary',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"required"`
 */
export const useReadQueueSessionRequired = /*#__PURE__*/ createUseReadContract({
  abi: queueSessionAbi,
  functionName: 'required',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionAbi}__
 */
export const useWriteQueueSession = /*#__PURE__*/ createUseWriteContract({
  abi: queueSessionAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteQueueSessionInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"joinGame"`
 */
export const useWriteQueueSessionJoinGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionAbi,
    functionName: 'joinGame',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"setMatchOrWait"`
 */
export const useWriteQueueSessionSetMatchOrWait =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionAbi,
    functionName: 'setMatchOrWait',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionAbi}__
 */
export const useSimulateQueueSession = /*#__PURE__*/ createUseSimulateContract({
  abi: queueSessionAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateQueueSessionInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"joinGame"`
 */
export const useSimulateQueueSessionJoinGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionAbi,
    functionName: 'joinGame',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionAbi}__ and `functionName` set to `"setMatchOrWait"`
 */
export const useSimulateQueueSessionSetMatchOrWait =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionAbi,
    functionName: 'setMatchOrWait',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionEntityAbi}__
 */
export const useReadQueueSessionEntity = /*#__PURE__*/ createUseReadContract({
  abi: queueSessionEntityAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"game"`
 */
export const useReadQueueSessionEntityGame =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionEntityAbi,
    functionName: 'game',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"getAvailableKeys"`
 */
export const useReadQueueSessionEntityGetAvailableKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionEntityAbi,
    functionName: 'getAvailableKeys',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"getQueueSize"`
 */
export const useReadQueueSessionEntityGetQueueSize =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionEntityAbi,
    functionName: 'getQueueSize',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"keys"`
 */
export const useReadQueueSessionEntityKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionEntityAbi,
    functionName: 'keys',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"players"`
 */
export const useReadQueueSessionEntityPlayers =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionEntityAbi,
    functionName: 'players',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionEntityAbi}__
 */
export const useWriteQueueSessionEntity = /*#__PURE__*/ createUseWriteContract({
  abi: queueSessionEntityAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"enqueue"`
 */
export const useWriteQueueSessionEntityEnqueue =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionEntityAbi,
    functionName: 'enqueue',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteQueueSessionEntityInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionEntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"nextPlayer"`
 */
export const useWriteQueueSessionEntityNextPlayer =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionEntityAbi,
    functionName: 'nextPlayer',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionEntityAbi}__
 */
export const useSimulateQueueSessionEntity =
  /*#__PURE__*/ createUseSimulateContract({ abi: queueSessionEntityAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"enqueue"`
 */
export const useSimulateQueueSessionEntityEnqueue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionEntityAbi,
    functionName: 'enqueue',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateQueueSessionEntityInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionEntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `functionName` set to `"nextPlayer"`
 */
export const useSimulateQueueSessionEntityNextPlayer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionEntityAbi,
    functionName: 'nextPlayer',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionEntityAbi}__
 */
export const useWatchQueueSessionEntityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: queueSessionEntityAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionEntityAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchQueueSessionEntityInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionEntityAbi,
    eventName: 'Initialized',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__
 */
export const useReadQueueSessionTest = /*#__PURE__*/ createUseReadContract({
  abi: queueSessionTestAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"IS_TEST"`
 */
export const useReadQueueSessionTestIsTest =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'IS_TEST',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"entityFactory"`
 */
export const useReadQueueSessionTestEntityFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'entityFactory',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"excludeArtifacts"`
 */
export const useReadQueueSessionTestExcludeArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'excludeArtifacts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"excludeContracts"`
 */
export const useReadQueueSessionTestExcludeContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'excludeContracts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"excludeSenders"`
 */
export const useReadQueueSessionTestExcludeSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'excludeSenders',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"factory"`
 */
export const useReadQueueSessionTestFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'factory',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"failed"`
 */
export const useReadQueueSessionTestFailed =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'failed',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"liveGame"`
 */
export const useReadQueueSessionTestLiveGame =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'liveGame',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"registry"`
 */
export const useReadQueueSessionTestRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'registry',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"targetArtifactSelectors"`
 */
export const useReadQueueSessionTestTargetArtifactSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'targetArtifactSelectors',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"targetArtifacts"`
 */
export const useReadQueueSessionTestTargetArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'targetArtifacts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"targetContracts"`
 */
export const useReadQueueSessionTestTargetContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'targetContracts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"targetInterfaces"`
 */
export const useReadQueueSessionTestTargetInterfaces =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'targetInterfaces',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"targetSelectors"`
 */
export const useReadQueueSessionTestTargetSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'targetSelectors',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"targetSenders"`
 */
export const useReadQueueSessionTestTargetSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: queueSessionTestAbi,
    functionName: 'targetSenders',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionTestAbi}__
 */
export const useWriteQueueSessionTest = /*#__PURE__*/ createUseWriteContract({
  abi: queueSessionTestAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"clearParams"`
 */
export const useWriteQueueSessionTestClearParams =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionTestAbi,
    functionName: 'clearParams',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"createFunctions"`
 */
export const useWriteQueueSessionTestCreateFunctions =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionTestAbi,
    functionName: 'createFunctions',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"deployTavern"`
 */
export const useWriteQueueSessionTestDeployTavern =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionTestAbi,
    functionName: 'deployTavern',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"loadModules"`
 */
export const useWriteQueueSessionTestLoadModules =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionTestAbi,
    functionName: 'loadModules',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"setUp"`
 */
export const useWriteQueueSessionTestSetUp =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionTestAbi,
    functionName: 'setUp',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"test_first_join"`
 */
export const useWriteQueueSessionTestTestFirstJoin =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionTestAbi,
    functionName: 'test_first_join',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"test_second_join"`
 */
export const useWriteQueueSessionTestTestSecondJoin =
  /*#__PURE__*/ createUseWriteContract({
    abi: queueSessionTestAbi,
    functionName: 'test_second_join',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionTestAbi}__
 */
export const useSimulateQueueSessionTest =
  /*#__PURE__*/ createUseSimulateContract({ abi: queueSessionTestAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"clearParams"`
 */
export const useSimulateQueueSessionTestClearParams =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionTestAbi,
    functionName: 'clearParams',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"createFunctions"`
 */
export const useSimulateQueueSessionTestCreateFunctions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionTestAbi,
    functionName: 'createFunctions',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"deployTavern"`
 */
export const useSimulateQueueSessionTestDeployTavern =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionTestAbi,
    functionName: 'deployTavern',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"loadModules"`
 */
export const useSimulateQueueSessionTestLoadModules =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionTestAbi,
    functionName: 'loadModules',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"setUp"`
 */
export const useSimulateQueueSessionTestSetUp =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionTestAbi,
    functionName: 'setUp',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"test_first_join"`
 */
export const useSimulateQueueSessionTestTestFirstJoin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionTestAbi,
    functionName: 'test_first_join',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link queueSessionTestAbi}__ and `functionName` set to `"test_second_join"`
 */
export const useSimulateQueueSessionTestTestSecondJoin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: queueSessionTestAbi,
    functionName: 'test_second_join',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__
 */
export const useWatchQueueSessionTestEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: queueSessionTestAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log"`
 */
export const useWatchQueueSessionTestLogEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_address"`
 */
export const useWatchQueueSessionTestLogAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_address',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_array"`
 */
export const useWatchQueueSessionTestLogArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_array',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_bytes"`
 */
export const useWatchQueueSessionTestLogBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_bytes',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_bytes32"`
 */
export const useWatchQueueSessionTestLogBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_bytes32',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_int"`
 */
export const useWatchQueueSessionTestLogIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_address"`
 */
export const useWatchQueueSessionTestLogNamedAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_address',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_array"`
 */
export const useWatchQueueSessionTestLogNamedArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_array',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_bytes"`
 */
export const useWatchQueueSessionTestLogNamedBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_bytes',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_bytes32"`
 */
export const useWatchQueueSessionTestLogNamedBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_bytes32',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_decimal_int"`
 */
export const useWatchQueueSessionTestLogNamedDecimalIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_decimal_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_decimal_uint"`
 */
export const useWatchQueueSessionTestLogNamedDecimalUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_decimal_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_int"`
 */
export const useWatchQueueSessionTestLogNamedIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_string"`
 */
export const useWatchQueueSessionTestLogNamedStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_string',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_named_uint"`
 */
export const useWatchQueueSessionTestLogNamedUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_named_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_string"`
 */
export const useWatchQueueSessionTestLogStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_string',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"log_uint"`
 */
export const useWatchQueueSessionTestLogUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'log_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link queueSessionTestAbi}__ and `eventName` set to `"logs"`
 */
export const useWatchQueueSessionTestLogsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: queueSessionTestAbi,
    eventName: 'logs',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155Abi}__
 */
export const useReadReward1155 = /*#__PURE__*/ createUseReadContract({
  abi: reward1155Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"abis"`
 */
export const useReadReward1155Abis = /*#__PURE__*/ createUseReadContract({
  abi: reward1155Abi,
  functionName: 'abis',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"functions"`
 */
export const useReadReward1155Functions = /*#__PURE__*/ createUseReadContract({
  abi: reward1155Abi,
  functionName: 'functions',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"getSummary"`
 */
export const useReadReward1155GetSummary = /*#__PURE__*/ createUseReadContract({
  abi: reward1155Abi,
  functionName: 'getSummary',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"required"`
 */
export const useReadReward1155Required = /*#__PURE__*/ createUseReadContract({
  abi: reward1155Abi,
  functionName: 'required',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward1155Abi}__
 */
export const useWriteReward1155 = /*#__PURE__*/ createUseWriteContract({
  abi: reward1155Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"initialize"`
 */
export const useWriteReward1155Initialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: reward1155Abi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"sendReward"`
 */
export const useWriteReward1155SendReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: reward1155Abi,
    functionName: 'sendReward',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"setReward"`
 */
export const useWriteReward1155SetReward = /*#__PURE__*/ createUseWriteContract(
  { abi: reward1155Abi, functionName: 'setReward' }
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward1155Abi}__
 */
export const useSimulateReward1155 = /*#__PURE__*/ createUseSimulateContract({
  abi: reward1155Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateReward1155Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward1155Abi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"sendReward"`
 */
export const useSimulateReward1155SendReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward1155Abi,
    functionName: 'sendReward',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward1155Abi}__ and `functionName` set to `"setReward"`
 */
export const useSimulateReward1155SetReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward1155Abi,
    functionName: 'setReward',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155EntityAbi}__
 */
export const useReadReward1155Entity = /*#__PURE__*/ createUseReadContract({
  abi: reward1155EntityAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"game"`
 */
export const useReadReward1155EntityGame = /*#__PURE__*/ createUseReadContract({
  abi: reward1155EntityAbi,
  functionName: 'game',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"getAvailableKeys"`
 */
export const useReadReward1155EntityGetAvailableKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: reward1155EntityAbi,
    functionName: 'getAvailableKeys',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"keys"`
 */
export const useReadReward1155EntityKeys = /*#__PURE__*/ createUseReadContract({
  abi: reward1155EntityAbi,
  functionName: 'keys',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward1155EntityAbi}__
 */
export const useWriteReward1155Entity = /*#__PURE__*/ createUseWriteContract({
  abi: reward1155EntityAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteReward1155EntityInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: reward1155EntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"sendReward"`
 */
export const useWriteReward1155EntitySendReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: reward1155EntityAbi,
    functionName: 'sendReward',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"setReward"`
 */
export const useWriteReward1155EntitySetReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: reward1155EntityAbi,
    functionName: 'setReward',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward1155EntityAbi}__
 */
export const useSimulateReward1155Entity =
  /*#__PURE__*/ createUseSimulateContract({ abi: reward1155EntityAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateReward1155EntityInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward1155EntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"sendReward"`
 */
export const useSimulateReward1155EntitySendReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward1155EntityAbi,
    functionName: 'sendReward',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward1155EntityAbi}__ and `functionName` set to `"setReward"`
 */
export const useSimulateReward1155EntitySetReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward1155EntityAbi,
    functionName: 'setReward',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reward1155EntityAbi}__
 */
export const useWatchReward1155EntityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: reward1155EntityAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reward1155EntityAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchReward1155EntityInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reward1155EntityAbi,
    eventName: 'Initialized',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward20EntityAbi}__
 */
export const useReadReward20Entity = /*#__PURE__*/ createUseReadContract({
  abi: reward20EntityAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"game"`
 */
export const useReadReward20EntityGame = /*#__PURE__*/ createUseReadContract({
  abi: reward20EntityAbi,
  functionName: 'game',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"getAvailableKeys"`
 */
export const useReadReward20EntityGetAvailableKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: reward20EntityAbi,
    functionName: 'getAvailableKeys',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"keys"`
 */
export const useReadReward20EntityKeys = /*#__PURE__*/ createUseReadContract({
  abi: reward20EntityAbi,
  functionName: 'keys',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward20EntityAbi}__
 */
export const useWriteReward20Entity = /*#__PURE__*/ createUseWriteContract({
  abi: reward20EntityAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteReward20EntityInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: reward20EntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"sendReward"`
 */
export const useWriteReward20EntitySendReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: reward20EntityAbi,
    functionName: 'sendReward',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"setReward"`
 */
export const useWriteReward20EntitySetReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: reward20EntityAbi,
    functionName: 'setReward',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward20EntityAbi}__
 */
export const useSimulateReward20Entity =
  /*#__PURE__*/ createUseSimulateContract({ abi: reward20EntityAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateReward20EntityInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward20EntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"sendReward"`
 */
export const useSimulateReward20EntitySendReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward20EntityAbi,
    functionName: 'sendReward',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reward20EntityAbi}__ and `functionName` set to `"setReward"`
 */
export const useSimulateReward20EntitySetReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reward20EntityAbi,
    functionName: 'setReward',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reward20EntityAbi}__
 */
export const useWatchReward20EntityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: reward20EntityAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reward20EntityAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchReward20EntityInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reward20EntityAbi,
    eventName: 'Initialized',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardErc20Abi}__
 */
export const useReadRewardErc20 = /*#__PURE__*/ createUseReadContract({
  abi: rewardErc20Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"abis"`
 */
export const useReadRewardErc20Abis = /*#__PURE__*/ createUseReadContract({
  abi: rewardErc20Abi,
  functionName: 'abis',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"functions"`
 */
export const useReadRewardErc20Functions = /*#__PURE__*/ createUseReadContract({
  abi: rewardErc20Abi,
  functionName: 'functions',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"getSummary"`
 */
export const useReadRewardErc20GetSummary = /*#__PURE__*/ createUseReadContract(
  { abi: rewardErc20Abi, functionName: 'getSummary' }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"required"`
 */
export const useReadRewardErc20Required = /*#__PURE__*/ createUseReadContract({
  abi: rewardErc20Abi,
  functionName: 'required',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardErc20Abi}__
 */
export const useWriteRewardErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: rewardErc20Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"initialize"`
 */
export const useWriteRewardErc20Initialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardErc20Abi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"reward"`
 */
export const useWriteRewardErc20Reward = /*#__PURE__*/ createUseWriteContract({
  abi: rewardErc20Abi,
  functionName: 'reward',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"setReward"`
 */
export const useWriteRewardErc20SetReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardErc20Abi,
    functionName: 'setReward',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardErc20Abi}__
 */
export const useSimulateRewardErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: rewardErc20Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateRewardErc20Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardErc20Abi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"reward"`
 */
export const useSimulateRewardErc20Reward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardErc20Abi,
    functionName: 'reward',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardErc20Abi}__ and `functionName` set to `"setReward"`
 */
export const useSimulateRewardErc20SetReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardErc20Abi,
    functionName: 'setReward',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__
 */
export const useReadRockPaperScissorEntity =
  /*#__PURE__*/ createUseReadContract({ abi: rockPaperScissorEntityAbi });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"actions"`
 */
export const useReadRockPaperScissorEntityActions =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'actions',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"game"`
 */
export const useReadRockPaperScissorEntityGame =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'game',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"getAvailableActions"`
 */
export const useReadRockPaperScissorEntityGetAvailableActions =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'getAvailableActions',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"getAvailableKeys"`
 */
export const useReadRockPaperScissorEntityGetAvailableKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'getAvailableKeys',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"getPlayerAction"`
 */
export const useReadRockPaperScissorEntityGetPlayerAction =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'getPlayerAction',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"keys"`
 */
export const useReadRockPaperScissorEntityKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'keys',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__
 */
export const useWriteRockPaperScissorEntity =
  /*#__PURE__*/ createUseWriteContract({ abi: rockPaperScissorEntityAbi });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteRockPaperScissorEntityInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"setAvailableActions"`
 */
export const useWriteRockPaperScissorEntitySetAvailableActions =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'setAvailableActions',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"setPlayerAction"`
 */
export const useWriteRockPaperScissorEntitySetPlayerAction =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'setPlayerAction',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__
 */
export const useSimulateRockPaperScissorEntity =
  /*#__PURE__*/ createUseSimulateContract({ abi: rockPaperScissorEntityAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateRockPaperScissorEntityInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"setAvailableActions"`
 */
export const useSimulateRockPaperScissorEntitySetAvailableActions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'setAvailableActions',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `functionName` set to `"setPlayerAction"`
 */
export const useSimulateRockPaperScissorEntitySetPlayerAction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorEntityAbi,
    functionName: 'setPlayerAction',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__
 */
export const useWatchRockPaperScissorEntityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: rockPaperScissorEntityAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorEntityAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchRockPaperScissorEntityInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorEntityAbi,
    eventName: 'Initialized',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__
 */
export const useReadRockPaperScissors = /*#__PURE__*/ createUseReadContract({
  abi: rockPaperScissorsAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__ and `functionName` set to `"abis"`
 */
export const useReadRockPaperScissorsAbis = /*#__PURE__*/ createUseReadContract(
  { abi: rockPaperScissorsAbi, functionName: 'abis' }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__ and `functionName` set to `"functions"`
 */
export const useReadRockPaperScissorsFunctions =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsAbi,
    functionName: 'functions',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__ and `functionName` set to `"getSummary"`
 */
export const useReadRockPaperScissorsGetSummary =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsAbi,
    functionName: 'getSummary',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__ and `functionName` set to `"required"`
 */
export const useReadRockPaperScissorsRequired =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsAbi,
    functionName: 'required',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__
 */
export const useWriteRockPaperScissors = /*#__PURE__*/ createUseWriteContract({
  abi: rockPaperScissorsAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteRockPaperScissorsInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__ and `functionName` set to `"oneOnOne"`
 */
export const useWriteRockPaperScissorsOneOnOne =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsAbi,
    functionName: 'oneOnOne',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__
 */
export const useSimulateRockPaperScissors =
  /*#__PURE__*/ createUseSimulateContract({ abi: rockPaperScissorsAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateRockPaperScissorsInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsAbi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsAbi}__ and `functionName` set to `"oneOnOne"`
 */
export const useSimulateRockPaperScissorsOneOnOne =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsAbi,
    functionName: 'oneOnOne',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__
 */
export const useReadRockPaperScissorsGame = /*#__PURE__*/ createUseReadContract(
  { abi: rockPaperScissorsGameAbi }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"IS_TEST"`
 */
export const useReadRockPaperScissorsGameIsTest =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'IS_TEST',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"entityFactory"`
 */
export const useReadRockPaperScissorsGameEntityFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'entityFactory',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"excludeArtifacts"`
 */
export const useReadRockPaperScissorsGameExcludeArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'excludeArtifacts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"excludeContracts"`
 */
export const useReadRockPaperScissorsGameExcludeContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'excludeContracts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"excludeSenders"`
 */
export const useReadRockPaperScissorsGameExcludeSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'excludeSenders',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"factory"`
 */
export const useReadRockPaperScissorsGameFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'factory',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"failed"`
 */
export const useReadRockPaperScissorsGameFailed =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'failed',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"liveGame"`
 */
export const useReadRockPaperScissorsGameLiveGame =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'liveGame',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"registry"`
 */
export const useReadRockPaperScissorsGameRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'registry',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"targetArtifactSelectors"`
 */
export const useReadRockPaperScissorsGameTargetArtifactSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'targetArtifactSelectors',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"targetArtifacts"`
 */
export const useReadRockPaperScissorsGameTargetArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'targetArtifacts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"targetContracts"`
 */
export const useReadRockPaperScissorsGameTargetContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'targetContracts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"targetInterfaces"`
 */
export const useReadRockPaperScissorsGameTargetInterfaces =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'targetInterfaces',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"targetSelectors"`
 */
export const useReadRockPaperScissorsGameTargetSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'targetSelectors',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"targetSenders"`
 */
export const useReadRockPaperScissorsGameTargetSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'targetSenders',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__
 */
export const useWriteRockPaperScissorsGame =
  /*#__PURE__*/ createUseWriteContract({ abi: rockPaperScissorsGameAbi });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"clearParams"`
 */
export const useWriteRockPaperScissorsGameClearParams =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'clearParams',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"createFunctions"`
 */
export const useWriteRockPaperScissorsGameCreateFunctions =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'createFunctions',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"deployGame"`
 */
export const useWriteRockPaperScissorsGameDeployGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'deployGame',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"deployTavern"`
 */
export const useWriteRockPaperScissorsGameDeployTavern =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'deployTavern',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"loadModules"`
 */
export const useWriteRockPaperScissorsGameLoadModules =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'loadModules',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"setUp"`
 */
export const useWriteRockPaperScissorsGameSetUp =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'setUp',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"test_first_join"`
 */
export const useWriteRockPaperScissorsGameTestFirstJoin =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'test_first_join',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"test_second_lose"`
 */
export const useWriteRockPaperScissorsGameTestSecondLose =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'test_second_lose',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"test_second_tie"`
 */
export const useWriteRockPaperScissorsGameTestSecondTie =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'test_second_tie',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"test_second_win"`
 */
export const useWriteRockPaperScissorsGameTestSecondWin =
  /*#__PURE__*/ createUseWriteContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'test_second_win',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__
 */
export const useSimulateRockPaperScissorsGame =
  /*#__PURE__*/ createUseSimulateContract({ abi: rockPaperScissorsGameAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"clearParams"`
 */
export const useSimulateRockPaperScissorsGameClearParams =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'clearParams',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"createFunctions"`
 */
export const useSimulateRockPaperScissorsGameCreateFunctions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'createFunctions',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"deployGame"`
 */
export const useSimulateRockPaperScissorsGameDeployGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'deployGame',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"deployTavern"`
 */
export const useSimulateRockPaperScissorsGameDeployTavern =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'deployTavern',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"loadModules"`
 */
export const useSimulateRockPaperScissorsGameLoadModules =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'loadModules',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"setUp"`
 */
export const useSimulateRockPaperScissorsGameSetUp =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'setUp',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"test_first_join"`
 */
export const useSimulateRockPaperScissorsGameTestFirstJoin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'test_first_join',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"test_second_lose"`
 */
export const useSimulateRockPaperScissorsGameTestSecondLose =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'test_second_lose',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"test_second_tie"`
 */
export const useSimulateRockPaperScissorsGameTestSecondTie =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'test_second_tie',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `functionName` set to `"test_second_win"`
 */
export const useSimulateRockPaperScissorsGameTestSecondWin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rockPaperScissorsGameAbi,
    functionName: 'test_second_win',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__
 */
export const useWatchRockPaperScissorsGameEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: rockPaperScissorsGameAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log"`
 */
export const useWatchRockPaperScissorsGameLogEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_address"`
 */
export const useWatchRockPaperScissorsGameLogAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_address',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_array"`
 */
export const useWatchRockPaperScissorsGameLogArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_array',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_bytes"`
 */
export const useWatchRockPaperScissorsGameLogBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_bytes',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_bytes32"`
 */
export const useWatchRockPaperScissorsGameLogBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_bytes32',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_int"`
 */
export const useWatchRockPaperScissorsGameLogIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_address"`
 */
export const useWatchRockPaperScissorsGameLogNamedAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_address',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_array"`
 */
export const useWatchRockPaperScissorsGameLogNamedArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_array',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_bytes"`
 */
export const useWatchRockPaperScissorsGameLogNamedBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_bytes',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_bytes32"`
 */
export const useWatchRockPaperScissorsGameLogNamedBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_bytes32',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_decimal_int"`
 */
export const useWatchRockPaperScissorsGameLogNamedDecimalIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_decimal_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_decimal_uint"`
 */
export const useWatchRockPaperScissorsGameLogNamedDecimalUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_decimal_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_int"`
 */
export const useWatchRockPaperScissorsGameLogNamedIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_string"`
 */
export const useWatchRockPaperScissorsGameLogNamedStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_string',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_named_uint"`
 */
export const useWatchRockPaperScissorsGameLogNamedUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_named_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_string"`
 */
export const useWatchRockPaperScissorsGameLogStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_string',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"log_uint"`
 */
export const useWatchRockPaperScissorsGameLogUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'log_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rockPaperScissorsGameAbi}__ and `eventName` set to `"logs"`
 */
export const useWatchRockPaperScissorsGameLogsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rockPaperScissorsGameAbi,
    eventName: 'logs',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleMintableAbi}__
 */
export const useWriteSimpleMintable = /*#__PURE__*/ createUseWriteContract({
  abi: simpleMintableAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleMintableAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteSimpleMintableMint = /*#__PURE__*/ createUseWriteContract({
  abi: simpleMintableAbi,
  functionName: 'mint',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleMintableAbi}__
 */
export const useSimulateSimpleMintable =
  /*#__PURE__*/ createUseSimulateContract({ abi: simpleMintableAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleMintableAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateSimpleMintableMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleMintableAbi,
    functionName: 'mint',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleMintableErc20Abi}__
 */
export const useWriteSimpleMintableErc20 = /*#__PURE__*/ createUseWriteContract(
  { abi: simpleMintableErc20Abi }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleMintableErc20Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteSimpleMintableErc20Mint =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleMintableErc20Abi,
    functionName: 'mint',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleMintableErc20Abi}__
 */
export const useSimulateSimpleMintableErc20 =
  /*#__PURE__*/ createUseSimulateContract({ abi: simpleMintableErc20Abi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleMintableErc20Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateSimpleMintableErc20Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleMintableErc20Abi,
    functionName: 'mint',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__
 */
export const useReadTavernTest = /*#__PURE__*/ createUseReadContract({
  abi: tavernTestAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"IS_TEST"`
 */
export const useReadTavernTestIsTest = /*#__PURE__*/ createUseReadContract({
  abi: tavernTestAbi,
  functionName: 'IS_TEST',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"entityFactory"`
 */
export const useReadTavernTestEntityFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'entityFactory',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"excludeArtifacts"`
 */
export const useReadTavernTestExcludeArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'excludeArtifacts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"excludeContracts"`
 */
export const useReadTavernTestExcludeContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'excludeContracts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"excludeSenders"`
 */
export const useReadTavernTestExcludeSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'excludeSenders',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"factory"`
 */
export const useReadTavernTestFactory = /*#__PURE__*/ createUseReadContract({
  abi: tavernTestAbi,
  functionName: 'factory',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"failed"`
 */
export const useReadTavernTestFailed = /*#__PURE__*/ createUseReadContract({
  abi: tavernTestAbi,
  functionName: 'failed',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"liveGame"`
 */
export const useReadTavernTestLiveGame = /*#__PURE__*/ createUseReadContract({
  abi: tavernTestAbi,
  functionName: 'liveGame',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"registry"`
 */
export const useReadTavernTestRegistry = /*#__PURE__*/ createUseReadContract({
  abi: tavernTestAbi,
  functionName: 'registry',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"targetArtifactSelectors"`
 */
export const useReadTavernTestTargetArtifactSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'targetArtifactSelectors',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"targetArtifacts"`
 */
export const useReadTavernTestTargetArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'targetArtifacts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"targetContracts"`
 */
export const useReadTavernTestTargetContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'targetContracts',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"targetInterfaces"`
 */
export const useReadTavernTestTargetInterfaces =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'targetInterfaces',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"targetSelectors"`
 */
export const useReadTavernTestTargetSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'targetSelectors',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"targetSenders"`
 */
export const useReadTavernTestTargetSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: tavernTestAbi,
    functionName: 'targetSenders',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tavernTestAbi}__
 */
export const useWriteTavernTest = /*#__PURE__*/ createUseWriteContract({
  abi: tavernTestAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"clearParams"`
 */
export const useWriteTavernTestClearParams =
  /*#__PURE__*/ createUseWriteContract({
    abi: tavernTestAbi,
    functionName: 'clearParams',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"createFunctions"`
 */
export const useWriteTavernTestCreateFunctions =
  /*#__PURE__*/ createUseWriteContract({
    abi: tavernTestAbi,
    functionName: 'createFunctions',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"deployTavern"`
 */
export const useWriteTavernTestDeployTavern =
  /*#__PURE__*/ createUseWriteContract({
    abi: tavernTestAbi,
    functionName: 'deployTavern',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"loadModules"`
 */
export const useWriteTavernTestLoadModules =
  /*#__PURE__*/ createUseWriteContract({
    abi: tavernTestAbi,
    functionName: 'loadModules',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tavernTestAbi}__
 */
export const useSimulateTavernTest = /*#__PURE__*/ createUseSimulateContract({
  abi: tavernTestAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"clearParams"`
 */
export const useSimulateTavernTestClearParams =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tavernTestAbi,
    functionName: 'clearParams',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"createFunctions"`
 */
export const useSimulateTavernTestCreateFunctions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tavernTestAbi,
    functionName: 'createFunctions',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"deployTavern"`
 */
export const useSimulateTavernTestDeployTavern =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tavernTestAbi,
    functionName: 'deployTavern',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tavernTestAbi}__ and `functionName` set to `"loadModules"`
 */
export const useSimulateTavernTestLoadModules =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tavernTestAbi,
    functionName: 'loadModules',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__
 */
export const useWatchTavernTestEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: tavernTestAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log"`
 */
export const useWatchTavernTestLogEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_address"`
 */
export const useWatchTavernTestLogAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_address',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_array"`
 */
export const useWatchTavernTestLogArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_array',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_bytes"`
 */
export const useWatchTavernTestLogBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_bytes',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_bytes32"`
 */
export const useWatchTavernTestLogBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_bytes32',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_int"`
 */
export const useWatchTavernTestLogIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_address"`
 */
export const useWatchTavernTestLogNamedAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_address',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_array"`
 */
export const useWatchTavernTestLogNamedArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_array',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_bytes"`
 */
export const useWatchTavernTestLogNamedBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_bytes',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_bytes32"`
 */
export const useWatchTavernTestLogNamedBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_bytes32',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_decimal_int"`
 */
export const useWatchTavernTestLogNamedDecimalIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_decimal_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_decimal_uint"`
 */
export const useWatchTavernTestLogNamedDecimalUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_decimal_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_int"`
 */
export const useWatchTavernTestLogNamedIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_int',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_string"`
 */
export const useWatchTavernTestLogNamedStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_string',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_named_uint"`
 */
export const useWatchTavernTestLogNamedUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_named_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_string"`
 */
export const useWatchTavernTestLogStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_string',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"log_uint"`
 */
export const useWatchTavernTestLogUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'log_uint',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tavernTestAbi}__ and `eventName` set to `"logs"`
 */
export const useWatchTavernTestLogsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tavernTestAbi,
    eventName: 'logs',
  });
