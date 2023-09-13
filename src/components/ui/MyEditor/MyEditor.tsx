import styles from "./MyEditor.module.scss";
import { ContentBlock, ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import { FC, useState,useEffect, Ref, useImperativeHandle, forwardRef } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const MyEditor = forwardRef((props: any, ref: any) => {
  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    props.handleChangeEditorVal(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  if (ref) {
    ref.current = {clear: () => {
      setEditorState(EditorState.createWithContent(ContentState.createFromText('')));
    }}
  }

  return (
    <>
      <div className={styles["editor-cont"]}>
        <Editor
          
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ['inline', 'textAlign', 'link', 'emoji']
          }}
        />
      </div>
    </>
  );
})

// export const MyEditor: FC<{handleChangeEditorVal: (val: string) => void, ref: Ref<any>}> = ({ handleChangeEditorVal }, ref: Ref<any>) => {
//   const Editor = dynamic(
//     () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//     { ssr: false }
//   );

//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );



//   // useEffect(() => {
//   //   handleChangeEditorVal(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//   // }, [editorState]);

//   const handleEditorChange = (state: EditorState) => {
//     setEditorState(state);
//     handleChangeEditorVal(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//   };

//   const clear = () => {
//     console.log('clear')
//     EditorState.createEmpty();
//   }

//   useImperativeHandle(ref, () => ({ clear }));
  
//   return (
//     <>
//       <div className={styles["editor-cont"]}>
//         <Editor
          
//           editorState={editorState}
//           onEditorStateChange={handleEditorChange}
//           toolbar={{
//             options: ['inline', 'textAlign', 'link', 'emoji']
//           }}
//         />
//       </div>
//     </>
//   );
// };
