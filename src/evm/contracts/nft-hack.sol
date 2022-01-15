
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTHACK {
  
  address adminAddress;
  // streams[NFT_CONTRACT_ADDRESS][HOST_ADDRESS] = Stream
  mapping(address => mapping(address => Stream)) streams;


  struct Stream {
    address host;
    address requiredCollection;
    string url;
  }

  event StreamCreated(address host, address requiredCollection, string url);

  modifier adminOnly {
    require(msg.sender == adminAddress);
    _;
  }

  constructor() {
    adminAddress = msg.sender;
  }

  function createStream(address requiredCollection, string calldata url) public returns (bool) {
    Stream memory newStream = Stream({
      host: msg.sender,
      requiredCollection: requiredCollection,
      url: url
    });
    streams[requiredCollection][msg.sender] = newStream;
    emit StreamCreated(msg.sender, requiredCollection, url);
    return true;
  }




}
