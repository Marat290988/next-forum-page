import { FC } from 'react';
import styles from './Topic.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/header/Header';
import { IComment } from '@/pages/topic';
import { Comment } from '@/components/topic/Comment/Comment';

export const Topic: FC<{topicId: number, forumId: number, comments: IComment[]}> = (props) => {

  const { topicId, forumId, comments } = props;

  const user = useAuth();

  return (
    <>
      <Header user={user} />
      <main className={styles['main']}>
        <section className={styles['comment-section']}>
          {comments.map(c => <Comment comment={c} key={c.id} />)}
        </section>
      </main>
    </>
  )
}