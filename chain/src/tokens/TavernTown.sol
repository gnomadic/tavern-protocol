// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721A} from "lib/ERC721A/contracts/ERC721A.sol";

contract TavernTown is ERC721A {
    constructor() ERC721A("Tavern Town", "TOWN") {
    }

    function mint() public {
        _mint(msg.sender, 1);
    }


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return "https://ipfs.io/ipfs/QmUsr6muQSFXoprVpXWBzjmwQsnqeurd5NXKM6N1KKyWKd";
    }
}
