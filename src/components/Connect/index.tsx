import { ConnectWallet } from '@thirdweb-dev/react';
import { connect } from '@src/services/connection-service';
import { storeMeta } from '@src/services/ipfs-service';
import 'react-notifications-component/dist/theme.css';

const Connect = () => {
  const connectWallet = async () => {
    await connect();
  };

  const connectIpfs = async () => {
    await storeMeta({ name: '张三' });
  };

  return (
    <div>
      <a className="ml-5" onClick={connectWallet}>
        connect
      </a>
      <a className="ml-5" onClick={connectIpfs}>
        connectIpfs
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

export default Connect;
