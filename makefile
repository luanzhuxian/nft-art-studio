transform:hcompile
	# npx babel ignition/modules/Lock.js --out-file ignition/modules/Lock.cjs
	npx babel ignition/modules/NFT.js --out-file ignition/modules/NFT.cjs

hnode:
	npx hardhat node

hclean:
	npx hardhat clean

hcompile:hclean
	npx hardhat compile

htest:
	npx hardhat test
 
hdeploy:
	# npx hardhat ignition deploy ./ignition/modules/Lock.cjs --network localhost
	npx hardhat ignition deploy ./ignition/modules/NFT.cjs --network localhost