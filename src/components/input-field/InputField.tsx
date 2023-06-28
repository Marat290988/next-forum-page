import styles from '@/components/input-field/InputField.module.scss';
import { forwardRef } from 'react';

interface IInputField {
  title: string,
  type: 'text' | 'password' | 'email',
  errorMessage?: string,
  name: string,
  onChangeHandler: (key: string, value: string) => void,
  onBlurHandler: (key: string, value: string) => void,
  isTouch?: boolean,
  value: string | undefined
}

export const InputField = forwardRef<HTMLInputElement, IInputField>(
  (props, ref) => {
    const {title, type, errorMessage, name, onChangeHandler, onBlurHandler, isTouch = true, value} = props;
    return (
      <div
        className='w-full max-w-[400px]'
      >
        <h4 className={`${styles['input-title']}`}>{title}</h4>
        <input 
          type={type} 
          className=
          {`
            ${styles['input']} 
            ${errorMessage && isTouch && styles['input-error']}
          `}
          ref={ref}
          name={name}
          onChange={(e) => {onChangeHandler(name, e.target.value)}}
          onBlur={(e) => onBlurHandler(name, e.target.value)}
          value={value}
        />
        <div style={{minHeight: '18px'}}>
          {errorMessage && isTouch && <p className={`${styles['error']}`}>{errorMessage}</p>}
        </div>
      </div>
    )
  }
)

InputField.displayName = 'InputField';