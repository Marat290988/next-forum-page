import { useActions } from "./../../../hooks/useActions";
import styles from "./AddSection.module.scss";
import { SectionService } from "@/services/section.service";
import { FC, FormEvent, useState, useEffect } from "react";
import { ImCheckmark } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";

export const AddSection: FC<{updateList: (list: {id: number, name: string}[]) => void}> = ({updateList}) => {
  const { setLoading } = useActions();
  const maxLength = 500;
  const [sectionText, setSectionText] = useState('');
  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    setSectionText(el.value.substring(0, maxLength));
  };
  const uniqId = crypto.randomUUID();
  const submitSection = async () => {
    if (sectionText.trim().length === 0) {
      return;
    }
    setLoading();
    const getAllSection = async () => {
      try {
        const response: {id: number, name: string}[] = await SectionService.getAllSections();
        setLoading();
        updateList(response);
      } catch (e: any) {
        console.log(e)
        // const errorText = e.response.data.message ? e.response.data.message : 'The endpoint does not exist.';
        // toast.error(errorText);
      } finally {
        setLoading();
      }
    } 
    try {
      const response = await SectionService.createSection(sectionText);
      toast.success(response.message);
      setSectionText('');
      getAllSection();
    } catch (e: any) {
      const errorText = e.response.data.message ? e.response.data.message : 'The endpoint does not exist.';
      toast.error(errorText);
    } finally {
      setLoading();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="main-container" style={{marginTop: '10px'}}>
        <form className={`border-color-dark ${styles["form"]}`}>
          <div className="flex">
            <div className="grow">
              <label htmlFor={`section${uniqId}`}>Section name:</label>
              <div>
                <input
                  id={`section${uniqId}`}
                  className={styles.input}
                  value={sectionText}
                  onInput={inputHandler}
                  onPaste={inputHandler}
                />
              </div>
            </div>
            <div
              className={`px-[10px] flex items-center ${styles["check-button"]}`}
              onClick={() => submitSection()}
            >
              <ImCheckmark />
            </div>
          </div>
          <div className={styles.counter}>
            {sectionText.length} / {maxLength}
          </div>
        </form>
      </div>
    </>
  );
};
