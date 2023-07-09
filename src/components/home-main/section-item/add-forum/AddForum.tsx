import { FC } from 'react'
import styles from './AddForum.module.scss'
import { MyForm } from '@/components/ui/MyForm/MyForm';

export const AddForum: FC = () => {

  return (
    <div>
      Add Forum
      <MyForm />
    </div>
  );
}