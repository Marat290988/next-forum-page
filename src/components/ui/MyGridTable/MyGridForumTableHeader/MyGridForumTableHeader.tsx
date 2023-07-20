import { FC } from 'react';
import styles from './MyGridForumTableHeader.module.scss';
import { CiGrid41 } from "react-icons/ci";
import { MyGridTableBase, MyGridType } from '../MyGridTableBase/MyGridTableBase';

export const MyGridForumTableHeader: FC = () => {

  const gridData: MyGridType[] = [
    {value: '', gridColumns: '30px', style: {
      textAlign: 'center',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)',
      fontSize: '20px',
      paddingTop: '4px',
      paddingLeft: '4px'
    }, icon: <CiGrid41 />},
    {value: 'Forum', gridColumns: 'auto', style: {
      paddingLeft: '30px',
      paddingTop: '2px',
      paddingBottom: '3px',
      borderBottom: '1px solid var(--borderc)'
    }}
  ]

  return (
    <>
      <MyGridTableBase myGridData={gridData} cssClass={styles['grid-header']} />
    </>
  );
}
