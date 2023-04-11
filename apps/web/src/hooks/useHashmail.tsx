import React from 'react'
import useActiveWeb3React from './useActiveWeb3React'

const HASHMAIL_CONSTANTS = {
  dappId: '0767a54d-f2b8-4c86-b6b2-dc716e47ec35',
  hashmail_settings: {
    widgetMode: 'light',
    horizontalPadding: 10,
    verticalPadding: 10,
  },
}

const useHashmail = () => {
  const { account } = useActiveWeb3React()

  const hashmailIdentify = (address: typeof account) => {
    try {
      if (address) window.hashmail.identify(address)
      else throw new Error('hashmail-error: address not found')
    } catch (e) {
      console.error(e)
      console.log(e)
    }
  }

  const hashmailDisconnect = () => {
    try {
      if (window.hashmail.disconnect) window.hashmail.disconnect()
    } catch (e) {
      console.error(e)
    }
  }

  const hashmailLoad = () => {
    window.hashmail.load(HASHMAIL_CONSTANTS.dappId, HASHMAIL_CONSTANTS.hashmail_settings)
  }

  React.useEffect(() => {
    if (account) {
      hashmailIdentify(account)
    } else {
      hashmailDisconnect()
    }
  }, [account])

  return { hashmailIdentify, hashmailLoad, hashmailDisconnect }
}

export default useHashmail
