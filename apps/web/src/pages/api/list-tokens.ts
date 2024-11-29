import { trpcClient } from "@icecreamswap/backend";

export default async function handler(req, res) {
  const { chainId } = req.query

  const response = await trpcClient.token.defaultList.query({
    chainId: chainId && parseInt(chainId)
  });

  res.json(response)
}
