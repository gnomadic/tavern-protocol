import { Address } from "viem";

export type Deployment = {
  gameFactory: Address;
  d20: Address;
  moduleRegistry: Address;
  displayName: string;
  currency: string;
  chain: string;
};

export type GameSummary = {
  gameAddress: Address;
  gm: Address;
  displayName: string;
}

export type ModuleSummary = {
  moduleAddress: Address;
  functions: string[];
  requiredProperties: string[];
  displayName: string;
}