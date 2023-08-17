import { FC } from "react";
import styles from './MyGridTopicTableRow.module.scss';
import { MyGridTableBase, MyGridType } from "../MyGridTableBase/MyGridTableBase";
import { FiMessageSquare } from "react-icons/fi";
import moment from "moment";

export type TopicType = {
  createdAt: string,
  authorTheme: {id: number, name: string},
  id: number,
  title: string
}

export const MyGridTopicTableRow: FC<{dataItem: TopicType}> = ({ dataItem }) => {

  const date = moment(dataItem.createdAt).format('HH:mm DD.MM.YYYY')

  const gridData: MyGridType[] = [
    {value: '', gridColumns: '30px', style: {
      textAlign: 'center',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)',
      fontSize: '20px',
      paddingTop: '4px',
      paddingLeft: '4px'
    }, icon: <FiMessageSquare />},
    {value: dataItem.title, gridColumns: 'auto', style: {
      paddingLeft: '30px',
      paddingTop: '2px',
      paddingBottom: '3px',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)',
      cursor: 'pointer',
      height: '31.8px'
    }, isLink: true, linkBase: 'topic?t'},
    {value: dataItem.authorTheme.name, gridColumns: 'minmax(100px, 150px)', style: {
      textAlign: 'center',
      paddingTop: '4px',
      paddingLeft: '4px',
      paddingBottom: '3px',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)'
    }},
    {value: date, gridColumns: 'minmax(100px, 150px)', style: {
      textAlign: 'center',
      paddingTop: '4px',
      paddingLeft: '4px',
      paddingBottom: '3px',
      borderBottom: '1px solid var(--borderc)'
    }}
  ]

  return (
    <>
      <MyGridTableBase myGridData={gridData} cssClass={styles['grid-row']} id={dataItem.id} />
    </>
  )
}