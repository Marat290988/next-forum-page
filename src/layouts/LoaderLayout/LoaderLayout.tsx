import { FC, PropsWithChildren, useRef, useState, useEffect } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { portalIds } from '@/pages/_document';
import { createPortal } from 'react-dom';
import { GridLoader } from 'react-spinners';
import backdropStyle from '../../components/dropdown/DropDown.module.scss';

export const LoaderLayout: FC<PropsWithChildren> = ({children}) => {
  
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