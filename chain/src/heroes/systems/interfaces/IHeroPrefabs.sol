// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IHeroPrefabs {
    function getPrefabId(string memory name) external view returns (uint256);

    function getNumStat(
        uint256 id,
        string memory stat
    ) external view returns (uint256);

    function getStringStat(
        uint256 id,
        string memory stat
    ) external view returns (string memory);

    function getNumStatNames() external view returns (string[] memory);

    function getStringStatNames() external view returns (string[] memory);

    function getAllNumStats(
        uint256 id
    ) external view returns (uint256[] memory);

    function getAllStringStats(
        uint256 id
    ) external view returns (string[] memory);

    function getCombatActions(
        uint256 id
    ) external view returns (uint256[] memory);
}
