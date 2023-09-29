import { FC } from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

export const Footer: FC = () => {

  return (
    <Link href={'/author'}>
      <footer className={styles['footer']}>
        Page developer: Marat Zinatulin ©
      </footer>
    </Link>
  );
}
