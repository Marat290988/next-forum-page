import { useActions } from '@/hooks/useActions';
import styles from './MyModal.module.scss';
import { FC } from 'react';
import { MyButton } from '../MyButton/MyButton';

export const MyModal: FC<{actionHandler: () => void}> = ({ actionHandler }) => {

  const { switchOff } = useActions();
  const hideModal = () => {
    switchOff();
  };

  return (
    <>
      <div className={styles["modal"]} onClick={hideModal}>
        <div className={styles["modal-container"]}>
          <p className="text-center">ARE YOU SURE?</p>
          <div className="flex justify-between mt-[10px] w-[150px]">
            <MyButton canClick={true} buttonClick={actionHandler}>
              YES
            </MyButton>
            <MyButton canClick={true} buttonClick={hideModal}>
              CLOSE
            </MyButton>
          </div>
        </div>
      </div>
    </>
  );

}