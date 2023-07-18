import { FC } from "react";
import { IForum } from './../../../pages/forum/index';
import { HeaderType, MyGridTableHeader } from "./MyGridTableHeader/MyGridTableHeader";

export const MyGridTable: FC<{data: IForum[]}> = ({data}) => {

  console.log(data)
  const gridData: HeaderType[] = [
    {type: 'string', title: '#', gridColumns: '20px'},
    {type: 'string', title: 'Forum', gridColumns: 'auto'}
  ]
  
  return (
    <>
      <div className='p-[10px]'>
        <MyGridTableHeader gridHeaderData={gridData} />
      </div>
    </>
  );
};