// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./PoxieID.sol";

contract PoxieBall is ERC1155, Ownable, ERC1155Burnable {
    address contractAddress;

    PoxieID public poxieID;

    constructor(
        address initialOwner,
        address marketplaceAddress,
        address idAddress
    )
        ERC1155("https://pokemon-psi-two.vercel.app/api/metadata/balls/{id}")
        Ownable(initialOwner)
    {
        contractAddress = marketplaceAddress;
        poxieID = PoxieID(idAddress);
    }

    function craft(uint8 id) public {
        _mint(msg.sender, id, 1, "");
        setApprovalForAll(contractAddress, true);
        poxieID.addPoints(msg.sender, 10);
    }

    function burn(uint256 id) public {
        _burn(msg.sender, id, 1);
    }
}
