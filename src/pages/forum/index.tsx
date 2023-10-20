import { Forum } from "@/screens/forum/Forum";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { axiosReq } from '@/axios/api';

export interface IForum {
  id: number,
  name: string,
  children: IForum[]
}

const ForumPage = (props: {forum: IForum}) => {
  const title = `${props.forum.name} - Next Forum`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Forum name={props.forum.name} />
    </>
  );
}

export default ForumPage;

export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext) => {
  const response = await axiosReq({
    url: new URL(context.req.headers.referer as string).origin + '/api' + '/forum/get_forum/' + context.query.f
  });

  let forum = null;
  if (response?.data?.forum) {
    forum = response.data.forum;
  }

  return {
    props: {
      forum
    }
  }
}
  