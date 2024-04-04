// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IEntity} from "../interfaces/IEntity.sol";
import {IModule} from "../interfaces/IModule.sol";
import {IGame} from "../interfaces/IGame.sol";
import {Game} from "../Game.sol";
import {BasicEntity} from "../BasicEntity.sol";

contract DailyInteractionModule is IModule {
    // ok so this contract will
    // 1. basically be a game?

    string[] required = ["dailyAction", "lastActionAt"];
    Game public game;

    function initialize(address _game) public {
        game = Game(_game);

        // TODO can we define the entity here hmmmmm
    }

    function getRequiredStrings() public view returns (string[] memory) {
        return required;
    }



    function initailize(address nft) public {
        // if (GM != msg.sender) revert NotTheGM();
    }

    function dailyInteraction(uint256 tokenId) public {
        //TODO don't use msg.sender
        uint256 lastActionAt = game.getOwnedNumber(msg.sender, tokenId, "lastActionAt");
        if (block.timestamp - lastActionAt < 14 hours) revert NotEnoughTimePassed();
        uint256 dailyActions = game.getOwnedNumber(msg.sender, tokenId, "dailyActions");
        game.setOwnedNumber(msg.sender, tokenId, "dailyActions", dailyActions + 1);
        game.setOwnedNumber(msg.sender, tokenId, "lastActionAt", block.timestamp);

    }

    // get lastActionAt from game, whatever entity has it and require ownership
    // if lastActionAt is more than 24 hours ago,
    // get dailyAction from game, whatever entity has it and require ownership
    // increment dailyAction
    // set lastActionAt to now

    error NotTheGM();
    error NotTheOwner();
    error NotEnoughTimePassed();
}
