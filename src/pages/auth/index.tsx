import { Auth } from "@/screens/auth/Auth";
import Head from "next/head";

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>LOGIN / REGISTER NEXTFORUM</title>
      </Head>
      <Auth />
    </>
  );
};

export default AuthPage;
