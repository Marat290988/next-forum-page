import { FC } from 'react';
import styles from './Home.module.scss';
import { useAuth } from './../../hooks/useAuth';
import { Header } from './../../components/header/Header';
import { HomeMain } from '@/components/home-main/HomeMain';

export const Home: FC = () => {
  const user = useAuth();
  if (!user) {
    
  }
  return (
    <>
      <Header user={user} />
      <HomeMain user={user} />
    </>
  )
}