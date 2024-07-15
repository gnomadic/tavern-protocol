// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import './interfaces/IEntity.sol';
import {console} from 'forge-std/console.sol';

contract Require1155Entity is IEntity {
  address public nft;
  uint256 public tokenId;
  bool public isTokenIDSet;
  uint256 public requiredBalance;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('require1155');
    requiredBalance = 1;
  }

  function setRequiredToken(address _nft, uint256 _tokenId) external onlyModule {
    nft = _nft;
    tokenId = _tokenId;
    isTokenIDSet = true;
  }

  function setRequiredToken(address _nft) external onlyModule {
    nft = _nft;
  }

  function setRequiredBalance(uint256 balance) external onlyModule {
    requiredBalance = balance;
  }

  function balanceOf(address player, uint256 token) external view onlyModule {
    SimpleMintable(nft).balanceOf(player, token);
  }

  function hasBalance(address player) external view onlyModule returns (bool) {
    return 
      SimpleMintable(nft).balanceOf(player, tokenId) >= requiredBalance;
  }
}

interface SimpleMintable {
  function balanceOf(
    address owner,
    uint256 tokenId
  ) external view returns (uint256);
}
