'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;
var _modules = require('@nomicfoundation/hardhat-ignition/modules');
var _default = (exports.default = (0, _modules.buildModule)('NFTModule', (m) => {
  const feeCollector = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
  const nft = m.contract('NFT', [feeCollector]);
  return {
    nft,
  };
}));
