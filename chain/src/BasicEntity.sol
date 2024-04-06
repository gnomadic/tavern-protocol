// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {UUPSUpgradeable} from "solady/utils/UUPSUpgradeable.sol";
import {Initializable} from "solady/utils/Initializable.sol";
// import {OwnableRoles} from "solady/auth/OwnableRoles.sol";

import {IGame} from "./interfaces/IGame.sol";
import {IEntity} from "./interfaces/IEntity.sol";
import {Game} from "./Game.sol";

interface IERC721 {
    function ownerOf(uint256 tokenId) external view returns (address);
}

// This is a terribly ineffecient Basic Entity Implementation.  It is just a starting point.

contract BasicEntity {
    // ok so this contract will
    // 1. have an nft contract
    // 2. store state as numbers and strings
    // 3. expose getters and setters for the state to modules only if the requestor holds the nft
    // 4. report what state is avaialable

    IERC721 public nft;
    Game public game;
    string public displayName;

    // constructor(address _nft) {
    //     // nft = IERC721(_nft);
    // }

    function initialize(address _game, string memory _displayName, address _nft) public {
        game = Game(_game);
        displayName = _displayName;
        nft = IERC721(_nft);
    }

    mapping(uint256 => mapping(string => string)) private strings;
    string[] public stringKeys;
    mapping(uint256 => mapping(string => uint256)) private numbers;
    string[] public numberKeys;

    function assertOwnership(uint256 tokenId, address player) external view {
        if (nft.ownerOf(tokenId) != player) revert NotTheHolder();
    }

    function getString(uint256 tokenId, string memory key) external view returns (string memory) {
        return strings[tokenId][key];
    }

    function updateString(uint256 tokenId, string memory key, string memory value) external {
        // if (msg.sender != address(game)) revert OnlyGame();
        strings[tokenId][key] = value;
    }

    function createString(string memory key) external {
        // if (msg.sender != address(game)) revert OnlyGame();
        stringKeys.push(key);
    }

    function getNumber(uint256 tokenId, string memory key) external view returns (uint256) {
        return numbers[tokenId][key];
    }

    function updateNumber(uint256 tokenId, string memory key, uint256 value) external {
        // if (msg.sender != address(game)) revert OnlyGame();
        numbers[tokenId][key] = value;
    }

    function createNumber(string memory key) external {
        // if (msg.sender != address(game)) revert OnlyGame();
        numberKeys.push(key);
    }

    function getAvailableStrings() external view returns (string[] memory) {
        return stringKeys;
    }

    function getAvailableNumbers() external view returns (string[] memory) {
        return numberKeys;
    }

    error NotTheHolder();
    error OnlyGame();
}
