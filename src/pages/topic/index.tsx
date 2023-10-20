import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { axiosReq } from '@/axios/api';
import { Topic } from "@/screens/topic/Topic";

export interface IComment {
  authorCommentId: number,
  createdAt: string,
  id: number,
  isPrimary: 'Y' | 'N',
  quoteCommentId: number | null,
  text: string,
  updatedAt: string,
  authorComment: {name: string, createdAt: string, imgUrl: string},
  avg?: number,
  themeId?: number
}

const TopicPage = (props: {data: {comments: IComment[], topic: {forumId: number, id: number, title: string}, totalComment: number}}) => {
  const title = `${props.data.topic.title} - Next Forum`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <>
        <Topic 
          topicId={props.data.topic.id}
          forumId={props.data.topic.forumId}
          comments={props.data.comments}
          totalPage={props.data.totalComment}
        />
      </>
    </>
  );
}

export default TopicPage;

export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext) => {
  const date1 = new Date();
  let page = context.query.p;
  let quanityComment = context.query.c;
  let response;
  if (page && quanityComment) {
    response = await axiosReq({
      url: `${context.req.headers['x-forwarded-proto']}://${context.req.headers['x-forwarded-host']}/api` + `/comment/get_comment_by_topic/${context.query.t}?p=${context.query.p}&c=${context.query.c}`
    });
  } else {
    response = await axiosReq({
      url: `${context.req.headers['x-forwarded-proto']}://${context.req.headers['x-forwarded-host']}/api` + `/comment/get_comment_by_topic/${context.query.t}`
    });
  }
  let data = null;
  if (response?.data) {
    data = response.data;
  }
  const date2 = new Date();
  const delta = date2.getTime() - date1.getTime();
  console.log(delta/1000 + ' sec');

  return {
    props: {
      data
    }
  }
}
  