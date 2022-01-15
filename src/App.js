import logo from './eth-diamond-rainbow.png';
import videojs from 'video.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          NFT HACK
        </p>
      </header>

      <video data-setup='{}'>
        <source src="https://cdn.livepeer.com/hls/3fc3wygcixo3kwps/index.m3u8" type="application/x-mpegURL"/>
      </video>
    </div>
  );
}

export default App;
