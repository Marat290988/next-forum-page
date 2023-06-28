import { Home } from '@/screens/home/Home';
import { Inter } from 'next/font/google'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Next Forum</title>
      </Head>
      <Home />
    </>
  )
}
