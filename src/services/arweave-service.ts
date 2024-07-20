import Arweave from 'arweave';
import { readImageFile } from '@src/utils';
import { ownersQuery } from './arweave-query-api';
import { messageBox } from './message-service';
import { ARWEAVE } from '@src/networkConfig';

let jwt_key;

// If you want to connect directly to a node
const arweave = Arweave.init({
  host: ARWEAVE.HOST,
  port: ARWEAVE.PORT,
  protocol: ARWEAVE.PROTOCOL,
});
// Or to specify a gateway when running from NodeJS you might use
// const arweave = Arweave.init({
//   host: 'arweave.net',
//   port: 443,
//   protocol: 'https'
// });

arweave.network.getInfo().then(console.log);

arweave.wallets.generate().then((key) => {
  console.log('jwt', key);
  jwt_key = key;
  // {
  //     "kty": "RSA",
  //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
  //     "e": ...
});

// 发起交易
export const storeToArweave = async function (entity, tags) {
  try {
    const key = await arweave.wallets.generate();
    const tx = await arweave.createTransaction(
      {
        data: entity,
      },
      key,
    );
    // 添加标签，可以用graphql做搜索
    // tx.addTag('Content-Type', 'image/jpeg');
    // tx.addTag('Content-Type', 'text/json');
    Object.keys(tags).forEach((key) => {
      tx.addTag(key, tags[key]);
    });

    console.log('Key:', key);
    console.log('Signature:', tx.signature);

    await arweave.transactions.sign(tx, key);
    await arweave.transactions.post(tx);
    const url = ARWEAVE.ADDRESS + tx.id; // url 在访问 ntf 时要用，可作为 meta 的一部分
    console.log('url', url);
    messageBox('success', '', url);
    return url;
  } catch (error) {
    console.error('Error storing to Arweave:', error);
    messageBox('danger', 'Failed to store to Arweave', error.message);
  }
};

export const storeMetadata = async function (meta) {
  return await storeToArweave(meta, { 'Content-Type': 'text/json', 'Domain-Type': 'meta' });
};

export const storeNftImage = async function (file) {
  const data = await readImageFile(file);
  const url = storeToArweave(data, { 'Content-Type': 'image/jpeg', 'Domain-Type': 'nft-image' });
  return url;
};

export const storeNftArticle = async function (title, content) {
  const tx = await arweave.createTransaction({
    data: content,
  });
  const tags = { 'Content-Type': 'text/html', 'Domain-Type': 'article', title };
  Object.keys(tags).map((k) => {
    tx.addTag(k, tags[k]);
  });
  //  tx.addTag('Content-Type', 'text/html');
  //  tx.addTag('Domain-Type', 'article');
  await arweave.transactions.sign(tx); //
  await arweave.transactions.post(tx);
  const myurl = ARWEAVE.ADDRESS + tx.id;
  messageBox('success', '', myurl);
  return myurl;
};

export const myArticles = async () => {
  try {
    const wallet = window.arweaveWallet;
    const currentAddress = await wallet.getActiveAddress();
    const query = ownersQuery(currentAddress);
    const results = await arweave.api.post(`graphql`, query).catch((err) => {
      console.error('GraphQL query failed');
      throw new Error(err);
    });
    const edges = results.data.data.transactions.edges;
    return edges;
  } catch (error) {
    console.log(error);
  }
};
