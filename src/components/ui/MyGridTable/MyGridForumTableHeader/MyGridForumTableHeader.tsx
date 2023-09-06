import { FC } from 'react';
import styles from './MyGridForumTableHeader.module.scss';
import { CiGrid41 } from "react-icons/ci";
import { MyGridTableBase, MyGridType } from '../MyGridTableBase/MyGridTableBase';

export const MyGridForumTableHeader: FC<{canShow: boolean}> = ({ canShow }) => {

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

  if (canShow) {
    const deleteTitle = {value: '  ', gridColumns: 'minmax(50px, 50px)', style: {
      paddingLeft: '30px',
      paddingTop: '2px',
      paddingBottom: '3px',
      borderBottom: '1px solid var(--borderc)'
    }};
    gridData[gridData.length - 1].style = {
      ...gridData[gridData.length - 1].style,
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)'
    };
    gridData.push(deleteTitle);
  }

  return (
    <>
      <MyGridTableBase myGridData={gridData} cssClass={styles['grid-header']} />
    </>
  );
}
