// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;
import "../Color.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

abstract contract IDeco {
    mapping(uint256 => bool) public soulbound;

    function soulbind(uint256 tokenId) external {
        if (ownerOf(tokenId) != tx.origin) revert NotOwner();
        soulbound[tokenId] = true;
    }

    function getDeco(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) public view virtual returns (string memory);

    function ownerOf(uint256 tokenId) public view virtual returns (address) {
        //TODO this is rough - the msg.sender is the Decoration contract but I need check with the EOA
        //breaks support for gas stations and contract owners.
        return tx.origin;
    }

    function balanceOf(address owner) public view virtual returns (uint256) {
        return 1;
    }

    function packageAsSVG(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) public view returns (string memory) {
        return
            string.concat(
                '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">',
                '<clipPath id="box"><path d="M0 0h512v512H0z"/></clipPath>',
                '<svg viewBox="0 0 512 512" clip-path="url(#box)">',
                getDeco(tokenId, dna, gazes, daytime),
                "</svg></svg>"
            );
    }

    function generateCharacter(
        uint256 tokenId
    ) public view returns (string memory) {
        Color.DNA memory dna = Color.genDNA(
            tokenId,
            Color.defaultColors(tokenId),
            0,
            0
        );
        bytes memory svg = abi.encodePacked(
            packageAsSVG(tokenId, dna, 0, true)
        );

        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getMetadata(
        uint256 tokenId
    ) public view virtual returns (string memory);

    function tokenURI(
        uint256 tokenId
    ) public view virtual returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            getMetadata(tokenId),
            ",",
            '"image": "',
            generateCharacter(tokenId),
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

    error NotOwner();
    error SoulBound();
}
