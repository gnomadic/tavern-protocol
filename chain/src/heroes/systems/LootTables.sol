// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Action, ISystem} from "./interfaces/ISystem.sol";
import {IHeroStats} from "./interfaces/IHeroStats.sol";
import {IPrefabLoader} from "./interfaces/IPrefabLoader.sol";

import {console} from "forge-std/console.sol";

struct HeroPrefab {
    uint256 id;
    string name;
    string[] numStatNames;
    uint256[] numStatValues;
    string[] stringStatNames;
    string[] stringStatValues;
}

contract LootTables is ISystem {

    // loot Id to weight
    mapping(uint256 => uint8) public shares;
    // loot table name to ids in the table
    mapping(string => uint256[]) private lootTables;

    constructor(address reg) ISystem(reg) {}
}
