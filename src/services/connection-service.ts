import { ethers } from 'ethers';
import { messageBox } from './message-service';
import { configuration } from '@src/networkConfig';

export const connectOnce = async () => {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found. Please install it.');
  }
  // 请求用户授权访问以太坊账户
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  // await provider.send('eth_requestAccounts', []);
  const [signer, network] = await Promise.all([provider.getSigner(), provider.getNetwork()]);
  const address = await signer.getAddress();
  return { chainId: network.chainId, address: address, provider, signer };
};

export const tryConnect = async () => {
  const { chainId, address, provider, signer } = await connectOnce();
  const supported = configuration().chainId.toString(); // 配置里支持的 chainId
  if (chainId === BigInt(supported)) {
    messageBox(
      'success',
      '',
      'chainId: ' + chainId + '      account: ' + address.substring(0, 5) + '..',
    );
    return { success: true, provider, signer };
  }
  messageBox(
    'warning',
    '',
    'chainId: ' + chainId + '      account: ' + address.substring(0, 5) + '..',
  );
  return { success: false };
};

export const connect = async () => {
  const { success } = await tryConnect();
  if (success) {
    return;
  }
  // 没有连接成功，向钱包账号发连接请求
  // 如果metamask没有配置 params 中的网络，会自动问是否增加配置
  const conf = configuration();
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: conf.params,
  });
  // 如果钱包同意连接，再次尝试会成功
  await tryConnect();
};
