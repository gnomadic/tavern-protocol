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

contract HeroStats is ISystem, IHeroStats, IPrefabLoader {
    
    mapping(uint256 => mapping(string => uint256)) private numStats;
    string[] private numStatNames;

    mapping(uint256 => mapping(string => string)) private stringStats;
    string[] private stringStatNames;

    mapping(uint256 => HeroPrefab) private prefabs;

    constructor(address reg) ISystem(reg) {}

    function addPrefab(
        uint256 id,
        string memory name,
        string[] memory _numStatNames,
        uint256[] memory _numStatValues,
        string[] memory _stringStatNames,
        string[] memory _stringStatValues
    ) public onlyAdmin {
        prefabs[id] = HeroPrefab(
            id,
            name,
            _numStatNames,
            _numStatValues,
            _stringStatNames,
            _stringStatValues
        );
    }

    function loadFromPrefab(
        uint256 tokenId,
        uint256 prefabId
    ) external onlySystem {
        HeroPrefab memory prefab = prefabs[prefabId];
        if (prefab.id == 0) {
            revert InvalidPrefab();
        }
        for (uint256 i = 0; i < prefab.numStatNames.length; i++) {
            numStats[tokenId][prefab.numStatNames[i]] = prefab.numStatValues[i];
            numStatNames.push(prefab.numStatNames[i]);
        }

        for (uint256 i = 0; i < prefab.stringStatNames.length; i++) {
            stringStats[tokenId][prefab.stringStatNames[i]] = prefab
                .stringStatValues[i];
            stringStatNames.push(prefab.stringStatNames[i]);
        }
    }

    function setNumStat(
        uint256 id,
        string memory stat,
        uint256 value
    ) external onlySystem {
        if (numStats[id][stat] == 0) {
            numStatNames.push(stat);
        }
        console.log(
            "Setting stat %s to %s",
            stat,
            value
        );
        numStats[id][stat] = value;
    }

    function addNumStat(
        uint256 id,
        string memory stat,
        uint256 value
    ) external onlySystem {
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

    function getPrefab(
        uint256 prefabId
    ) public view returns (HeroPrefab memory) {
        return prefabs[prefabId];
    }

    error InvalidPrefab();
}
