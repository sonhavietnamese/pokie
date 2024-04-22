// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./PokieID.sol";

contract PokieBall is ERC1155, Ownable, ERC1155Burnable {
    address contractAddress;

    PokieID public pokieID;

    constructor(
        address initialOwner,
        address marketplaceAddress,
        address idAddress
    )
        ERC1155("https://pokemon-psi-two.vercel.app/api/metadata/balls/{id}")
        Ownable(initialOwner)
    {
        contractAddress = marketplaceAddress;
        pokieID = PokieID(idAddress);
    }

    function craft(uint8 id) public {
        _mint(msg.sender, id, 1, "");
        setApprovalForAll(contractAddress, true);
        pokieID.addPoints(msg.sender, 10);
    }

    function burn(uint256 id) public {
        _burn(msg.sender, id, 1);
    }

    function uri(
        uint256 _tokenid
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://pokemon-psi-two.vercel.app/api/metadata/balls/",
                    Strings.toString(_tokenid)
                )
            );
    }
}
