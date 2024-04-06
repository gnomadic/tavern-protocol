// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {PlayMintContext} from "./PlayMintContext.sol";

abstract contract INumberEntity is PlayMintContext{
    function getAvailableNumbers() external view virtual returns (string[] memory);
    function assertOwnership(uint256 tokenId, address player) external view virtual;
    function getNumber(uint256 tokenId, string memory key) external view virtual returns (uint256);
    function updateNumber(uint256 tokenId, string memory key, uint256 value) external virtual;
}
