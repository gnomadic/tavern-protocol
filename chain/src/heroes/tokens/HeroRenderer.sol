// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract HeroRenderer {

  function generateSVG(uint256 tokenId) public view returns (string memory) {
    // Color.HSL memory primary = Color.HSL(dna.primaryHue, 100, 30);
    // Color.HSL memory secondary = Color.HSL(dna.secondaryHue, 100, 30);
    // console.log("Colors are %s and %s ", primary.H, secondary.H);
    string memory svg = string.concat(
      '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><clipPath id="box"><path d="M0 0h512v512H0z"/></clipPath><defs>',
      // getGradients(tokenId, primary, secondary, dna.cloudsAt),
      // getFilters(tokenId),
      '</defs><svg viewBox="0 0 512 512" clip-path="url(#box)">',
      // getBackgrounds(daytime),
      '<path d="M 0, 340 h 512" stroke="white" opacity="0.4"/>',
      '<path d="M 0, 170 h 512" stroke="white" opacity="0.4"/>',
      '<path d="M 170, 0 v 512" stroke="white" opacity="0.4"/>',
      '<path d="M 340, 0 v 512" stroke="white" opacity="0.4"/>',
      '<path d="M250 80 h 180 v 180 h -180 v-180" stroke="white" fill="none"/>',
      // buildStars(dna.starSeed, dna.constellationSeed, gazes, daytime),
      // getStars(tokenId, dna.constellation, gazes, daytime),
      // getDecos(decorator, tokenId, dna, gazes, daytime),
      // getFocus(decorator, dna, gazes, daytime),
      // getSkyMath(decorator, dna, gazes, daytime),
      // getDecorationOne(decorator, dna, gazes, daytime),
      // getSilhouette(decorator, dna, gazes, daytime),
      '</svg></svg>'
    );
    return svg;
  }
  //   constructor() ERC1155('Tavern Town', 'TOWN') {}

  //   function mint() public {
  //     _mint(msg.sender, 1);
  //   }

  //   function tokenURI(
  //     uint256 tokenId
  //   ) public view override returns (string memory) {
  //     return
  //       'https://ipfs.io/ipfs/QmUsr6muQSFXoprVpXWBzjmwQsnqeurd5NXKM6N1KKyWKd';
  //   }
}
