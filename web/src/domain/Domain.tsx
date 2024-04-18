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



// // {"game":"0xEACdAb1Cb337892009EE150Cf3F12A94Df8b4DF5","gm":"0x2273fFEd38ED040FBcd3e45Cd807594d27ebfAE3","displayName":"GM"}
// export function gameSummary(gameJson: any): GameSummary{
//    return {
//     gameAddress: gameJson["game"] as Address,
//     gm: gameJson["gm"] as Address,
//     displayName: gameJson["displayName"] as string
//    }
// }

export type ModuleSummary = {
  moduleAddress: Address;
  functions: string[];
  requiredProperties: string[];
  displayName: string;
}


// frames
export const QUERY_ACTION = "action";
export const QUERY_GAME = "game";
export const ACTION_HELLO = "hello"


export type FrameGameData  = {
  summary: GameSummary;
  
}