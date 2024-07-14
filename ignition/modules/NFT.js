import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('NFTModule', (m) => {
  const feeCollector = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

  const nft = m.contract('NFT', [feeCollector]);

  return { nft };
});
