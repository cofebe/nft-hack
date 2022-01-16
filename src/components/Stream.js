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
    axios({
      method: 'get',
      url: 'http://localhost:3004',
      data: {
        // @todo allow user to set stream name
        name: 'test_stream_' + (new Date()).toISOString(),
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
    const url = `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`;

    const nftContract = nftHackContract({
      contractAddress: nftContractAddress,
      networkId: networkId,
      loginProvider: signer
    });

    console.log('nftContract', nftContract);
    const tx = await nftContract.createStream(nftContractAddress, url);
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
      <Typography>Stream</Typography>

      <Button
        variant='contained'
        onClick={async () => {
          // const newSession = await startStream();
          // setSession(newSession);
          registerStream();
        }}
      >Start Stream</Button>

      <Button
        variant='contained'
        onClick={() => {
          try {
            session.close();
            console.log('stream session ended');
          } catch (e) {
            console.log(`error while closing stream session\n${e.stack}`);
          }
          setMode('home');
        }}
      >End Stream</Button>

      
      <video id='streamPreview' className='streamPreview' autoPlay={true}>
        {/* <source srcObject={localStream} type="application/x-mpegURL"/> */}
      </video>


    </div>
  );
}

export default Stream;
