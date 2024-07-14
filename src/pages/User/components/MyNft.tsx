import { useEffect, useState } from 'react';

import NftBrowser from '@src/components/NftBrowser';
import { owned } from '@src/services/nft-service';
import type { Nft } from '@src/services/types';

const MyNft = () => {
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    const ns = await owned(); // 获取当前账户所有 nft meta 信息
    if (ns.success) {
      setNfts(ns.data);
    }
  };

  return (
    <div className="main h-full">
      <NftBrowser nfts={nfts} />
    </div>
  );
};

export default MyNft;
