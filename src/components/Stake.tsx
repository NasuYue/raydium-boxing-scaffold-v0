import { FC, useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { Box, Typography, Modal, Tabs, Tab } from '@mui/material'
import { ChevronLeft, ChevronRight, CreditCard, Repeat } from 'react-feather'
import boxLogo from '../assets/symbal/box.png'
import rayLogo from '../assets/symbal/ray.png'

const TOKENS = [
  'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5LSFpvLDkcdV2a3Kiyzmg5YmJsj2XDLySaXvnfP1cgLT/logo.png',
  'https://sdk.raydium.io/icons/9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE.png',
  'https://sdk.raydium.io/icons/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU.png',
  'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ce3PSQfkxT5ua4r2JqCoWYrMwKWC5hEzwsrT9Hb7mAz9/DATE.svg',
  'https://sdk.raydium.io/icons/HCgybxq5Upy8Mccihrp7EsmwwFqYZtrHrsmsKwtGXLgW.png',
]

const Stake: FC = (props) => {
  const testColor = 'bg-[#707070]'

  const [tab, setTab] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue)
  }

  const wallet = useWallet()

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <Image src={boxLogo} width={120} height={120} />
      <Typography variant="h5">
        <div className="flex items-center">
          EARN MORE BY <ChevronLeft size={32} /> <Typography variant="h4">bRAY</Typography> <ChevronRight size={32} />
        </div>
      </Typography>
      <div className="mt-4">
        <Typography variant="subtitle2">Stake RAY and use bRAY while earning rewards</Typography>
      </div>
      <div className="w-1/2 flex justify-between items-center mt-6 gap-4">
        <div className="basis-1/3 h-28 py-5 px-6 bg-white bg-opacity-25 flex flex-col items-start rounded-2xl">
          <Typography variant="subtitle1">Staking APY</Typography>
          <Typography variant="h4">19.25%</Typography>
        </div>
        <div className="basis-2/3 h-28 py-5 px-6 bg-white bg-opacity-25 rounded-2xl flex">
          <div className="basis-2/3">
            <Typography variant="subtitle1">bRAY Balance</Typography>
          </div>
          <div className="basis-1/3 flex flex-col items-end">
            <div className="flex">
              <Image src={boxLogo} width={40} height={40} />
              <Typography variant="h4">14.690</Typography>
            </div>
            <Typography variant="subtitle1">≈ 15.541 RAY</Typography>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-80 p-5 bg-white bg-opacity-25 flex flex-col items-start rounded-2xl m-4">
        <Tabs
          sx={{ width: '100%', backgroundColor: 'rgba(0,0,0,25%)', borderRadius: '0.8rem', marginTop: '8px' }}
          value={tab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Stake" />
          <Tab label="Unstake" />
        </Tabs>

        <div className="w-full h-full">
          {tab === 0 && (
            <>
              <div className="w-full flex mt-6 gap-4">
                <div className="basis-5/6 flex flex-col gap-2">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-between items-center gap-2 bg-black bg-opacity-25 p-2 rounded-md">
                      <Repeat size={16} className="cursor-pointer" />
                      <Typography variant="subtitle2">1 RAY = 0.xxxx bRAY</Typography>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <CreditCard />
                      <Typography variant="subtitle2">Balance: 0</Typography>
                    </div>
                  </div>
                  <input
                    type="number"
                    className="w-full h-10 text-lg text-white bg-transparent border rounded-md focus:ring-0 focus:outline-none"
                    placeholder=" 0.0"
                  />
                </div>
                <div className="basis-1/6 flex items-end">
                  <div className="w-full flex justify-between items-center ">
                    <Typography variant="h5">RAY</Typography>
                    <Image src={rayLogo} width={60} height={60} />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 mt-10">
                <div className="w-full flex justify-between items-center">
                  <Typography variant="subtitle2">bRAY to receive</Typography>

                  <Typography variant="subtitle2">0</Typography>
                </div>
                {wallet.publicKey ? (
                  <button className="w-full rounded-md py-2 text-base bg-gray-500 p-5">STAKE</button>
                ) : (
                  <WalletMultiButton className="justify-center w-full rounded-md py-2 text-base bg-gray-500 p-5" />
                )}
              </div>
            </>
          )}

          {tab === 1 && (
            <>
              <div className="w-full flex mt-6 gap-4">
                <div className="basis-full flex flex-col gap-2">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-between items-center gap-2 bg-black bg-opacity-25 p-2 rounded-md">
                      <Repeat size={16} className="cursor-pointer" />
                      <Typography variant="subtitle2">1 bRAY = 1.xxx RAY</Typography>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <CreditCard />
                      <Typography variant="subtitle2">Balance: 0</Typography>
                    </div>
                  </div>
                  <input
                    type="number"
                    className="w-full h-10 text-lg text-white bg-transparent border rounded-md focus:ring-0 focus:outline-none"
                    placeholder=" 0.0"
                  />
                </div>
                <div className="basis-3/12 flex items-end">
                  <div className="w-full flex justify-between items-center ">
                    <Typography variant="h5">bRAY</Typography>
                    <Image src={boxLogo} width={60} height={60} />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 mt-10">
                <div className="w-full flex justify-between items-center">
                  <Typography variant="subtitle2">RAY to receive</Typography>

                  <Typography variant="subtitle2">0</Typography>
                </div>
                {wallet.publicKey ? (
                  <button className="w-full rounded-md py-2 text-base bg-gray-500 p-5">UNSTAKE</button>
                ) : (
                  <WalletMultiButton className="justify-center w-full rounded-md py-2 text-base bg-gray-500 p-5" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Stake
