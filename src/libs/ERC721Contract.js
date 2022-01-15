import ERC721 from '../evm/artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json'
// import ERC721 from '../evm/artifacts/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol/ERC721Enumerable.json';
import { Contract } from 'ethers';
export default ({ contractAddress, loginProvider}) => {
  const provider = loginProvider;
  return new Contract(contractAddress, ERC721.abi, provider);
};