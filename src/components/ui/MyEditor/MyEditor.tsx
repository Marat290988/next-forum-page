import styles from "./MyEditor.module.scss";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import { FC, useState,useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const MyEditor: FC<{handleChangeEditorVal: (val: string) => void}> = ({ handleChangeEditorVal }) => {
  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    handleChangeEditorVal(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);
  
  return (
    <>
      <div className={styles["editor-cont"]}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            options: ['inline', 'textAlign', 'link', 'emoji']
          }}
        />
      </div>
    </>
  );
};
