import { FC, useEffect } from "react";
import styles from './Navigation.module.scss';
import Link from "next/link";
import { useRouter } from "next/router";

export const Navigation: FC = () => {

  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname)
  }, [router.query, router.pathname])

  return (
    <>
      <nav className={styles['nav']}>
        <ul>
          <li>
            <Link href='/'>
              <div className={styles['nav-item']}>
                <div className={`${styles['nav-item-title']} ${styles['next']}`}>NEXT FORUM1</div>
              </div>
            </Link>
          </li>
          <li className="mr-[-12px]">
            <Link href='/'>
              <div className={styles['nav-item']}>
                <div className={styles['nav-item-title']}>NEXT FORUM</div>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}