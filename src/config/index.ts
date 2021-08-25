let DEFAULT_NETWORK = {
  chainId: `0x${parseInt('137', 10).toString(16)}`,
  chainName: 'Matic Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'matic',
    decimals: 18,
  },
  rpcUrls: [
    'https://rpc-mainnet.matic.network',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet.chainstacklabs.com',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
    'https://matic-mainnet-archive-rpc.bwarelabs.com',
  ],
  blockExplorerUrls: ['https://explorer.matic.network/'],
}

if (process.env.VUE_APP_DEFAULT_NETWORK == 'LOCAL') {
  DEFAULT_NETWORK = {
    chainId: `0x${parseInt('1337', 10).toString(16)}`,
    chainName: 'Localhost 8545',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'eth',
      decimals: 18,
    },
    rpcUrls: ['https://localhost:8545'],
    blockExplorerUrls: ['https://explorer.matic.network/'],
  }
}

export default DEFAULT_NETWORK
