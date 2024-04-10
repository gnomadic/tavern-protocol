// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IEntity} from './IEntity.sol';

abstract contract INumberEntity is IEntity {
  function getNumber(
    uint256 tokenId,
    string memory key
  ) external view virtual returns (uint256);

  function updateNumber(
    uint256 tokenId,
    string memory key,
    uint256 value
  ) external virtual;
}
