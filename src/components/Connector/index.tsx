import React, { useRef, useEffect } from 'react';
import { connect } from '@src/services/connection-service';
import { storeMetadata as storeMetadataToIpfs } from '@src/services/ipfs-service';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { storeMetadata as storeMetadataToArw } from '@src/services/arweave-service';
import 'react-notifications-component/dist/theme.css';

const Connector = () => {
  const walletRef = useRef<any>();

  const connectWallet = async () => {
    await connect();
  };

  const connectIpfs = async () => {
    const data = JSON.stringify({ name: '张三' });
    await storeMetadataToIpfs(data);
  };

  const connectArweave = async () => {
    if (!walletRef.current.connected) {
      await walletRef.current.connect(); // on user gesture to avoid blocked popup
      await storeMetadataToArw('hello world');
    } else {
      await walletRef.current.disconnect(); // on user gesture to avoid blocked popup
    }
  };

  useEffect(() => {
    walletRef.current = new ArweaveWebWallet({
      // optionally provide information about your app that will be displayed in the wallet provider interface
      name: 'Your application name',
      logo: 'URL of your logo to be displayed to users',
    });

    walletRef.current.setUrl('arweave.app');
    walletRef.current.keepPopup = true;
    () => {
      walletRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <a className="ml-5" onClick={connectWallet}>
        connect
      </a>
      <a className="ml-5" onClick={connectIpfs}>
        connectIpfs
      </a>
      <a className="ml-5" onClick={connectArweave}>
        connectArweave
      </a>
      {/* <a className="ml-5" onClick={() => storeMeta2({ name: '李四' })}>
        connectIpfs2
      </a> */}
    </div>
    // <>
    //   <ConnectWallet
    //     className="primary"
    //     // accentColor="#dddddd"
    //     theme="light"
    //     // onClick={connectWallet}
    //   />
    // </>
  );
};

export default Connector;
