import { FC } from "react";
import styles from './Logo.module.scss';
import Link from "next/link";

export const Logo: FC = () => {
  return (
    <Link href='/'>
      <h1 className={styles.logo}>
        NE<span className={styles['logo-x']}>
            <span className={styles['logo-letter']}>X</span>
          </span>T FORUM
      </h1>
    </Link>
  );
}