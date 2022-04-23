import { FC, useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Percent } from 'react-feather'
import Image from 'next/image'
import Calculator from './Calculator'

const TOKENS = [
  'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5LSFpvLDkcdV2a3Kiyzmg5YmJsj2XDLySaXvnfP1cgLT/logo.png',
  'https://sdk.raydium.io/icons/9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE.png',
  'https://sdk.raydium.io/icons/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU.png',
  'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ce3PSQfkxT5ua4r2JqCoWYrMwKWC5hEzwsrT9Hb7mAz9/DATE.svg',
  'https://sdk.raydium.io/icons/HCgybxq5Upy8Mccihrp7EsmwwFqYZtrHrsmsKwtGXLgW.png',
]

type FarmProps = {
  pairing: string
  apy: string
}

const Farm: FC<FarmProps> = ({ pairing, apy }: FarmProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const wallet = useWallet()

  const formattedApy = () => {
    let sliceIndex = apy.indexOf('.') + 3
    return apy.slice(0, sliceIndex)
  }

  return (
    <>
      <div className="w-1/4 h-fit bg-rose-200 rounded-2xl p-4 m-2">
        <div className="flex items-center pt-6 pb-2 relative flex-wrap">
          <div className="flex items-center justify-center">
            <div className="flex">
              <div className="relative h-11 w-11 rounded-full border">
                <Image
                  src="https://sdk.raydium.io/icons/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png"
                  className="rounded-full"
                  layout="fill"
                />
              </div>
              <div className="relative h-11 w-11 rounded-full border -ml-1.5">
                <Image
                  className="rounded-full"
                  src="https://sdk.raydium.io/icons/2wmKXX1xsxLfrvjEPrt2UHiqj8Gbzwxvffr9qmNjsw8g.png"
                  layout="fill"
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
          <span className="text-xl text-white">$14.12M</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm flex">
            APY <Percent size={16} className="ml-2 cursor-pointer" onClick={handleOpen} />
          </span>
          <span className="text-xl text-white">{formattedApy()}%</span>
        </div>
        <div className="my-3.5 border border-t-0" />
        <div className="flex justify-between items-center py-2">
          <span className="text-sm">Reward Tokens</span>
          <span className="flex">
            {TOKENS.map((src) => (
              <div className="relative h-5 w-5 ml-1.5 my-px">
                <Image key={src} src={src} layout="fill" className="rounded-full" />
              </div>
            ))}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm">Rewards per week</span>
          <span>93.12%</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm">Unclaimed rewards</span>
          <span>93.12%</span>
        </div>
        {wallet.publicKey ? (
          <button className="mt-4 mb-3 w-full rounded-full py-2 text-base bg-rose-300 p-5" onClick={handleOpen}>
            Calculate APY
          </button>
        ) : (
          <WalletMultiButton className="justify-center mt-4 mb-3 w-full rounded-full py-2 text-base bg-rose-300 p-5" />
        )}
      </div>
      <Calculator isOpen={open} handleClose={handleClose} />
    </>
  )
}

export default Farm
