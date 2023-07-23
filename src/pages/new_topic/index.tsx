import { NewTopic } from "@/screens/new-topic/NewTopic";
import { Prisma } from "@/utils/prisma";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

export type CreateTopic = {
  isExistsForum: boolean,
  forumTitle: string,
  forumId: number,
  childrenExists: boolean
}

const NewTopicPage = (props: {createTopServerData: CreateTopic}) => {

  return (
    <>
      <Head>
        <title>Create a new topic</title>
      </Head>
      <NewTopic createTopServerData={props.createTopServerData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{createTopServerData: CreateTopic}> = async (context: GetServerSidePropsContext) => {
  const createTopServerData: CreateTopic = {isExistsForum: false, forumTitle: '', forumId: 0, childrenExists: true};
  const forumId: number = Number.parseInt(context.query.f as string);
  const prisma = Prisma.getPrisma();
  let forum;
  if (forumId > 0) {
    try {
      forum = await prisma.forum.findUnique({
        where: {
          id: forumId
        },
        select: {
          name: true,
          id: true,
          children: {
            select: {
              name: true,
              id: true
            }
          }
        }
      })
    } catch (e) {}
    if (forum) {
      createTopServerData.isExistsForum = true;
      createTopServerData.forumTitle = forum.name;
      createTopServerData.forumId = forumId;
      createTopServerData.childrenExists = forum.children.length > 0;
    }
  }

  return {
    props: {
      createTopServerData
    }
  }
}

export default NewTopicPage;