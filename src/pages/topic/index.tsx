import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { axiosReq } from '@/axios/api';

export interface IForum {
  id: number,
  name: string,
  children: IForum[]
}

const TopicPage = (props: {forum: IForum}) => {
  // const title = `${props.forum.name} - Next Forum`;
  console.log(props)
  return (
    <>
      <Head>
        <title>Topic</title>
      </Head>
      <>
        TOPIC
      </>
    </>
  );
}

export default TopicPage;

export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext) => {
  console.log(`${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`)
  const response = await axiosReq({
    url: process.env.NEXT_PUBLIC_SITE_URL + '/comment/get_comment_by_topic/' + context.query.t
  });

  let data = null;
  if (response?.data) {
    data = response.data;
  }
  console.log(`${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`)

  return {
    props: {
      data
    }
  }
}
  