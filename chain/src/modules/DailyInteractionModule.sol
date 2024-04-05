// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "solady/utils/Initializable.sol";

import {BasicEntity} from "../BasicEntity.sol";
import {IEntity} from "../interfaces/IEntity.sol";
import {IModule, ModuleSummary} from "../interfaces/IModule.sol";
import {IGame} from "../interfaces/IGame.sol";
import {Game} from "../Game.sol";

contract DailyInteractionModule is IModule, Initializable {
    // ok so this contract will
    // 1. basically be a stateless game?

    string public displayName = "Daily Interaction";
    string[] required = ["dailyAction", "lastActionAt"];
    string[] functions = ["dailyInteraction"];
    // Game public game;

    function getRequiredStrings() public view returns (string[] memory) {
        return required;
    }

    function initialize() external override {
        // game = Game(_game);
    }

    function getSummary() external view override returns (ModuleSummary memory) {
        return ModuleSummary(address(this), functions, required, displayName);
    }

    function dailyInteraction(Game game, uint256 tokenId) public {
        //TODO don't use msg.sender
        uint256 lastActionAt = game.getOwnedNumber(msg.sender, tokenId, "lastActionAt");
        if (block.timestamp - lastActionAt < 14 hours) revert NotEnoughTimePassed();
        uint256 dailyActions = game.getOwnedNumber(msg.sender, tokenId, "dailyActions");
        game.setOwnedNumber(msg.sender, tokenId, "dailyActions", dailyActions + 1);
        game.setOwnedNumber(msg.sender, tokenId, "lastActionAt", block.timestamp);
    }

    // get lastActionAt from game, whatever entity has it and require ownership
    // if lastActionAt is less than 24 hours ago,
    // get dailyAction from game, whatever entity has it and require ownership
    // increment dailyAction
    // set lastActionAt to now

    error NotTheGM();
    error NotTheOwner();
    error NotEnoughTimePassed();
}
