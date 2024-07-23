// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ISystem} from './interfaces/ISystem.sol';
import {IPrefabLoader} from './interfaces/IPrefabLoader.sol';

import {console} from 'forge-std/console.sol';

contract Minting is ISystem {
  MintableHero private hero;
  IPrefabLoader[] private prefabs;

  uint256 mintPrice = 0.05 ether;

  constructor(address reg) ISystem(reg) {
  }

  function mintHero(uint256 prefabId) public payable {
    // console.log("Minting.mintAHero");

    if (msg.value != mintPrice) revert CheckMintPrice();

    //mint hero
    uint256 newTokenId = hero.mint(msg.sender);
    // console.log("tokenId: ", newTokenId);

    //load prefabs
    for (uint256 i = 0; i < prefabs.length; i++) {
      prefabs[i].loadFromPrefab(newTokenId, prefabId);
    }
  }

  function loadHero(uint256 tokenId, uint256 prefabId) public {
    // console.log("Minting.loadHero");
    if (hero.ownerOf(tokenId) != msg.sender)
      revert InvalidHero();

    //load prefabs
    for (uint256 i = 0; i < prefabs.length; i++) {
      prefabs[i].loadFromPrefab(tokenId, prefabId);
    }
  }

  function setMintPrice(uint256 _price) public onlyAdmin {
    mintPrice = _price;
  }

  function addPrefabLoader(address[] memory loaders) public onlyAdmin {
    for (uint256 i = 0; i < loaders.length; i++) {
      prefabs.push(IPrefabLoader(loaders[i]));
    }
  }

  function setHero(address _hero) public onlyAdmin {
    hero = MintableHero(_hero);
  }

  error CheckMintPrice();
  error InvalidHero();
}

interface MintableHero {
  function mint(address to) external returns (uint256);
  function ownerOf(uint256 tokenId) external view returns (address);
}
