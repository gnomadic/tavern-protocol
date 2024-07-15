// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "../../../lib/solady/src/tokens/ERC1155.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

import {HeroRenderer} from "./HeroRenderer.sol";

contract Loot is ERC1155 {
    mapping(uint256 => string) public uriData;

    constructor()  {

        _mint(msg.sender, 1, 10 * 10 ** 18, "");
        _mint(msg.sender, 2, 1, "");

    }

    function name() public view returns (string memory) {
        return "Loot";
    }

    function symbol() public view returns (string memory) {
        return "LOOT";
    }

    function uri(uint256 id) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"Hero #',
                                Strings.toString(id),
                                '",',
                                '"description":"A hero from the Universe",',
                                '"image": "https://ipfs.io/ipfs/QmUbRpveuTjqUaAQQP12ETLBWhxFtGHG6XKubqetyu5i6m"}'
                            )
                        )
                    )
                )
            );
    }

      function contractURI() public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "loot",',
            '"description": "loot"',
            '"external_url": "https://www.loot.com/"',
            '"image": "',
            '"https://ipfs.io/ipfs/QmUbRpveuTjqUaAQQP12ETLBWhxFtGHG6XKubqetyu5i6m"',
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function addLoot(uint256 id, string memory data) public {
        uriData[id] = data;
    }
}
