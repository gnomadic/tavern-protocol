// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IHeroRenderer {
    function generateSVG(
        uint256 tokenId,
        uint256 bytedata
    ) external view returns (string memory);
}
