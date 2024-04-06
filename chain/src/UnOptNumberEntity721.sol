// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "solady/utils/Initializable.sol";

import {INumberEntity} from "./interfaces/INumberEntity.sol";

interface IERC721 {
    function ownerOf(uint256 tokenId) external view returns (address);
}

// This is a terribly ineffecient Unoptimized Number Entity for 721s.  It is just a starting point.
contract UnOptNumberEntity721 is INumberEntity, Initializable {
    // ok so this contract will
    // 1. have an nft contract
    // 2. store state as numbers and strings
    // 3. expose getters and setters for the state to modules only if the requestor holds the nft
    // 4. report what state is avaialable

    IERC721 public nft;
    string public displayName;

    mapping(uint256 => mapping(string => uint256)) private numbers;
    string[] public numberKeys;

    function initialize(address _game, string memory _displayName, address _nft) public initializer {
        game = _game;
        displayName = _displayName;
        nft = IERC721(_nft);
    }

    function assertOwnership(uint256 tokenId, address player) external view override {
        if (nft.ownerOf(tokenId) != player) revert NotTheHolder();
    }

    function getNumber(uint256 tokenId, string memory key) external view override returns (uint256) {
        return numbers[tokenId][key];
    }

    function updateNumber(uint256 tokenId, string memory key, uint256 value) external override onlyGame {
        numbers[tokenId][key] = value;
    }

    // TODO right now this is created by the gamefactory, not the game but that could be changed
    function createNumber(string memory key) external {
        numberKeys.push(key);
    }

    function getAvailableNumbers() external view override returns (string[] memory) {
        return numberKeys;
    }

    error NotTheHolder();
}
