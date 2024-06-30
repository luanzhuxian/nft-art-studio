transform:
	npx babel ignition/modules/Lock.js --out-file ignition/modules/Lock2.cjs

hnode:
	npx hardhat node

htest:
	npx hardhat test
 
hdeploy:
	npx hardhat ignition deploy ./ignition/modules/Lock.cjs --network localhost