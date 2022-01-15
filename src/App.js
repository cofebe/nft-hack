import logo from './eth-diamond-rainbow.png';
import videojs from 'video.js'
import './App.css';
import React, { useState } from 'react';
import ERC721Contract from './libs/ERC721Contract.js';
import { ethers } from 'ethers';

function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  console.log('signer: ', signer)
  function onStreamNow(num){
    const contract = ERC721Contract({contractAddress: '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7', loginProvider: signer});
    console.log('this is:', contract);
  }
  const [users, setUsers] = useState([
    { id: 1, firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="title">
          NFT HACK
        </p>
      </header>

      <div className="container">
            <h3 className="">Streaming Now</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td><button onClick={onStreamNow('0xfDCf84cD2d994d44f7b7854Db9aDD10A936aaC9A')}>StreamNow</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    
  );
}

export default App;
