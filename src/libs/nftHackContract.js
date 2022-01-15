import { Contract, providers } from 'ethers';
// import { getProvider } from './web3Providers.js';
import NftHack from '../evm/artifacts/contracts/main.sol/NFTHACK.json';

export default ({ contractAddress, networkId, loginProvider, config, }) => {
  return new Contract(contractAddress, NftHack.abi, loginProvider);
};