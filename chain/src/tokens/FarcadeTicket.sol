// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "solady/tokens/ERC20.sol";

contract FarcadeTicket is ERC20 {
    address public minter;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) public {
        if (msg.sender != minter) revert NoPermission();
        _mint(to, amount);
    }

    function updateMinter(address newMinter) public {
        if (msg.sender != admin) revert NoPermission();
        minter = newMinter;
    }

    error NoPermission();

    /**
     * @dev Return the name of the token.
     */
    function name() public pure override returns (string memory) {
        return "Farcade Tickets";
    }

    /**
     * @dev Return the symbol of the token.
     */
    function symbol() public pure override returns (string memory) {
        return "TICKET";
    }
}
