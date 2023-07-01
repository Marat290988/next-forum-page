import styles from './Header.module.scss';
import { FC } from 'react';
import IUser from './../../interface/user.interface';
import { Logo } from './logo/Logo';
import { UserIcon } from './user-icon/UserIcon';

export const Header: FC<{user: IUser | null | undefined}> = ({user}) => {

  return (
    <header className={styles.header}>
      <Logo />
      <UserIcon user={user} />
    </header>
  )
}