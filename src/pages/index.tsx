import type { NextPage } from "next";
import Head from "next/head";
import Calculator from "components/Calculator";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Box: A Raydium Solution</title>
        <meta name="description" content="Box: A Raydium Solution" />
      </Head>
      <Calculator/>
    </div>
  )
}

export default Home
