import { FC, useState, useEffect } from "react";
import { IForum } from './../../../pages/forum/index';
import { MyGridForumTableHeader } from "./MyGridForumTableHeader/MyGridForumTableHeader";
import { MyGridForumTableRow } from "./MyGridForumTableRow/MyGridForumTableRow";

export const MyGridTable: FC<{data: {forums: IForum[], isForum: boolean, themes: any[]}}> = ({data}) => {

  const [mode, setMode] = useState<'FORUM' | 'THEME'>('FORUM');

  useEffect(() => {
    if (data.themes.length > 0) {
      setMode('THEME');
    }
  });
 
  return (
    <>
      {mode === 'FORUM' && <>
        <div className='p-[10px]'>
          <MyGridForumTableHeader />
          {data.forums.map(forum => <MyGridForumTableRow key={forum.id} dataItem={forum} />)}
        </div>
      </>}
    </>
  );
};