import { FC } from 'react';
import styles from './Footer.module.scss';

export const Footer: FC = () => {

  return (
    <footer className={styles['footer']}>
      Page developer: Marat Zinatulin ©
    </footer>
  );
}
