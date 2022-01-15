import { useEffect, useState } from 'react';
import videojs from 'video.js';
import {
  Button,
  Typography,
} from '@mui/material';
import { Client, isSupported } from '@livepeer/webrtmp-sdk';

if (!isSupported()) {
  alert('webrtmp-sdk is not currently supported on this browser');
}

const client = new Client();

// start streaming to livepeer
const startStream = async () => {
  const streamKey = '3fc3-4kb3-1oyi-9564';

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
};


function Stream({ setMode, }) {

  useEffect(() => {

  }, []);

  return (
    <div className="stream">

      <Button
        variant='contained'
        onClick={() => startStream()}
      >Start Stream</Button>

      {/* <video data-setup='{}'>
        <source src="https://cdn.livepeer.com/hls/3fc3wygcixo3kwps/index.m3u8" type="application/x-mpegURL"/>
      </video> */}


    </div>
  );
}

export default Stream;
