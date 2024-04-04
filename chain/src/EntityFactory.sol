// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


import "solady/utils/UUPSUpgradeable.sol";
import "solady/utils/Initializable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {LibClone} from "solady/utils/LibClone.sol";





// Define roles for access control
contract Roles is AccessControl {
    bytes32 public constant DM_ROLE = keccak256("DM_ROLE");

    constructor() {
        _grantRole(DM_ROLE, msg.sender);
    }
}

contract EntityFactory {//} is UUPSUpgradeable, Roles, Initializable {
    
    // function createEntity() public {
    //     // Deploy a minimal proxy clone of the Entity contract
    //     address entity = LibClone.deployProxy(entityContract, abi.encodeWithSelector(IEntity.initialize.selector, nftContract, tokenId));

    //     // Emit an event for successful entity creation
    //     emit EntityCreated(entity, nftContract, tokenId);


    // }
    // // Address of the upgradeable Entity contract
    // address public entityContract;

    // // Event emitted when a new entity is deployed
    // event EntityCreated(address entityAddress, address nftContract, uint256 tokenId);

    // constructor(address _entityContract) initializer public {
    //     entityContract = _entityContract;
    //     _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    // }

    // // Function to deploy a new entity proxy clone for an NFT
    // function createEntity(address nftContract, uint256 tokenId) public onlyRole(DM_ROLE) {
    //     // Deploy a minimal proxy clone of the Entity contract
    //     address entity = deployProxy(entityContract, abi.encodeWithSelector(IEntity.initialize.selector, nftContract, tokenId));

    //     // Emit an event for successful entity creation
    //     emit EntityCreated(entity, nftContract, tokenId);
    // }

    // // Fallback function to prevent accidental ETH transfers
    // fallback() external payable {
    //     revert("This contract does not accept ETH");
    // }

    // // Slither compatible upgrader function
    // function _authorizeUpgrade(address newImplementation)
    //     internal
    //     override
    //     onlyRole(DEFAULT_ADMIN_ROLE)
    // {}
}

