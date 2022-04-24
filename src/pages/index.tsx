import type { NextPage } from 'next'
import Stake from 'components/Stake'

const Home: NextPage = (props) => {
  return (
    <div className="flex justify-center items-center mt-6">
      <Stake />
    </div>
  )
}

export default Home
