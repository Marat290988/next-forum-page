import { axiosReq } from "@/axios/api";
import { Profile } from "@/screens/profile/Profile";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { ProfileData } from ".";

const ProfilePage = (props: {data: ProfileData}) => {
  return (
    <>
      <Head>
        <title>{'Profile - Next Forum'}</title>
      </Head>
      <Profile profileData={props.data} />
    </>
  )
}

export default ProfilePage;

export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext) => {

  const response = await axiosReq({
    url: new URL(context.req.headers.referer as string).origin + '/api' + '/profile/get_profile/' + context.query.user_id
  });

  return {
    props: {
      data: response.data
    }
  }
}