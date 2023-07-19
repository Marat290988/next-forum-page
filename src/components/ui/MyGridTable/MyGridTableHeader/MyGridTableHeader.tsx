import { FC, ReactNode } from 'react';
import styles from './MyGridTableHeader.module.scss';
import { IconType } from 'react-icons/lib';

export type HeaderType = {
  type: 'string' | 'icon',
  title: string,
  gridColumns: string,
  style?: Record<string, string>,
  icon?: ReactNode
}

export const MyGridTableHeader: 
  FC<{gridHeaderData: HeaderType[]}> = ({gridHeaderData}) => {

  let gridStyle = '';
  gridHeaderData.forEach(gr => {
    gridStyle += gr.gridColumns + ' ';
  });

  return (
    <>
      <div style={{gridTemplateColumns: gridStyle}} className={`grid ${styles['grid-header']}`}>
        {gridHeaderData.map(gd => (
          <div 
            key={gd.title}
            style={!!gd.style ? gd.style : {}}
          >
            {gd.type === 'string' && <>{gd.title}</>}
            {gd.icon && gd.icon}
          </div>))}
      </div>
    </>
  );
}
