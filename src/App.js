import { useEffect, useState } from 'react';
import videojs from 'video.js'

import './App.css';
import {
  Button,
  Typography,
} from '@mui/material';
// import { Client, isSupported } from '@livepeer/webrtmp-sdk';
import logo from './eth-diamond-rainbow.png';
import Stream from './components/Stream.js';

const streamPlaybackUrl = 'https://cdn.livepeer.com/hls/26cafzyg7i8yhgb5/index.m3u8';

// start streaming to livepeer
// start();

function App() {
  const [mode, setMode] = useState('home');

  useEffect(() => {

  }, []);

  useEffect(() => {
    console.log('mode', mode);
  }, [mode]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
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
    </div>
  );
};

// import {
//   TextField,
//   Grid,
// } from '@mui/material';
// import styled from '@emotion/styled';

// // import Web3 from "web3";
// import Web3Modal from "web3modal";
// import { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import { default as Send } from './components/Send.js';
// import { default as Claim } from './components/Claim.js';
// // web3 network connections
// import { windowProvider, getProvider } from './libs/web3Providers.js';
// import { useWallet } from './providers/WalletProvider.js';
// // config
// import config from './config.js';

// export default () => {
//   const { loginProvider, signer, address, account, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
//   // select, send, claim
//   const [mode, setMode] = useState('select');
//   const [merchantBalance, setMerchantBalance] = useState(0);

//   const getLogs = (receipt, abi) => {
//     // let abi = ['event AllowanceApproval(address indexed _from, address indexed _erc20Address, uint quantity, bool _value)'];
//     let iface = new ethers.utils.Interface(abi);
//     var logs = receipt.logs.map(log => {
//       var parsedLog = null;
//       try {
//         parsedLog = iface.parseLog(log);
//       } catch (e) {
//         // console.log('unable to parse log', log, e);
//         return null;
//       }
//       return parsedLog;
//     }).filter(log => log !== null);
//     // const {donor, value, tokenID} = log.args;
//     return logs;
//   };

//   useEffect(() => {
//     if (!account) return;
//     console.log('account set!', account);
//   }, [account]);

//   useEffect(() => {
//     if (!accounts?.length) return;
//     console.log('accounts set!', accounts[0]);
//   }, [accounts]);

//   const networkInfoBox = () => {
//     return (
//       <Grid container item
//         sm={12}
//         className='networkInfoBox'
//       >
//         <div>Connected: {isConnected ? 'yes' : 'no'}</div>
//         <div>Address: {address}</div>
//         <div>Network: {network?.name} ({networkId})</div>
//         {account === '' &&
//           <div>Balance: ${(merchantBalance / 100).toFixed(2)}</div>
//         }
//       </Grid>
//     );
//   };


//   return (
//     <div className="App">
//       <header className="App-header">

//         {/* header */}
//         {networkInfoBox()}

//         {/* main content */}

//         {mode == 'select' &&
//           <>
//             <Grid container
//               direction="column"
//               justifyContent="center"
//               alignItems="center"
//               spacing={3}
//             >
//               <Grid item sm={6}>
//                 <div>
//                   <Button
//                     variant="contained"
//                     onClick={() => setMode('send')}
//                   >Send</Button>
//                 </div>
//               </Grid>
//               <Grid item sm={6}>
//                 <div>
//                   <Button
//                     variant="contained"
//                     onClick={() => setMode('claim')}
//                   >Claim</Button>
//                 </div>
//               </Grid>
//             </Grid>
//           </>
//         }
//         {/* footer */}
//         <Grid container></Grid>

//       </header>

export default App;
