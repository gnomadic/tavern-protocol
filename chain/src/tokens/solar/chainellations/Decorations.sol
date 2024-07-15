// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IDeco.sol";
import "../interfaces/IDecorations.sol";
import "./Constellations.sol";

contract Decorations is IDecorations {
    struct SetDecoration {
        address silhouette;
        address skyMath;
        address decorationOne;
    }

    struct Deco {
        uint8 decoType;
        uint256 decoId;
    }

    uint8 public constant SILHOUTTE = 1;
    uint8 public constant SKY_MATH = 2;
    uint8 public constant DECORATION_ONE = 3;

    address private _chainellation;

    mapping(address => uint8) private _slot;

    address[] public allDecorations;

    mapping(uint256 => SetDecoration) private _decorations;

    constructor(address chainellation) {
        _chainellation = chainellation;
    }

    function getAllDecorations() public view returns (address[] memory) {
        return allDecorations;
    }

    function getAvailableDecorations(
        address user
    ) public view returns (address[] memory, uint256[] memory) {
        address[] memory availableDecorations = new address[](
            allDecorations.length
        );
        uint256[] memory ids = new uint256[](allDecorations.length);

        for (uint8 i = 0; i < allDecorations.length; i++) {
            if (IDeco(allDecorations[i]).balanceOf(user) > 0) {
                availableDecorations[i] = allDecorations[i];
                ids[i] = _slot[allDecorations[i]];
            }
        }
        return (availableDecorations, ids);
    }

    function register(address _deco, uint8 spot) public {
        if (_slot[_deco] != 0) revert AlreadyRegistered();

        _slot[_deco] = spot;
        allDecorations.push(_deco);
    }

    function unregister(address _deco) public {
        _slot[_deco] = 0;

        uint256 index = 0;

        for (uint i = index; i < allDecorations.length - 1; i++) {
            if (allDecorations[i] == _deco) {
                index = i;
                break;
            }
        }

        for (uint i = index; i < allDecorations.length - 1; i++) {
            allDecorations[i] = allDecorations[i + 1];
        }
        delete allDecorations[allDecorations.length - 1];
        allDecorations.pop();
    }

    function reset() public {
        for (uint i = 0; i < allDecorations.length; i++) {
            _slot[allDecorations[i]] = 0;
        }
        delete allDecorations;
    }

    function setDecorationBatch(
        uint256 tokenId,
        uint8[] memory decoTypes,
        address[] memory decos,
        uint256[] memory decoIds
    ) public {
        for (uint256 i = 0; i < decoIds.length; i++) {
            setDecoration(tokenId, decoTypes[i], decos[i], decoIds[i]);
        }
    }

    function setDecoration(
        uint256 tokenId,
        uint8 decoType,
        address deco,
        uint256 decoId
    ) public {
        if (IDeco(_chainellation).ownerOf(tokenId) != msg.sender)
            revert NotOwner();

        if (IDeco(deco).ownerOf(decoId) != msg.sender) revert NotOwner();

        //check if deco is registered
        if (_slot[deco] != decoType) revert InvalidDecoType();

        // set NFT to be souldbound
        IDeco(deco).soulbind(decoId);

        if (decoType == SILHOUTTE) {
            _decorations[tokenId].silhouette = deco;
        } else if (decoType == SKY_MATH) {
            _decorations[tokenId].skyMath = deco;
        } else if (decoType == DECORATION_ONE) {
            _decorations[tokenId].decorationOne = deco;
        } else {
            revert InvalidDecoType();
        }
    }

    function getSilhouette(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) public view returns (string memory) {
        if (_decorations[tokenId].silhouette == address(0)) {
            return '<g id="silhouette"></g>';
        }
        return
            IDeco(_decorations[tokenId].silhouette).getDeco(
                tokenId,
                dna,
                gazes,
                daytime
            );
    }

    function getSkyMath(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) public view returns (string memory) {
        if (_decorations[tokenId].skyMath == address(0)) {
            return '<g id="skymath"></g>';
        }
        return
            IDeco(_decorations[tokenId].skyMath).getDeco(
                tokenId,
                dna,
                gazes,
                daytime
            );
    }

    function getDecorationOne(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) public view returns (string memory) {
        if (_decorations[tokenId].decorationOne == address(0)) {
            return '<g id="deco"></g>';
        }
        return
            IDeco(_decorations[tokenId].decorationOne).getDeco(
                tokenId,
                dna,
                gazes,
                daytime
            );
    }

    function withdraw() external {
        payable(address(msg.sender)).transfer(address(this).balance);
    }

    function withdrawToken(
        address _tokenContract,
        uint256 _amount
    ) external {
        IERC20(_tokenContract).transfer(msg.sender, _amount);
    }

    error AlreadyRegistered();
    error NotOwner();
    error InvalidDecoType();
}

interface IERC20 {
    function transfer(address _to, uint256 _amount) external returns (bool);
}
