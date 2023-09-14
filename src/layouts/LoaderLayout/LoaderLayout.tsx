import { FC, PropsWithChildren, useRef, useState, useEffect } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { portalIds } from '@/pages/_document';
import { createPortal } from 'react-dom';
import { GridLoader } from 'react-spinners';
import backdropStyle from '../../components/dropdown/DropDown.module.scss';
import { useRouter } from 'next/router'
import { useActions } from '@/hooks/useActions';

export const LoaderLayout: FC<PropsWithChildren> = ({children}) => {
  
  const isLoading = useTypedSelector(state => state.loadingReducer.isLoading);
  const refModal = useRef<Element | null>(null);
  const refBackdrop = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { setLoadingWithParam } = useActions();
  
  useEffect(() => {
    refModal.current = document.getElementById(`${portalIds.modal}`);
    refBackdrop.current = document.getElementById(`${portalIds.backdrop}`);
    setMounted(true);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoadingWithParam(true);
    });
    router.events.on('routeChangeComplete', () => {
      setLoadingWithParam(false);
    });
  }, [router])

  return (
    <>
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
      {children}
    </>
  );
}