import { Dispatch, FC, SetStateAction } from "react";
import styles from './MyGridTopicTableRow.module.scss';
import { MyGridTableBase, MyGridType } from "../MyGridTableBase/MyGridTableBase";
import { FiMessageSquare } from "react-icons/fi";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { useActions } from "@/hooks/useActions";
import { MyModal } from "../../MyModal/MyModal";
import { ForumService } from "@/services/forum.service";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';

export type TopicType = {
  createdAt: string,
  updatedAt: string,
  authorTheme: { id: number, name: string },
  id: number,
  title: string
}

export const MyGridTopicTableRow: FC<{ dataItem: TopicType, canShow: boolean, setTopics: Dispatch<SetStateAction<any[]>> }> = ({ dataItem, canShow, setTopics }) => {

  const date = moment(dataItem.createdAt).format('HH:mm') + ' [' + moment(dataItem.createdAt).format('DD.MM.YYYY') + ']';
  const dateUp = moment(dataItem.updatedAt).format('HH:mm') + ' [' + moment(dataItem.updatedAt).format('DD.MM.YYYY') + ']';

  const { switchOn, switchOff, setLoadingWithParam } = useActions();

  const forumId = useRouter().query.f;

  const removeTopic = async () => {
    setLoadingWithParam(true);
    switchOff();
    ForumService.deleteTopic(dataItem.id).then(res => {
      updateTopics();
    })
    .catch((e) => {
      setLoadingWithParam(false);
      toast.error(e.response.data.message);
      console.log(e);
    });
  }

  const updateTopics = () => {
    ForumService.getForumsByForumParent(forumId as string).then((res: {themes: TopicType[]}) => {
      setTopics(res.themes);
      setLoadingWithParam(false);
    }).catch(() => {
      setLoadingWithParam(false);
      toast.error('Problems with network.');
    })
  }

  const gridData: MyGridType[] = [
    {
      value: '', gridColumns: '30px', style: {
        textAlign: 'center',
        borderRight: '2px solid var(--borderc)',
        borderBottom: '1px solid var(--borderc)',
        fontSize: '20px',
        paddingTop: '4px',
        paddingLeft: '4px'
      }, icon: <FiMessageSquare />
    },
    {
      value: dataItem.title, gridColumns: 'auto', style: {
        paddingLeft: '30px',
        paddingTop: '2px',
        paddingBottom: '3px',
        borderRight: '2px solid var(--borderc)',
        borderBottom: '1px solid var(--borderc)',
        cursor: 'pointer',
        height: '31.8px'
      }, isLink: true, linkBase: 'topic?t'
    },
    {
      value: dataItem.authorTheme.name, gridColumns: 'minmax(100px, 150px)', style: {
        textAlign: 'center',
        paddingTop: '4px',
        paddingLeft: '4px',
        paddingBottom: '3px',
        borderRight: '2px solid var(--borderc)',
        borderBottom: '1px solid var(--borderc)'
      }
    },
    {
      value: dateUp, gridColumns: 'minmax(100px, 150px)', style: {
        textAlign: 'center',
        paddingTop: '4px',
        paddingLeft: '4px',
        paddingBottom: '3px',
        borderRight: '2px solid var(--borderc)',
        borderBottom: '1px solid var(--borderc)',
        fontSize: '13px'
      }
    },
    {
      value: date, gridColumns: 'minmax(100px, 150px)', style: {
        textAlign: 'center',
        paddingTop: '4px',
        paddingLeft: '4px',
        paddingBottom: '3px',
        borderBottom: '1px solid var(--borderc)',
        fontSize: '13px'
      }
    }
  ]

  if (canShow) {
    const deleteTitle: MyGridType = {
      value: ' ', gridColumns: 'minmax(50px, 50px)', style: {
        textAlign: 'center',
        borderRight: '2px solid var(--borderc)',
        borderBottom: '1px solid var(--borderc)',
        fontSize: '15px',
        paddingTop: '4px',
        paddingLeft: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'var(--error01)',
      }, icon: <FaTrash />,
      canClick: true,
      clickFunc: () => {
        switchOn(<>
          <MyModal actionHandler={removeTopic} />
        </>)
      }
    };
    const movingEl = gridData.splice(gridData.length - 1, 1, deleteTitle)[0];
    gridData.push(movingEl);
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
  )
}