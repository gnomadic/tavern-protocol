// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {console} from "forge-std/console.sol";

contract Random {
    uint256 private nonce;

    function getNonce() internal returns (uint256) {
        nonce++;
        return nonce;
    }

    function getRandom(
        uint16 maxExclusive,
        uint256 nonce
    ) public virtual returns (uint8) {
        return
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            msg.sender,
                            getNonce(),
                            nonce,
                            block.timestamp,
                            block.number
                        )
                    )
                ) % maxExclusive
            );
    }

    function getIdempotentRandom(
        uint256 maxExclusive,
        uint256 nonceOne,
        uint256 nonceTwo
    ) public view virtual returns (uint256) {
        return
            uint256(
                uint256(
                    keccak256(abi.encodePacked(msg.sender, nonceOne, nonceTwo))
                ) % maxExclusive
            );
    }
}
