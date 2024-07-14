import { Card } from 'antd';
import styles from './style.module.css';
import type { Nft } from '@src/types';

const { Meta } = Card;

const NftCard = ({ nft }: { nft: Nft }) => {
  return (
    <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={nft.imageUri} />}>
      <Meta title={nft.name} description={nft.descriptipn} />
    </Card>
  );
};

const NftBrowser = ({ nfts }: { nfts: Nft[] }) => {
  return (
    <div className={styles.main}>
      {nfts.map((nft, i) => {
        return <NftCard nft={nft} key={i} />;
      })}
    </div>
  );
};
export default NftBrowser;
