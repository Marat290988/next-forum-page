import { FC } from 'react';
import styles from './Topic.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/header/Header';
import { IComment } from '@/pages/topic';
import { Comment } from '@/components/topic/Comment/Comment';
import { MyEditor } from './../../components/ui/MyEditor/MyEditor';
import { MyButton } from '@/components/ui/MyButton/MyButton';
import { useState } from 'react';
import { CommentService } from '@/services/comment.service';
import { ToastContainer, toast } from 'react-toastify';

export const Topic: FC<{topicId: number, forumId: number, comments: IComment[]}> = (props) => {

  const { topicId, forumId, comments } = props;
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuth();

  const handleChangeEditorVal = (val: string) => {
    setText(val);
  };

  const sendComment = () => {
    setIsLoading(true);
    CommentService.sendComment(text, topicId, forumId).then(res => {
      
    }).catch(e => {
      toast.error(e.response.data.message);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <>
      <Header user={user} />
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
      <main className={styles['main']}>
        <section className={styles['section']}>
          {comments.map(c => <Comment comment={c} key={c.id} />)}
        </section>
        <section className={styles['section']}>
          <MyEditor handleChangeEditorVal={handleChangeEditorVal} />
          <div className={styles['button']}>
            <MyButton 
              type="submit" 
              canClick={true} 
              isLoading={isLoading}
              buttonClick={sendComment}
            >
              SEND
            </MyButton>
          </div>
        </section>
      </main>
    </>
  )
}