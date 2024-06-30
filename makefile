transform:
	npx babel ignition/modules/Lock.js --out-file ignition/modules/Lock2.cjs

hardhat-test:
	npx hardhat test
 
hardhat-deploy:
	npx hardhat ignition deploy ./ignition/modules/Lock.cjs --network localhost