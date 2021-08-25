import { createStore } from 'vuex'

const store = createStore({
  state: {
    isVerified: false,
    walletAddress: '',
    truncatedWalletAddress: 'Connect',
  },
  mutations: {
    setVerification(state, isVerified: boolean) {
      state.isVerified = isVerified
    },
    setWalletAddress(state, walletAddress: string) {
      state.walletAddress = walletAddress
    },
    setTruncatedWalletAddress(state, truncatedWalletAddress: string) {
      state.truncatedWalletAddress = truncatedWalletAddress
    },
  },
  actions: {},
  modules: {},
  getters: {
    getIsVerified: (state) => state.isVerified,
    getWalletAddress: (state) => state.walletAddress,
    getTruncatedWalletAddress: (state) => state.truncatedWalletAddress,
  },
})

export default store
