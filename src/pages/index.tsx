import { Home } from '@/screens/home/Home';
import { Inter } from 'next/font/google'
import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { axiosReq } from '@/axios/api';

const inter = Inter({ subsets: ['latin'] })

export interface StaticIndexItem {
  name: string, 
  id: number, 
  forums: {name: string, id: number}[]
}

export default function HomePage({data}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>Next Forum</title>
      </Head>

      <Home data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<{data: StaticIndexItem[]}> = async () => {
  const response = await axiosReq({
    url: process.env.NEXT_PUBLIC_SITE_URL + '/section/get_sections'
  });
  return {props: {
    data: response.data.sections
  }, 
    revalidate: 300
  }
}

