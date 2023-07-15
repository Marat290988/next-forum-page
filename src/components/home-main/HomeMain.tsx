import styles from './HomeMain.module.scss';
import { FC } from 'react';
import IUser from './../../interface/user.interface';
import { AddSection } from './add-section/AddSection';
import { SectionItem } from './section-item/SectionItem';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/enum/roles.enum';
import { useEffect } from 'react';
import { useState } from 'react';

export const HomeMain: FC<{user: IUser | null | undefined, data: {name: string, id: number, forums: {name: string, id: number}[]}[]}> = ({data}) => {
  const user = useAuth();
  const [isShowAddSection, setIsShowAddSection] = useState(false);

  const [listSection, setListSection] = useState(data);
  const updateList = (list: {name: string, id: number, forums: {name: string, id: number}[]}[]): void => {
    setListSection(list);
  }
  
  useEffect(() => {
    if (user && user.role) {
      setIsShowAddSection(user.role === Role.ADMIN);
    }
  }, [user]);
  return (
    <main className={styles.main}>
      <SectionItem data={listSection} isShowAddForum={isShowAddSection} />
      {isShowAddSection && <AddSection updateList={updateList} />}
    </main>
  );
}