import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  TextField,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import videojs from 'video.js';
import { useWallet } from './providers/WalletProvider.js';

import './App.css';
// import { Client, isSupported } from '@livepeer/webrtmp-sdk';
import logo from './eth-diamond-rainbow.png';
import Stream from './components/Stream.js';

const streamPlaybackUrl = 'https://cdn.livepeer.com/hls/26cafzyg7i8yhgb5/index.m3u8';

// start streaming to livepeer
// start();

function App() {
  const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  const [mode, setMode] = useState('home');
  console.log('signer: ', signer)
  function onStreamNow(num){
    const contract = ERC721Contract({contractAddress: '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7', loginProvider: signer});
    console.log('this is:', contract);
  }
  const [users, setUsers] = useState([
    { id: 1, firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
  ]);

  useEffect(() => {

  }, []);

  useEffect(() => {
    console.log('mode', mode);
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
      </header>

      {mode === 'home' &&
        <Button
          variant='contained'
          onClick={() => {
            setMode('stream');
            console.log('setting mode to stream');
          }}
        >Start Stream</Button>
      }

      <div>
        {mode === 'stream' &&
          <Stream
            setMode={setMode}
          />
        }
      </div>

      <video data-setup='{}'>
        <source src={streamPlaybackUrl} type="application/x-mpegURL"/>
      </video>

      <div className="container">
            <h3 className="">Streaming Now</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td><button onClick={onStreamNow('0xfDCf84cD2d994d44f7b7854Db9aDD10A936aaC9A')}>StreamNow</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    
    
  );
};

export default App;
