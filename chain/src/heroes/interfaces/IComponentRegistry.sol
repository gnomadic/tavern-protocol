// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IComponentRegistry {
  function isRegistered(address system) external returns (bool);
}

