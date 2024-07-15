// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AddressKey} from './IGame.sol';

interface IComponentRegistry {

    function isRegistered(address module) external view returns (bool) ;

    function getRequired() external view returns (AddressKey[] memory) ;


  
}
