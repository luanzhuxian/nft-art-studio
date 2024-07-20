import React, { useRef, useEffect } from 'react';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import useArConnect from 'use-arconnect';
import { messageBox } from '@src/services/message-service';

const Test = () => {
  const ar = useArConnect();
  const walletRef = useRef<any>();

  useEffect(() => {
    walletRef.current = new ArweaveWebWallet({
      // optionally provide information about your app that will be displayed in the wallet provider interface
      name: 'Your application name',
      logo: 'URL of your logo to be displayed to users',
    });

    walletRef.current.setUrl('arweave.app');
    walletRef.current.keepPopup = true;
    () => {
      // walletRef.current.disconnect();
    };
  }, []);

  const webWallet = async () => {
    if (!walletRef.current.connected) {
      const resp = await walletRef.current.connect(); // on user gesture to avoid blocked popup
    } else {
      await walletRef.current.disconnect(); // on user gesture to avoid blocked popup
    }
  };

  const test = async () => {
    await webWallet();
    messageBox('success', '', 'kkk');
  };

  const ArConnect = async () => {
    await ar.connect(['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION']);
  };

  return (
    <div>
      <a href="javascript:void(0);" onClick={test}>
        Test
      </a>
    </div>
  );
};

export default Test;
