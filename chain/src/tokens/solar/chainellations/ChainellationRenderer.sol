// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "../Color.sol";
import "../interfaces/IChainellationRenderer.sol";

contract ChainellationRenderer is IChainellationRenderer {
    function generateSVG(
        uint256 tokenId,
        Color.DNA memory dna,
        bool daytime
    ) public view returns (string memory) {
        Color.HSL memory primary = Color.HSL(dna.primaryHue, 100, 30);
        Color.HSL memory secondary = Color.HSL(dna.secondaryHue, 100, 30);
        // console.log("Colors are %s and %s ", primary.H, secondary.H);
        string memory svg = string.concat(
            '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><clipPath id="box"><path d="M0 0h512v512H0z"/></clipPath><defs>',
            getGradients(tokenId, primary, secondary, 1),
            getFilters(tokenId),
            '</defs><svg viewBox="0 0 512 512" clip-path="url(#box)">',
            getBackgrounds(daytime),
            // '<path d="M 0, 340 h 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 0, 170 h 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 170, 0 v 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 340, 0 v 512" stroke="white" opacity="0.4"/>',
            // '<path d="M250 80 h 180 v 180 h -180 v-180" stroke="white" fill="none"/>',



            "</svg>",
            "</svg>"
        );
        return svg;
    }

    function getGradients(
        uint256 seed,
        Color.HSL memory primary,
        Color.HSL memory secondary,
        uint16 cloudDays
    ) public pure returns (string memory) {
        string memory rotation = Color.toString(
            (uint16)(Color.psuedorandom(seed, 123) % 45)
        );
        string memory sky = string.concat(
            '<linearGradient id="skyGradient" gradientTransform="rotate(',
            rotation,
            ')">'
        );

        sky = string.concat(
            sky,
            '<stop offset="0%"',
            ' stop-color="',
            Color.HSLtoString(primary),
            '"/>'
        );

        sky = string.concat(
            sky,
            '<stop offset="100%"',
            ' stop-color="',
            Color.HSLtoString(secondary),
            '"/>'
        );

        sky = string.concat(
            sky,
            '</linearGradient><linearGradient id="cloudGradient" gradientTransform="rotate(',
            rotation,
            ')"><stop stop-opacity=".',
            Color.toString(cloudDays == 0 ? 1 : cloudDays),
            '" offset="15%"/><stop stop-opacity=".5" offset="30%"/>',
            '<stop stop-opacity=".',
            Color.toString(cloudDays == 0 ? 1 : cloudDays),
            '" offset="50%"/></linearGradient>'
        );

        Color.HSL memory bright = Color.rotateColor(primary, 240);
        bright.L = 90;
        sky = string.concat(
            sky,
            '<linearGradient id="dayGradient" gradientTransform="rotate(13)">',
            '<stop offset="0%" stop-color="',
            Color.HSLtoString(Color.rotateColor(primary, 180)),
            '"/>',
            '<stop offset="100%" stop-color="',
            Color.HSLtoString(Color.rotateColor(secondary, 180)),
            '"/>',
            "</linearGradient>"
        );

        return sky;
    }

    function getBackgrounds(bool day) public pure returns (string memory) {
        string memory bg = "";

        bg = string.concat(
            '<rect width="100%" height="100%" filter="url(#stars)" opacity="',
            Color.toString(day ? 0 : 1),
            '"/>',
            '<path fill="url(#dayGradient)" d="M0 0h512v512H0z" opacity="',
            Color.toString(day ? 1 : 0),
            '"  filter="url(#light)"/>',
            '<path fill="url(#skyGradient)"  d="M0 0h512v512H0z" opacity=".',
            Color.toString(day ? 0 : 7),
            '"/>',
            '<path fill="url(#cloudGradient)" filter="url(#clouds)" d="M-512-512h1536v1536h-2048z"><animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="512 512" dur="60s" repeatCount="indefinite"/></path>'
        );

        return bg;
    }

    function getFilters(uint256 seed) public pure returns (string memory) {
        string memory filters = "";
        filters = string.concat(
            filters,
            '<filter id="stars"><feTurbulence baseFrequency=".35" seed="',
            Color.toString((uint16)(Color.psuedorandom(seed, 123) % 10000)),
            '"/>',
            '<feColorMatrix values="0 0 0 9 -4 0 0 0 9 -4 0 0 0 9 -4 0 0 0 0 1"/></filter>'
        );
        filters = string.concat(
            filters,
            '<filter id="clouds" x="-50%" y="-50%" height="200%" width="200%"><feGaussianBlur in="sky" stdDeviation="20" result="skyblur"/>',
            '<feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="5" result="skynoise" seed="',
            Color.toString((uint16)(Color.psuedorandom(seed, 123) % 10000)),
            '"/>',
            '<feColorMatrix values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 3 -1 -1 0 0"/>',
            '<feComposite operator="in" in2="SourceGraphic"/></filter>'
        );

        filters = string.concat(
            filters,
            '<filter id="light"><feSpecularLighting result="specOut" specularExponent="100" lighting-color="white">',
            '<fePointLight x="10" y="70" z="300"/></feSpecularLighting>',
            '<feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/></filter>'
        );

        return filters;
    }

    function psuedorandom(
        uint256 tokenId,
        uint256 nonce
    ) public pure returns (uint256) {
        return Color.psuedorandom(tokenId, nonce);
    }

    function subZero(uint16 first, uint16 second) public pure returns (uint16) {
        return Color.subZero(first, second);
    }
}
