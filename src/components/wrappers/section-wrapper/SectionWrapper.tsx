import { FC, PropsWithChildren } from 'react';
import styles from './SectionWrapper.module.scss';
import { FaTrash } from 'react-icons/fa';

export const SectionWrapper: FC<PropsWithChildren<{title: string, style?: Record<string, string>, isAdmin: boolean, onDel: (sectionDel: number) => void, sectionId: number}>> = 
({children, title, style, isAdmin, onDel, sectionId}) => {
  return (
    <>
      <section
        className={styles['section-item']}
        style={style}
      >
        <h2>{title} {isAdmin && <div onClick={() => onDel(sectionId)} className={styles['section-del']}><FaTrash /></div>}</h2>
        {children}
      </section>
    </>
  );
}