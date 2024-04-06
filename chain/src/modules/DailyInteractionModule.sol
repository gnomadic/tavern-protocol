// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "solady/utils/Initializable.sol";

import {IModule, ModuleSummary} from "../interfaces/IModule.sol";
import {IGame} from "../interfaces/IGame.sol";

contract DailyInteractionModule is IModule, Initializable {
    // ok so this contract will
    // 1. basically be a stateless game?

    string public displayName = "Daily Interaction";
    string[] required = ["dailyAction", "lastActionAt"];
    string[] public functions = ["dailyInteraction"];

    function getRequiredStrings() public view returns (string[] memory) {
        return required;
    }

    function initialize() external override {
    }

    function getSummary() external view override returns (ModuleSummary memory) {
        return ModuleSummary(address(this), functions, required, displayName);
    }

    function dailyInteraction(IGame game, uint256 tokenId) public {
        //TODO don't use msg.sender but I don't want other to play on someone else's behalf..
        uint256 lastActionAt = game.getOwnedNumber(msg.sender, tokenId, "lastActionAt");
        if (block.timestamp - lastActionAt < 14 hours) revert NotEnoughTimePassed();
        uint256 dailyActions = game.getOwnedNumber(msg.sender, tokenId, "dailyActions");
        game.setOwnedNumber(msg.sender, tokenId, "dailyActions", dailyActions + 1);
        game.setOwnedNumber(msg.sender, tokenId, "lastActionAt", block.timestamp);
    }

    function getProvidedFunctions() external view returns (string[] memory){
        return functions;
    }

    error NotEnoughTimePassed();
}
