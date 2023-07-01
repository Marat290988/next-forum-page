import styles from './HomeMain.module.scss';
import { FC } from 'react';
import IUser from './../../interface/user.interface';
import { AddSection } from './add-section/AddSection';

export const HomeMain: FC<{user: IUser | null | undefined}> = () => {

  return (
    <main className={styles.main}>
      <AddSection />
    </main>
  );
}