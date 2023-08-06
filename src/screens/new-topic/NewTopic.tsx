import styles from "./NewTopic.module.scss";
import { Header } from "@/components/header/Header";
import { MyButton } from "@/components/ui/MyButton/MyButton";
import { MyEditor } from "@/components/ui/MyEditor/MyEditor";
import { MyInput } from "@/components/ui/MyInput/MyInput";
import { useAuth } from "@/hooks/useAuth";
import { RequestCreateTopic } from "@/pages/api/forum/create_topic";
import { CreateTopic } from "@/pages/new_topic";
import { ForumService } from "@/services/forum.service";
import { FC, useRef, useState, useEffect, FormEvent } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const NewTopic: FC<{ createTopServerData: CreateTopic }> = ({
  createTopServerData,
}) => {
  const user = useAuth();
  const router = useRouter();
  const refData = useRef<any>(null);
  const [editorVal, setEditorVal] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const [canClick, setCanClick] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const handleChangeEditorVal = (val: string) => {
    setEditorVal(val);
  };

  const handleChangeTitleVal = (val: string) => {
    setTitleVal(val);
  };

  const checkCanClick = () => {
    let div = document.createElement('div');
    div.innerHTML = editorVal;
    let text = div.textContent || div.innerText.trim() || '';
    text = text.replace(/(\r\n|\n|\r)/gm, '');
    if (titleVal !== '' && text !== '') {
      setCanClick(true);
    } else {
      setCanClick(false);
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonIsLoading(true);
    const data: RequestCreateTopic = {
      authorId: String(user!.id),
      forumId: String(createTopServerData.forumId),
      text: editorVal,
      title: titleVal
    };
    try {
      const response = await ForumService.createTopic(data);
      router.replace(`/forum?f=${createTopServerData.forumId}`)
    } catch(e: any) {
      const errorText = e.response.data.message ? e.response.data.message : 'The endpoint does not exist.';
      toast.error(errorText);
    }
  };

  useEffect(() => {
    checkCanClick();
  }, [titleVal, editorVal]);

  return (
    <>
      <Header user={user} />
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
      <main className="px-0 py-[15px]">
        {createTopServerData.isExistsForum && (
          <>
            <div className="main-container">
              <h3 className={styles['forum-title']}>{createTopServerData.forumTitle}</h3>
              <div className="mb-[10px]">
                <MyInput
                  title="Title of topic:"
                  maxLength={500}
                  ref={refData}
                  handleChangeInputVal={handleChangeTitleVal}
                />
              </div>
              <h3>Start message of topic:</h3>
              <MyEditor handleChangeEditorVal={handleChangeEditorVal} />
              <div className="mt-[5px]">
                <MyButton
                  buttonClick={submit}
                  canClick={canClick}
                  isLoading={buttonIsLoading}
                >
                  Publish
                </MyButton>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};
