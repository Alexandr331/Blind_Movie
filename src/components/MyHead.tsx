import Head from 'next/head'

type component = {
  title: string
}

const MyHead = ({ title }: component) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default MyHead