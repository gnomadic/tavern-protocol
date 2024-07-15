// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {LibClone} from 'solady/utils/LibClone.sol';
import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';


contract EntityFactory {

  mapping(string => address) entities;

  function registerEntity(string memory name, address entityAt) external {
    entities[name] = entityAt;
  }

  function createEntity(
    string calldata _entityName
  ) external returns (address) {
    if (entities[_entityName] == address(0)) revert EntityNotFound();

    address entity = LibClone.clone(entities[_entityName]);

    emit EntityCreated(entity);

    return entity;
  }

  function getEntity(string calldata _entityName) external view returns (address) {
    return entities[_entityName];
  }

  error EntityNotFound();
  event EntityCreated(address entity);
}
