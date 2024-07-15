// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../../../../lib/ERC721A/contracts/extensions/ERC721AQueryable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

import {IChainellationRenderer} from "../interfaces/IChainellationRenderer.sol";
import "../Color.sol";

contract Chainellation is ERC721AQueryable {
    using Strings for uint256;

     struct Stats {
        uint32 timeZoneOffset;
        uint32 colors;
    }

    uint256 public currentSupply;
    uint256 public maxSupply = 15000;

    uint256 public mintCost = 0;
    uint256 public customizeCost = 0; // 5 * 10 ** 15;

    mapping(uint256 => Color.DNA) public dnas;
    mapping(uint256 => Stats) public stats;

    IChainellationRenderer private _renderer;

    // mapping(uint256 => HeroRenderer) public renderers;
    uint256 rendererCount;

    address public minter;
    address admin;

    constructor(address renderer) ERC721A("Senso Hero", "HERO") {
        // addRenderer(renderer);
        _renderer = IChainellationRenderer(renderer);
        admin = msg.sender;
    }  

    function tokenURI(
        uint256 tokenId
    ) public view virtual override(ERC721A, IERC721A) returns (string memory) {
        if (tokenId > currentSupply) revert NotMinted();

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "chainellation #',
            tokenId.toString(),
            '",',
            '"description": "chainellation",',
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
            '"name": "Two Moons Night Skies",',
            '"description": "Your window into the Night Sky.  Stargaze to reveal your secret constellation, and customize your view with replacable parts of the image."',
            '"external_url": "https://www.chainellation.com/"',
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

 function mint(uint32 timezoneOffset) public payable {
        if (msg.value != mintCost) revert Cost();

        _mint(timezoneOffset, 0, 0, 0, msg.sender);
    }

    function mintCustom(
        uint32 timezoneOffset,
        uint16 firstH,
        uint16 secondH,
        uint8 _constellation,
        uint8 _cloudsAt
    ) public payable {
        uint256 rollingCost = mintCost;
        //370 is not a valid Hue
        if (firstH != 370 || secondH != 370) {
            rollingCost += customizeCost;
        }
        if (_constellation != 0) {
            rollingCost += customizeCost;
        }

        if (_cloudsAt != 0) {
            rollingCost += customizeCost;
        }

        if (msg.value != rollingCost) revert Cost();

        _mint(
            timezoneOffset,
            (uint32(firstH) << 16) | uint32(secondH),
            _constellation,
            _cloudsAt,
            msg.sender
        );
    }

    function freeMint(uint32 timezoneOffset) public {
        _mint(timezoneOffset, 0, 0, 0, msg.sender);
    }

    // if the timezone offset is negative, we're gonna pretend like it's a day in the future
    // this doesn't matter because the timezone offset is only used to determine the time of day
    // and not the actual day.
    function _mint(
        uint32 _timezoneOffset,
        uint32 _colorData,
        uint8 _constellation,
        uint8 _cloudsAt,
        address _to
    ) private {
        if (currentSupply >= maxSupply) revert MaxSupplyReached();
        currentSupply++;

        Stats memory current;
        current.timeZoneOffset = _timezoneOffset;

        // 24248690 is a byte packed 370 + 370, which are the default colors
        if (_colorData == 24248690) {
            uint16 primary = uint16((currentSupply % 16) * 10);
            uint16 secondary = Color
                .rotateColor(Color.HSL(primary, 0, 0), 60)
                .H;
            _colorData = (uint32(primary) << 16) | uint32(secondary);
        }

        current.colors = _colorData;
        if (_constellation > 16) {
            _constellation = 0;
        }

        if (_constellation == 0) {
            _constellation = uint8(
                (_renderer.psuedorandom(currentSupply, 123) % 15) + 1
            );
        }

        if (_cloudsAt > 5) {
            _cloudsAt = 0;
        }

        if (_cloudsAt == 0) {
            _constellation = uint8(
                (_renderer.psuedorandom(currentSupply, 321) % 4) + 1
            );
        }

        stats[currentSupply] = current;
        _mint(_to, 1);
    }

    function generateCharacter(
        uint256 tokenId
    ) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(
            generateSVG(tokenId, !isNight(tokenId))
        );

        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getColors(uint256 tokenId) public view returns (uint32) {
        if (stats[tokenId].colors == 0) {
            uint16 primary = uint16((tokenId % 16) * 10);
            uint16 secondary = Color
                .rotateColor(Color.HSL(primary, 0, 0), 60)
                .H;
            return (uint32(primary) << 16) | uint32(secondary);
        } else {
            return stats[tokenId].colors;
        }
    }

    function generateSVG(
        uint256 _tokenId,
        bool _sunUp
    ) public view returns (string memory) {
        return
            _renderer.generateSVG(
                _tokenId,
                Color.genDNA(
                    _tokenId,
                    getColors(_tokenId)
                ),
                _sunUp
            );
    }



    function setMaxSupply(uint256 _maxSupply) public {
        maxSupply = _maxSupply;
    }

    function setMintCost(uint256 _newMintCost) public {
        mintCost = _newMintCost;
    }

    function setCustomizeCost(uint256 _newCost) public {
        customizeCost = _newCost;
    }

    function setRenderer(address renderer) public {
        _renderer = IChainellationRenderer(renderer);
    }

    function systemTimeOffsetWithUser(
        uint256 tokenId
    ) public view virtual returns (uint48) {
        return (uint48)(block.timestamp + (stats[tokenId].timeZoneOffset));
        // return (uint48)(block.timestamp + (timeZoneOffset[tokenId]));
    }

    function isNight(uint256 tokenId) public view returns (bool) {
        uint8 hour = (uint8)(
            (systemTimeOffsetWithUser(tokenId) / 60 / 60) % 24
        );
        return hour < 6 || hour > 18;
    }

    function withdraw() external {
        payable(address(_msgSenderERC721A())).transfer(address(this).balance);
    }

    function withdrawToken(
        address _tokenContract,
        uint256 _amount
    ) external  {
        IERC20(_tokenContract).transfer(msg.sender, _amount);
    }

    function _startTokenId() internal view override returns (uint256) {
        return 1;
    }

    error NotTheOwner();
    error NotEnoughTimePassed();
    error MaxSupplyReached();
    error NotNight();
    error Cost();
    error TooCloudy();
    error NotMinted();
}

interface IERC20 {
    function transfer(address _to, uint256 _amount) external returns (bool);
}

