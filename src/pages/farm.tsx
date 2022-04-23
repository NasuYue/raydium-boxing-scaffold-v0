import type { NextPage } from 'next'
import AllFarms from 'components/AllFarms'

const FarmPage: NextPage = (props) => {
  return (
    <div className="flex justify-center self-center">
      <AllFarms />
    </div>
  )
}

export default FarmPage
