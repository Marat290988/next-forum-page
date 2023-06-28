import styles from "./DropDown.module.scss";
import { portalIds } from "@/pages/_document";
import { FC, ReactElement, RefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { JsxElement } from "typescript";

export const DropDown: FC<{isShow: boolean, hideDropDown: () => void, parentElement: RefObject<HTMLDivElement>}> = 
(
  {isShow, hideDropDown, parentElement}
) => {

  const clientRect  = parentElement.current?.getBoundingClientRect();
  const jsxModal = 
    <div 
      className={styles.modal}
      style={{
        left: `${clientRect?.left}px`,
        top: `${clientRect?.top! + clientRect?.height!}px`
      }}
    ></div>
  const refModal = useRef<Element | null>(null);
  const refBackdrop = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    refModal.current = document.getElementById(`${portalIds.modal}`);
    refBackdrop.current = document.getElementById(`${portalIds.backdrop}`);
    setMounted(true);
  }, []);
  if (refModal.current && mounted && isShow) {
    return (
      <>
        {createPortal(<div onClick={hideDropDown} className={styles.backdrop}></div>, refModal.current as Element)}
        {createPortal(jsxModal, refBackdrop.current as Element)}
      </>
    );
  }

};

const createJsxModal = (
  parent: HTMLDivElement
): ReactElement => {
  return <div></div>
}