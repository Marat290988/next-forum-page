import { FC } from 'react';
import styles from './Author.module.scss';
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillGeoAltFill, BsFillTelephoneFill, BsTelegram } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai';

export const Author: FC = () => {

  return (
    <>
      <main className={styles['card-developer-main']}>
        <div className={styles['card-developer-top']}>
          <h3>DEVELOPER CARD</h3>
        </div>
        <div className={styles['card-developer-info']}>
          <p><span className={styles['card-developer-card']}><FaRegUserCircle /></span> <span>MARAT ZINATULIN</span></p>
          <p><span className={styles['card-developer-card']}><BsFillGeoAltFill /></span> <span>Tashkent, Uzbekistan</span></p>
          <p><span className={styles['card-developer-card']}><MdEmail /></span> <span><a href="mailto:zinatulinmarat@gmail.com">zinatulinmarat@gmail.com</a></span></p>
          <p><span className={styles['card-developer-card']}><BsTelegram /></span> <span><a href="https://t.me/Marat1Z">Marat1Z</a></span></p>
          <p><span className={styles['card-developer-card']}><BsFillTelephoneFill /></span> <span>+99890 9207135</span></p>
          <p><span className={styles['card-developer-card']}><AiFillGithub /></span> <span><a href="https://github.com/Marat290988/">https://github.com/Marat290988/</a></span></p>
          <hr />
          <p>I am always open to cooperation. Feel free to contact me.</p>
        </div>
      </main>
    </>
  )
}