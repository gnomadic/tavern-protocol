// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "../chainellations/Chainellation.sol";

contract Mockellation is Chainellation {
    uint48 public time;

    constructor(address renderer) Chainellation(renderer) {
        time = (uint48)(block.timestamp);
    }

    function systemTimeOffsetWithUser(
        uint256 tokenId
    ) public view override returns (uint48) {
        return time;
    }

    function setSystemTime(uint48 _time) public {
        time = _time;
    }
}
