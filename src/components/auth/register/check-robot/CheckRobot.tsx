import { FC, useRef } from 'react';
import styles from './CheckRobot.module.scss';

export const CheckRobot: FC<{setCorrect: (state: boolean) => void}> = ({setCorrect}) => {

  const checkSq = useRef<HTMLDivElement>(null);

  const clickHandler = (e: any) => {
    if (e.clientX !== 0) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }

  return (
    <div className="flex gap-3 mb-[10px]">
      <h4 className='flex items-center'>Click inside the square</h4>
      <div className={styles['check-square']} onClick={clickHandler} ref={checkSq}>
      </div>
    </div>

  )
}