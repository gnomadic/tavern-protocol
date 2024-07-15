// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "../Color.sol";
import "./Constellations.sol";
import "../interfaces/IDecorations.sol";
import "../interfaces/IChainellationRenderer.sol";

contract ChainellationRenderer is IChainellationRenderer {
    function generateSVG(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime,
        address decorator
    ) public view returns (string memory) {
        Color.HSL memory primary = Color.HSL(dna.primaryHue, 100, 30);
        Color.HSL memory secondary = Color.HSL(dna.secondaryHue, 100, 30);
        // console.log("Colors are %s and %s ", primary.H, secondary.H);
        string memory svg = string.concat(
            '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><clipPath id="box"><path d="M0 0h512v512H0z"/></clipPath><defs>',
            getGradients(tokenId, primary, secondary, dna.cloudsAt),
            getFilters(tokenId),
            '</defs><svg viewBox="0 0 512 512" clip-path="url(#box)">',
            getBackgrounds(daytime),
            // '<path d="M 0, 340 h 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 0, 170 h 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 170, 0 v 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 340, 0 v 512" stroke="white" opacity="0.4"/>',
            // '<path d="M250 80 h 180 v 180 h -180 v-180" stroke="white" fill="none"/>',

            // buildStars(dna.starSeed, dna.constellationSeed, gazes, daytime),
            getStars(tokenId, dna.constellation, gazes, daytime),
            getDecos(decorator, tokenId, dna, gazes, daytime),
            // getFocus(decorator, dna, gazes, daytime),
            // getSkyMath(decorator, dna, gazes, daytime),
            // getDecorationOne(decorator, dna, gazes, daytime),
            // getSilhouette(decorator, dna, gazes, daytime),
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

    function getStars(
        uint256 starSeed,
        uint16 constellationId,
        uint256 gazes,
        bool daytime
    ) public view returns (string memory) {
        if (daytime) {
            return "";
        }

        uint8 starCount = 0;
        uint8 constCount = 0;
        if (gazes > 50) {
            constCount = 20;
            starCount = 30;
            gazes = 50;
        }
        while (starCount + constCount < gazes) {
            if (Color.psuedorandom(starSeed, constCount + starCount) % 3 == 1) {
                constCount++;
            } else {
                starCount++;
            }
        }

        (string memory constellation, uint8 leftovers) = drawConstellation(
            constellationId,
            constCount
        );
        string memory stars = "";

        console.log("constCount ", constCount);
        console.log("starCount ", starCount);
        console.log("leftovers ", leftovers);
        stars = string.concat(stars, constellation);
        stars = string.concat(
            stars,
            drawStars(starSeed, starCount + leftovers)
        );
        return stars;
    }

    function drawStars(
        uint256 starSeed,
        uint8 toShow
    ) private pure returns (string memory) {
        string memory stars = '<g fill="#fff">';
        string memory x = "";
        string memory y = "";
        uint8 seed = 0;
        string memory duration;
        // string memory delay;
        for (uint8 i = 0; i < toShow; i++) {
            seed = (uint8)(Color.psuedorandom(starSeed, i) % 3);
            x = Color.toString(
                (uint16)(Color.psuedorandom(starSeed, i) % 462) + 25
            );

            y = Color.toString(
                (uint16)(Color.psuedorandom(starSeed + seed, i) % 462) + 25
            );

            duration = Color.toString(
                (uint16)(Color.psuedorandom(starSeed, i) % 4) + 1
            );
            // delay = Color.toString(
            //     (uint16)(Color.psuedorandom(starSeed, i) % 3)
            // );

            if (seed == 0) {
                stars = string.concat(
                    stars,
                    '<circle r="1" cx="',
                    x,
                    '" cy="',
                    y,
                    '" fill="#fff"  opacity="1">',
                    '<animate attributeName="r" values="1;0;2;1;1;1;1;1;1;1" dur="',
                    duration,
                    's" start="',
                    duration,
                    's" repeatCount="indefinite"/></circle>'
                );
            } else if (seed == 1) {
                stars = string.concat(
                    stars,
                    '<path d="M ',
                    x,
                    ",",
                    y,
                    'c 7,0 7,0 7,-7 c 0,7 0,7 7,7 c -7,0 -7,0 -7,7 c 0,-7 0,-7 -7,-7">',
                    '<animate attributeName="r" values="1;0;1;1;1;1;1;1;1" dur="',
                    duration,
                    's" start="',
                    duration,
                    's" repeatCount="indefinite"/></path>'
                    // '<animateTransform attributeName="transform" type="scale" from="0 0" to="1 1" begin="0s" dur="0.5s" repeatCount="1"/></path>'
                );
            } else if (seed == 2) {
                stars = string.concat(
                    stars,
                    '<circle r="3" cx="',
                    x,
                    '" cy="',
                    y,
                    '" opacity="0.3"><animate attributeName="r" values="0;5;3" dur="1s"/></circle>',
                    '<circle r="1" cx="',
                    x,
                    '" cy="',
                    y,
                    '"><animate attributeName="r" values="1;0;2;1;1;1;1;1;1;1" dur="',
                    duration,
                    's" start="',
                    duration,
                    's" repeatCount="indefinite"/></circle>'
                );
            }
        }
        return string.concat(stars, "</g>");
    }

    function drawConstellation(
        uint16 constellationID,
        uint8 toShow
    ) private view returns (string memory, uint8 leftovers) {
        (string memory constellation, uint8 count) = Constellations
            .getConstellation(constellationID, toShow);
        return (
            string.concat('<g id="constellation">', constellation, "</g>"),
            count
        );
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

    function getDecos(
        address decorator,
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        return
            string.concat(
                // getFocus(dna, gazes, daytime),
                getSkyMath(decorator, tokenId, dna, gazes, daytime),
                getDecorationOne(decorator, tokenId, dna, gazes, daytime),
                getSilhouette(decorator, tokenId, dna, gazes, daytime)
            );
    }

    function getSilhouette(
        address decorator,
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        if (decorator == address(0)) return "";
        IDecorations deco = IDecorations(decorator);
        return deco.getSilhouette(tokenId, dna, gazes, daytime);
    }

    function getSkyMath(
        address decorator,
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        if (decorator == address(0)) return "";
        IDecorations deco = IDecorations(decorator);
        return deco.getSkyMath(tokenId, dna, gazes, daytime);
    }

    function getDecorationOne(
        address decorator,
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        if (decorator == address(0)) return "";
        IDecorations deco = IDecorations(decorator);
        return deco.getDecorationOne(tokenId, dna, gazes, daytime);
    }
}
