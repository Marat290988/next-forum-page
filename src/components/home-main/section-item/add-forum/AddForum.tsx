import { FC, useRef } from 'react'
import styles from './AddForum.module.scss'
import { MyForm } from '@/components/ui/MyForm/MyForm';

export const AddForum: FC = () => {

  const refData = useRef<any>(null);

  const submit = (text: string) => {
    refData.current?.clearInput();
  }

  return (
    <div>
      Add Forum
      <MyForm 
        title='Forum name' 
        submitFunc={submit}
        maxLength={500}
        ref={refData}
      />
    </div>
  );
}