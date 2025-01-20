import { ChainId, chainMap } from "@icecreamswap/constants";
import { prisma } from '@icecreamswap/database'
import { useContract } from "hooks/useContract";
import { kycABI } from "config/abi/kyc";
import { createWalletClient, http } from "viem";
import * as process from "process";
import { getContract } from "utils/contractHelpers";

export default async function handler(req, res) {
  // eslint-disable-next-line camelcase
  const { session_id, state } = req.body
  const { secret } = req.query
  if (secret !== process.env.SYNAPS_SECRET) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  if (state !== 'VALIDATED') {
    res.json({ message: 'ok' })
    return
  }

  const response = await fetch('https://individual-api.synaps.io/v3/session/info', {
    method: 'GET',
    headers: {
      'Client-Id': process.env.SYNAPS_CLIENT_ID,
      // eslint-disable-next-line camelcase
      'Session-Id': session_id,
      'Api-Key': process.env.SYNAPS_API_KEY,
    },
  })
  if (!response.ok) {
    res.status(500).json({ message: 'Synaps error' })
    return
  }

  const { alias, status } = await response.json()
  if (status !== 'VERIFIED') {
    res.json({ message: 'ok' })
    return
  }

  const address = alias.toLowerCase()

  await prisma.kyc.update({
    where: {
      address,
    },
    data: {
      status: 'verified',
    },
  })

  const walletClient = createWalletClient({
    key: process.env.KYC_MINTER,
    chain: chainMap.core,
    transport: http(chainMap.core.rpcUrls.default.http[0])
  })
  const kyc = getContract({
    abi: kycABI,
    address: chainMap.core.kyc.contractKyced,
    chainId: ChainId.CORE,
    signer: walletClient,
  })
  await kyc.write.safeMint(address, {})

  res.json({ message: 'ok' })
}
