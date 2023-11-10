import { trpcClient } from '@icecreamswap/backend'
import { Address } from "wagmi";
import { WalletClient } from "wagmi";

export const useOnLogin = (address: Address, walletClient: WalletClient, account: Address) => async () => {
  if (!address) return
  // @ts-ignore
  const { nonce } = await trpcClient.session.nonce.query()
  if (!walletClient) return
  const signature = await walletClient.signMessage({message: nonce, account})
  // @ts-ignore
  await trpcClient.session.login.mutate({
    signature,
    address: address!,
  })
}
