import { FC, useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Percent } from 'react-feather'
import Image from 'next/image'
import Calculator from './Calculator'
import { BRAY_RAY_DATA } from './AllFarms'
import getTokenIconUrl from 'utils/getTokenIconUrl'
import { formatIntegerUSDCurrency } from 'utils/numberFormat'
import aprToApy from 'utils/aprToApy'
// import calculateTotalRewardsPerWeek from 'utils/calculateTotalRewardsPerWeek'

type FarmProps = {
  pairing: string
  farm: any
}

const Farm: FC<FarmProps> = ({ pairing, farm }: FarmProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const wallet = useWallet()
  const { realApr, rewardMints, lpToken, lpPool } = farm
  console.log({ pairing, farm })

  const formattedApy = () => {
    const apy = aprToApy(parseInt(realApr), 365 * 8)
    let sliceIndex = apy.toString().indexOf('.') + 3
    return realApr.slice(0, sliceIndex)
  }

  return (
    <>
      <div className="w-1/4 h-fit bg-white bg-opacity-25 rounded-2xl p-4 m-2">
        <div className="flex items-center pt-6 pb-2 relative flex-wrap">
          <div className="flex items-center justify-center">
            <div className="flex">
              <div className="relative h-11 w-11 rounded-full border">
                <Image
                  className="rounded-full"
                  layout="fill"
                  src={lpToken.base.mint ? getTokenIconUrl(lpToken.base.mint) : lpToken.base.src}
                  alt={lpToken.base.name}
                />
              </div>
              <div className="relative h-11 w-11 rounded-full border -ml-1.5">
                <Image
                  className="rounded-full"
                  layout="fill"
                  src={getTokenIconUrl(lpToken.quote.mint)}
                  alt={lpToken.quote.name}
                />
              </div>
            </div>
            <div className="flex flex-col pl-2">
              <span className="pb-2">{pairing}</span>
              <button className="text-xs text-framBorder border border-framBorder rounded w-10 text-center box-content px-1">
                Detail
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm">Total Staked:</span>
          <span className="text-xl text-white">{formatIntegerUSDCurrency(lpPool.liquidity)}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm flex">
            {pairing === BRAY_RAY_DATA.pairing ? 'APR' : 'APY'}{' '}
            <Percent size={16} className="ml-2 cursor-pointer" onClick={handleOpen} />
          </span>
          <span className="text-xl text-white">{formattedApy()}%</span>
        </div>
        <div className="my-3.5 border border-t-0" />
        <div className="flex justify-between items-center py-2">
          <span className="text-sm">Reward Tokens</span>
          <span className="flex">
            {rewardMints.map((mints: string) => (
              <div className="relative h-5 w-5 ml-1.5 my-px">
                <Image
                  key={mints}
                  src={pairing === BRAY_RAY_DATA.pairing ? mints : getTokenIconUrl(mints)}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
            ))}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm">Rewards per week</span>
          {/* <span>{calculateTotalRewardsPerWeek({liquidity:lpPool.liquidity, apy:})}</span> */}
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm">Unclaimed rewards</span>
          <span>-</span>
        </div>
        {wallet.publicKey ? (
          <button className="mt-4 mb-3 w-full rounded-md py-2 text-base bg-gray-500 p-5" onClick={handleOpen}>
            Calculate APY
          </button>
        ) : (
          <WalletMultiButton className="justify-center mt-4 mb-3 w-full rounded-md py-2 text-base bg-gray-500 p-5" />
        )}
      </div>
      <Calculator pairing={pairing} farmData={farm} isOpen={open} handleClose={handleClose} />
    </>
  )
}

export default Farm
