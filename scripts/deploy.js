// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs')
async function main() {

  const network = hre.network.name
  let deployer = await hre.ethers.getSigner();

  console.log("deployer:", deployer.address, network)
  
  let Lock = await hre.ethers.getContractFactory("Lock");
  let lock = await Lock.deploy();
  
  console.log("lock deployed to:", lock.address);
  let deployed = {
    "lock": lock.address
  }
  fs.writeFileSync('./deployed/'+network+'.json', JSON.stringify(deployed,null,2))

  let tx = await lock.setn(12);
  tx = await tx.wait()
  console.log("info:", await lock.count(), await lock.records(3), await lock.records(99))
  console.log("tx:", tx)

  tx = await lock.setn(12);
  tx = await tx.wait()
  console.log("info:", await lock.count(), await lock.records(3), await lock.records(99))
  console.log("tx:", tx)

  tx = await lock.setn(12);
  tx = await tx.wait()
  console.log("info:", await lock.count(), await lock.records(3), await lock.records(99))
  console.log("tx:", tx)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
