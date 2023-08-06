import { FC, FormEvent, forwardRef, useState } from 'react';
import styles from './MyInput.module.scss';
import { maxLength } from '@/utils/validate-util';

export const MyInput: FC<{title: string, maxLength: number, handleChangeInputVal: (val: string) => void, ref: any}> = 

  forwardRef (({title, maxLength, handleChangeInputVal}, ref: any) => {

  const [inputText, setInputText] = useState('');
  const [isTouch, setIsTouch] = useState(false);
  const inputHandle = (e: FormEvent<HTMLInputElement>) => {
    if (!isTouch) {
      setIsTouch(true);
    }
    const el: HTMLInputElement = e.target as HTMLInputElement;
    setInputText(el.value.substring(0, maxLength));
    handleChangeInputVal(el.value.substring(0, maxLength));
  }

  ref.current = {clearInput: () => {
    setInputText('');
    setIsTouch(false);
  }};

  return (
    <>
      <div>
        <h3>{title}</h3>
        <input 
          className={`${styles['input']} ${isTouch && inputText === '' ? styles['error'] : ''}`}
          value={inputText}
          onInput={inputHandle}
          onPaste={inputHandle}
        />
        <div className='text-[10px]'>{inputText.length} / {maxLength}</div>
      </div>
    </>
  )
})