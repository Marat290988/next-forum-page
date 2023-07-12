import { FC } from 'react';
import styles from './SectionItem.module.scss';
import { AddForum } from './add-forum/AddForum';
import { useState } from 'react';
import { StaticIndexItem } from '@/pages';
import { GrReactjs } from 'react-icons/gr';

export const SectionItem: FC<{data: StaticIndexItem[], isShowAddForum: boolean}> = ({data, isShowAddForum}) => {

  return (
    <div className='main-container'>
      {data.map(section => (
        <section 
          key={section.id}
          className={styles['section-item']}
        >
          <h2>{section.name}</h2>
          <ul
            className={`${styles['forums-container']} p-[10px]`}
          >
            {section.forums.map(forum => (
              <li 
                key={forum.id}
                className={`
                  ${styles['forum-item']}
                  xl:w-1/3
                  md:w-1/2
                  w-full
                `}
              >
                <GrReactjs /> {forum.name}
              </li>
            ))}
          </ul>
          <div
            className={styles['section-content']}
          >
            {isShowAddForum && <AddForum sectionId={section.id} />}
          </div>
        </section>
      ))}
    </div>
  )
}