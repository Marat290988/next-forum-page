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
import { MyButton } from '@/components/ui/MyButton/MyButton';

export const Forum: FC<{forum?: IForum, name: string}> = ({forum, name}) => {
  const router = useRouter();
  const fId = router.query.f;
  const {data, isLoading, refetch} = useQuery(
    ['forum', fId],
    (): Promise<{forums: IForum[], isForum: boolean, themes: any[]}> => ForumService.getForumsByForumParent(fId as string)
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
    if (user && user.role && data) {
      setIsShowAddSection(user.role === Role.ADMIN && data.isForum);
    }
  }, [user, data]);
  useEffect(() => {
    setLoadingWithParam(isLoading);
  }, [isLoading]);
  const buttonClickHandle = () => {
    router.push('/new_topic?f=' + fId);
  }
  return (
    <>
      <Header user={user} />
      <main className={styles.main}>
        <div className='main-container'>
          <div className='px-[10px]'>
            {data && user && data.forums.length === 0 && <MyButton buttonClick={buttonClickHandle} canClick={true}>Start a new topic</MyButton>}
          </div>
          {data && <MyGridTable data={data} />}
          <div className='p-[10px]'>
            {isShowAddSection && <AddForum isInnerForum={true} sectionId={Number.parseInt(fId as string)} updateData={updateData} />}
          </div>
        </div>
      </main>
    </>
  );
}