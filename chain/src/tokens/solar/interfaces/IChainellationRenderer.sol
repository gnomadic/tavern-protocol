// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "../Color.sol";

interface IChainellationRenderer {
    function generateSVG(
        uint256 tokenId,
        Color.DNA memory dna,
        bool daytime
    ) external view returns (string memory);

    function subZero(
        uint16 first,
        uint16 second
    ) external pure returns (uint16);

    function psuedorandom(
        uint256 tokenId,
        uint256 nonce
    ) external pure returns (uint256);
}
