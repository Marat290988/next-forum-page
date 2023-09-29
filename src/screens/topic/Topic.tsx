import { FC, useEffect, useRef } from 'react';
import styles from './Topic.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/header/Header';
import { IComment } from '@/pages/topic';
import { Comment } from '@/components/topic/Comment/Comment';
import { MyEditor } from './../../components/ui/MyEditor/MyEditor';
import { MyButton } from '@/components/ui/MyButton/MyButton';
import { useState } from 'react';
import { CommentService } from '@/services/comment.service';
import { ToastContainer, toast } from 'react-toastify';
import { MyPagination } from '@/components/ui/MyPagination/MyPagination';
import { useMutation } from '@tanstack/react-query';
import { useActions } from '@/hooks/useActions';
import { getKeyFromSerachParam, getQueryParamsString } from '@/utils/url.util';
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/footer/Footer';

export const Topic: FC<{topicId: number, forumId: number, comments: IComment[], totalPage: number}> = (props) => {

  const { topicId, forumId } = props;
  const defaultQty = 10;
  let { comments } = props;
  const [text, setText] = useState<string>('p');
  const [isLoading, setIsLoading] = useState(false);
  const [commentState, setCommentState] = useState<IComment[]>(comments);
  const [totalPage, setTotalPage] = useState(props.totalPage);
  const [currentPage, setCurrentPage] = useState<undefined | number>();
  const currentPageMutation = useRef(0);
  const { setLoadingWithParam } = useActions();

  const user = useAuth();
  const [canShow, setCanShow] = useState(false);
  const router = useRouter();

  const handleChangeEditorVal = (val: string) => {
    setText(val);
  };

  const childRef = useRef<any>(null);

  const sendComment = () => {
    setIsLoading(true);
    CommentService.sendComment(text, topicId, forumId).then(res => {
      updateComment();
    }).catch(e => {
      setIsLoading(false);
      toast.error(e.response.data.message);
    })
  }

  const { mutate, isLoading: isLoadingMutate } = useMutation(
    ["topic", topicId, currentPageMutation.current],
    () => CommentService.getCommentsByTopicId(topicId, currentPageMutation.current),
    {
      onSuccess(data: {
        comments: IComment[],
      }) {
        setCommentState(data.comments);
      },
      onError() {
        toast.error('Problems with network.');
      }
    }
  )

  const updateComment = () => {
    setTotalPage(totalPage + 1);
    if (totalPage % defaultQty === 0) {
      currentPageMutation.current = currentPageMutation.current + 1;
      setLoadingWithParam(true);
      setCurrentPage(currentPageMutation.current);
      setIsLoading(false);
      clear();
      router.push(getQueryParamsString([{t: topicId}, {p: currentPageMutation.current}, {c: defaultQty}]));
      return;
    }
    CommentService.getCommentsByTopicId(topicId, currentPageMutation.current).then((res: {comments: IComment[]}) => {
      setCommentState(res.comments);
      setIsLoading(false);
      clear();
    }).catch(() => {
      toast.error('Problems with network.');
    })
  }

  const parentPaginationHandle = (event: { selected: number }) => {
    if (event.selected === currentPageMutation.current) {
      return;
    }
    currentPageMutation.current = event.selected;
    setLoadingWithParam(true);
    router.push(getQueryParamsString([{t: topicId}, {p: currentPageMutation.current}, {c: defaultQty}]));
  }

  const clear = () => {
    if (childRef.current) {
      childRef.current.clear();
    }
  };

  useEffect(() => {
    setLoadingWithParam(isLoadingMutate);
  }, [isLoadingMutate])

  useEffect(() => {
    if (user) {
      setCanShow(true);
    }
    currentPageMutation.current = getKeyFromSerachParam('p');
    setCurrentPage(currentPageMutation.current);
  }, [user])

  useEffect(() => {
    if (router.query.p) {
      const page: number = +router.query.p;
      setCurrentPage(page);
      mutate();
    }
    const commentEl = document.querySelector(`[data-comment-id="${router.query.id}"]`);
    if (commentEl) {
      commentEl.scrollIntoView();
    }
  }, [router.query.p])

  const loadCommentCont = (e: any) => {
    console.log(e)
    console.log(111)
  }

  
  return (
    <>
      <Header user={user} />
      <Navigation />
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
      <main className={styles['main']}>
        {commentState.length > 0 && <section className={styles['section']}>
          {commentState.map(c => <Comment comment={c} updateComment={updateComment} key={c.id} />)}
        </section>}
        {canShow && <section className={styles['section']} >
          <MyEditor handleChangeEditorVal={handleChangeEditorVal} ref={childRef} />
          <div className={styles['button']}>
            <MyButton 
              type="submit" 
              canClick={text.length > 10} 
              isLoading={isLoading}
              buttonClick={sendComment}
            >
              SEND
            </MyButton>
          </div>
        </section>}
        <section className={styles['section']}>
          <MyPagination
            key={`${currentPage}${totalPage}`}
            qtyPerPage={defaultQty}
            totalPage={totalPage}
            parentPaginationHandle={parentPaginationHandle}
            initialPage={currentPage}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}