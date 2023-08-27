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

export const Topic: FC<{topicId: number, forumId: number, comments: IComment[]}> = (props) => {

  const { topicId, forumId, comments } = props;
  const [text, setText] = useState<string>('');

  const user = useAuth();

  const handleChangeEditorVal = (val: string) => {
    setText(val);
  };

  const sendComment = () => {
    CommentService.sendComment(text, topicId, forumId).then(res => {
      console.log(res)
    })
    console.log(111)
  }

  return (
    <>
      <Header user={user} />
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
              isLoading={false}
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