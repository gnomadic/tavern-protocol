// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract IModule {

    // address GM;
    
    // function setGM(address _gm) external {
    //     GM = _gm;
    // }

}

contract ModuleRoles is AccessControl {
    // bytes32 public constant DM_ROLE = keccak256("DM_ROLE");

    // constructor() {
    //     _grantRole(DM_ROLE, msg.sender);
    // }
}