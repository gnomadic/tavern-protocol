// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IComponentRegistry} from "../../interfaces/IComponentRegistry.sol";

abstract contract ISystem {
    address public admin;
    IComponentRegistry public registry;
    
    constructor(address reg) {
        admin = msg.sender;
        registry = IComponentRegistry(reg);
    }

    modifier onlySystem(){
        if (!registry.isRegistered(msg.sender)) revert NotAuthorized();
        _;
    }

    modifier onlyAdmin(){
        if(msg.sender != admin) revert NotAuthorized();
        _;
    }

      error NotAuthorized();
}


struct Action {
    uint256 id;
    string name;
    address to;
    string func;
    string[] numStatNames;
    uint256[] numStatValues;
}