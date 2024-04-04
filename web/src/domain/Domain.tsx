export type Deployment = {
  chainellationAddress: Address;
  displayName: string;
  currency: string;
  decoAddress: Address;
  chain: string;
};

export type Address = `0x${string}` | undefined;
