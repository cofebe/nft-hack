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


function App() {
  const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  const [mode, setMode] = useState('home');
  const REQUIREDNFTIDs = ['1', '2'];
  

  useEffect(() => {
    if (!address || !signer) return;
    console.log('address: ', address)
    const init = async () => {
      const contractAddress = '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7';
      console.log(1);
      const contract = ERC721Contract({ contractAddress, loginProvider: signer });
      console.log(2);
      await checkAccess()
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

  async function checkAccess() {
    console.log('calling checkAccess');
    const etheaddress = '0xfDCf84cD2d994d44f7b7854Db9aDD10A936aaC9A';
    const response = fetch('https://api.covalenthq.com/v1/80001/address/' + etheaddress + '/balances_v2/?quote-currency=USD&format=JSON&nft=true&key=ckey_200682d8e34b495f9557869dacd');
    response.then((r) => {
      r.json().then((j) => {
        const items = j["data"]["items"];
        const nftItemsOnly = getNftItemsOnly(items);
        const tokensOnly = getNftTokenIds(nftItemsOnly);
        console.log('tokensOnly', tokensOnly);
        console.log('is allowed access: ', isAccessAllowed(tokensOnly));
        
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

  function getNftTokenIds(items) {
    let tokens = [];
    items.forEach(element => {
      const t = element["nft_data"].map(function(item) {return item["token_id"]});
      tokens = tokens.concat(t);
    });

    return tokens;
  }

  function isAccessAllowed(ownedTokens) {
    const commonTokens = ownedTokens.filter(ownedToken => REQUIREDNFTIDs.includes(ownedToken));
    return commonTokens.length > 0;
  }

  const networkInfoBox = () => {
    return (
      <Grid container item
        sm={12}
        className='networkInfoBox'
        justifyContent='center'
        // direction='column'
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="title">
          NFT HACK
        </p>
        {networkInfoBox()}
          {/* <video  src="https://cdn.livepeer.com/hls/3fc3wygcixo3kwps/index.m3u8" controls autoplay></video> */}

          <div className='button'>
            {mode === 'home' &&
              <Button
                variant='contained'
                onClick={() => {
                  setMode('stream');
                }}
              >Create Stream</Button>
            }
          </div>

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
