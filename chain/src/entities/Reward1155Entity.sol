// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import 'forge-std/console.sol';

contract Reward1155Entity is IEntity {

  address nft;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('rewardAddress');
  }



  function setReward(address _nft) external onlyModule {
    nft = _nft;
  }

  function sendReward(address player, uint256 token, uint256 amount) external onlyModule {
    SimpleMintable(nft).mint(player, token, amount);
  }
}

interface SimpleMintable {
  function mint(address to, uint256 tokenId, uint256 amount) external;
}
