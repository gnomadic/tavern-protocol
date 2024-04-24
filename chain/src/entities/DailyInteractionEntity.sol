// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

interface IERC721 {
  function balanceOf(address _owner) external view returns (uint256);
}

// This is a terribly ineffecient Unoptimized Number Entity for 721s.  It is just a starting point.
contract DailyInteractionEntity {
  // ok so this contract will
  // 1. have an nft contract
  // 2. store state as numbers and strings
  // 3. expose getters and setters for the state to modules only if the requestor holds the nft
  // 4. report what state is avaialable

  IERC721 public nft;

  mapping(uint256 => mapping(string => uint256)) private numbers;
  string[] public numberKeys;

  function getNumber(
    uint256 tokenId,
    string memory key
  ) external view owned returns (uint256) {
    return numbers[tokenId][key];
  }

  function updateNumber(
    uint256 tokenId,
    string memory key,
    uint256 value
  ) external {
    numbers[tokenId][key] = value;
  }

  // TODO right now this is created by the gamefactory, not the game but that could be changed
  // TODO honeslty might not need this because the Game could just call update with 0?
  function createNumber(string memory key) external {
    numberKeys.push(key);
  }

  function getAvailableKeys() external view returns (string[] memory) {
    return numberKeys;
  }

  error NotHolding();

  modifier owned() {
    if (nft.balanceOf(msg.sender) < 1) revert NotHolding();

    _;
  }
}
