const { VITE_CONTRACT_ADDRESS } = import.meta.env;

// TODO: 切换网络功能

type NetworkConfiguration = {
  chainId: number;
  nftAddress: string; // nft合约地址
  // 向metamask钱包发送连接请求时，所带的参数
  params: {
    chainId: string;
    rpcUrls: string[];
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    blockExplorerUrls: string[];
  }[];
};

// 网络配置列表
const confs: NetworkConfiguration[] = [
  {
    chainId: 0x7a69, // 31337
    nftAddress: VITE_CONTRACT_ADDRESS,
    params: [
      {
        chainId: '0x7A69',
        rpcUrls: ['http://127.0.0.1:8545/'],
        chainName: 'localhost-hardhat',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
        },
        blockExplorerUrls: ['https://polygonscan.com/'],
      },
    ],
  },
  {
    chainId: 0x539,
    nftAddress: VITE_CONTRACT_ADDRESS,
    params: [
      {
        chainId: '0x0539',
        rpcUrls: ['http://127.0.0.1:8545/'],
        chainName: 'localhost-ganache',
        nativeCurrency: {
          name: 'GETH',
          symbol: 'GETH',
          decimals: 18,
        },
        blockExplorerUrls: ['https://polygonscan.com/'],
      },
    ],
  },
];

const current = 0;

export const configuration = () => confs[current];

export const rpcUrl = () => {
  return confs[current].params[0].rpcUrls[0];
};

export const IPFS = {
  RPC_API_ADDRESS: 'http://127.0.0.1:5001',
  GATEWAY: 'http://127.0.0.1:8080/ipfs/',
};
export const ARWEAVE = {
  HOST: '127.0.0.1',
  PORT: 1984,
  PROTOCOL: 'http',
  ADDRESS: 'http://127.0.0.1:1984/',
};
