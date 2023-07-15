import { FC, PropsWithChildren } from 'react';
import styles from './SectionWrapper.module.scss';

export const SectionWrapper: FC<PropsWithChildren<{title: string, style?: Record<string, string>}>> = ({children, title, style}) => {
  return (
    <>
      <section
        className={styles['section-item']}
        style={style}
      >
        <h2>{title}</h2>
        {children}
      </section>
    </>
  );
}