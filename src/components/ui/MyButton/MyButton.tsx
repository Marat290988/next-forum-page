import styles from '@/components/ui/MyButton/MyButton.module.scss';
import { FC, PropsWithChildren  } from 'react';
import ReactIcon from './../ReactIcon/ReactIcon';
import { useEffect } from 'react';
import { useState } from 'react';

interface IMyButton {
  type?: 'button' | 'submit',
  buttonClick?: (e: any) => void,
  isLoading?: boolean,
  canClick?: boolean
}

export const MyButton: FC<PropsWithChildren<IMyButton>> = ({children, type = 'button', buttonClick, isLoading = false, canClick = false}) => {
  
  const [componentCanClick, setComponentCanClick] = useState(false);

  useEffect(() => {
    setComponentCanClick(canClick)
  }, [canClick])

  return (
    <button
      type={type}
      onClick={buttonClick}
      className={`px-[10px] py-[5px] rounded-[10px] ${styles['my-button']} relative`}
      style={{backgroundColor: !componentCanClick ? 'var(--dark01)' : ''}}
      disabled={!canClick}
    >
      <span style={{color: isLoading ? 'transparent' : 'unset'}}>{children}</span>
      {isLoading && <ReactIcon
        className={`absolute top-[50%] ${styles['icon-position']}`}
      />}
    </button>
  )
}