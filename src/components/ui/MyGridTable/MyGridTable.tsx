import { FC, useState, useEffect } from "react";
import { IForum } from './../../../pages/forum/index';
import { MyGridForumTableHeader } from "./MyGridForumTableHeader/MyGridForumTableHeader";
import { MyGridForumTableRow } from "./MyGridForumTableRow/MyGridForumTableRow";
import { MyGridTopicHeader } from "./MyGridTopicHeader/MyGridTopicHeader";
import { MyGridTopicTableRow } from './MyGridTopicTableRow/MyGridTopicTableRow';
import { useAuth } from "@/hooks/useAuth";

export const MyGridTable: FC<{data: {forums: IForum[], isForum: boolean, themes: any[]}}> = ({data}) => {

  const user = useAuth();

  const [mode, setMode] = useState<'FORUM' | 'THEME'>('FORUM');
  const [canShow, setCanShow] = useState(false);
  const [topics, setTopics] = useState<any[]>([]);
  const [forums, setForums] = useState<any[]>([]);

  useEffect(() => {
    if (data.themes.length > 0) {
      setMode('THEME');
      setTopics(data.themes);
    } else {
      setMode('FORUM');
      setForums(data.forums)
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        setCanShow(true);
      }
    }
  }, [user]);
 
  return (
    <>
      {mode === 'FORUM' && <>
        <div className='p-[10px]'>
          <MyGridForumTableHeader canShow={canShow} />
          {forums.map(forum => <MyGridForumTableRow key={forum.id} dataItem={forum} canShow={canShow} setForums={setForums} />)}
        </div>
      </>}
      {mode === 'THEME' && <>
        <div className='p-[10px]'>
          <MyGridTopicHeader canShow={canShow} />
          {topics.map(theme => <MyGridTopicTableRow key={theme.id} dataItem={theme} canShow={canShow} setTopics={setTopics} />)}
        </div>
      </>}
    </>
  );
};