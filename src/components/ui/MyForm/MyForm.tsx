import { FC } from 'react';
import styles from './MyForm.module.scss';
import { useMemo } from 'react';
import { useState } from 'react';

export const MyForm: FC = () => {
  const uniqId = useMemo(() => crypto.randomUUID(), []);
  const [any, setAny] = useState(false);

  return (
    <form
      className={`${styles['my-form']} border-color-dark`}
      onClick={() => setAny(true)}
    >
      <div className='flex'>
        <div
          className='grow'
        >
              <label htmlFor={`section${uniqId}`}>Section name:</label>
              <div>
                <input
                  id={`section${uniqId}`}
                  className={styles.input}
                />
              </div>
        </div>
      </div>
      <div
        className={`${styles['my-form-counter']}`}
      >

      </div>
    </form>
  )
}
