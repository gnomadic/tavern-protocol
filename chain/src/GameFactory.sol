// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "solady/utils/UUPSUpgradeable.sol";
import "solady/utils/Initializable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {LibClone} from "solady/utils/LibClone.sol";
import {IGame, GameSummary} from "./interfaces/IGame.sol";

contract GameFactory {
    address public gameContract;
    IGame[] public games;

    function initialize(address _gameContract) public {
        gameContract = _gameContract;
    }

    function updateGameContract(address gameContract_) public {
        //TODO permissions for admin
        gameContract = gameContract_;
    }

    function createGame(address _gm, string calldata displayName) public {
        // Deploy a minimal proxy clone of the Game contract
        // address game = LibClone.deployProxy(gameContract, abi.encodeWithSelector(IGame.initialize.selector, nftContract, tokenId));
        address game = LibClone.clone(gameContract);
        IGame(game).initialize(_gm, displayName);
        games.push(IGame(game));

        // Emit an event for successful game creation
        emit GameCreated(_gm, game);
    }

    //returns an array of size 10 always, but some items will be empty when returning a page without 10 items.
    function getGames(uint8 startAt) external view returns (GameSummary[10] memory result) {
        uint8 pageSize = 10;
        // if (games.length < pageSize){
        //     for (uint8 i = 0; i < games.length; i++){
        //         result[i] = GameSummary(address(games[i]), games[i].gm(), games[i].displayName());
        //     }
        // }else{
        for (uint8 i = startAt; i < games.length && i < (pageSize + startAt); i++) {
            result[i] = games[i].getSummary();// GameSummary(address(games[i]), games[i].gm(), games[i].displayName());
        }
        // }

        return result;
    }

    function getGameCount() external view returns (uint256) {
        return games.length;
    }

    // struct GameSummary {
    //     address game;
    //     address gm;
    //     string displayName;
    // }

    event GameCreated(address gm, address game);
}
