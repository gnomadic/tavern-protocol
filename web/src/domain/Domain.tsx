import { Address } from "viem";

export type Deployment = {
  gameFactory: Address;
  entityFactory: Address;
  d7: Address;
  moduleRegistry: Address;
  displayName: string;
  currency: string;
  chain: string;
  chainId: string;
};

export type GameSummary = {
  game: Address;
  gm: Address;
  displayName: string;
  availableFunctions: readonly AddressKey[];
  availableData: readonly AddressKey[];
}

export type AddressKey = {
  Address: Address;
  Key: string;
}

export type Position = {
  x: number;
  player: Address;

}
export type ComponentSummary = {
  component: Address;
  functions: readonly string[];
  required: readonly string[];
  displayName: string;
}


// frames
export const QUERY_ACTION = "action";
export const QUERY_GAME = "game";
export const ACTION_HELLO = "hello"


export type FrameGameData = {
  summary: GameSummary;

}

export type GameFuncAddress = {
  name: string;
  value: Address;
}

export type GameFuncUint = {
  name: string;
  value: bigint;
}

export type GameFuncString = {
  name: string;
  value: string;
}

export type GameFuncParams = {
  addresses: readonly GameFuncAddress[];
  uints: readonly GameFuncUint[];
  strings: readonly GameFuncString[];
}