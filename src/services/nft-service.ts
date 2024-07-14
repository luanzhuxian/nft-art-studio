import axios from 'axios';
import { ethers } from 'ethers';

import { rpcUrl, configuration } from '@src/networkConfig';
import { tryConnect } from './connection-service';
import type { Nft } from '../types';

// import NFT from '../artifacts/contracts/NFT.sol/MyErc721.json';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';

// 获取当前账号所有 nft 的 meta 数据
export const owned = async (): Promise<{ success: boolean; data: Nft[] }> => {
  // 先尝试一次连接
  const { success, provider, signer } = await tryConnect();
  if (!success) {
    // NotificationManager.warning('', "network not right!", 6000);
    return { success: false, data: [] };
  }

  const address = await signer?.getAddress();

  const nftContract = new ethers.Contract(configuration().nftAddress, NFT.abi, provider);

  // 获取当前用户当前账号 nft 的数量
  const count = await nftContract.balanceOf(address);
  const amount = Number(count);

  const data = await Promise.all(
    Array.from({ length: amount }, async (v, i) => {
      // 用 合约的tokenOfOwnerByIndex 枚举遍历 得到用户所有的 nft tokenId
      const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
      const tokenUri = await nftContract.tokenURI(tokenId); // 根据 tokenId 得到 tokenUri
      const meta = await axios.get(tokenUri); // 从 ipfs 网关获取 meta
      return { ...meta.data, tokenId, tokenUri };
    }),
  );

  // tokenId -> tokenUri -> meta -> {name descriptipn imageUri}
  // {
  //   tokenId: 4n
  //   tokenUri: "http://127.0.0.1:8080/ipfs/QmXZ7FLyiWjt4FhW6qcdDtVfusmQPoDbkQLbtUaeQKHW9G"
  //   name: "3"
  //   descriptipn: "4"
  //   imageUri: "http://127.0.0.1:8080/ipfs/QmS6czwg4svLBGXVmk7qMe4eZDKX56o2CzUYCEBpU1Ddyv"
  // }
  return { success: true, data };
};

export const ownedTypedNFT = async (type: string) => {
  const { success, data } = await owned();
  if (!success) {
    return { success, data };
  }
  return {
    success: true,
    data: data.filter((e: Nft) => e.type === type),
  };
};

export const totalSupply = async (): Promise<number> => {
  const provider = new ethers.JsonRpcProvider(rpcUrl());
  const nft = new ethers.Contract(configuration().nftAddress, NFT.abi, provider);
  const total = await nft.totalSupply();
  return total;
};

export const mintNFT = async (
  tokenUri: string,
): Promise<{ success: boolean; tokenId?: number }> => {
  // 先尝试一次连接
  // signer 发起交易的人 给交易签名的人
  const { success, provider, signer } = await tryConnect();
  if (!success || !signer) {
    // NotificationManager.warning('', "network not right!", 6000);
    return { success: false };
  }

  const contractAddress = configuration().nftAddress;
  const nftContract = new ethers.Contract(contractAddress, NFT.abi, signer);
  const address = await signer.getAddress();

  console.log('Address:', address);
  console.log('Token URI:', tokenUri);
  console.log('Contract Address:', configuration().nftAddress);

  try {
    // 尝试直接估算 gas
    const estimatedGas = await provider.estimateGas({
      to: contractAddress,
      from: address,
      data: nftContract.interface.encodeFunctionData('mint', [address, tokenUri]),
      value: ethers.parseUnits('0.01', 'gwei'), // 确保这里的值与你的合约 fee 匹配
    });
    console.log('Estimated Gas:', estimatedGas.toString());

    // 设置一个稍微高一点的 Gas Limit 以确保交易成功
    const gasLimit = estimatedGas * 2n; // 在 bigint 上进行数学运算
    console.log('Gas Limit:', gasLimit.toString());

    const transaction = await nftContract.mint(address, tokenUri, {
      // value: 10000,
      value: ethers.parseUnits('0.01', 'gwei'),
      gasLimit,
    });
    const tx = await transaction.wait(1); // 等待全网确认，等待交易被矿工处理
    // console.log('tx', tx);

    // ERC721.sol 的 _mint -> _update 方法内 emit Transfer(from, to, tokenId);
    // 所以 tokenId 是第三个参数
    // const event = tx.events[0];
    // const value = event.args[2];
    // const tokenId = value.toNumber();
    // alert(tokenId);
    // return { success: true, tokenId };

    // 提取tokenId
    const event = tx.logs.find(
      (log) => log.topics[0] === ethers.id('Transfer(address,address,uint256)'),
    );
    if (!event) {
      throw new Error('Transfer event not found');
    }

    const tokenId = BigInt(event.topics[3]).toString();
    console.log(`Minted Token ID:`, tokenId);
    return { success: true, tokenId: Number(tokenId) };
  } catch (error) {
    console.error('Error sending transaction:', error);
    return { success: false };
  }
};
