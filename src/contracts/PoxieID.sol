// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PoxieID is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    mapping(address => bool) private _hasToken;
    mapping(address => uint256) public attendence;
    mapping(address => uint256) public points;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    constructor(
        address initialOwner
    ) ERC721("PoxieID", "PXID") Ownable(initialOwner) {}

    function safeMint(address to, string memory uri) public onlyOwner {
        require(!_hasToken[to], "User already has a ID");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _hasToken[to] = true;
        attendence[to] = 0;
    }

    function burn(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only owner of the token can burn ID"
        );
        _burn(tokenId);
        _hasToken[msg.sender] = false;
    }

    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
        address tokenOwner = ownerOf(tokenId);
        _hasToken[tokenOwner] = false;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256
    ) internal pure virtual {
        require(
            from == address(0) || to == address(0),
            "Not allowed to transfer token"
        );
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function makeAttendance(address _address) public {
        attendence[_address]++;
    }

    function getAttendance(address _address) public view returns (uint256) {
        return attendence[_address];
    }

    function addPoints(address _address, uint256 _points) public {
        points[_address] += _points;
    }

    function getPoint(address _address) public view returns (uint256) {
        return points[_address];
    }
}
