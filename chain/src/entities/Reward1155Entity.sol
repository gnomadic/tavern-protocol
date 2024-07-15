// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import './interfaces/IEntity.sol';
import {console} from 'forge-std/console.sol';

contract Reward1155Entity is IEntity {
  address public nft;
  uint256 public tokenId;
  bool public isTokenIDSet;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('reward1155');
  }

  function setReward(address _nft, uint256 _tokenId) external onlyModule {
    nft = _nft;
    tokenId = _tokenId;
    isTokenIDSet = true;
  }

  function setReward(address _nft) external onlyModule {
    nft = _nft;
  }

  function sendReward(
    address player,
    uint256 token,
    uint256 amount
  ) external onlyModule {
    SimpleMintable(nft).mint(player, token, amount);
  }

  function sendReward(address player, uint256 amount) external onlyModule {
    SimpleMintable(nft).mint(player, tokenId, amount);
  }
}

interface SimpleMintable {
  function mint(address to, uint256 tokenId, uint256 amount) external;
}
