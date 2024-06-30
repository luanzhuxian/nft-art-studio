import { useState } from 'react';
import { ethers } from 'ethers';

import { BrowserProvider, parseUnits } from 'ethers';
import { HDNodeWallet } from 'ethers/wallet';

import Lock from '../artifacts/contracts/Lock.sol/Lock.json';

function App() {
  const [count, setCount] = useState(0);

  const readMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // await provider.send('eth_requestAccounts', []);
    const lock = new ethers.Contract(
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      Lock.abi,
      provider,
    );
    const message = await lock.message();
    alert(message);
  };

  const setMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();

    const lock = new ethers.Contract(
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      Lock.abi,
      signer,
    );
    const transaction = await lock.setMessage('world hello!');
    const tx = await transaction.wait(0);
    console.log(tx);
    const log = tx.logs[0];
    const value = log.args[0];
    const message = await value.toString();
    alert(message);
  };

  return (
    <div>
      <h1>Vite + React</h1>
      <button
        onClick={async () => {
          let signer = null;

          let provider;
          if (window.ethereum == null) {
            // If MetaMask is not installed, we use the default provider,
            // which is backed by a variety of third-party services (such
            // as INFURA). They do not have private keys installed,
            // so they only have read-only access
            console.log('MetaMask not installed; using read-only defaults');
            provider = ethers.getDefaultProvider();
          } else {
            // Connect to the MetaMask EIP-1193 object. This is a standard
            // protocol that allows Ethers access to make all read-only
            // requests through MetaMask.
            provider = new ethers.BrowserProvider(window.ethereum);

            // It also provides an opportunity to request access to write
            // operations, which will be performed by the private key
            // that MetaMask manages for the user.
            signer = await provider.getSigner();

            const address = await signer.getAddress();
            console.log('Connected account:', address);
          }
        }}
      >
        Connect Wallet
      </button>
      <button onClick={readMessage}>readMessage</button>
      <button onClick={setMessage}>setMessage</button>
    </div>
  );
}

export default App;
