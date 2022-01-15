import axios from 'axios';
import config from '../config';
import { useEffect, useState } from 'react';
import videojs from 'video.js';
import {
  Button,
  Typography,
} from '@mui/material';
import './Stream.css';
import { Client, isSupported } from '@livepeer/webrtmp-sdk';

if (!isSupported()) {
  alert('webrtmp-sdk is not currently supported on this browser');
}

function Stream({ setMode, }) {
  const [client, setClient] = useState();
  const [session, setSession] = useState();

  useEffect(() => {
    const newClient = new Client();
    setClient(newClient);
    registerStream();
  }, []);

  // register a new stream
  const registerStream = async () => {
    console.log("Here")
    console.log("Config: ", config)
    axios({
      method: 'get',
      url: 'http://localhost:3004',
      data: {
        name: 'test_stream',
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
  }
  // adding url to contract
    // use wallet to gain signer

  // start streaming to livepeer
  const startStream = async () => {
    console.log('>>>>>>>>');
    const streamKey = '26ca-kwqh-u71w-1e4u';

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
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
          const newSession = await startStream();
          setSession(newSession);
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

      {/* <video data-setup='{}'>
        <source src="https://cdn.livepeer.com/hls/3fc3wygcixo3kwps/index.m3u8" type="application/x-mpegURL"/>
      </video> */}


    </div>
  );
}

export default Stream;
