// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface INumberEntity {
  function getNumber(string memory key) external view returns (uint256);
}
