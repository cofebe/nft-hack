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
}

export default App;
