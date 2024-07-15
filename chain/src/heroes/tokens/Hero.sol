// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "../../../lib/ERC721A/contracts/extensions/ERC721AQueryable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

import {HeroRenderer} from "./HeroRenderer.sol";

contract Hero is ERC721AQueryable {
    using Strings for uint256;

    HeroRenderer private _renderer;
    // mapping(uint256 => HeroRenderer) public renderers;
    uint256 rendererCount;

    address public minter;
    address admin;

    constructor(address renderer) ERC721A("Senso Hero", "HERO") {
        // addRenderer(renderer);
        _renderer = HeroRenderer(renderer);
        admin = msg.sender;
    }  

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721A, IERC721A) returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Hero #',
            tokenId.toString(),
            '",',
            '"description": "hero",',
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

    function contractURI() public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Hero",',
            '"description": "Be a Hero"',
            '"external_url": "https://www.beahero.com/"',
            '"image": "',
            generateCharacter(0),
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

    function generateCharacter(
        uint256 tokenId
    ) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(generateSVG(tokenId));

        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function generateSVG(uint256 _tokenId) public view returns (string memory) {
        return _renderer.generateSVG(_tokenId);
    }

    function addRenderer(address newRenderer) public {
        // renderers[rendererCount] = HeroRenderer(newRenderer);
        // rendererCount++;
        _renderer = HeroRenderer(newRenderer);
    }

    function mint(address to) public returns (uint256) {
        if (msg.sender != minter) {
            revert UseMinter();
        }

        uint256 tokenId = _nextTokenId();

        _mint(to, 1);

        return tokenId;
    }

    function setMinter(address _minter) public {
        if (msg.sender != admin) {
            revert NotAdmin();
        }
        minter = _minter;
    }

    error UseMinter();
    error NotAdmin();
}
