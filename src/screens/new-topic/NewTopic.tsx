import { FC, useRef, useState } from "react";
import styles from './NewTopic.module.scss';
import { CreateTopic } from "@/pages/new_topic";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/header/Header";
import { MyEditor } from "@/components/ui/MyEditor/MyEditor";
import { MyButton } from "@/components/ui/MyButton/MyButton";
import { MyInput } from "@/components/ui/MyInput/MyInput";


export const NewTopic: FC<{createTopServerData: CreateTopic}> = ({createTopServerData}) => {

  const user = useAuth();
  const refData = useRef<any>(null);
  const [editorVal, setEditorVal] = useState('');

  const handleChangeEditorVal = (val: string) => {
    setEditorVal(val);
  }

  const submit = (text: string) => {
    console.log(text)
  }

  return (
    <>  
      <Header user={user} />
      <main className='px-0 py-[15px]'>
        <div className='main-container'>
          <div className='mb-[10px]'>
            <MyInput 
              title="Start message:"
              maxLength={500}
            />
          </div>
          <h3>Start message of topic:</h3>
          <MyEditor handleChangeEditorVal={handleChangeEditorVal} />
          <div className="mt-[5px]">
            <MyButton buttonClick={() => console.log(editorVal)} canClick={true} isLoading={false}>Publish</MyButton>
          </div>
        </div>
      </main>
    </>
  );
}