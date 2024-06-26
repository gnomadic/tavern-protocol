// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IGame} from '../../interfaces/IGame.sol';

abstract contract IComponent {
  string public metadata;

  constructor(string memory _metadata) {
    metadata = _metadata;
  }

  function updateMetadata(string memory _metadata) external {
    metadata = _metadata;
  }

  function initialize(address game) external virtual;
  function getSummary() external view virtual returns (ComponentSummary memory);

  modifier onlyGame(address game) {
    if (msg.sender != game) revert NotAuthorized();
    _;
  }

  modifier onlyGM(address game) {
    if (!IGame(game).isGM(msg.sender)) revert NotAuthorized();
    _;
  }

  error NotAuthorized();
}

struct ComponentSummary {
  address component;
  string metadata;
}
