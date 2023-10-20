import { axiosReq } from "@/axios/api";
import { Profile } from "@/screens/profile/Profile";
import { decodePassedToken } from "@/utils/token";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

export interface ProfileData {
  avgRating: number,
  commentQ: number
  themesQ: number,
  user: {
    createdAt: string,
    email: string
    imgUrl: string
    name: string,
    id: number
  }
}

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

export const getServerSideProps: GetServerSideProps<{data: ProfileData}> = async (context: GetServerSidePropsContext) => {

  const { id } = decodePassedToken(context.req.cookies['token'] as string);
  

  const response = await axiosReq({
    url: process.env.NEXT_PUBLIC_SITE_URL + '/profile/get_profile/' + id
  });

  return {
    props: {
      data: response.data
    }
  }
}