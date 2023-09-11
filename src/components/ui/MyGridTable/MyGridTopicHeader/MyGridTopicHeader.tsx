import { FC } from "react";
import styles from "./MyGridTopicHeader.module.scss";
import { MyGridTableBase, MyGridType } from "../MyGridTableBase/MyGridTableBase";
import { CiGrid41 } from "react-icons/ci";

export const MyGridTopicHeader: FC<{canShow: boolean}> = ({canShow}) => {

  const gridData: MyGridType[] = [
    {value: '', gridColumns: '30px', style: {
      textAlign: 'center',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)',
      fontSize: '20px',
      paddingTop: '4px',
      paddingLeft: '4px'
    }, icon: <CiGrid41 />},
    {value: 'Topic', gridColumns: 'auto', style: {
      paddingLeft: '30px',
      paddingTop: '2px',
      paddingBottom: '3px',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)'
    }},
    {value: 'Author', gridColumns: 'minmax(100px, 150px)', style: {
      textAlign: 'center',
      paddingTop: '4px',
      paddingLeft: '4px',
      paddingBottom: '3px',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)'
    }},
    {value: 'Last Message', gridColumns: 'minmax(100px, 150px)', style: {
      textAlign: 'center',
      paddingTop: '4px',
      paddingLeft: '4px',
      paddingBottom: '3px',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)'
    }},
    {value: 'Date', gridColumns: 'minmax(100px, 150px)', style: {
      textAlign: 'center',
      paddingTop: '4px',
      paddingLeft: '4px',
      paddingBottom: '3px',
      borderBottom: '1px solid var(--borderc)'
    }}
  ]

  if (canShow) {
    const deleteTitle = {value: ' ', gridColumns: 'minmax(50px, 50px)', style: {
      textAlign: 'center',
      paddingTop: '4px',
      paddingLeft: '4px',
      paddingBottom: '3px',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)'
    }};
    const movingEl = gridData.splice(gridData.length - 1, 1, deleteTitle)[0];
    gridData.push(movingEl);
  }

  return (
    <>
      <MyGridTableBase myGridData={gridData} cssClass={styles['grid-header']} />
    </>
  )
}