// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Action, ISystem} from "./interfaces/ISystem.sol";
import {IHeroStats} from "./interfaces/IHeroStats.sol";
import {IPrefabLoader} from "./interfaces/IPrefabLoader.sol";
import {ICombatActions} from "./interfaces/ICombatActions.sol";

struct CombatPrefab {
    uint256[] combatActions;
}

contract CombatActions is ISystem, IPrefabLoader, ICombatActions {
    constructor(address reg) ISystem(reg) {}

    // token id => available combat ids
    mapping(uint256 => uint256[]) private combatActions;

    // combat id => Action
    mapping(uint256 => Action) private combatActionRepo;
    mapping(uint256 => mapping(string => uint256)) private numStats;
    string[] private numStatNames;

    //prefab id => combat ids
    mapping(uint256 => CombatPrefab) private combatPrefabs;


    // create a new combat action
    function registerCombatAction(
        Action memory action
    ) external onlyAdmin {
        uint256 actionId = action.id;
        if (combatActionRepo[actionId].id != 0) {
            revert InvalidPrefab();
        }
        combatActionRepo[actionId] = (action);
        for (uint256 i = 0; i < action.numStatNames.length; i++) {
            numStats[actionId][action.numStatNames[i]] = action.numStatValues[i];
            numStatNames.push(action.numStatNames[i]);
        }
    }

    // give a player a new combat action
    function addCombatAction(
        uint256 tokenId,
        uint256 actionId
    ) external onlySystem {
        combatActions[tokenId].push(actionId);
    }

    // get all combat actions a player has
    function getCombatActions(
        uint256 tokenId
    ) public view returns (Action[] memory) {
        uint256[] memory actionIds = combatActions[tokenId];
        Action[] memory actions = new Action[](actionIds.length);
        for (uint256 i = 0; i < actionIds.length; i++) {
            actions[i] = combatActionRepo[actionIds[i]];
        }
        return actions;
    }

    function getCombatPrefab(
        uint256 prefabId
    ) public view returns (CombatPrefab memory) {
        return combatPrefabs[prefabId];
    }

    function addCombatPrefab(
        uint256 prefabId,
        uint256[] memory actionIds
    ) external onlyAdmin {
        combatPrefabs[prefabId] = CombatPrefab(actionIds);
    }
    

    function loadFromPrefab(
        uint256 tokenId,
        uint256 prefabId
    ) external onlySystem {
        CombatPrefab memory prefab = combatPrefabs[prefabId];
        if (prefab.combatActions.length == 0) {
            revert InvalidPrefab();
        }
        for (uint256 i = 0; i < prefab.combatActions.length; i++) {
            combatActions[tokenId].push(prefab.combatActions[i]);
        }
    }

    function getFromRepo(
        uint256 actionId
    ) public view returns (Action memory) {
        return combatActionRepo[actionId];
    }

    function getCombatActionNumStat(
        uint256 id,
        string memory stat
    ) public view returns (uint256) {
        return numStats[id][stat];
    }

    error InvalidPrefab();
}
