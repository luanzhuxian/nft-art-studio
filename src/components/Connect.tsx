import { ConnectWallet } from '@thirdweb-dev/react';
import { connect } from '@src/services/connection-service';
import 'react-notifications-component/dist/theme.css';

const Connect = () => {
  const connectWallet = async () => {
    await connect();
  };

  return (
    <div>
      <a onClick={connectWallet}>connect</a>
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
