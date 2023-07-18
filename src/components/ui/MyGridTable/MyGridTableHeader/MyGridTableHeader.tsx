import { FC } from 'react';
import styles from './MyGridTableHeader.module.scss';

export type HeaderType = {
  type: 'string' | 'icon',
  title: string,
  gridColumns: string
}

export const MyGridTableHeader: 
  FC<{gridHeaderData: HeaderType[]}> = ({gridHeaderData}) => {

  let gridStyle = '';
  gridHeaderData.forEach(gr => {
    gridStyle += gr.gridColumns + ' ';
  });
  console.log(gridStyle)

  return (
    <>
      <div style={{gridTemplateColumns: gridStyle}} className='grid'>
        {gridHeaderData.map(gd => <div key={gd.title}>{gd.title}</div>)}
      </div>
    </>
  );
}
