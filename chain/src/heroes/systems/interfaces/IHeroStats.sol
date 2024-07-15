// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IHeroStats {
    function setNumStat(uint256 id, string memory stat, uint256 value) external;
    function setStringStat(
        uint256 id,
        string memory stat,
        string memory value
    ) external;

    function getNumStat(
        uint256 id,
        string memory stat
    ) external view returns (uint256);
}


