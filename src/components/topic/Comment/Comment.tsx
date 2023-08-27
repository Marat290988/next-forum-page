import { FC, SyntheticEvent } from 'react';
import styles from './Comment.module.scss';
import { IComment } from '@/pages/topic';
const parse = require('html-react-parser');
import { IBM_Plex_Sans } from 'next/font/google';
import { calcTime } from './../../../utils/ms';
import moment from 'moment';
import Rating from '@mui/material/Rating';
import { LikeService } from '@/services/like.service';
import { useState } from 'react';

const ibm400 = IBM_Plex_Sans({subsets: ['latin'], weight: '400'});

export const Comment: FC<{comment: IComment}> = ({ comment }) => {

  const [avg, setAvg] = useState(comment.avg);

  const starsHandler = (_: SyntheticEvent<Element, Event>, value: number | null) => {
    comment.avg = value ? value : 0;
    setAvg(value ? value : 0);
    const valueStars = value !== null ? value : 0;
    LikeService.toggleLike(valueStars, comment.id).catch(e => {console.log(e)});
  }

  return (
    <div className={`${styles['comment-main-container']} ${ibm400.className}`}>
      <div className={styles['comment-top']}></div>
      <div className='flex p-[1px]'>

        <div className={styles['profile-card']}>
          <p className={styles['profile-name']}>{comment.authorComment.name}</p>
          <div className={styles['image']}></div>
          <p className={styles['profile-exp']}>Experience: {calcTime(new Date(comment.authorComment.createdAt).getTime())}</p>
          <p className={styles['profile-link']}>PROFILE</p>
        </div>

        <div className={styles['comment-body']}>

          <div className={styles['comment-date']}>
            {moment(comment.createdAt).format('HH:mm:ss')} [{moment(comment.createdAt).format('DD.MM.YYYY')}]
          </div>

          <div className={styles['comment-text']}>
            {parse(comment.text)}
          </div>

          <div className={styles['comment-bottom']}>
            <Rating 
              onChange={starsHandler}
              value={avg}
            />
          </div>

        </div>

      </div>
    </div>
  );
}