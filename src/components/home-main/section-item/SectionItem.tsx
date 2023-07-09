import { FC } from 'react';
import styles from './SectionItem.module.scss';
import { AddForum } from './add-forum/AddForum';
import { useState } from 'react';

export const SectionItem: FC<{data: {name: string, id: number}[], isShowAddForum: boolean}> = ({data, isShowAddForum}) => {
  


  return (
    <div className='main-container'>
      {data.map(section => (
        <section 
          key={section.id}
          className={styles['section-item']}
        >
          <h2>{section.name}</h2>
          <div
            className={styles['section-content']}
          >

            {isShowAddForum && <AddForum />}
          </div>
        </section>
      ))}
    </div>
  )
}