import styles from "./DropDown.module.scss";
import { portalIds } from "@/pages/_document";
import { FC, ReactElement, RefObject, useEffect, useRef, useState, PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";

export const DropDown: 
  FC<PropsWithChildren<{
    isShow: boolean, 
    hideDropDown: () => void, 
    parentElement: RefObject<HTMLDivElement>
  }>> = 
(
  {isShow, hideDropDown, parentElement, children}
) => {
  const refModal = useRef<Element | null>(null);
  const refBackdrop = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  const jsxRef = useRef(null);
  useEffect(() => {
    refModal.current = document.getElementById(`${portalIds.modal}`);
    refBackdrop.current = document.getElementById(`${portalIds.backdrop}`);
    setMounted(true);
  }, []);
  if (refModal.current && mounted && isShow) {
    return (
      <>
        {createPortal(<div onClick={hideDropDown} className={styles.backdrop}></div>, refModal.current as Element)}
        {createPortal(createJsxModal(parentElement.current as HTMLDivElement, jsxRef, children), refBackdrop.current as Element)}
      </>
    );
  }

};

const createJsxModal = (
  parent: HTMLDivElement,
  ref: RefObject<HTMLDivElement>,
  rChildren: ReactNode
): ReactElement => {
  const clientRect = parent.getBoundingClientRect();
  const modalWidth = 150;
  // Check if modal is out of window bounds
  let calcLeft = clientRect?.left;
  if (document.documentElement.clientWidth < calcLeft + modalWidth) {
    const delta = calcLeft + modalWidth - document.documentElement.clientWidth;
    calcLeft = calcLeft - delta - 5;
  }
  
  const left = `${calcLeft}px`;
  const top = `${clientRect?.top! + clientRect?.height!}px`;
  setTimeout(() => {
    ref.current?.classList.add(styles.show);
  }, 10);
  return (
    <div
      className={styles.modal}
      style={{left, top, width: `${modalWidth}px`}}
      ref={ref}
    >
      {rChildren}
    </div>
  );
}