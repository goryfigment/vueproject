import { ethers } from 'ethers'
import { notify } from '@kyvg/vue3-notification'
import { setupNetwork } from './SetupNetwork'
import DEFAULT_NETWORK from '../config'
import $store from '@/store'

export let provider
export let signer

//1. Need to save to vuex
//  a. isVerified
//  b. truncatedWalletAdress
//  Save provider and signer?
//  c. Future:
//    i: Token to harvest (all)
//    ii: Gator in Wallet
//    iii: Token Stats (Supply, Tx Amnt, Total Burnt, New Token/Block, TVL)
//2. Token. Panther Clone?

// convert wallet string to a smaller, concise string
export const truncateWalletAddress = (address: string, startLength = 4, endLength = 4): string => {
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`
}

// clear wallet cache
function clearWallerCache() {
  $store.commit('setVerification', false)
  $store.commit('setTruncatedWalletAddress', 'Connect')
  $store.commit('setWalletAddress', '')
  provider = null
  signer = null
}

// external link to the current explorer
export function redirectToExplorer(address: string): void {
  const explorerLink = DEFAULT_NETWORK.blockExplorerUrls + 'address/' + address
  window.open(explorerLink, '_blank')
}

// request access to the user's MetaMask account
async function requestAccount() {
  return await window.ethereum.request({ method: 'eth_requestAccounts' })
}

export const activateWallet = async (): Promise<boolean> => {
  // If we are already verified show wallet popup
  if ($store.getters.getIsVerified) {
    return
  }

  const windowEthereum = window.ethereum

  if (windowEthereum) {
    const hasSetup = await setupNetwork()
    if (hasSetup) {
      const accounts = await requestAccount()
      provider = new ethers.providers.Web3Provider(window.ethereum)
      signer = provider.getSigner()
      console.log(signer)

      $store.commit('setVerification', true)
      $store.commit('setWalletAddress', accounts[0])
      $store.commit('setTruncatedWalletAddress', truncateWalletAddress(accounts[0]))

      notify({
        group: 'wallet',
        title: 'Success',
        text: 'Wallet successfully connected!',
        type: 'success',
        duration: 10000,
      })

      return true
    }
  } else {
    clearWallerCache()

    notify({
      group: 'wallet',
      title: 'Connect wallet error',
      text: 'Setup has failed.',
      type: 'error',
      duration: 10000,
    })
  }
}

export const disconnectWallet = async (): Promise<boolean> => {
  console.log('Killing the wallet connection', provider)

  // TODO: Which providers have close method?
  if (provider.close) {
    await provider.close()
  }

  clearWallerCache()

  notify({
    group: 'wallet',
    title: 'Disconnected',
    text: 'Wallet successfully disconnected!',
    type: 'warn',
    duration: 10000,
  })

  return true
}

ethereum.on('accountsChanged', function () {
  // Time to reload your interface with accounts[0]!
  clearWallerCache()
  notify({
    group: 'wallet',
    title: 'Notice',
    text: 'Account successfully change!',
    type: 'warn',
    duration: 10000,
  })
})

ethereum.on('chainChanged', (chainId) => {
  if (DEFAULT_NETWORK.chainId !== chainId) {
    clearWallerCache()
    notify({
      group: 'wallet',
      title: 'Notice',
      text: 'Chain changed!',
      type: 'warn',
      duration: 10000,
    })
  }
})
