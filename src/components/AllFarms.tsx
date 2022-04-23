import { FC } from 'react'
import useSwr from 'swr'
import Farm from './Farm'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

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
      {Object.entries(data).map(([key, value]) => (
        <Farm key={key} pairing={key} apy={value} />
      ))}
    </div>
  )
}

export default AllFarms
