import type { NextPage } from 'next'
import Head from 'next/head'
import Farm from 'components/Farm'

const FarmPage: NextPage = (props) => {
  return (
    <div className="flex justify-center self-center">
      <Farm />
    </div>
  )
}

export default FarmPage
