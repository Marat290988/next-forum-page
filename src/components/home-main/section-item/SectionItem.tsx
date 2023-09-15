import { FC, useEffect } from 'react';
import styles from './SectionItem.module.scss';
import { AddForum } from './add-forum/AddForum';
import { useState } from 'react';
import { StaticIndexItem } from '@/pages';
import { FaRegDotCircle, FaTrash } from 'react-icons/fa';
import { ForumService } from '@/services/forum.service';
import Link from 'next/link';
import { SectionWrapper } from '@/components/wrappers/section-wrapper/SectionWrapper';
import { useAuth } from '@/hooks/useAuth';
import { useActions } from '@/hooks/useActions';
import { MyModal } from '@/components/ui/MyModal/MyModal';
import { ToastContainer, toast } from 'react-toastify';
import { SectionService } from '@/services/section.service';

export const SectionItem: FC<{data: {name: string, id: number, forums: {name: string, id: number}[]}[], isShowAddForum: boolean}> = ({data, isShowAddForum}) => {

  const [_, updateComponent] = useState(new Date().getTime());
  const { switchOn, switchOff, setLoadingWithParam } = useActions();
  const user = useAuth();
  const [canShow, setCanShow] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  const updateData = (fData: {name: string, id: number}[], parentId: string | number) => {
    const index = data.findIndex(section => String(section.id) === String(parentId));
    if (index > -1) {
      data[index].forums = fData;
      updateComponent(new Date().getTime());
    }
  }

  const showModal = (forumId: number, sectionId: number) => {
    switchOn(<>
      <MyModal actionHandler={() => removeForum(forumId, sectionId)} />
    </>)
  }

  const removeForum = (forumId: number, sectionId: number) => {
    setLoadingWithParam(true);
    switchOff();
    ForumService.deleteForum(forumId).then(res => {
      updateSection(sectionId);
    })
    .catch((e) => {
      setLoadingWithParam(false);
      toast.error(e.response.data.message);
      console.log(e);
    });
  };
  
  const updateSection = (sectionId: number) => {
    ForumService.getForumsBySection(sectionId).then((res) => {
      const index = data.findIndex(section => String(section.id) === String(sectionId));
      if (index > -1) {
        data[index].forums = res;
        updateComponent(new Date().getTime());
      }
      setLoadingWithParam(false);
    }).catch(() => {
      setLoadingWithParam(false);
      toast.error('Problems with network.');
    })
  }

  const removeSectionModal = (sectionId: number) => {
    switchOn(<>
      <MyModal actionHandler={() => removeSection(sectionId)} />
    </>)
  }

  const removeSection = (sectionId: number) => {
    setLoadingWithParam(true);
    switchOff();
    SectionService.deleteSection(sectionId).then(res => {
      updateAllSection();
    })
    .catch((e) => {
      setLoadingWithParam(false);
      toast.error(e.response.data.message);
      console.log(e);
    });
  }

  const updateAllSection = () => {
    SectionService.getAllSections().then(res => {
      data.length = 0;
      res.forEach((r: any) => data.push(r));
      data = res;
      setLoadingWithParam(false);
      updateComponent(new Date().getTime());
    }).catch(() => {
      setLoadingWithParam(false);
      toast.error('Problems with network.');
    })
  }

  useEffect(() => {
    if (user) {
      setCanShow(true);
    };
    if (user?.role === 'admin') {
      setisAdmin(true);
    }
  }, [user])
 
  return (
    <div className='main-container'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {data.map(section => (
        (section.forums.length > 0 || isAdmin) && <SectionWrapper title={section.name} key={section.id} sectionId={section.id} isAdmin={isAdmin} onDel={removeSectionModal} >
          <ul
            className={`${styles['forums-container']} p-[10px]`}
          >
            {section.forums.map(forum => (
              <Link 
                key={forum.id} 
                href={`/forum?f=${forum.id}&p=0&c=10`}
                className={`
                  xl:w-[32%]
                  md:w-[48%]
                  w-full
                `}
                shallow={true}
              >
                <li className={`${styles['forum-item']}`}>
                  <FaRegDotCircle /> {forum.name} {isAdmin && <div className={`${styles['forum-trash']}`} onClick={(e) => {e.preventDefault(); showModal(forum.id, section.id)}}><FaTrash /></div>}
                </li>
              </Link>
            ))}
          </ul>
          {isShowAddForum && (          
            <div
              className={styles['section-content']}
            >
              <AddForum sectionId={section.id} updateData={updateData} />
            </div>
          )}

        </SectionWrapper>
      ))}
    </div>
  )
}