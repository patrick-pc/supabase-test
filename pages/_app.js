import '../styles/globals.css'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
  const test = 'test'
  return (
    <>
      <Head>
        <title>Supabase Test</title>
        <meta name="description" content="Supabase Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
