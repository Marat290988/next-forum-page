import { Profile } from "@/screens/profile/Profile";
import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>{'Profile - Next Forum'}</title>
      </Head>
      <Profile />
    </>
  )
}

export default ProfilePage;