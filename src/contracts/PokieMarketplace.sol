// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PokieID.sol";

contract PokieMarketplace is Ownable {
    uint256 private _itemIds;
    uint256 private _itemsSold;

    IERC20 public tokenAddress;
    PokieID public pokieID;

    uint256 listingPrice = 0.001 ether;

    constructor(
        address initialOwner,
        address _tokenAddress,
        address idAddress
    ) Ownable(initialOwner) {
        tokenAddress = IERC20(_tokenAddress);
        pokieID = PokieID(idAddress);
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price,
        bool sold
    );

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public {
        _itemIds += 1;

        uint256 itemId = _itemIds;

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            price,
            false
        );

        pokieID.addPoints(msg.sender, 25);

        IERC1155(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            1,
            ""
        );

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            price,
            false
        );
    }

    function createMarketSale(address nftContract, uint256 itemId) public {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;

        tokenAddress.transferFrom(
            msg.sender,
            idToMarketItem[itemId].seller,
            price
        );
        pokieID.addPoints(msg.sender, 25);
        IERC1155(nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            1,
            ""
        );
        idToMarketItem[itemId].sold = true;
        _itemsSold += 1;
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds;
        uint unsoldItemCount = _itemIds - _itemsSold;
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].sold == false) {
                uint currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
}
