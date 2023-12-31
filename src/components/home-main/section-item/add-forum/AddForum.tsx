import { FC, useRef } from 'react';
import styles from './AddForum.module.scss';
import { MyForm } from '@/components/ui/MyForm/MyForm';
import { useActions } from '@/hooks/useActions';
import { ForumService } from '@/services/forum.service';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export const AddForum: FC<{sectionId: number, updateData: Function, isInnerForum?: boolean}>

= ({sectionId, updateData, isInnerForum = false}) => {

  const refData = useRef<any>(null);
  const { setLoading } = useActions();

  const getForums = async () => {
    const forums = isInnerForum ? await ForumService.getForumsByForumParent(sectionId) : await ForumService.getForumsByParent(sectionId);
    updateData(forums, sectionId);
  }

  const submit = async (text: string) => {
    if (text.trim().length === 0) {
      return;
    }
    setLoading();
    try {
      const response = await ForumService.createForum(text, sectionId, isInnerForum);
      toast.success(response.message);
      refData.current?.clearInput();
      getForums();
    } catch (e: any) {
      const errorText = e.response.data.message ? e.response.data.message : 'The endpoint does not exist.';
      toast.error(errorText);
    } finally {
      setLoading();
    }
  }

  return (
    <div>
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
      <MyForm 
        title='Forum name' 
        submitFunc={submit}
        maxLength={500}
        ref={refData}
      />
    </div>
  );
}