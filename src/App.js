import { useEffect, useState } from 'react';
import logo from './eth-diamond-rainbow.png';
import videojs from 'video.js'
import './App.css';
import {
  Button,
  Typography,
} from '@mui/material';
import { Client, isSupported } from '@livepeer/webrtmp-sdk';

if (!isSupported()) {
  alert('webrtmp-sdk is not currently supported on this browser');
}

const client = new Client();

async function start() {
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
}

// start streaming to livepeer
// start();

function App() {
  const [mode, setMode] = useState('home');

  useEffect(() => {

  }, []);

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
          onClick={() => setMode('stream')}
        >Start Stream</Button>
      }

      <div>
        {mode === 'stream' &&
          <div>Start Stream</div>
        }
      </div>

      <video data-setup='{}'>
        <source src="https://cdn.livepeer.com/hls/3fc3wygcixo3kwps/index.m3u8" type="application/x-mpegURL"/>
      </video>


    </div>
  );
}

export default App;
