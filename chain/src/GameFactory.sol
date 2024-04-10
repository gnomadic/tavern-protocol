// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {UUPSUpgradeable} from "solady/utils/UUPSUpgradeable.sol";
import {Initializable} from "solady/utils/Initializable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {LibClone} from "solady/utils/LibClone.sol";
import {IGame, GameSummary} from "./interfaces/IGame.sol";

contract GameFactory {
    address public gameContract;
    IGame[] public games;
    address public entityFactory;

    //TODO probalby don't need this because of update function
    function initialize(address _gameContract, address _entityFactory) public {
        gameContract = _gameContract;
        entityFactory = _entityFactory;
    }

    function updateGameContract(address gameContract_) public {
        //TODO permissions for admin
        gameContract = gameContract_;
    }

    function createGame(address _gm, string calldata displayName) public {
        address game = LibClone.clone(gameContract);
        IGame(game).initialize(_gm, displayName, entityFactory);
        games.push(IGame(game));

        // Emit an event for successful game creation
        emit GameCreated(_gm, game);
    }

    //returns an array of size 10 always, but some items will be empty when returning a page without 10 items.
    function getGames(uint8 startAt) external view returns (GameSummary[10] memory result) {
        uint8 pageSize = 10;
        for (uint8 i = startAt; i < games.length && i < (pageSize + startAt); i++) {
            result[i] = games[i].getSummary();
        }
        return result;
    }

    function getGameCount() external view returns (uint256) {
        return games.length;
    }




    event GameCreated(address gm, address game);
}
