import { Address } from "viem";

export type Deployment = {
  gameFactory: Address;
  d7: Address;
  componentRegistry: Address;
  displayName: string;
  currency: string;
  chain: string;
  chainId: string;
  scan: string;
  rpsGame: Address;
  rpsComponent: Address;
  queueComponent: Address;
}

export type GameSummary = {
  game: Address;
  gm: Address;
  metadata: string;
  // TODO clean this up
  displayName: string;
  availableFunctions: readonly AddressKey[];
  availableData: readonly AddressKey[];
}

export type AddressKey = {
  name: string;
  value: Address;
}

export type UintKey = {
  name: string;
  value: bigint;
}

export type StringKey = {
  name: string;
  value: string;
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

export type GameFuncParams = {
  addresses: readonly AddressKey[];
  uints: readonly UintKey[];
  strings: readonly StringKey[];
}

export type BatchComponentMetadata = {
  addresses: Address;
  components: ComponentMetadata[];

}


export type ComponentMetadata = {
  name: string;
  description: Address;
  gameFunctions: ComponentMetadataFunction[];
  configFunctions: ComponentMetadataFunction[];
}

export type ComponentMetadataFunction = {
  name: string;
  description: string;
  abi: string;
  requires: string[];
  creates: string[];
  emits: string[];
}

export type GameMetadata = {
  name: string;
  description: Address;
  gameUrl: string;
}
