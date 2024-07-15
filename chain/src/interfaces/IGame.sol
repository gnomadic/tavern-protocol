// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ComponentSummary} from '../components/interfaces/IComponent.sol';

interface IGame {
  function initialize(
    address gameFactory,
    address componentRegistry,
    address _gm,
    string calldata displayName,
    address entityFactory
  ) external;

  function createEntity(string memory name) external returns (address);
  function createFlow(string memory name, AddressKey[] memory funcs) external;

  function validateIsModule(address module) external view returns (bool);
  function getEntity(string memory key) external view returns (address);
  function addComponent(address component) external;
  function isGM(address account) external view returns (bool);
}

struct GameSummary {
  address game;
  address gm;
  string metadata;
  address[] components;
  ComponentSummary[] componentSummaries;
  AddressKey[] availableData;
  FlowKey[] flows;
}

struct FlowKey {
  string name;
  AddressKey[] values;
}

struct AddressKey {
  string name;
  address value;
}

struct UintKey {
  string name;
  uint256 value;
}

struct StringKey {
  string name;
  string value;
}

struct FlowParams {
  AddressKey[] addresses;
  UintKey[] uints;
  StringKey[] strings;
}
