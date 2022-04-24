import { Connection } from '@solana/web3.js'
import { Farm, jsonInfo2PoolKeys, MAINNET_SPL_TOKENS, MAINNET_LP_TOKENS, TokenAmount } from '@raydium-io/raydium-sdk'
// import { version } from '@raydium-io/raydium-sdk/lib/version'
import axios from 'axios'
import BNJS from 'bignumber.js'

require('dotenv').config()

const rpcHost = process.env.RPC_HOST || ''
const apiHost = process.env.API_HOST || ''
const farmPoolJson = process.env.FARM_POOL_JSON || ''

function whetherIsStakeFarmPool(info: Record<string, any>): boolean {
  return (
    info.state.perSlotRewards.length === 1 && String(info.lpVault.mint) === '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'
  )
}

function getTokenByAddr(addr: string): any {
  return Object.values(MAINNET_SPL_TOKENS).filter((splToken: Record<string, any>) => {
    return splToken.mint.toLowerCase() === addr.toLowerCase()
  })
}

function getLPTokenByAddr(addr: string): any {
  return Object.values(MAINNET_LP_TOKENS).filter((lpToken: Record<string, any>) => {
    return lpToken.mint.toLowerCase() === addr.toLowerCase()
  })
}

const main = async () => {
  // console.log(`Start raydium test script, SDK version: ${version}`)
  const connection = new Connection(rpcHost)
  const { data } = await axios.get(`${apiHost}/v2/main/pairs`)
  const pools = data
    .filter((pool: Record<string, any>) => {
      return pool.apr24h > 0 && pool.fee24h > 1000
    })
    .sort((a: Record<string, any>, b: Record<string, any>) => {
      return a.apr24h > b.apr24h ? -1 : 0
    })
  const tokenPriceRes = await axios.get(`${apiHost}/v2/main/price`)
  const tokenPrices = tokenPriceRes.data
  const rawFarmInfos = await axios.get(farmPoolJson)
  const farmInfos = rawFarmInfos.data.official
    .filter((farm: Record<string, any>) => {
      const pool = pools.filter((p: Record<string, any>) => p.lpMint.toLowerCase() === farm.lpMint.toLowerCase())
      return pool.length > 0
    })
    .map(jsonInfo2PoolKeys)
  // console.log(`Total count: ${pools.length} ${farmInfos.length}`)
  const rawFarmInfo = await Farm.fetchMultipleInfo({
    connection,
    pools: farmInfos,
    // owner,
    config: { commitment: 'confirmed' },
  })
  const rFarmInfos = farmInfos.map((pool, idx) => {
    const j = rawFarmInfos.data.official.filter((r: Record<string, any>) => {
      return r.lpMint.toLowerCase() == pool.lpMint.toString().toLowerCase()
    })
    const lpPool = pools.filter((r: Record<string, any>) => {
      return r.lpMint.toLowerCase() == pool.lpMint.toString().toLowerCase()
    })
    const lpToken = getLPTokenByAddr(pool.lpMint.toString())
    return Object.assign(
      pool,
      rawFarmInfo[String(pool.id)],
      {
        jsonInfo: j.length > 0 ? j[0] : {},
      },
      {
        isStakePool: whetherIsStakeFarmPool(rawFarmInfo[String(pool.id)]),
        lpPool: lpPool.length > 0 ? lpPool[0] : {},
        lpToken: lpToken.length > 0 ? lpToken[0] : {},
        rewardTokenPrices: pool.rewardMints.map((rewardMint) => tokenPrices?.[String(rewardMint)]) ?? [],
        rewardTokens: pool.rewardMints.map((rewardMint) => {
          const rToken = getTokenByAddr(rewardMint.toString())
          return rToken.length > 0 ? rToken[0] : {}
        }),
      }
    )
  })
  const ten = new BNJS(10)
  return rFarmInfos
    .map((r: Record<string, any>) => {
      if (!r.lpToken.decimals) {
        return r
      }
      let x = new BNJS(new TokenAmount(r.lpToken, r.lpVault.amount).toExact())
      let y = new BNJS(r.lpPool.lpPrice)
      const tvl = x.multipliedBy(y).multipliedBy(ten.pow(6))
      const aprs = r.state.perSlotRewards.map((perSlotReward, idx) => {
        const rewardToken = r.rewardTokens[idx]
        if (!rewardToken) return undefined
        const rewardTokenPrice = r.rewardTokenPrices[idx]
        if (!rewardTokenPrice) return undefined
        const perSlotRewardBN = new BNJS(perSlotReward.toString())
        const rewardTokenPriceBN = new BNJS(rewardTokenPrice.toString())
        const rewardtotalPricePerYear = perSlotRewardBN
          .dividedBy(ten.pow(new BNJS(rewardToken.decimals || 1)))
          .multipliedBy(new BNJS(2 * 60 * 60 * 24 * 365))
          .multipliedBy(rewardTokenPriceBN)
          .multipliedBy(ten.pow(6))
        if (!tvl) return undefined
        const apr = rewardtotalPricePerYear.dividedBy(tvl)
        return apr.multipliedBy(ten.pow(2))
      })
      const totalApr = aprs.reduce((acc, cur) => (acc ? (cur ? acc.plus(cur) : acc) : cur), undefined)
      const feeApr = new BNJS(r.lpPool.apr7d)
      r.totalApr = totalApr
      r.feeApr = feeApr
      r.realApr = totalApr.plus(feeApr).minus(0.3)
      return r
    })
    .filter((r: Record<string, any>) => (r.totalApr ? r.totalApr.gt(0) : false))
}

const calculateApy = () =>
  main()
    .then((farms) => {
      let result = {}
      for (let i = 0; i < farms.length; i++) {
        const farm = farms[i]
        const state = {
          ...farm.state,
          lastSlot: new BNJS(farm.state.lastSlot),
          perShareRewards: [new BNJS(farm.state.perShareRewards)],
          perSlotRewards: [new BNJS(farm.state.perSlotRewards)],
          totalRewards: [new BNJS(farm.state.totalRewards)],
        }
        result[farm.lpPool.name] = { ...farm, state, realApr: new BNJS(farm.realApr) }
      }
      return result
    })
    .catch(console.error)

export default calculateApy
