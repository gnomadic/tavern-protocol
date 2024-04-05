import { Address } from "viem";

export type Deployment = {
  gameFactory: Address;
  d20: Address;
  moduleRegistry: Address;
  displayName: string;
  currency: string;
  chain: string;
};

// export type Address = `0x${string}` | undefined;
