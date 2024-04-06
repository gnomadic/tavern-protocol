// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
// Imports

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Initializable} from "solady/utils/Initializable.sol";

import "./EntityFactory.sol";
import {IGame, GameRoles, GameSummary, AddressKey} from "./interfaces/IGame.sol";
import {EntityFactory} from "./EntityFactory.sol";
import {BasicEntity} from "./BasicEntity.sol";
import {IModule} from "./interfaces/IModule.sol";
import {DailyInteractionModule} from "./modules/DailyInteractionModule.sol";

// Roles for access control
contract Game is IGame, GameRoles, Initializable {
    // ok so this contract will
    // 1. have a gm
    // 2. have a list of entities
    // 3. have a list of modules
    // 4. expose state from the entities

    address public gm;
    // EntityFactory public entityFactory;
    string public displayName;

    BasicEntity[] public entities;
    DailyInteractionModule[] public modules;

    mapping(string => address) public availableEntityData;
    AddressKey[] dataKeys;

    mapping(string => address) public availableFunctions;
    AddressKey[] functionKeys;

    function initialize(address _gm, string calldata _displayName) public initializer {
        gm = _gm;
        displayName = _displayName;
    }

    function getSummary() external view returns (GameSummary memory) {
        return GameSummary(address(this), gm, displayName, functionKeys, dataKeys);
    }

    function addEntity(address entity) external {
        BasicEntity newEntity = BasicEntity(entity);
        // string[] memory availableStrings = newEntity.getAvailableStrings();
        // string[] memory availableNumbers = newEntity.getAvailableNumbers();
        //iterate through available strings and numbers and add them to the entityDataMap, if there's a collision error out
        // for (uint256 i = 0; i < availableStrings.length; i++) {
        //     if (availableEntityData[availableStrings[i]] != address(0)) revert PropertyAlreadyExists();
        //     availableEntityData[availableStrings[i]] = entity;
        // }
        // for (uint256 i = 0; i < availableNumbers.length; i++) {
        //     if (availableEntityData[availableNumbers[i]] != address(0)) revert PropertyAlreadyExists();
        //     availableEntityData[availableNumbers[i]] = entity;
        // }

        string[] memory entityStrings = newEntity.getAvailableStrings();
        for (uint8 i = 0; i < entityStrings.length; i++) {
            dataKeys.push(AddressKey(entity, entityStrings[i]));
            availableEntityData[entityStrings[i]] = entity;
        }
        string[] memory entityNumbers = newEntity.getAvailableNumbers();
        for (uint8 i = 0; i < entityNumbers.length; i++) {
            dataKeys.push(AddressKey(entity, entityNumbers[i]));
            availableEntityData[entityNumbers[i]] = entity;
        }

        // newEntity.initialize(address(this));
        entities.push(newEntity);
    }





    // function prepareEntityNumbers(address toPrepare, string[] calldata toAdd) external {
    //     for (uint8 i = 0; i < toAdd.length; i++) {
    //         BasicEntity(toPrepare).createNumber(toAdd[i]);
    //     }
    // }

    error PropertyAlreadyExists();
    error MissingProperty();

    function addModule(address module) public {
        DailyInteractionModule newModule = DailyInteractionModule(module);
        // string[] memory requiredStrings = newModule.getRequiredStrings();

        //confirm every required string exists in the available entity data
        // for (uint256 i = 0; i < requiredStrings.length; i++) {
        //     if (availableEntityData[requiredStrings[i]] == address(0)) revert MissingProperty();
        // }

        string[] memory moduleFunctions = newModule.getProvidedFunctions();
        for (uint8 i = 0; i < moduleFunctions.length; i++) {
            functionKeys.push(AddressKey(module, moduleFunctions[i]));
            availableFunctions[moduleFunctions[i]] = module;
        }
        newModule.initialize();
        modules.push(newModule);
    }

    function getOwnedString(address player, uint256 tokenId, string memory key) public view returns (string memory) {
        BasicEntity targetEntity = BasicEntity(availableEntityData[key]);
        targetEntity.assertOwnership(tokenId, player);
        return targetEntity.getString(tokenId, key);
    }

    function setOwnedString(address player, uint256 tokenId, string memory key, string memory value) public {
        BasicEntity targetEntity = BasicEntity(availableEntityData[key]);
        targetEntity.assertOwnership(tokenId, player);
        targetEntity.updateString(tokenId, key, value);
    }

    function registerEntityData(address entity, string memory key) public {
        availableEntityData[key] = entity;
    }

    function getOwnedNumber(address player, uint256 tokenId, string memory key) public view returns (uint256) {
        BasicEntity targetEntity = BasicEntity(availableEntityData[key]);
        targetEntity.assertOwnership(tokenId, player);
        return targetEntity.getNumber(tokenId, key);
    }

    function setOwnedNumber(address player, uint256 tokenId, string memory key, uint256 value) public {
        BasicEntity targetEntity = BasicEntity(availableEntityData[key]);
        targetEntity.assertOwnership(tokenId, player);
        targetEntity.updateNumber(tokenId, key, value);
    }

    // function getEntityForData(string memory key) public view returns (address) {
    //     return availableEntityData[key];
    // }

    // // Address of the EntityFactory contract
    // address public entityFactory;

    // // Mapping to store entity addresses for each player
    // mapping(address => address) public playerEntities;

    // // Event emitted when a player joins the game
    // event PlayerJoined(address player, address entity);

    // constructor(address _entityFactory) {
    //     entityFactory = _entityFactory;
    //     _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    // }

    // function getDm()() external view returns (address){ return dm;}

    // // Function for the game to interact with a module (for DMs)
    // function callModule(address module, string calldata functionName, address targetEntity, bytes calldata data) public onlyRole(DM_ROLE) {
    //     // Use reflection to call the specified function on the module contract
    //     (bool success, bytes memory returnData) = module.call(
    //         abi.encodeWithSelector(keccak256(abi.encodePacked(functionName, "(address,bytes)"))),
    //         targetEntity,
    //         data
    //     );
    //     require(success, "Module call failed");

    //     // ... Handle return data from the module (optional)
    // }
}
