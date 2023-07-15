import { FC } from 'react';
import styles from './SectionItem.module.scss';
import { AddForum } from './add-forum/AddForum';
import { useState } from 'react';
import { StaticIndexItem } from '@/pages';
import { FaRegDotCircle } from 'react-icons/fa';
import { ForumService } from '@/services/forum.service';
import Link from 'next/link';
import { SectionWrapper } from '@/components/wrappers/section-wrapper/SectionWrapper';

export const SectionItem: FC<{data: {name: string, id: number, forums: {name: string, id: number}[]}[], isShowAddForum: boolean}> = ({data, isShowAddForum}) => {

  const [_, updateComponent] = useState(new Date().getTime());

  const updateData = (fData: {name: string, id: number}[], parentId: string | number) => {
    const index = data.findIndex(section => String(section.id) === String(parentId));
    if (index > -1) {
      data[index].forums = fData;
      updateComponent(new Date().getTime());
    }
  }
 
  return (
    <div className='main-container'>
      {data.map(section => (
        <SectionWrapper title={section.name} key={section.id}>
          <ul
            className={`${styles['forums-container']} p-[10px] justify-between`}
          >
            {section.forums.map(forum => (
              <Link 
                key={forum.id} 
                href={`/forum?f=${forum.id}`}
                className={`
                  xl:w-[32%]
                  md:w-[48%]
                  w-full
                `}
              >
                <li className={`${styles['forum-item']}`}>
                  <FaRegDotCircle /> {forum.name}
                </li>
              </Link>
            ))}
          </ul>
          <div
            className={styles['section-content']}
          >
            {isShowAddForum && <AddForum sectionId={section.id} updateData={updateData} />}
          </div>
        </SectionWrapper>
      ))}
    </div>
  )
}