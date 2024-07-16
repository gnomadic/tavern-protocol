// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Action, ISystem} from "./interfaces/ISystem.sol";
import {IHeroStats} from "./interfaces/IHeroStats.sol";
import {IPrefabLoader} from "./interfaces/IPrefabLoader.sol";
import {ICombatActions} from "./interfaces/ICombatActions.sol";

import {console} from "forge-std/console.sol";

struct MonsterPrefab {
    string[] numStatNames;
    uint256[] numStatValues;
    string[] stringStatNames;
    string[] stringStatValues;
    uint256[] combatActions;
}

contract MonsterStats is ISystem, IHeroStats, IPrefabLoader, ICombatActions {
    ICombatActions private combatActions;

    mapping(uint256 => MonsterPrefab) private monsterPrefabs;

    mapping(uint256 => mapping(string => uint256)) private numStats;
    string[] private numStatNames;

    mapping(uint256 => mapping(string => string)) private stringStats;
    string[] private stringStatNames;

    mapping(uint256 => uint256[]) private combatActionIds;

    // mapping(uint256 => uint256[]) private combatActions;

    // mapping(uint256 => Action[]) private actions;

    constructor(address reg, address _combatActions) ISystem(reg) {
        combatActions = ICombatActions(_combatActions);
    }

    function addMonster(
        uint256 id,
        string[] memory _numStatNames,
        uint256[] memory _numStatValues,
        string[] memory _stringStatNames,
        string[] memory _stringStatValues,
        uint256[] memory _combatActions
    ) public onlyAdmin {
        monsterPrefabs[id] = MonsterPrefab(
            _numStatNames,
            _numStatValues,
            _stringStatNames,
            _stringStatValues,
            _combatActions
        );

        // for (uint256 i = 0; i < _numStatNames.length; i++) {
        //     numStats[id][_numStatNames[i]] = _numStatValues[i];
        //     numStatNames.push(_numStatNames[i]);
        // }

        // for (uint256 i = 0; i < _stringStatNames.length; i++) {
        //     stringStats[id][_stringStatNames[i]] = _stringStatValues[i];
        //     stringStatNames.push(_stringStatNames[i]);
        // }
    }

    function loadFromPrefab(
        uint256 tokenId,
        uint256 monsterId
    ) public onlySystem {
        MonsterPrefab memory monster = monsterPrefabs[monsterId];

        for (uint256 i = 0; i < monster.numStatNames.length; i++) {
            numStats[tokenId][monster.numStatNames[i]] = monster.numStatValues[
                i
            ];
        }

        for (uint256 i = 0; i < monster.stringStatNames.length; i++) {
            stringStats[tokenId][monster.stringStatNames[i]] = monster
                .stringStatValues[i];
        }

        combatActionIds[tokenId] = monster.combatActions;
        // console.log("loaded monster: ", tokenId, monsterId);
    }

    function getPrefab(uint256 id) public view returns (MonsterPrefab memory) {
        return monsterPrefabs[id];
    }

    function setNumStat(
        uint256 id,
        string memory stat,
        uint256 value
    ) external onlySystem {
        // console.log("monsterstats.setNumStat", id, stat, value);
        if (numStats[id][stat] == 0) {
            numStatNames.push(stat);
        }
        numStats[id][stat] = value;
    }

      function addNumStat(uint256 id, string memory stat, uint256 value) external{
                if (numStats[id][stat] == 0) {
            numStatNames.push(stat);
        }
        numStats[id][stat] += value;
      }


    function setStringStat(
        uint256 id,
        string memory stat,
        string memory value
    ) external onlySystem {
        if (keccak256(bytes(stringStats[id][stat])) == keccak256(bytes(""))) {
            stringStatNames.push(stat);
        }
        stringStats[id][stat] = value;
    }

    function getNumStat(
        uint256 id,
        string memory stat
    ) public view returns (uint256) {
        return numStats[id][stat];
    }

    function getStringStat(
        uint256 id,
        string memory stat
    ) public view returns (string memory) {
        return stringStats[id][stat];
    }

    function getNumStatNames() public view returns (string[] memory) {
        return numStatNames;
    }

    function getStringStatNames() public view returns (string[] memory) {
        return stringStatNames;
    }

    function getAllNumStats(uint256 id) public view returns (uint256[] memory) {
        uint256[] memory stats = new uint256[](numStatNames.length);
        for (uint256 i = 0; i < numStatNames.length; i++) {
            stats[i] = numStats[id][numStatNames[i]];
        }
        return stats;
    }

    function getAllStringStats(
        uint256 id
    ) public view returns (string[] memory) {
        string[] memory stats = new string[](stringStatNames.length);
        for (uint256 i = 0; i < stringStatNames.length; i++) {
            stats[i] = stringStats[id][stringStatNames[i]];
        }
        return stats;
    }

    function getCombatActionNumStat(
        uint256 id,
        string memory stat
    ) external view returns (uint256) {
        return combatActions.getCombatActionNumStat(id, stat);
    }

    function getCombatActions(
        uint256 tokenId
    ) external view returns (Action[] memory) {
        uint256[] memory actionIds = combatActionIds[tokenId];
        Action[] memory actions = new Action[](actionIds.length);
        for (uint256 i = 0; i < actionIds.length; i++) {
            actions[i] = combatActions.getFromRepo(actionIds[i]);
        }
        return actions;
    }

    function getFromRepo(
        uint256 actionId
    ) external view returns (Action memory) {
        return combatActions.getFromRepo(actionId);
    }
}
