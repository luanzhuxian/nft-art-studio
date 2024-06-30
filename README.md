# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

```shell
npx hardhat node
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

This will expose a JSON-RPC interface to Hardhat Network. To use it connect your wallet or application to http://127.0.0.1:8545.

If you want to connect Hardhat to this node, for example to run a deployment against it, you simply need to run it using --network localhost.

// 不使用内置本地开发链，使用指定区块链

npx hardhat test --network localhost

npx hardhat ignition deploy ./ignition/modules/Lock.js --network localhost

```
