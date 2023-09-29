import { FC } from 'react';
import styles from './LastComments.module.scss';
import { IComment } from '@/pages/topic';
import parse from 'html-react-parser';
import moment from 'moment';
import { useActions } from '@/hooks/useActions';
import { CommentService } from '@/services/comment.service';
import { useRouter } from 'next/router';

export const LastComments: FC<{comments: IComment[]}> = ({ comments = [] }) => {

  const { setLoadingWithParam } = useActions();
  const router = useRouter();

  const openLink = (topicId: number, commentId: number) => {
    setLoadingWithParam(true);
    CommentService.getLink(topicId, commentId).then((res: {link: string}) => {
      setLoadingWithParam(false);
      router.push('/' + res.link);
    }).catch(e => {
      console.log(e);
      setLoadingWithParam(false);
    }).finally(() => setLoadingWithParam(false));
  }

  return (
    <>
      <div className='h-full overflow-auto'>
        {comments.map(c => 
          <div className={styles['comment']} key={c.id}>
            {parse(c.text)}
            <div className='flex justify-end mb-[-10px] mr-[-10px]'>
              <div className={styles['comment-date']}>
                {moment(c.createdAt).format("HH:mm:ss")} [
                {moment(c.createdAt).format("DD.MM.YYYY")}]
              </div>
              <div className={styles['comment-open']} onClick={() => {openLink(c.themeId!, c.id)}}>
                OPEN
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}