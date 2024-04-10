// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IEntityFactory {
  function createEntity(
    address _game,
    string calldata _entityName
  ) external returns (address);
}
