// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import 'forge-std/console.sol';

contract Reward20Entity is IEntity {
  address public token;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('rewardAddress');
  }

  function setReward(address _token) external onlyModule {
    token = _token;
  }

  function sendReward(
    address player,
    uint256 amount
  ) external onlyModule {
    if (token == address(0)) {
      console.log('No token set');
      return;
    }else{
      console.log('sending token');
    SimpleMintableERC20(token).mint(player, amount);
    }
  }

}

interface SimpleMintableERC20 {
  function mint(address to, uint256 amount) external;
}
