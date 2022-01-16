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
import Home from './components/Home.js';
import Watch from './components/Watch.js';

const streamPlaybackUrl = 'https://cdn.livepeer.com/hls/26cafzyg7i8yhgb5/index.m3u8';
const CONTRACT_ADDRESSES = ['0x700433206dc6979784c4bdeb8c4c91ffb745e8b7'];

function App() {
  const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  const [mode, setMode] = useState('home');
  const contractAddress = '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7';

  useEffect(() => {
    if (!address || !signer) return;
    console.log('address: ', address)
    const init = async () => {
      const contractAddress = '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7';
      console.log(1);
      const contract = ERC721Contract({ contractAddress, loginProvider: signer });
      console.log(2);
      await checkAccessForContract(contractAddress)
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

  async function checkAccessForContract(contractAddress) {
    console.log('calling checkAccess');
    const etheaddress = '0xfDCf84cD2d994d44f7b7854Db9aDD10A936aaC9A';
    const response = fetch('https://api.covalenthq.com/v1/80001/address/' + etheaddress + '/balances_v2/?quote-currency=USD&format=JSON&nft=true&key=ckey_200682d8e34b495f9557869dacd');
    response.then((r) => {
      r.json().then((j) => {
        const items = j["data"]["items"];
        const nftItemsOnly = getNftItemsOnly(items);
        const addresses = getNftAddresses(nftItemsOnly);
        const isAllowed = isAccessAllowed(addresses, CONTRACT_ADDRESSES)
        console.log('is allowed access: ', isAllowed);
        
      }, (err) => {
        console.log('err: ', err);
      });
    }, (err) => {
      console.log('err: ', err);
    })
  }

  function getNftItemsOnly(items) {
    return items.filter((item) => {
      return item["type"] === "nft";
    });
  }

  function getNftAddresses(items) {
    const addresses = items.map(item => item["contract_address"]);
    return addresses;
  }

  function isAccessAllowed(ownedNftAddresses, streamNftAddresses) {
    const commonAddresses = ownedNftAddresses.filter(ownedAddresses => streamNftAddresses.includes(ownedAddresses));
    return commonAddresses.length > 0;
  }

  const networkInfoBox = () => {
    return (
      <Grid container item
        sm={12}
        className='networkInfoBox'
        justifyContent='right'
        alignItems='flex-end'
        direction='column'
        // spacing={6}
      >
        <Typography>Connected: {isConnected ? 'yes' : 'no'}</Typography>
        <Typography>| Address: {shortAddress(address)}</Typography>
        <Typography>| Network: {network?.name} ({networkId})</Typography>
      </Grid>
    );
  };

  const shortAddress = address => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!address) return <></>;

  return (
    <>

      {mode !== 'stream' &&
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="title">OnlyJpegs</p>
          {networkInfoBox()}

            <div className='button'>
              {mode === 'home' &&
                <Button
                  variant='contained'
                  onClick={() => {
                    setMode('watch');
                  }}
                >Watch Stream</Button>
              }
            </div>
        </header>
      }
      
      {mode === 'home' &&
        <Home
          setMode={setMode}
        />
      }

      {mode === 'stream' &&
        <Stream
          setMode={setMode}
        />
      }

      {mode === 'watch' &&
        <Watch
          setMode={setMode}
          watchUrl={'https://cdn.livepeer.com/hls/e673nk1hjtdheb8m/index.m3u8'}
        />
      }

      

      {/* <video data-setup='{}'>
        <source src={streamPlaybackUrl} type="application/x-mpegURL"/>
      </video> */}
    </>
    
    
  );
};

export default App;
