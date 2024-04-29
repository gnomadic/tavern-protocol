// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGameFuncEntity {
  function getGameFuncParams(string memory key) external view returns (uint256);
}
