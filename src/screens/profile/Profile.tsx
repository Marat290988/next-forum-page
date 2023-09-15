import { FC } from 'react';
import styles from './Profile.module.scss';
import { Header } from '@/components/header/Header';
import { useAuth } from '@/hooks/useAuth';

export const Profile: FC = () => {

  const user = useAuth();

  return (
    <>
      <Header user={user} />
      <h3>PROFILE</h3>
    </>
  )
}