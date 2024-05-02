// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface INumberEntity {
  function getNumber(address owner, string memory key) external view returns (uint256);
}
