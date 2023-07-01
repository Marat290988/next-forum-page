import styles from "./AddSection.module.scss";
import { FC, FormEvent, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { useActions } from './../../../hooks/useActions';
import { axiosReq } from './../../../axios/api';

export const AddSection: FC = () => {
  const { setLoading } = useActions();
  const maxLength = 500;
  const [sectionText, setSectionText] = useState('');
  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    setSectionText(el.value.trim().substring(0, maxLength));
  }
  const submitSection = async () => {
    if (sectionText.length === 0) {
      return;
    }
    setLoading();
    const response = await axiosReq({
      url: '/create_section',
      method: 'POST',
      data: {name: sectionText}
    });
    console.log(response)
  }
  return (
    <div className="main-container">
      <form className={`border-color-dark ${styles["form"]}`}>
        <div className='flex'>
          <div className='grow'>
            <label htmlFor="section">Section name:</label>
            <div>
              <input 
                id="section" 
                className={styles.input} 
                value={sectionText}
                onInput={inputHandler}
                onPaste={inputHandler}
              />
            </div>
          </div>
          <div 
            className={`px-[10px] flex items-center ${styles['check-button']}`}
            onClick={() => submitSection()}
          >
            <ImCheckmark />
          </div>
        </div>
        <div className={styles.counter}>{sectionText.length} / {maxLength}</div>
      </form>
    </div>
  );
};
