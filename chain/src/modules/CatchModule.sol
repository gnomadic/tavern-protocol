// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IModule, ModuleSummary} from './interfaces/IModule.sol';


contract CatchModule is IModule{
  address public game;

  function initialize(address _game) external {
    game = _game;
  }

  function getSummary() external view returns (ModuleSummary memory) {
    return ModuleSummary(address(this), new string[](0), new string[](0), 'Catch');
  }
}
