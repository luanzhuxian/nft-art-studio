import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';

import { addToIpfs } from '@src/services/ipfs-service';
import { messageBox } from '@src/services/message-service';
import { mintNFT } from '@src/services/nft-service';
// import { toArweave, imageToArweave } from '@src/services/arweave-query-api';
import type { NftMeta } from '@src/types';
import styles from './style.module.css';

const NftMintor = () => {
  const navigate = useNavigate();
  const [meta, updateMeta] = useState<NftMeta>({
    name: '',
    descriptipn: '',
    imageUri: '',
    uri: '',
    type: 'image',
  });
  const [uri, setUri] = useState('');

  // 上传图片 并存储到ipfs
  const upLoadToIpfs = async (file) => {
    try {
      //   const imageuri = await imageToArweave(file);
      const imageuri = await addToIpfs(file);
      messageBox('success', '', imageuri);
      setUri(imageuri);
      console.log(imageuri);
    } catch (error) {
      if (error instanceof Error) messageBox('danger', '', error.message);
    }
  };

  // 点击铸币
  const mint = async () => {
    try {
      const data: NftMeta = { ...meta, imageUri: uri };
      const json = JSON.stringify(data);
      //   const metauri = await toArweave(json);
      const metauri = await addToIpfs(json); // 发送到去中心化 ipfs
      messageBox('success', '', metauri);
      const { success, tokenId } = await mintNFT(metauri); // 发起合约交易
      if (success && tokenId) {
        messageBox('success', '', tokenId?.toString());
        navigate('/collectible/browse');
        // router.push("/mynft")
      } else {
        messageBox('danger', '', 'mint failed');
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        messageBox('danger', '', error.message);
      }
    }
  };

  return (
    <div className={styles.CreatorWrapper}>
      <div className={styles.CreatorContainer}>
        <Input
          placeholder="Asset Name"
          className={styles.NftField}
          onChange={(e) => updateMeta({ ...meta, name: e.target.value })}
        />

        <Input.TextArea
          placeholder="Asset Description"
          className={styles.NftField}
          onChange={(e) => {
            updateMeta({ ...meta, descriptipn: e.target.value });
          }}
        />

        <Input
          type="file"
          placeholder="Asset Image"
          className={styles.NftField}
          onChange={(e) => {
            e.target.files && upLoadToIpfs(e.target.files[0]);
          }}
        />

        <img width="350" src={uri} className={styles.NftImage} />

        <Button type="primary" onClick={mint}>
          铸币
        </Button>
      </div>
    </div>
  );
};

export default NftMintor;
