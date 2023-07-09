import { FC, ForwardedRef, forwardRef } from 'react';
import styles from './MyForm.module.scss';
import { useMemo } from 'react';
import { useState } from 'react';
import { AiOutlinePlus  } from 'react-icons/ai';
import { FormEvent } from 'react';

export const MyForm: FC<{title: string, submitFunc: (text: string) => void, maxLength: number, clear?: () => void, ref: any}> =
  forwardRef(({title, submitFunc, maxLength}, ref: any) => {
    const uniqId = useMemo(() => crypto.randomUUID(), []);
    const [formText, setFormText] = useState('');
    const inputHandler = (e: FormEvent<HTMLInputElement>) => {
      const el: HTMLInputElement = e.target as HTMLInputElement;
      setFormText(el.value.substring(0, maxLength));
    };
    ref.current = {clearInput: () => setFormText('')};
  
    return (
      <form
        className={`${styles['my-form']} border-color-dark`}
      >
        <div className='flex'>
          <div
            className='grow'
          >
                <label htmlFor={`r${uniqId}`}>{title}:</label>
                <div>
                  <input
                    id={`r${uniqId}`}
                    className={styles.input}
                    value={formText}
                    onInput={inputHandler}
                    onPaste={inputHandler}
                  />
                </div>
          </div>
          <div
            className={`px-[10px] flex items-center ${styles["check-button"]}`}
            onClick={() => submitFunc(formText)}
          >
            <AiOutlinePlus />
          </div>
        </div>
        <div
          className={`${styles['my-form-counter']}`}
        >
          {formText.length} / {maxLength}
        </div>
      </form>
    )
    
  })
