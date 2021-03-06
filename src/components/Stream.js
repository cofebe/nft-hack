import axios from 'axios';
import config from '../config';
import nftHackContract from '../libs/nftHackContract';
import { useWallet } from '../providers/WalletProvider.js';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import videojs from 'video.js';
import {
  Button,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import './Stream.css';
import { Client, isSupported } from '@livepeer/webrtmp-sdk';

import nftHack from '../evm/artifacts/contracts/nft-hack.sol/NFTHACK.json';

// @todo move to config
const nftContractAddress = '0x707982692FCEeE37CFed6dd48b58633cdab34801';

if (!isSupported()) {
  alert('webrtmp-sdk is not currently supported on this browser');
}

function Stream({ setMode, }) {
const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  const [client, setClient] = useState();
  const [session, setSession] = useState();
  const [streamName, setStreamName] = useState('');
  const [lockContractAddress, setLockContractAddress] = useState();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const newClient = new Client();
    setClient(newClient);

    // setup browser preview
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia');
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          var video = document.querySelector('#streamPreview');
          video.srcObject = stream;
        })
        .catch(err => {
          console.log(`Error getting local preview:\n${err}`);
        });
    }
  }, []);

  // register a new stream
  const registerStream = async () => {
    console.log("registerStream");
    if (!client) {
      console.log('client not set!');
      return;
    }
    console.log("Config: ", config)
    console.log('creating stream with name: ' + streamName);
    axios({
      method: 'post',
      url: 'http://localhost:3004',
      data: {
        // @todo allow user to set stream name
        // name: 'test_stream_' + (new Date()).toISOString(),
        name: streamName,
      }
    })
    .then(function (response) {
      console.log('registerStream res', response.data)
      startStream(response.data['streamKey'])
      updateContract(response.data['playbackId'])
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
  };

  const updateContract = async (playbackId) => {
    if (!playbackId) {
      console.log('Unable to save stream with undefined playbackId');
      return;
    }
    // @todo validate lockContractAddress as actual NFT contract
    if (!lockContractAddress) {
      console.log('Unable to save stream with undefined NFT contract address');
      return;
    }
    const url = `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`;

    const nftContract = nftHackContract({
      contractAddress: nftContractAddress,
      networkId: networkId,
      loginProvider: signer
    });

    console.log('nftContract', nftContract);
    const tx = await nftContract.createStream(lockContractAddress, url);
    console.log('after tx', tx);
    const receipt = await tx.wait();
    console.log('after receipt', receipt);

    const logs = getLogs(receipt, nftHack.abi);
    console.log('logs', logs);
    const streamCreated = logs.find(log => log.name === 'StreamCreated');
    if (!streamCreated) {
      throw new Error('nftHack StreamCreated failed');
    } else {
      console.log('StreamCreated!');
      setIsActive(true);
    }
  }

  const getLogs = (receipt, abi) => {
    let iface = new ethers.utils.Interface(abi);
    var logs = receipt.logs.map(log => {
      var parsedLog = null;
      try {
        parsedLog = iface.parseLog(log);
      } catch (e) {
        return null;
      }
      return parsedLog;
    }).filter(log => log !== null);
    return logs;
  };

  // start streaming to livepeer
  const startStream = async (streamKey) => {
    console.log('Stream Key: ', streamKey);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    const session = client.cast(stream, streamKey);
    setSession(session);

    session.on('open', () => {
      console.log('Stream started.');
    });

    session.on('close', () => {
      console.log('Stream stopped.');
    });

    session.on('error', (err) => {
      console.log('Stream error.', err.message);
    });
    console.log('session', session);
    return session;
  };

  return (
    <div className='root'>
      {/* <Typography>Stream</Typography> */}

      <Grid container
        direction='row'
        className='topStreamBar'
      >
        <Grid item
          sm={2}
        >
          {/* none */}
        </Grid>
        <Grid container item
          className='streamTitleBar'
          justifyContent="space-around"
          alignItems="center"
          // spacing={3}
          sm={8}
        >
          <TextField
            id="outlined-basic"
            label="Stream Name"
            variant="outlined"
            className='streamNameInput'
            disabled={isActive}
            onChange={event => setStreamName(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="NFT Contract Address"
            variant="outlined"
            className='lockContractAddressInput'
            disabled={isActive}
            onChange={event => setLockContractAddress(event.target.value)}
          />
          <Button
            variant='contained'
            className='startStreamButton'
            disabled={isActive}
            onClick={async () => {
              registerStream();
            }}
          >Start Stream</Button>
          <Button
            variant='contained'
            className='endStreamButton'
            disabled={isActive}
            onClick={async () => {
              try {
                await session.close();
                console.log('stream session ended');
              } catch (e) {
                console.log(`error while closing stream session\n${e.stack}`);
              }
              setMode('home');
            }}
          >{isActive ? 'End Stream' : 'Close'}</Button>
        </Grid>
        <Grid item
          sm={2}
        >
          {/* none */}
        </Grid>
      </Grid>
      
      <video id='streamPreview' className='streamPreview' autoPlay={true}>
        {/* <source srcObject={localStream} type="application/x-mpegURL"/> */}
      </video>


    </div>
  );
}

export default Stream;
