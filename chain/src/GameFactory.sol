// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "solady/utils/UUPSUpgradeable.sol";
import "solady/utils/Initializable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {LibClone} from "solady/utils/LibClone.sol";

contract GameFactory {
    address public gameContract;

    constructor(address gameContract_) {
        gameContract = gameContract_;
    }

    function updateGameContract(address gameContract_) public {
        //TODO permissions for admin
        gameContract = gameContract_;
    }

    function createGame() public {
        // Deploy a minimal proxy clone of the Game contract
        // address game = LibClone.deployProxy(gameContract, abi.encodeWithSelector(IGame.initialize.selector, nftContract, tokenId));
        address game = LibClone.clone(gameContract);

        // Emit an event for successful game creation
        // emit GameCreated(game);
    }
}
