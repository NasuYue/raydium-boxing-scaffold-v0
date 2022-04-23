import type { NextPage } from "next";
import Head from "next/head";
import Stake from "components/Stake";

const Home: NextPage = (props) => {
  return (
    <div className="flex justify-center items-center mt-6">
      <Head>
        <title>Box: A Raydium Solution</title>
        <meta name="description" content="Box: A Raydium Solution" />
      </Head>

      <Stake/>
    </div>
  )
}

export default Home
