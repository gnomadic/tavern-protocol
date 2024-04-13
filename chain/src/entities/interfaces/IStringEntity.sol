// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IEntity} from './IEntity.sol';

abstract contract IStringEntity is IEntity {
  function getString(
    uint256 tokenId,
    string memory key
  ) external view virtual returns (string memory);

  function setString(
    uint256 tokenId,
    string memory key,
    string memory value
  ) external virtual;
}
