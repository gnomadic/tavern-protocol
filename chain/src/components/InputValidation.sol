// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ParamValidation {

    //   constructor(address game) IComponent() {}


    mapping(string => bool) public validParams;

    function setValidParams(string[] memory params) internal {
        for (uint256 i = 0; i < params.length; i++) {
            validParams[params[i]] = true;
        }
    }


  
}
