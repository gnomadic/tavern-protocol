// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC1155} from '../../lib/solady/src/tokens/ERC1155.sol';
import {LibString} from "../../lib/solady/src/utils/LibString.sol";

import '@openzeppelin/contracts/utils/Base64.sol';

import {HeroRenderer} from './HeroRenderer.sol';

contract Hero is ERC1155 {

  HeroRenderer private _renderer;
  string public name = 'Hero';
  string public symbol = 'HERO';

  constructor(address renderer) {
    _renderer = HeroRenderer(renderer);
  }

  function uri(uint256 tokenId) public view override returns (string memory) {
    bytes memory dataURI = abi.encodePacked(
      '{',
      '"name": "Hero #',
      LibString.toString(tokenId),
      '",',
      '"description": "hero",',
      '"image": "',
      generateCharacter(tokenId),
      '"',
      '}'
    );
    return
      string(
        abi.encodePacked(
          'data:application/json;base64,',
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
        abi.encodePacked('data:image/svg+xml;base64,', Base64.encode(svg))
      );
  }

  function generateSVG(uint256 _tokenId) public view returns (string memory) {
    return _renderer.generateSVG(_tokenId);
  }

}
