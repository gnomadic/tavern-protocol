/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  QueueSession,
  QueueSessionInterface,
} from "../../../src/components/QueueSession";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "queueSize",
        type: "uint256",
      },
    ],
    name: "JoinedQueue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player2",
        type: "address",
      },
    ],
    name: "MatchMade",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "abis",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "functions",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IGame",
        name: "game",
        type: "address",
      },
    ],
    name: "getPlayerCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSummary",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "component",
            type: "address",
          },
          {
            internalType: "string[]",
            name: "functions",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "abis",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "required",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "displayName",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        internalType: "struct ComponentSummary",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "game",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "executor",
        type: "address",
      },
      {
        internalType: "address",
        name: "gameAddress",
        type: "address",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "required",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "executor",
        type: "address",
      },
      {
        internalType: "address",
        name: "gameAddress",
        type: "address",
      },
    ],
    name: "setMatchOrWait",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260405180604001604052806040518060400160405280600c81526020017f706c61796572506172616d73000000000000000000000000000000000000000081525081526020016040518060400160405280600a81526020017f6e657874506c6179657200000000000000000000000000000000000000000000815250815250600090600262000095929190620001ce565b5060405180604001604052806040518060400160405280600881526020017f6a6f696e47616d6500000000000000000000000000000000000000000000000081525081526020016040518060400160405280600e81526020017f7365744d617463684f7257616974000000000000000000000000000000000000815250815250600190600262000127929190620001ce565b5060405180604001604052806040518060400160405280601981526020017f6a6f696e47616d6528616464726573732c61646472657373290000000000000081525081526020016040518060400160405280601f81526020017f7365744d617463684f725761697428616464726573732c6164647265737329008152508152506002906002620001b9929190620001ce565b50348015620001c757600080fd5b506200061c565b8280548282559060005260206000209081019282156200021b579160200282015b828111156200021a57825182908162000209919062000535565b5091602001919060010190620001ef565b5b5090506200022a91906200022e565b5090565b5b8082111562000252576000818162000248919062000256565b506001016200022f565b5090565b508054620002649062000324565b6000825580601f1062000278575062000299565b601f0160209004906000526020600020908101906200029891906200029c565b5b50565b5b80821115620002b75760008160009055506001016200029d565b5090565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200033d57607f821691505b602082108103620003535762000352620002f5565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003bd7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200037e565b620003c986836200037e565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000416620004106200040a84620003e1565b620003eb565b620003e1565b9050919050565b6000819050919050565b6200043283620003f5565b6200044a62000441826200041d565b8484546200038b565b825550505050565b600090565b6200046162000452565b6200046e81848462000427565b505050565b5b8181101562000496576200048a60008262000457565b60018101905062000474565b5050565b601f821115620004e557620004af8162000359565b620004ba846200036e565b81016020851015620004ca578190505b620004e2620004d9856200036e565b83018262000473565b50505b505050565b600082821c905092915050565b60006200050a60001984600802620004ea565b1980831691505092915050565b6000620005258383620004f7565b9150826002028217905092915050565b6200054082620002bb565b67ffffffffffffffff8111156200055c576200055b620002c6565b5b62000568825462000324565b620005758282856200049a565b600060209050601f831160018114620005ad576000841562000598578287015190505b620005a4858262000517565b86555062000614565b601f198416620005bd8662000359565b60005b82811015620005e757848901518255600182019150602085019450602081019050620005c0565b8683101562000607578489015162000603601f891682620004f7565b8355505b6001600288020188555050505b505050505050565b61195d806200062c6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806346d21dfe1161005b57806346d21dfe1461012757806393dae5eb14610157578063c4d66de814610173578063eac0bd901461018f57610088565b80631b73f8301461008d5780633e4acdcc146100bd5780634051ddac146100d9578063467e4a2f146100f7575b600080fd5b6100a760048036038101906100a2919061109e565b6101bf565b6040516100b4919061115b565b60405180910390f35b6100d760048036038101906100d291906111db565b61026b565b005b6100e161067b565b6040516100ee91906113db565b60405180910390f35b610111600480360381019061010c919061143b565b61098b565b60405161011e9190611477565b60405180910390f35b610141600480360381019061013c919061109e565b610a7a565b60405161014e919061115b565b60405180910390f35b610171600480360381019061016c91906111db565b610b26565b005b61018d60048036038101906101889190611492565b610e2b565b005b6101a960048036038101906101a4919061109e565b610ea9565b6040516101b6919061115b565b60405180910390f35b600081815481106101cf57600080fd5b9060005260206000200160009150905080546101ea906114ee565b80601f0160208091040260200160405190810160405280929190818152602001828054610216906114ee565b80156102635780601f1061023857610100808354040283529160200191610263565b820191906000526020600020905b81548152906001019060200180831161024657829003601f168201915b505050505081565b600081905060008173ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b81526004016102a99061156b565b602060405180830381865afa1580156102c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ea91906115a0565b905060008173ffffffffffffffffffffffffffffffffffffffff1663ce348c6f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610339573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035d91906115e2565b036103b1576103a06040518060400160405280600d81526020017f6a6f696e696e6720717565756500000000000000000000000000000000000000815250610f55565b6103aa8484610b26565b5050610677565b60008273ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b81526004016103ea9061165b565b602060405180830381865afa158015610407573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042b91906115a0565b905060008173ffffffffffffffffffffffffffffffffffffffff1663313cf08e876040518263ffffffff1660e01b815260040161046891906116d6565b602060405180830381865afa158015610485573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a991906115a0565b905060008373ffffffffffffffffffffffffffffffffffffffff166304a936056040518163ffffffff1660e01b81526004016020604051808303816000875af11580156104fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051e91906115a0565b905061055e6040518060400160405280601a81526020017f73657474696e6720706c61796572206f6e6520616e642074776f000000000000815250610f55565b8273ffffffffffffffffffffffffffffffffffffffff16631d4f229b88846040518363ffffffff1660e01b8152600401610599929190611750565b600060405180830381600087803b1580156105b357600080fd5b505af11580156105c7573d6000803e3d6000fd5b505050508273ffffffffffffffffffffffffffffffffffffffff16631d4f229b88836040518363ffffffff1660e01b81526004016106069291906117d8565b600060405180830381600087803b15801561062057600080fd5b505af1158015610634573d6000803e3d6000fd5b505050507fa1ddd412b0fb81f952dd7bfe7de90b060401a58be3c29e323faa99a58e45a3ba8282604051610669929190611814565b60405180910390a150505050505b5050565b610683611017565b6040518060c001604052803073ffffffffffffffffffffffffffffffffffffffff1681526020016001805480602002602001604051908101604052809291908181526020016000905b828210156107785783829060005260206000200180546106eb906114ee565b80601f0160208091040260200160405190810160405280929190818152602001828054610717906114ee565b80156107645780601f1061073957610100808354040283529160200191610764565b820191906000526020600020905b81548152906001019060200180831161074757829003601f168201915b5050505050815260200190600101906106cc565b5050505081526020016002805480602002602001604051908101604052809291908181526020016000905b8282101561084f5783829060005260206000200180546107c2906114ee565b80601f01602080910402602001604051908101604052809291908181526020018280546107ee906114ee565b801561083b5780601f106108105761010080835404028352916020019161083b565b820191906000526020600020905b81548152906001019060200180831161081e57829003601f168201915b5050505050815260200190600101906107a3565b5050505081526020016000805480602002602001604051908101604052809291908181526020016000905b82821015610926578382906000526020600020018054610899906114ee565b80601f01602080910402602001604051908101604052809291908181526020018280546108c5906114ee565b80156109125780601f106108e757610100808354040283529160200191610912565b820191906000526020600020905b8154815290600101906020018083116108f557829003601f168201915b50505050508152602001906001019061087a565b5050505081526020016040518060400160405280600d81526020017f51756575652053657373696f6e0000000000000000000000000000000000000081525081526020016040518060600160405280603a81526020016118ee603a9139815250905090565b60008173ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b81526004016109c49061156b565b602060405180830381865afa1580156109e1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0591906115a0565b73ffffffffffffffffffffffffffffffffffffffff1663ce348c6f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a4f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7391906115e2565b9050919050565b60028181548110610a8a57600080fd5b906000526020600020016000915090508054610aa5906114ee565b80601f0160208091040260200160405190810160405280929190818152602001828054610ad1906114ee565b8015610b1e5780601f10610af357610100808354040283529160200191610b1e565b820191906000526020600020905b815481529060010190602001808311610b0157829003601f168201915b505050505081565b60008082905060008173ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b8152600401610b659061165b565b602060405180830381865afa158015610b82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba691906115a0565b90508073ffffffffffffffffffffffffffffffffffffffff1663313cf08e866040518263ffffffff1660e01b8152600401610be191906116d6565b602060405180830381865afa158015610bfe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2291906115a0565b92508173ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b8152600401610c5b9061156b565b602060405180830381865afa158015610c78573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9c91906115a0565b73ffffffffffffffffffffffffffffffffffffffff16638f807f6b846040518263ffffffff1660e01b8152600401610cd4919061183d565b600060405180830381600087803b158015610cee57600080fd5b505af1158015610d02573d6000803e3d6000fd5b505050507f2a0cf68fb8eff8bff9b991c78bb921b9214ce5cc99496b8ac04885ff0e37ae23838373ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b8152600401610d5f9061156b565b602060405180830381865afa158015610d7c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da091906115a0565b73ffffffffffffffffffffffffffffffffffffffff1663ce348c6f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610dea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0e91906115e2565b604051610e1c929190611858565b60405180910390a15050505050565b8073ffffffffffffffffffffffffffffffffffffffff1663a343aec16040518163ffffffff1660e01b8152600401610e62906118cd565b6020604051808303816000875af1158015610e81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea591906115a0565b5050565b60018181548110610eb957600080fd5b906000526020600020016000915090508054610ed4906114ee565b80601f0160208091040260200160405190810160405280929190818152602001828054610f00906114ee565b8015610f4d5780601f10610f2257610100808354040283529160200191610f4d565b820191906000526020600020905b815481529060010190602001808311610f3057829003601f168201915b505050505081565b610feb81604051602401610f69919061115b565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610fee565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6040518060c00160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081526020016060815260200160608152602001606081525090565b600080fd5b6000819050919050565b61107b81611068565b811461108657600080fd5b50565b60008135905061109881611072565b92915050565b6000602082840312156110b4576110b3611063565b5b60006110c284828501611089565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156111055780820151818401526020810190506110ea565b60008484015250505050565b6000601f19601f8301169050919050565b600061112d826110cb565b61113781856110d6565b93506111478185602086016110e7565b61115081611111565b840191505092915050565b600060208201905081810360008301526111758184611122565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006111a88261117d565b9050919050565b6111b88161119d565b81146111c357600080fd5b50565b6000813590506111d5816111af565b92915050565b600080604083850312156111f2576111f1611063565b5b6000611200858286016111c6565b9250506020611211858286016111c6565b9150509250929050565b6112248161119d565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600082825260208201905092915050565b6000611272826110cb565b61127c8185611256565b935061128c8185602086016110e7565b61129581611111565b840191505092915050565b60006112ac8383611267565b905092915050565b6000602082019050919050565b60006112cc8261122a565b6112d68185611235565b9350836020820285016112e885611246565b8060005b85811015611324578484038952815161130585826112a0565b9450611310836112b4565b925060208a019950506001810190506112ec565b50829750879550505050505092915050565b600060c08301600083015161134e600086018261121b565b506020830151848203602086015261136682826112c1565b9150506040830151848203604086015261138082826112c1565b9150506060830151848203606086015261139a82826112c1565b915050608083015184820360808601526113b48282611267565b91505060a083015184820360a08601526113ce8282611267565b9150508091505092915050565b600060208201905081810360008301526113f58184611336565b905092915050565b60006114088261119d565b9050919050565b611418816113fd565b811461142357600080fd5b50565b6000813590506114358161140f565b92915050565b60006020828403121561145157611450611063565b5b600061145f84828501611426565b91505092915050565b61147181611068565b82525050565b600060208201905061148c6000830184611468565b92915050565b6000602082840312156114a8576114a7611063565b5b60006114b6848285016111c6565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061150657607f821691505b602082108103611519576115186114bf565b5b50919050565b7f6e657874506c6179657200000000000000000000000000000000000000000000600082015250565b6000611555600a836110d6565b91506115608261151f565b602082019050919050565b6000602082019050818103600083015261158481611548565b9050919050565b60008151905061159a816111af565b92915050565b6000602082840312156115b6576115b5611063565b5b60006115c48482850161158b565b91505092915050565b6000815190506115dc81611072565b92915050565b6000602082840312156115f8576115f7611063565b5b6000611606848285016115cd565b91505092915050565b7f706c61796572506172616d730000000000000000000000000000000000000000600082015250565b6000611645600c836110d6565b91506116508261160f565b602082019050919050565b6000602082019050818103600083015261167481611638565b9050919050565b6116848161119d565b82525050565b7f706c617965720000000000000000000000000000000000000000000000000000600082015250565b60006116c06006836110d6565b91506116cb8261168a565b602082019050919050565b60006040820190506116eb600083018461167b565b81810360208301526116fc816116b3565b905092915050565b7f706c617965723100000000000000000000000000000000000000000000000000600082015250565b600061173a6007836110d6565b915061174582611704565b602082019050919050565b6000606082019050611765600083018561167b565b81810360208301526117768161172d565b9050611785604083018461167b565b9392505050565b7f706c617965723200000000000000000000000000000000000000000000000000600082015250565b60006117c26007836110d6565b91506117cd8261178c565b602082019050919050565b60006060820190506117ed600083018561167b565b81810360208301526117fe816117b5565b905061180d604083018461167b565b9392505050565b6000604082019050611829600083018561167b565b611836602083018461167b565b9392505050565b6000602082019050611852600083018461167b565b92915050565b600060408201905061186d600083018561167b565b61187a6020830184611468565b9392505050565b7f517565756553657373696f6e456e746974790000000000000000000000000000600082015250565b60006118b76012836110d6565b91506118c282611881565b602082019050919050565b600060208201905081810360008301526118e6816118aa565b905091905056fe416c6c6f7720706c617965727320746f206a6f696e206120717565756520616e64206d617463682077697468206f7468657220706c6179657273a26469706673582212206cb2111d453ca6bfcade637b1a1d9be9b3cce4e303098878b7b2e3e452de420864736f6c63430008180033";

type QueueSessionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: QueueSessionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class QueueSession__factory extends ContractFactory {
  constructor(...args: QueueSessionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      QueueSession & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): QueueSession__factory {
    return super.connect(runner) as QueueSession__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QueueSessionInterface {
    return new Interface(_abi) as QueueSessionInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): QueueSession {
    return new Contract(address, _abi, runner) as unknown as QueueSession;
  }
}
