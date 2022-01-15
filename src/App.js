import { useEffect, useState } from 'react';
import ERC721Contract from './libs/ERC721Contract';
import {
  TextField,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import videojs from 'video.js';
import { useWallet } from './providers/WalletProvider.js';

import './App.css';
import logo from './eth-diamond-rainbow.png';
import Stream from './components/Stream.js';
import { getOwnerNfts } from './libs/util.js';

const streamPlaybackUrl = 'https://cdn.livepeer.com/hls/26cafzyg7i8yhgb5/index.m3u8';


function App() {
  const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  const [mode, setMode] = useState('home');

  useEffect(() => {
    if (!address || !signer) return;
    console.log('address: ', address)
    const init = async () => {
      const contractAddress = '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7';
      console.log(1);
      const contract = ERC721Contract({ contractAddress, loginProvider: signer });
      console.log(2);
      const result = await contract.balanceOf(address);
      console.log('result', result);
      // const result = await contract.ownerOf(0);
      // const result = await contract._holderTokens(address);
      const ownedIds = await getOwnerNfts(contractAddress, address, signer);
      console.log('ownedIds', ownedIds);
    };
    init();
  }, [address, signer]);

  useEffect(() => {
    console.log('mode set to: ' + mode);
  }, [mode]);

  useEffect(() => {
    if (!account) return;
    console.log('account set!', account);
  }, [account]);

  useEffect(() => {
    if (!accounts?.length) return;
    console.log('accounts set!', accounts[0]);
  }, [accounts]);

  const networkInfoBox = () => {
    return (
      <Grid container item
        sm={12}
        className='networkInfoBox'
        justifyContent='center'
        direction='column'
      >
        <Typography>Connected: {isConnected ? 'yes' : 'no'}</Typography>
        <Typography>Address: {address}</Typography>
        <Typography>Network: {network?.name} ({networkId})</Typography>
      </Grid>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {networkInfoBox()}
        <img src={logo} className="App-logo" alt="logo" />
        <p className="title">
          NFT HACK
        </p>
        {/* <video  src="https://cdn.livepeer.com/hls/3fc3wygcixo3kwps/index.m3u8" controls autoplay></video> */}

        <div className='button'>
          {mode === 'home' &&
            <Button
              variant='contained'
              onClick={() => {
                setMode('stream');
              }}
            >Open Stream</Button>
          }
        </div>

        <div>
          {mode === 'stream' &&
            <Stream
              setMode={setMode}
            />
          }
        </div>

      </header>
      

      <video data-setup='{}'>
        <source src={streamPlaybackUrl} type="application/x-mpegURL"/>
      </video>
    </div>
    
    
  );
};

export default App;
