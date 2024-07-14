import { time, loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers.js';
import chai from 'chai';

const { expect } = chai;

describe('NFT Contract', function () {
  async function deployNftFixture() {
    const feeCollector = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const NFTContract = await ethers.getContractFactory('NFT');
    const nft = await NFTContract.deploy(feeCollector);

    return { nft, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should get tokenURI of the NFT after mint', async function () {
      const { nft, owner } = await loadFixture(deployNftFixture);
      const addr = await owner.getAddress();
      await nft.mint(addr, 'lzx');
      expect(await nft.tokenURI(0)).to.equal('lzx');
    });
  });
});
