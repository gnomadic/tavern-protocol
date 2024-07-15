// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;
// import "@openzeppelin/contracts/utils/Strings.sol";
// import "../../../../lib/solady/src/utils/LibString.sol";
import {console} from 'forge-std/console.sol';

library Constellations {

    function getConstellation(
        uint16 seed,
        uint8 gazed
    ) public view returns (string memory, uint8 leftovers) {
        if (seed == 1) {
            return Aries(gazed);
        } else if (seed == 2) {
            return Sagittarius(gazed);
        } else if (seed == 3) {
            return Capricorn(gazed);
        } else if (seed == 4) {
            return Aquarius(gazed);
        } else if (seed == 5) {
            return Pisces(gazed);
        } else if (seed == 6) {
            return Scorpio(gazed);
        } else if (seed == 7) {
            return Libra(gazed);
        } else if (seed == 8) {
            return Virgo(gazed);
        } else if (seed == 9) {
            return Leo(gazed);
        } else if (seed == 10) {
            return Cancer(gazed);
        } else if (seed == 11) {
            return Gemini(gazed);
        } else if (seed == 12) {
            return Taurus(gazed);
        } else if (seed == 13) {
            return Pegasus(gazed);
        } else if (seed == 14) {
            return UrsaMinor(gazed);
        } else {
            return Cygnus(gazed);
        }
    }

    function buildStar(
        string[] memory stars,
        string memory open,
        string memory close,
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        uint8 overflow = 0;
        console.log("show from buildStar: ", show);
        console.log("stars length from buildStar: ", stars.length);
        if (show > stars.length) {
            overflow = show - (uint8)(stars.length);
            show = (uint8)(stars.length);
        }

        console.log("overflow from buildStar: ", overflow);
        string memory constellation = "";
        constellation = string.concat(constellation, open);
        for (uint8 i = 0; i < show; i++) {
            constellation = string.concat(constellation, stars[i]);
        }
        if (show == stars.length) {
            constellation = string.concat(constellation, close);
        } else {
            constellation = string.concat(constellation, "</g>");
        }
        // return (constellation, ((uint8)(stars.length) - show));
        return (constellation, overflow);
    }

    function Aries(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](6);

        string
            memory open = '<g transform="translate(316,133), rotate(0)" fill="#fff" opacity="0.8">';

        stars[0] = '<circle cx="-30" cy="60" r="2"/>';
        stars[1] = '<circle cx="-10" cy="45" r="2"/>';
        stars[2] = '<circle cx="5" cy="0" r="2"/>';
        stars[3] = '<circle cx="55" cy="10" r="2"/>';
        stars[4] = '<circle cx="80" cy="30" r="2"/>';
        stars[5] = '<circle cx="85" cy="45" r="2"/>';

        string
            memory close = '<path d="m -30 60 L -10 45 L 5 0 L 55 10 L 80 30 L 85 45" fill="none" stroke="white" opacity=".5"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Sagittarius(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string
            memory open = '<g transform="translate(234,-290), rotate(0)" fill="#fff" opacity="0.8">';
        string[] memory stars = new string[](20);

        stars[0] = '<circle r="2" cx="169" cy="447"/>';
        stars[1] = '<circle r="2" cx="148" cy="462"/>';
        stars[2] = '<circle r="2" cx="139" cy="482"/>';
        stars[3] = '<circle r="2" cx="136" cy="419"/>';
        stars[4] = '<circle r="2" cx="134" cy="457"/>';
        stars[5] = '<circle r="2" cx="132" cy="475"/>';
        stars[6] = '<circle r="2" cx="128" cy="441"/>';
        stars[7] = '<circle r="2" cx="110" cy="449"/>';
        stars[8] = '<circle r="2" cx="100" cy="446"/>';
        stars[9] = '<circle r="2" cx="97" cy="460"/>';
        stars[10] = '<circle r="2" cx="97" cy="421"/>';
        stars[11] = '<circle r="2" cx="91" cy="519"/>';
        stars[12] = '<circle r="2" cx="91" cy="453"/>';
        stars[13] = '<circle r="2" cx="90" cy="426"/>';
        stars[14] = '<circle r="2" cx="88" cy="507"/>';
        stars[15] = '<circle r="2" cx="81" cy="424"/>';
        stars[16] = '<circle r="2" cx="71" cy="515"/>';
        stars[17] = '<circle r="2" cx="66" cy="415"/>';
        stars[18] = '<circle r="2" cx="62" cy="446"/>';
        stars[19] = '<circle r="2" cx="42" cy="468"/>';

        string
            memory close = '<path d="m169, 447 L 148, 462 L 134,457 L 132, 475 L 139, 482 M 134,457 L 128,441 L 136,419 M 128, 441 L 110, 449 L 100,446 L 90,426 L 97,421 M 90,426 L 81,424 L 66,415 M 110, 449 L 97, 460 L 91, 453 L 100,446 M 91,453 L 62, 446 L 42, 468 L 71, 515 L 88,507 M 71,515 L 91,519" stroke="#fff" opacity=".5" fill="none"/></g>';

        return buildStar(stars, open, close, show);
    }

    function Capricorn(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](11);

        string
            memory open = '<g transform="translate(114,-300), rotate(0)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2" cx="254" cy="492"/>';
        stars[1] = '<circle r="2" cx="253" cy="483"/>';
        stars[2] = '<circle r="2" cx="241" cy="498"/>';
        stars[3] = '<circle r="2" cx="232" cy="424"/>';
        stars[4] = '<circle r="2" cx="231" cy="414"/>';
        stars[5] = '<circle r="2" cx="221" cy="510"/>';
        stars[6] = '<circle r="2" cx="212" cy="481"/>';
        stars[7] = '<circle r="2" cx="202" cy="514"/>';
        stars[8] = '<circle r="2" cx="201" cy="495"/>';
        stars[9] = '<circle r="2" cx="191" cy="511"/>';
        stars[10] = '<circle r="2" cx="189" cy="519"/>';
        string
            memory close = '<path d="M 254, 492 L 241, 498 L 221, 510 L 202,514 L 189, 519 L 191, 511 L 201,495 L 212, 481 L 232, 424 L 231 414 M 232, 424 L 253, 483" stroke="#fff" opacity=".5" fill="none"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Aquarius(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](13);
        string
            memory open = '<g transform="translate(-6,-300), rotate(0)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2" cx="378" cy="406 "/>';
        stars[1] = '<circle r="2" cx="372" cy="530 "/>';
        stars[2] = '<circle r="2" cx="354" cy="517 "/>';
        stars[3] = '<circle r="2" cx="347" cy="512 "/>';
        stars[4] = '<circle r="2" cx="339" cy="435 "/>';
        stars[5] = '<circle r="2" cx="335" cy="476 "/>';
        stars[6] = '<circle r="2" cx="325" cy="515 "/>';
        stars[7] = '<circle r="2" cx="319" cy="534 "/>';
        stars[8] = '<circle r="2" cx="302" cy="459 "/>';
        stars[9] = '<circle r="2" cx="302" cy="480 "/>';
        stars[10] = '<circle r="2" cx="292" cy="484 "/>';
        stars[11] = '<circle r="2" cx="289" cy="492 "/>';
        stars[12] = '<circle r="2" cx="365" cy="472 "/>';
        string
            memory close = '<path d="M378, 406 L 339, 435 L 302, 459 L 302, 480 L 292 484 L 289, 492 L 319 534 L 325,515 L 347,512 L 354,517 L 372,530 M 302,459 L 335,476 L 365 472" fill="none" stroke="#fff" opacity=".5"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Pisces(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](17);

        string
            memory open = '<g transform="translate(14,-170), rotate(0) scale(0.7)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2.86" cx="523" cy="547 "/>';
        stars[1] = '<circle r="2.86" cx="502" cy="526 "/>';
        stars[2] = '<circle r="2.86" cx="495" cy="541 "/>';
        stars[3] = '<circle r="2.86" cx="482" cy="502 "/>';
        stars[4] = '<circle r="2.86" cx="475" cy="484 "/>';
        stars[5] = '<circle r="2.86" cx="474" cy="417 "/>';
        stars[6] = '<circle r="2.86" cx="471" cy="400 "/>';
        stars[7] = '<circle r="2.86" cx="468" cy="427 "/>';
        stars[8] = '<circle r="2.86" cx="465" cy="539 "/>';
        stars[9] = '<circle r="2.86" cx="459" cy="445 "/>';
        stars[10] = '<circle r="2.86" cx="457" cy="395 "/>';
        stars[11] = '<circle r="2.86" cx="454" cy="425 "/>';
        stars[12] = '<circle r="2.86" cx="448" cy="401 "/>';
        stars[13] = '<circle r="2.86" cx="445" cy="413 "/>';
        stars[14] = '<circle r="2.86" cx="425" cy="541 "/>';
        stars[15] = '<circle r="2.86" cx="415" cy="553 "/>';
        stars[16] = '<circle r="2.86" cx="400" cy="544 "/>';
        string
            memory close = '<path d="m400, 544 L 415, 553 L 425,541 L465, 539 L 495, 541 L 523, 547 L 502, 526 L 482, 502 L 475, 484 L 459, 445 L 454, 425 L 445, 413 L 448, 401 L 457, 395 L 471, 400 L 474, 417 L 468, 427 L 454 425 " stroke="#fff" opacity=".5" fill="none" stroke-width="1.43"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Scorpio(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](15);

        string
            memory open = '<g transform="translate(-121,-120), rotate(0)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2" cx="513" cy="256 "/>';
        stars[1] = '<circle r="2" cx="513" cy="268 "/>';
        stars[2] = '<circle r="2" cx="510" cy="248 "/>';
        stars[3] = '<circle r="2" cx="489" cy="264 "/>';
        stars[4] = '<circle r="2" cx="481" cy="268 "/>';
        stars[5] = '<circle r="2" cx="475" cy="274 "/>';
        stars[6] = '<circle r="2" cx="458" cy="296 "/>';
        stars[7] = '<circle r="2" cx="456" cy="314 "/>';
        stars[8] = '<circle r="2" cx="452" cy="328 "/>';
        stars[9] = '<circle r="2" cx="435" cy="333 "/>';
        stars[10] = '<circle r="2" cx="419" cy="304 "/>';
        stars[11] = '<circle r="2" cx="415" cy="332 "/>';
        stars[12] = '<circle r="2" cx="410" cy="313 "/>';
        stars[13] = '<circle r="2" cx="405" cy="320 "/>';
        stars[14] = '<circle r="2" cx="513" cy="281 "/>';
        string
            memory close = '<path d="m419, 304 L 410, 313 L 405, 320 L 415, 332 L 435, 333 L  452, 328 L 456, 314 L 458, 296 L 475, 274 L 481, 268 L 489, 264 L 513, 256 L 510, 248 M 513, 256 L 513, 268 L 513 281" stroke="#fff" opacity=".5" fill="none"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Libra(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](8);
        string
            memory open = '<g transform="translate(4,-120), rotate(0)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2" cx="361" cy="272 "/>';
        stars[1] = '<circle r="2" cx="356" cy="307 "/>';
        stars[2] = '<circle r="2" cx="335" cy="329 "/>';
        stars[3] = '<circle r="2" cx="335" cy="321 "/>';
        stars[4] = '<circle r="2" cx="333" cy="252 "/>';
        stars[5] = '<circle r="2" cx="324" cy="276 "/>';
        stars[6] = '<circle r="2" cx="318" cy="281 "/>';
        stars[7] = '<circle r="2" cx="309" cy="287 "/>';
        string
            memory close = '<path d="M 309, 287 L 318, 281 L 324, 276 L 333, 252 L 361, 272, 356, 307 L  335, 321 L 335, 329 M 356, 307 L 333, 252 " stroke="#fff" opacity=".5" fill="none"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Virgo(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](12);
        string
            memory open = '<g transform="translate(114,-114), rotate(0)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2" cx="261" cy="296 "/>';
        stars[1] = '<circle r="2" cx="251" cy="225 "/>';
        stars[2] = '<circle r="2" cx="248" cy="276 "/>';
        stars[3] = '<circle r="2" cx="246" cy="244 "/>';
        stars[4] = '<circle r="2" cx="241" cy="327 "/>';
        stars[5] = '<circle r="2" cx="231" cy="324 "/>';
        stars[6] = '<circle r="2" cx="225" cy="249 "/>';
        stars[7] = '<circle r="2" cx="223" cy="285 "/>';
        stars[8] = '<circle r="2" cx="221" cy="342 "/>';
        stars[9] = '<circle r="2" cx="207" cy="299 "/>';
        stars[10] = '<circle r="2" cx="198" cy="242 "/>';
        stars[11] = '<circle r="2" cx="188" cy="330 "/>';
        string
            memory close = '<path d="m221, 342 L 231, 324 L 241, 327 L 261, 296 L 248, 276 L  246, 244 L 251, 225 M 246, 244 L 225, 249 L 198, 242 M 225, 249 L 223, 285 L 261, 296 M 223, 285 L 207 299 L 188 330" stroke="#fff" opacity=".5" fill="none"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Leo(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](9);

        string
            memory open = '<g transform="translate(254,-114), rotate(0)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2" cx="136" cy="276 "/>';
        stars[1] = '<circle r="2" cx="120" cy="264 "/>';
        stars[2] = '<circle r="2" cx="108" cy="224 "/>';
        stars[3] = '<circle r="2" cx="102" cy="265 "/>';
        stars[4] = '<circle r="2" cx="94" cy="226 "/>';
        stars[5] = '<circle r="2" cx="92" cy="253 "/>';
        stars[6] = '<circle r="2" cx="80" cy="324 "/>';
        stars[7] = '<circle r="2" cx="64" cy="307 "/>';
        stars[8] = '<circle r="2" cx="61" cy="344 "/>';
        string
            memory close = '<path d="m108,224 L 94, 226 L 92, 253 L 102, 265 L 120 264 L  136 276 L 80 324 L 61 344L 64 307 L 102 265 M 80 324 L 120 264" stroke="#fff" opacity=".5" fill="none"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Cancer(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](5);

        string
            memory open = '<g transform="translate(-106,50), rotate(0)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2" cx="491" cy="143 "/>';
        stars[1] = '<circle r="2" cx="443" cy="123 "/>';
        stars[2] = '<circle r="2" cx="440" cy="157 "/>';
        stars[3] = '<circle r="2" cx="437" cy="112 "/>';
        stars[4] = '<circle r="2" cx="418" cy="88 "/>';
        string
            memory close = '<path d="m491 143 L 443, 123 L 437 112 L 418 88 M 442 123 L 440 157   " stroke="#fff" opacity=".5" fill="none"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Gemini(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](13);

        string
            memory open = '<g transform="translate(4,50), rotate(0)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2" cx="386" cy="116 "/>';
        stars[1] = '<circle r="2" cx="377" cy="115 "/>';
        stars[2] = '<circle r="2" cx="374" cy="128 "/>';
        stars[3] = '<circle r="2" cx="365" cy="144 "/>';
        stars[4] = '<circle r="2" cx="359" cy="109 "/>';
        stars[5] = '<circle r="2" cx="359" cy="162 "/>';
        stars[6] = '<circle r="2" cx="334" cy="132 "/>';
        stars[7] = '<circle r="2" cx="324" cy="89 "/>';
        stars[8] = '<circle r="2" cx="319" cy="125 "/>';
        stars[9] = '<circle r="2" cx="315" cy="87 "/>';
        stars[10] = '<circle r="2" cx="306" cy="86 "/>';
        stars[11] = '<circle r="2" cx="297" cy="116 "/>';
        stars[12] = '<circle r="2" cx="295" cy="106 "/>';
        string
            memory close = '<path d="m386 , 116 L 377, 115 L 374, 128 L 365, 144 L 334, 132 L  319, 125 L 297 116 L 295 106 L 306 86 L 315 87 L 324 89 L 359 109 L 377 115 M 365 144 L 359 162" stroke="#fff" opacity=".5" fill="none"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Taurus(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](12);

        string
            memory open = '<g transform="translate(194,80), rotate(0) scale(0.7)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="2.86" cx="262" cy="184 "/>';
        stars[1] = '<circle r="2.86" cx="259" cy="175 "/>';
        stars[2] = '<circle r="2.86" cx="228" cy="154 "/>';
        stars[3] = '<circle r="2.86" cx="214" cy="139 "/>';
        stars[4] = '<circle r="2.86" cx="214" cy="129 "/>';
        stars[5] = '<circle r="2.86" cx="210" cy="127 "/>';
        stars[6] = '<circle r="2.86" cx="210" cy="121 "/>';
        stars[7] = '<circle r="2.86" cx="207" cy="135 "/>';
        stars[8] = '<circle r="2.86" cx="203" cy="100 "/>';
        stars[9] = '<circle r="2.86" cx="201" cy="131 "/>';
        stars[10] = '<circle r="2.86" cx="184" cy="67 "/>';
        stars[11] = '<circle r="2.86" cx="164" cy="93 "/>';
        string
            memory close = '<path d="m262 184 L 259 175 L 228 154 L 214 139 L 214 129 L 210 127 L 210 121 L 203 100 L 184 67 M 214 139 L 207 135 L 201 131 L 164 93" stroke="#fff" opacity=".5" fill="none" stroke-width="1.43"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Pegasus(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](12);

        string
            memory open = '<g transform="translate(322 150)" fill="#fff" opacity="0.8">';

        stars[0] = '<circle cx="-13" r="2"/>';
        stars[1] = '<circle cx="22" cy="6" r="2"/>';
        stars[2] = '<circle cx="34" cy="1" r="2"/>';
        stars[3] = '<circle cx="51" cy="-7" r="2"/>';
        stars[4] = '<circle cx="-21" cy="35" r="2"/>';
        stars[5] = '<circle cx="20" cy="38" r="2"/>';
        stars[6] = '<circle cx="35" cy="50" r="2"/>';
        stars[7] = '<circle cx="54" cy="60" r="2"/>';
        stars[8] = '<circle cx="70" cy="50" r="2"/>';
        stars[9] = '<circle cx="31" cy="18" r="2"/>';
        stars[10] = '<circle cx="54" cy="13" r="2"/>';
        stars[11] = '<circle cx="66" cy="12" r="2"/>';
        string
            memory close = '<path d="M70 50 54 60 35 50 20 38l-41-3 8-35 35 6-2 32m46-26-12 1-23 5-9-12 12-5 17-8" fill="none" stroke="#fff" opacity=".5"/></g>';

        return buildStar(stars, open, close, show);
    }

    function UrsaMinor(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](7);

        string
            memory open = '<g transform="translate(320,130), rotate(-30)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle cx="0" cy="00" r="2" />';
        stars[1] = '<circle cx="-6" cy="20" r="2" />';
        stars[2] = '<circle cx="-9" cy="40" r="2" />';
        stars[3] = '<circle cx="-3" cy="60" r="2" />';
        stars[4] = '<circle cx="-18" cy="70" r="2"/>';
        stars[5] = '<circle cx="-12" cy="92" r="2"/>';
        stars[6] = '<circle cx="8" cy="91" r="2" />';
        string
            memory close = '<path d="m 0 00 L -6 20 L -9 40 L -3 60 L -18 70 L -12 92 L 8 91 L -3 60" fill="none" stroke="white" opacity=".5"/></g>';
        return buildStar(stars, open, close, show);
    }

    function Cygnus(
        uint8 show
    ) public view returns (string memory, uint8 leftovers) {
        string[] memory stars = new string[](6);
        string
            memory open = '<g transform="translate(134, -70) scale(3)" fill="#fff" opacity="0.8">';
        stars[0] = '<circle r="0.66" cx="87.000" cy="76.000"/>';
        stars[1] = '<circle r="0.66" cx="72.000" cy="76.000"/>';
        stars[2] = '<circle r="0.66" cx="62.000" cy="93.000"/>';
        stars[3] = '<circle r="0.66" cx="61.000" cy="64.000"/>';
        stars[4] = '<circle r="0.66" cx="59.000" cy="80.000"/>';
        stars[5] = '<circle r="0.66" cx="49.000" cy="79.000"/>';
        string
            memory close = '<path d="m87 76 L 72 76 L 59 80 L 49 79 M 62 93 L 59 80 L 61 64" stroke-width="0.333" fill="none" stroke="#fff" opacity=".5"/></g>';
        return buildStar(stars, open, close, show);
    }
}
