// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";


contract NFT is ERC721URIStorage, ERC721Enumerable {
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;
    uint256 private _tokenIdCounter; // 指向下一个要铸币的 tokenid
    address feeCollector;
    uint fee = 0 gwei;

    // 设置 name 和 symbol
    constructor(address fc) ERC721("MyNFT", "ITM") {
        feeCollector = fc;
    }
    function withdraw(address to)external {
        require(msg.sender == feeCollector, "no permission!");
        (bool suc, bytes memory  data) = to.call{value:address(this).balance}("");
        require(suc, "withdraw failed");
    }
    // 铸币：新发行一个 NFT 资产 / NFT Token
    // uri：token uri 外部资源链接，比如 想把 'lzx'发布为nft，则铸币时设置 uri 为 'lzx'，假设此 tokenid为 0，则通过 tokenURI(0) 就得到外部资源 uri 'lzx'，拿到外部资源地址就可以展示渲染
    function mint(address artist, string memory uri)
        public payable
        returns (uint256)
    {
        require(msg.value >= fee, "please privide fee!");

        // uint256 newItemId = _tokenIds.current();
        uint256 newItemId = _tokenIdCounter;
        _mint(artist, newItemId); // 调用 ERC721 的 _mint，将铸币交付给 拥有者player
        _setTokenURI(newItemId, uri); // 调用 ERC721URIStorage 的 _setTokenURI
        // _tokenIds.increment();
        _tokenIdCounter += 1;
        return newItemId;
    }
    // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 tokenId,
    //     uint256 batchSize
    // ) internal override(ERC721, ERC721Enumerable) {
    //     super._beforeTokenTransfer(from, to, tokenId,batchSize);
    // }

    function supportsInterface(bytes4 interfaceId) public view  override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    // 根据 tokenid 取 tokenURI
    function tokenURI(uint256 tokenId) public view  override(ERC721, ERC721URIStorage)  returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }
    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        return super._increaseBalance(account, value);
    }
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }
    struct Token{
        uint tokenId;
        string tokenUrl;
    }
    function myTokens()public view returns(Token[] memory) {
        address owner = msg.sender;
        uint balance = balanceOf(owner);

        Token[] memory res = new Token[](balance);
        for(uint i = 0; i < res.length; i++){
            uint tokenId =  tokenOfOwnerByIndex(owner, i);
            res[i].tokenId = tokenId;
            res[i].tokenUrl = tokenURI(tokenId);
        }
        return res; 
    }
}