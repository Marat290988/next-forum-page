import { FC, useState, useEffect } from 'react';
import styles from './Forum.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/header/Header';
import { IForum } from './../../pages/forum/index';
import { SectionWrapper } from '@/components/wrappers/section-wrapper/SectionWrapper';
import { AddForum } from '@/components/home-main/section-item/add-forum/AddForum';
import { Role } from '@/enum/roles.enum';
import { MyGridTable } from './../../components/ui/MyGridTable/MyGridTable';

export const Forum: FC<{forum: IForum}> = ({forum}) => {
  const [_, updateComponent] = useState(new Date().getTime());

  const updateData = (fData: any, parentId: string | number) => {
    forum.children = fData;
    updateComponent(new Date().getTime());
  };
  const user = useAuth();
  const [isShowAddSection, setIsShowAddSection] = useState(false);
  useEffect(() => {
    if (user && user.role) {
      setIsShowAddSection(user.role === Role.ADMIN);
    }
  }, [user]);
  return (
    <>
      <Header user={user} />
      <main className={styles.main}>
        <div className='main-container'>
          <SectionWrapper title={forum.name} style={{height: '100%'}}>
            {/* <ul>
              {forum.children.map(f => (
                <li key={f.id}>{f.name}</li>
              ))}
            </ul> */}
            <MyGridTable data={forum.children} />
            <div className='p-[10px]'>
              {isShowAddSection && <AddForum isInnerForum={true} sectionId={forum.id} updateData={updateData} />}
            </div>
          </SectionWrapper>
        </div>
      </main>
    </>
  );
}