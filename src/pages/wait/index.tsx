import { axiosReq } from "@/axios/api";
import { useActions } from "@/hooks/useActions";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const WaitPage = () => {
  const router = useRouter();
  const { setUser } = useActions();

  const googleCheckToken =  useCallback(async (token: string) => {
    const res = await axiosReq({
      url: `google?token=${token}`
    }).then((res) => {
      setUser(res.data.user);
      router.replace('/');
    }).catch(() => {
      router.replace('/auth');
    })
  }, [])

  useEffect(() => {
    const hash = (router.asPath as string).split("#")[1]; // error=unauthorized_client&error_code=401error_description=Something+went+wrong
    const parsedHash = new URLSearchParams(hash);
    googleCheckToken(parsedHash.get('access_token') as string);
  }, [googleCheckToken]);

  return <>
    <h1 style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '25px'
    }}>Please wait...</h1>
  </>
  
}

export default WaitPage;