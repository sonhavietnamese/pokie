// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./PokieID.sol";

contract PokieProps is ERC1155, Ownable, ERC1155Burnable {
    IERC20 public tokenAddress;
    PokieID public pokieID;

    constructor(
        address initialOwner,
        address _tokenAddress,
        address idAddress
    )
        ERC1155("https://pokemon-psi-two.vercel.app/api/metadata/props/{id}")
        Ownable(initialOwner)
    {
        tokenAddress = IERC20(_tokenAddress);
        pokieID = PokieID(idAddress);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(uint256 id, uint256 rate) public {
        tokenAddress.transferFrom(msg.sender, address(this), rate);
        _mint(msg.sender, id, 1, "");
        pokieID.addPoints(msg.sender, 10);
    }

    function withdrawToken() public onlyOwner {
        tokenAddress.transfer(
            msg.sender,
            tokenAddress.balanceOf(address(this))
        );
    }

    function uri(
        uint256 _tokenid
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://pokemon-psi-two.vercel.app/api/metadata/props/",
                    Strings.toString(_tokenid)
                )
            );
    }
}
