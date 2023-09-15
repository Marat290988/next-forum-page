import styles from "./UserIcon.module.scss";
import { FC, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { DropDown } from './../../dropdown/DropDown';
import IUser from './../../../interface/user.interface';
import Link from 'next/link';
import { useActions } from "@/hooks/useActions";
import { useRouter } from "next/router";

export const UserIcon: FC<{user: IUser | null | undefined}> = ({user}) => {
  const [isShow, setIsShow] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const hideDropDown = () => {
    setIsShow(false);
  }

  const router = useRouter();
  const { logout } = useActions();

  const logoutHandler = () => {
    logout();
    router.replace('/auth');
  }

  return (
    <>
      <div
        ref={iconRef}
        className={styles['user-icon-cont']}
      >
        <FaRegUserCircle
          style={{ color: "var(--blue02)", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsShow(true)}
        />
      </div>
      <DropDown
        isShow={isShow}
        hideDropDown={hideDropDown}
        parentElement={iconRef}
      >
        <ul>
          {user && <Link href='/profile'><li className={styles['dropdown-item']} >Profile</li></Link>}
          {user && <li className={styles['dropdown-item']} onClick={logoutHandler} >Logout</li>}
          {!user && <Link href='/auth'><li className={styles['dropdown-item']}>Sign In / Sign Up</li></Link>}
        </ul>
      </DropDown>
    </>
  );
};
