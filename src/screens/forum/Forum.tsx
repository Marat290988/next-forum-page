import { FC, useState, useEffect } from 'react';
import styles from './Forum.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/header/Header';
import { IForum } from './../../pages/forum/index';
import { SectionWrapper } from '@/components/wrappers/section-wrapper/SectionWrapper';
import { AddForum } from '@/components/home-main/section-item/add-forum/AddForum';
import { Role } from '@/enum/roles.enum';
import { MyGridTable } from './../../components/ui/MyGridTable/MyGridTable';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { ForumService } from '@/services/forum.service';
import { useActions } from '@/hooks/useActions';

export const Forum: FC<{forum?: IForum, name: string}> = ({forum, name}) => {
  const fId = useRouter().query.f;
  const {data, isLoading, refetch} = useQuery(
    ['forum'],
    (): Promise<IForum[]> => ForumService.getForumsByForumParent(fId as string)
  );
  const { setLoadingWithParam } = useActions();
  
  const updateData = () => {
    setLoadingWithParam(true);
    refetch().then(_ => {
      setLoadingWithParam(false);
    });
  };
  const user = useAuth();
  const [isShowAddSection, setIsShowAddSection] = useState(false);
  useEffect(() => {
    if (user && user.role) {
      setIsShowAddSection(user.role === Role.ADMIN);
    }
  }, [user]);
  useEffect(() => {
    setLoadingWithParam(isLoading);
  }, [isLoading]);
  return (
    <>
      <Header user={user} />
      <main className={styles.main}>
        <div className='main-container'>
        {data && <MyGridTable data={data} />}
          <div className='p-[10px]'>
            {isShowAddSection && <AddForum isInnerForum={true} sectionId={Number.parseInt(fId as string)} updateData={updateData} />}
          </div>
          {/* <SectionWrapper title={name} style={{height: '100%'}}>
            {data && (
              <ul>
                {data.map(f => (
                  <li key={f.id}>{f.name}</li>
                ))}
              </ul>
            )}
            
          </SectionWrapper> */}
        </div>
      </main>
    </>
  );
}