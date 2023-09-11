import { FC, useEffect, useRef } from 'react';
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

export const Topic: FC<{topicId: number, forumId: number, comments: IComment[], totalPage: number}> = (props) => {

  const { topicId, forumId } = props;
  const defaultQty = 3;
  let { comments } = props;
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [commentState, setCommentState] = useState<IComment[]>(comments);
  const [totalPage, setTotalPage] = useState(props.totalPage / defaultQty);
  const [currentPage, setCurrentPage] = useState(0);

  const user = useAuth();
  const [canShow, setCanShow] = useState(false);

  const handleChangeEditorVal = (val: string) => {
    setText(val);
  };

  const childRef = useRef<any>(null);

  const sendComment = () => {
    setIsLoading(true);
    CommentService.sendComment(text, topicId, forumId).then(res => {
      updateComment();
    }).catch(e => {
      setIsLoading(false);
      toast.error(e.response.data.message);
    })
  }

  const updateComment = () => {
    CommentService.getCommentsByTopicId(topicId).then((res: {comments: IComment[]}) => {
      setCommentState(res.comments);
      setIsLoading(false);
      clear();
    }).catch(() => {
      toast.error('Problems with network.');
    })
  }

  const clear = () => {
    if (childRef.current) {
      childRef.current.clear();
    }
  };

  useEffect(() => {
    if (user) {
      setCanShow(true);
    }
  }, [user])

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
          {commentState.map(c => <Comment comment={c} updateComment={updateComment} key={c.id} />)}
        </section>
        {canShow && <section className={styles['section']} >
          <MyEditor handleChangeEditorVal={handleChangeEditorVal} ref={childRef} />
          <div className={styles['button']}>
            <MyButton 
              type="submit" 
              canClick={text.length > 10} 
              isLoading={isLoading}
              buttonClick={sendComment}
            >
              SEND
            </MyButton>
          </div>
        </section>}
      </main>
    </>
  )
}