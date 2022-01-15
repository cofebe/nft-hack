import ERC721 from '../evm/artifacts/@openzeppelin/contracts/token/erc721/erc721.sol/ERC721.json';
import { Contract } from 'ethers';
export default ({ contractAddress, loginProvider}) => {
  const provider = loginProvider;
  return new Contract(contractAddress, ERC721.abi, provider);
};