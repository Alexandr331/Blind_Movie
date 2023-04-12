import Layout from '@/layouts/Layout'
import UserStore from '@/providers/Store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserStore>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserStore>
  )
}
