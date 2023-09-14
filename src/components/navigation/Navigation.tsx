import { FC, useEffect, useRef, useState } from "react";
import styles from './Navigation.module.scss';
import Link from "next/link";
import { useRouter } from "next/router";
import { UrlPath } from "@/enum/url-path.enum";
import { NavService } from "@/services/nav.service";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export const Navigation: FC = () => {

  const router = useRouter();
  const id = useRef<null | number>(null);
  const type = useRef<null | UrlPath>(null);
  const [navData, setNavData] = useState<{id: number, title: string, url: string}[]>([]);
  const { setCashNav } = useActions();
  const cashData = useTypedSelector(state => state.cashReducer.nav);

  useEffect(() => {
    if (router.pathname.toLowerCase().indexOf(UrlPath.FORUM.toLowerCase()) > -1 && router.query.f || 
          router.pathname.toLowerCase().indexOf(('new_topic').toLowerCase()) > -1 && router.query.f) {
      setNavData([]);
      id.current = +router.query.f;
      type.current = UrlPath.FORUM;
      if (cashData[`f${id.current}`]) {
        setNavData(cashData[`f${id.current}`]);
        return;
      }
      NavService.getNav(+id.current!, type.current!).then(
        res => {
          setNavData(res.reverse());
          setCashNav({key: `f${id.current}`, val: res.reverse()});
        }
      )
    } else if (router.pathname.toLowerCase().indexOf(UrlPath.TOPIC.toLowerCase()) > -1 && router.query.t) {
      setNavData([]);
      id.current = +router.query.t;
      type.current = UrlPath.TOPIC;
      if (cashData[`t${id.current}`]) {
        setNavData(cashData[`t${id.current}`]);
        return;
      }
      NavService.getNav(+id.current!, type.current!).then(
        res => {
          setNavData(res.reverse());
          setCashNav({key: `t${id.current}`, val: res.reverse()});
        }
      )
    }
  }, [router.query, router.pathname]);


  return (
    <>
      <nav className={styles['nav']}>
        <ul>
          {navData && navData.map((nav, i) => (
            <li className="mr-[-12px]" key={nav.id}>
              {i === navData.length - 1 && (
                <div className={styles['nav-item']}>
                  <div className={`${styles['nav-item-title']} ${styles['next']}`}>{nav.title}</div>
                </div>
              )}
              {i !== navData.length - 1 && (
                <Link href={`${nav.url}`}>
                  <div className={styles['nav-item']}>
                    <div className={`${styles['nav-item-title']} ${styles['next']}`}>{nav.title}</div>
                  </div>
                </Link>
              )}
            </li>
          ))}
          <li className="mr-[-12px]">
            <div className={styles['nav-item']}>
              <div className={styles['nav-item-title']}>NEXT FORUM</div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}