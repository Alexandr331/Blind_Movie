import Layout from '@/layouts/Layout'
import UserStore from '@/providers/Store'
import '@/styles/globals.scss'
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <NextNProgress />
      <UserStore>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserStore>
    </>
  )
}
