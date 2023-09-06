import { Dispatch, FC, SetStateAction } from "react";
import { IForum } from './../../../../pages/forum/index';
import { MyGridTableBase, MyGridType } from "../MyGridTableBase/MyGridTableBase";
import { HiMiniStopCircle } from "react-icons/hi2";
import styles from './MyGridForumTableRow.module.scss';
import { FaTrash } from "react-icons/fa";
import { useActions } from "@/hooks/useActions";
import { MyModal } from "../../MyModal/MyModal";
import { ForumService } from "@/services/forum.service";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

export const MyGridForumTableRow: FC<{dataItem: IForum, canShow: boolean, setForums: Dispatch<SetStateAction<any[]>>}> = ({dataItem, canShow, setForums}) => {

  const { switchOn, switchOff, setLoadingWithParam } = useActions();

  const forumId = useRouter().query.f;

  const removeForum = () => {
    setLoadingWithParam(true);
    switchOff();
    ForumService.deleteForum(dataItem.id).then(res => {
      updateForums();
    })
    .catch((e) => {
      setLoadingWithParam(false);
      toast.error(e.response.data.message);
      console.log(e);
    });
  }

    const updateForums = () => {
    ForumService.getForumsByForumParent(forumId as string).then((res: {forums: IForum[]}) => {
      setForums(res.forums);
      setLoadingWithParam(false);
    }).catch(() => {
      setLoadingWithParam(false);
      toast.error('Problems with network.');
    })
  }

  const gridData: MyGridType[] = [
    {value: '', gridColumns: '30px', style: {
      textAlign: 'center',
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)',
      fontSize: '20px',
      paddingTop: '4px',
      paddingLeft: '4px'
    }, icon: <HiMiniStopCircle />},
    {value: dataItem.name, gridColumns: 'auto', style: {
      paddingLeft: '10px',
      paddingTop: '2px',
      paddingBottom: '3px',
      borderBottom: '1px solid var(--borderc)',
      cursor: 'pointer',
    }, isLink: true, linkBase: 'forum?f'}
  ]

  if (canShow) {
    const deleteTitle: MyGridType = {
      value: ' ', gridColumns: 'minmax(50px, 50px)', style: {
        textAlign: 'center',
        borderBottom: '1px solid var(--borderc)',
        fontSize: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'var(--error01)',
      }, icon: <FaTrash />,
      canClick: true,
      clickFunc: () => {
        switchOn(<>
          <MyModal actionHandler={removeForum} />
        </>)
      }
    };

    gridData[gridData.length - 1].style = {
      ...gridData[gridData.length - 1].style,
      borderRight: '2px solid var(--borderc)',
      borderBottom: '1px solid var(--borderc)'
    };
    gridData.push(deleteTitle);
  }

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
      <MyGridTableBase myGridData={gridData} cssClass={styles['grid-row']} id={dataItem.id} />
    </>
  );
}