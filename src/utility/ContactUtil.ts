import { ethers } from 'ethers'
import { provider, signer } from './WalletAuth'
import { abi, bytecode, contract } from '../../contracts/contractsArterfacts.js'
// factory = new ethers.ContractFactory(abi, bytecode, signer)
let contract

export const deploy = async (): Promise<void> => {
  console.log(provider)
  console.log(signer)
  console.log(abi)
  console.log(bytecode)
  const factory = new ethers.ContractFactory(abi, bytecode, signer)
  console.log(factory)
  contract = await factory.deploy()
  console.log(contract.address)
  return
}

export const transaction = async (): Promise<void> => {
  await contract.set(53)
  const test = contract.get()
  console.log(contract)
  console.log(test)
  return
}

export const getContract = async (): Promise<void> => {
  const test = await contract.get()
  console.log(test)
  console.log(parseInt(test._hex, 16))
  return
}
