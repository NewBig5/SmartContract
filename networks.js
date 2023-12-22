const networks = {
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [process.env.PK],
    },
    wanchainTestnet: {
      gasPrice: 2e9,
      gasLimit: 2e7,
      url: "https://gwan-ssl.wandevs.org:46891",
      accounts: [process.env.PK],
    },
}

module.exports = networks