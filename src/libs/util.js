import { ethers } from 'ethers';
import ERC721Contract from './ERC721Contract';

const getLogs = (receipt, abi) => {
  let iface = new ethers.utils.Interface(abi);
  var logs = receipt.logs.map(log => {
    var parsedLog = null;
    try {
      parsedLog = iface.parseLog(log);
    } catch (e) {
      // console.log('unable to parse log', log, e);
      return null;
    }
    return parsedLog;
  }).filter(log => log !== null);
  return logs;
};

const getOwnerNfts = async (contractAddress, ownerAddress, provider) => {
  // const contract = ERC721Contract({ contractAddress, loginProvider: provider });
  // const totalSupplyBN = await contract.totalSupply();
  // const totalSupply = totalSupplyBN.toNumber();
  // console.log('totalSupply', totalSupply);
  // var ownedIds = [];
  // var range = [...Array(totalSupply).keys()];
  // console.log('range', range);
  // await Promise.all(range.map(async i => {
  //   const result = await contract.ownerOf(i);
  //   if (result === ownerAddress) {
  //     ownedIds.push(i);
  //   }
  // }));
  // return ownedIds;

  // @todo use _tokensOfOwner from 

  // using Covalent API

};



export {
  getLogs,
  getOwnerNfts,
};