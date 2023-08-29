import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { portalIds } from "@/pages/_document";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import backdropStyle from '../../components/dropdown/DropDown.module.scss';

export const ModalLayout: FC<PropsWithChildren> = ({children}) => {

  const isShowModal = useTypedSelector(state => state.modalReducer.isShowModal);
  const component = useTypedSelector(state => state.modalReducer.component);

  const refModal = useRef<Element | null>(null);
  const refBackdrop = useRef<Element | null>(null);

  useEffect(() => {
    refModal.current = document.getElementById(`${portalIds.modal}`);
    refBackdrop.current = document.getElementById(`${portalIds.backdrop}`);
  }, []);

  return (
    <>
      {isShowModal && <>
        
        {createPortal(<div className={backdropStyle.backdrop}></div>, refModal.current as Element)}
        {createPortal(<div style=
            {{position: 'fixed',
              zIndex: '1001',
              margin: 'auto auto'}}
            >{component}</div>, refModal.current as Element)}
      </>}
      {children}
    </>
  )
}