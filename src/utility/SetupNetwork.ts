// Set of helper functions to facilitate wallet setup

import DEFAULT_NETWORK from '../config'
import { notify } from '@kyvg/vue3-notification'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (): Promise<boolean> => {
  const provider = window.ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [DEFAULT_NETWORK],
      })
      return true
    } catch (error) {
      console.error(error)
      notify({
        group: 'wallet',
        title: 'Setup network error',
        text: error.message,
        type: 'error',
      })
      return false
    }
  } else {
    notify({
      group: 'wallet',
      title: 'Connect wallet error',
      text: 'No Ethereum provider was found on window.ethereum.',
      type: 'error',
    })
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
// export const registerToken = async (
//   tokenAddress: string,
//   tokenSymbol: string,
//   tokenDecimals: number,
//   tokenImage: string
// ) => {
//   const tokenAdded = await (window as WindowChain).ethereum.request({
//     method: 'wallet_watchAsset',
//     params: {
//       type: 'ERC20',
//       options: {
//         address: tokenAddress,
//         symbol: tokenSymbol,
//         decimals: tokenDecimals,
//         image: tokenImage,
//       },
//     },
//   })

//   return tokenAdded
// }
