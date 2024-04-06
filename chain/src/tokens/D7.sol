// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721A} from "lib/erc721a/contracts/ERC721A.sol";

contract D7 is ERC721A {
    constructor() ERC721A("PLAYMINT D7", "D7") {
    }

    function mint() public {
        _mint(msg.sender, 1);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return "https://ipfs.io/ipfs/QmUsr6muQSFXoprVpXWBzjmwQsnqeurd5NXKM6N1KKyWKd";
    }
}