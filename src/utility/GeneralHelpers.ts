import { notify } from '@kyvg/vue3-notification'

export function copyToClipboard(address: string): void {
  const input = document.createElement('INPUT') as HTMLInputElement
  document.body.appendChild(input)
  input.value = address
  input.focus()
  input.select()
  document.execCommand('copy')
  input.remove()

  notify({
    group: 'popup',
    title: 'Wallet Copied!',
    text: '',
    type: 'success',
    duration: 1000,
  })
}
