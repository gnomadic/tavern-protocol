// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721A} from "lib/erc721a/contracts/ERC721A.sol";

contract D20 is ERC721A {

   constructor() ERC721A("PLAYMINT D20", "D20") {
        
    }

    function mint() public {
        _mint(msg.sender, 1);
    }

}