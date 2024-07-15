// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ISystem} from "./interfaces/ISystem.sol";

contract MatchMaking is ISystem {
    constructor(address reg) ISystem(reg) {}
}
