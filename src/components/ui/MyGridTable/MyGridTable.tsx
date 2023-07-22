import { FC } from "react";
import { IForum } from './../../../pages/forum/index';
import { MyGridForumTableHeader } from "./MyGridForumTableHeader/MyGridForumTableHeader";
import { MyGridForumTableRow } from "./MyGridForumTableRow/MyGridForumTableRow";

export const MyGridTable: FC<{data: IForum[]}> = ({data}) => {
 
  console.log(data)

  return (
    <>
      <div className='p-[10px]'>
        <MyGridForumTableHeader />
        {data.map(forum => <MyGridForumTableRow key={forum.id} dataItem={forum} />)}
      </div>
    </>
  );
};