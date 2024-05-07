// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PoxieID.sol";

contract PoxieAxie is Ownable, ERC1155Holder {
    address internal _axieContract;
    PoxieID public poxieID;

    constructor(
        address initialOwner,
        address axieContractAddress,
        address idAddress
    ) Ownable(initialOwner) {
        _axieContract = axieContractAddress;
        poxieID = PoxieID(idAddress);
    }

    function captureAxie(address to, uint256 axieId) external onlyOwner {
        IERC721(_axieContract).safeTransferFrom(address(this), to, axieId);
        poxieID.addPoints(to, 250);
    }
}
