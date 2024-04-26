// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import 'forge-std/console.sol';

contract Reward1155Entity is IEntity {
  string[] public keys;

  address nft;

  function initialize(address _game) external override {
    game = _game;
    keys.push('rewardAddress');
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
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
