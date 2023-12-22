// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const ethers = require("ethers");
const argv = require('optimist').argv

const networks = require('../networks.js')
async function main() {

    let  network = 'wanchainTestnet'
    if(argv.network) {
        network = argv.network
    }
    const priv = Buffer.from(process.env.PK.slice(2), 'hex')

    let scaddr = require('../deployed/'+network+'.json')
    let abi = require('./LockAbi.json')


    let url = networks[network].url
    let httpProvider = new ethers.providers.JsonRpcProvider(url)
    await httpProvider.ready
    let wallet = new ethers.Wallet(priv, httpProvider)
    let lock = new ethers.Contract(scaddr.lock, abi, httpProvider)
    lock = lock.connect(wallet)

    let tx =  await lock.setn(12)
    tx = await tx.wait()
    console.log("tx:", tx)

    console.log("info:", await lock.count(), await lock.records(3), await lock.records(99))

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
