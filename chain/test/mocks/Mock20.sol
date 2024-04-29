// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from 'solady/tokens/ERC20.sol';

contract Mock20 is ERC20 {
  function name() public view override returns (string memory) {
    return 'mock 20';
  }

  function symbol() public view override returns (string memory) {
    return 'm20';
  }

  function mint(address to, uint256 amount) external {
    _mint(to, amount);
  }
}
