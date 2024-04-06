// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

abstract contract PlayMintContext {

    address public game;

    modifier onlyGame() {
        if (msg.sender != game) revert OnlyGame();   
        _;
    }

    error OnlyGame();
}


