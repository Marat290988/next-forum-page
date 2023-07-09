import { Home } from '@/screens/home/Home';
import { Inter } from 'next/font/google'
import Head from 'next/head';
import { useTypedSelector } from './../hooks/useTypedSelector';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { portalIds } from './_document';
import { createPortal } from 'react-dom';
import backdropStyle from '../components/dropdown/DropDown.module.scss';
import { GridLoader } from 'react-spinners';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { axiosReq } from '@/axios/api';

const inter = Inter({ subsets: ['latin'] })

export default function HomePage({data}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isLoading = useTypedSelector(state => state.loadingReducer.isLoading);
  const refModal = useRef<Element | null>(null);
  const refBackdrop = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    refModal.current = document.getElementById(`${portalIds.modal}`);
    refBackdrop.current = document.getElementById(`${portalIds.backdrop}`);
    setMounted(true);
  }, []);
  return (
    <>
      <Head>
        <title>Next Forum</title>
      </Head>
      {isLoading && (
        <>
          {createPortal(<div className={backdropStyle.backdrop}></div>, refModal.current as Element)}
          {createPortal(<div style=
            {{position: 'fixed',
              zIndex: '1001',
              left: 'calc(50% - 28px)',
              top: 'calc(50% - 31px)'}}
            ><GridLoader color='var(--blue02)' /></div>, refModal.current as Element)}
        </>
      )}
      <Home data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<{data: {name: string, id: number}[]}> = async () => {
  const response = await axiosReq({
    url: process.env.NEXT_PUBLIC_SITE_URL + '/section/get_sections'
  });
  return {props: {
    data: response.data.sections
  }, 
    revalidate: 300
  }
}

