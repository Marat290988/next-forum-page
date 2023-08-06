import { FC } from "react";
import { IForum } from './../../../../pages/forum/index';
import { MyGridTableBase, MyGridType } from "../MyGridTableBase/MyGridTableBase";
import { HiMiniStopCircle } from "react-icons/hi2";
import styles from './MyGridForumTableRow.module.scss';

export const MyGridForumTableRow: FC<{dataItem: IForum}> = ({dataItem}) => {

  const gridData: MyGridType[] = [
    {value: '', gridColumns: '30px', style: {
      textAlign: 'center',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)',
      fontSize: '20px',
      paddingTop: '4px',
      paddingLeft: '4px'
    }, icon: <HiMiniStopCircle />},
    {value: dataItem.name, gridColumns: 'auto', style: {
      paddingLeft: '10px',
      paddingTop: '2px',
      paddingBottom: '3px',
      borderBottom: '1px solid var(--borderc)',
      cursor: 'pointer',
    }, isLink: true, linkBase: 'forum?f'}
  ]

  return (
    <>
      <MyGridTableBase myGridData={gridData} cssClass={styles['grid-row']} id={dataItem.id} />
    </>
  );
}