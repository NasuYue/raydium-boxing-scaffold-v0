import { FC } from 'react'
import useSwr from 'swr'
import Farm from './Farm'
import boxLogo from '../assets/symbal/box.png'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const RAY_MINT = '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'

export const BRAY_RAY_DATA = {
  pairing: 'bRAY-RAY',
  lpToken: {
    base: { src: boxLogo },
    quote: { mint: RAY_MINT },
  },
  lpPool: { liquidity: 123456787 },
  rewardMints: [boxLogo],
  realApr: '88.88',
}

const AllFarms: FC = () => {
  const { data, error } = useSwr('/api/calculate', fetcher)

  if (!data) {
    return <h1>Loading</h1>
  }

  if (error) {
    return <h1>Oops.. Something went wrong! Please try again</h1>
  }

  return (
    <div className="flex flex-wrap items-center justify-center m-6">
      <Farm pairing={BRAY_RAY_DATA.pairing} farm={BRAY_RAY_DATA} />
      {Object.entries(data).map(([key, value]: [string, any]) => (
        <Farm key={key} pairing={key} farm={value} />
      ))}
    </div>
  )
}

export default AllFarms
