// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

abstract contract IComponent {
  function initialize(address game) external virtual;
  function getSummary() external view virtual returns (ComponentSummary memory);

  modifier onlyGame(address game){
    if(msg.sender != game) revert OnlyGameCanCall();
    _;
  
  }

  error OnlyGameCanCall();
}

struct ComponentSummary {
  address component;
  string metadata;
}
