import { FC, useEffect } from 'react';
import styles from './SectionItem.module.scss';
import { AddForum } from './add-forum/AddForum';
import { useState } from 'react';
import { StaticIndexItem } from '@/pages';
import { FaRegDotCircle } from 'react-icons/fa';
import { ForumService } from '@/services/forum.service';
import Link from 'next/link';
import { SectionWrapper } from '@/components/wrappers/section-wrapper/SectionWrapper';
import { useAuth } from '@/hooks/useAuth';

export const SectionItem: FC<{data: {name: string, id: number, forums: {name: string, id: number}[]}[], isShowAddForum: boolean}> = ({data, isShowAddForum}) => {

  const [_, updateComponent] = useState(new Date().getTime());
  const user = useAuth();
  const [canShow, setCanShow] = useState(false);

  const updateData = (fData: {name: string, id: number}[], parentId: string | number) => {
    const index = data.findIndex(section => String(section.id) === String(parentId));
    if (index > -1) {
      data[index].forums = fData;
      updateComponent(new Date().getTime());
    }
  }

  useEffect(() => {
    if (user) {
      setCanShow(true);
    }
  }, [user])
 
  return (
    <div className='main-container'>
      {data.map(section => (
        (section.forums.length > 0 || canShow) && <SectionWrapper title={section.name} key={section.id}>
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
                shallow={true}
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