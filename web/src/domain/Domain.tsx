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
  availableFunctions: AddressKey[];
  availableData: AddressKey[];
}

export type AddressKey = {
  Address: Address;
  Key: string;
}

export type Position ={
  x: number;
  player: Address;

}
export type ModuleSummary = {
  module: Address;
  functions: string[];
  required: string[];
  displayName: string;
}


// frames
export const QUERY_ACTION = "action";
export const QUERY_GAME = "game";
export const ACTION_HELLO = "hello"


export type FrameGameData  = {
  summary: GameSummary;
  
}