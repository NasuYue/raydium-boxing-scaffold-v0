// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import calculateApy from '../../libs/calculateApy'

type Data = {
  data?: {
    'RAY-SRM': string
    'RAY-soETH': string
    'RAY-USDC': string
    'RAY-SOL': string
    'RAY-USDT': string
    'SOL-USDT': string
    'SOL-USDC': string
    'GENE-USDC': string
    'mSOL-USDC': string
    'stSOL-USDC': string
  }
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const data = await calculateApy()
    res.status(200).json({ ...data })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
