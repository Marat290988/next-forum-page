import { FC } from 'react';
import styles from './Comment.module.scss';
import { IComment } from '@/pages/topic';
const parse = require('html-react-parser');
import { IBM_Plex_Sans } from 'next/font/google';

const ibm400 = IBM_Plex_Sans({subsets: ['latin'], weight: '400'});

export const Comment: FC<{comment: IComment}> = ({ comment }) => {

  return (
    <div className={`${styles['comment-main-container']} ${ibm400.className}`}>
      <div className={styles['comment-top']}></div>
      {parse(comment.text)}
    </div>
  );
}