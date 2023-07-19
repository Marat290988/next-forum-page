import { FC } from "react";
import { IForum } from './../../../pages/forum/index';
import { HeaderType, MyGridTableHeader } from "./MyGridTableHeader/MyGridTableHeader";
import { CiGrid41 } from "react-icons/ci";

export const MyGridTable: FC<{data: IForum[]}> = ({data}) => {

  console.log(data)
  const gridData: HeaderType[] = [
    {type: 'string', title: '', gridColumns: '30px', style: {
      textAlign: 'center',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)',
      fontSize: '20px',
      paddingTop: '4px',
      paddingLeft: '4px'
    }, icon: <CiGrid41 />},
    {type: 'string', title: 'Forum', gridColumns: 'auto', style: {
      paddingLeft: '30px',
      paddingTop: '2px',
      paddingBottom: '3px',
      borderBottom: '1px solid var(--borderc)'
    }}
  ]
  
  return (
    <>
      <div className='p-[10px]'>
        <MyGridTableHeader gridHeaderData={gridData} />
      </div>
    </>
  );
};