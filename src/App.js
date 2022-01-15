import { useEffect, useState } from 'react';
import logo from './eth-diamond-rainbow.png';
import './App.css';
import { Client, isSupported } from '@livepeer/webrtmp-sdk';

if (!isSupported()) {
  alert('webrtmp-sdk is not currently supported on this browser')
}

const client = new Client();

async function start() {
  const streamKey = '3fc3-4kb3-1oyi-9564'

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })

  const session = client.cast(stream, streamKey)

  session.on('open', () => {
    console.log('Stream started.')
  })

  session.on('close', () => {
    console.log('Stream stopped.')
  })

  session.on('error', (err) => {
    console.log('Stream error.', err.message)
  })
}

// start streaming to livepeer
// start();

function App() {

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
    </div>
  );
}

export default App;
