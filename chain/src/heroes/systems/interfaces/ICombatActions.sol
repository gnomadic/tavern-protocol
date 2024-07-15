// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Action} from "./ISystem.sol";

interface ICombatActions {
    function getCombatActionNumStat(
        uint256 id,
        string memory stat
    ) external view returns (uint256);

    function getCombatActions(
        uint256 tokenId
    ) external view returns (Action[] memory);

    function getFromRepo(
        uint256 actionId
    ) external view returns (Action memory);
}
