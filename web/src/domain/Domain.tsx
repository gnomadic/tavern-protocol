import { Address } from "viem";

export type Deployment = {
  gameFactory: Address;
  displayName: string;
  currency: string;
  decoAddress: Address;
  chain: string;
};

// export type Address = `0x${string}` | undefined;
