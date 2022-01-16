import { useEffect, useState } from 'react';
import ERC721Contract from './libs/ERC721Contract';
import nftHackContract from './libs/nftHackContract';
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
  const contractAddress = '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7';
  let streamCollection = [];
  useEffect(() => {
    if (!address || !signer) return;
    console.log('address: ', address)
    const init = async () => {
      const apeContractAddress = '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7';
      const nftHackContractAddress = '0x707982692FCEeE37CFed6dd48b58633cdab34801';
      console.log(1);
      const boredApesContract = ERC721Contract({ contractAddress: apeContractAddress, loginProvider: signer });
      console.log('boredApesContract: ', boredApesContract);
      const streamContract = nftHackContract({contractAddress: nftHackContractAddress, loginProvider: signer});
      const listOfStreams = await streamContract.getStreamArray();
      await getStreamCollection(listOfStreams);
      console.log('streamCollection', streamCollection);
      const interval = setInterval(async () => {
        console.log('run interval check');
        await getStreamCollection(listOfStreams);
        console.log('mappedStreams: ', streamCollection);
      }, 120000);
      return () => clearInterval(interval);
    };
    init();
  }, [address, signer, account]);

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

  async function getStreamCollection(listOfStreams) {
    const covalentResp = await getTransactions();
    const covalentItems = covalentResp["data"]["items"];
    const nftItemsOnly = getNftItemsOnly(covalentItems);
    const ownedNftAddresses = getNftAddresses(nftItemsOnly);
    const collection = mapStreams(ownedNftAddresses, listOfStreams);
    console.log('collection', collection);
    setStreamCollection(collection);
  }

  function mapStreams(personalNftAddresses, streams) {
    let mappedStreams = []
    let newStream = {}
    for (let i = 0; i < streams.length; i++) {
      newStream["stream"] = streams[i];
      newStream['isLocked'] = true;
      newStream['url'] = streams[i]["url"];
      console.log('personal Address', personalNftAddresses);
      console.log('streams[i]', streams[i]["requiredCollection"].toLowerCase());
      if (personalNftAddresses.indexOf(streams[i]["requiredCollection"].toLowerCase()) > -1) {
        newStream['isLocked'] = false;
      }
      mappedStreams.push(newStream);
      newStream = {};
    }
    return mappedStreams;
  }

  async function getTransactions() {
    const apiAddressBase = 'https://api.covalenthq.com/v1/80001/address/';
    const etheaddress = '0xfDCf84cD2d994d44f7b7854Db9aDD10A936aaC9A';
    const key = 'ckey_200682d8e34b495f9557869dacd';
    const apiAddress = apiAddressBase + etheaddress + '/balances_v2/?quote-currency=USD&format=JSON&nft=true&key=' + key;
    const fetchResponse = await fetch(apiAddress);
    const resJson = await fetchResponse.json();
    return resJson;
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

  function setStreamCollection(collection) {
    streamCollection = collection;
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
        <Typography variant='subtitle'>Connected: {isConnected ? 'yes' : 'no'}</Typography>
        <Typography variant='subtitle'>Address: {shortAddress(address)}</Typography>
        <Typography variant='subtitle'>Network: {network?.name} ({networkId})</Typography>
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
