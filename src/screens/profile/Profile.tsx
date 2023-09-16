import { FC } from 'react';
import styles from './Profile.module.scss';
import { Header } from '@/components/header/Header';
import { useAuth } from '@/hooks/useAuth';

export const Profile: FC = () => {

  const user = useAuth();

  return (
    <>
      <Header user={user} />
      <main className={`main-container ${styles['profile']}`}>
        <div className={`flex mt-[10px] h-full p-[10px] ${styles['profile']}`}>
          <div className={styles['left-card-profile']}>

          </div>
        </div>
      </main>
    </>
  )
}