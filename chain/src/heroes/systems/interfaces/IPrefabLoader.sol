// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IPrefabLoader {

     function loadFromPrefab(
        uint256 tokenId,
        uint256 prefabId
    ) external  ;
}

