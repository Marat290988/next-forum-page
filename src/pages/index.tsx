import { Home } from '@/screens/home/Home';
import { Inter } from 'next/font/google'
import Head from 'next/head';
import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType } from 'next';
import { axiosReq } from '@/axios/api';

const inter = Inter({ subsets: ['latin'] })

export interface StaticIndexItem {
  name: string, 
  id: number, 
  forums: {name: string, id: number}[]
}



export default function HomePage(props: {data: StaticIndexItem[]}) {
  const {data} = props;
  return (
    <>
      <Head>
        <title>Next Forum</title>
      </Head>

      <Home data={data} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{data: StaticIndexItem[]}> = async (context) => {
  
  const response = await axiosReq({
    url: `http://${context.req.headers.host}/api` + '/section/get_sections'
  });
  // return {props: {
  //   data: response.data.sections
  // }, 
  //   revalidate: 300
  // }
  return {
    props: {
      data: response.data.sections
    }
  }
}

