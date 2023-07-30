import { FC, FormEvent, useState } from 'react';
import styles from './MyInput.module.scss';
import { maxLength } from '@/utils/validate-util';

export const MyInput: FC<{title: string, maxLength: number}> = ({title, maxLength}) => {

  const [inputText, setInputText] = useState('');
  const [isTouch, setIsTouch] = useState(false);
  const inputHandle = (e: FormEvent<HTMLInputElement>) => {
    if (!isTouch) {
      setIsTouch(true);
    }
    const el: HTMLInputElement = e.target as HTMLInputElement;
    setInputText(el.value.substring(0, maxLength));
  }

  const resetInput = () => {
    setInputText('');
    setIsTouch(false);
  }

  return (
    <>
      <div>
        <h3>{title}</h3>
        <input 
          className={styles['input']}
          value={inputText}
          onInput={inputHandle}
          onPaste={inputHandle}
        />
        <div className='text-[10px]'>{inputText.length} / {maxLength}</div>
      </div>
    </>
  )
}